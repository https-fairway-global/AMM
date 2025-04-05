import { filter, firstValueFrom, mergeMap, Observable } from 'rxjs';
import {
  type Config,
  type ContractStateUpdateBlock,
  type ExtractedContractRecord,
  type StreamElementData,
} from './common-types.js';
import { gql } from 'graphql-tag';
import { ApolloClient, InMemoryCache, type FetchResult, type NormalizedCacheObject } from '@apollo/client';
import type { PublicDataProvider, VerifierKey } from '@midnight-ntwrk/midnight-js-types';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import WebSocket from 'ws';
import { type NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { map } from 'rxjs/operators';
import { verifyContractState } from '@midnight-ntwrk/midnight-js-contracts';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import type { ContractState } from '@midnight-ntwrk/compact-runtime';

export interface SignatureRegistryStream {
  readonly contractUpdateStateStream: (blockHeight: number) => Observable<ContractStateUpdateBlock>;
}

export class SignatureRegistryStreamImpl implements SignatureRegistryStream {
  provider: PublicDataProvider;
  client: ApolloClient<NormalizedCacheObject>;
  config: Config;
  verifierKeys: Array<['register_verification', VerifierKey]>;
  constructor(config: Config, verifierKeys: Array<['register_verification', VerifierKey]>) {
    setNetworkId(config.networkId as NetworkId);
    this.provider = indexerPublicDataProvider(config.indexerUri, config.indexerWsUri, WebSocket as any);
    this.verifierKeys = verifierKeys;
    const wsLink = new GraphQLWsLink(
      createClient({
        url: config.indexerWsUri,
        webSocketImpl: WebSocket,
      }),
    );

    this.client = new ApolloClient<NormalizedCacheObject>({
      link: wsLink,
      cache: new InMemoryCache(),
    });

    this.config = config;
  }

  TXS_FROM_BLOCK_SUB = gql`
    subscription TXS_FROM_BLOCK_SUB($offset: BlockOffsetInput) {
      blocks(offset: $offset) {
        height
        hash
        transactions {
          hash
          contractCalls {
            address
          }
        }
      }
    }
  `;

  subscribeToBlocks = (height: number): Observable<FetchResult<StreamElementData>> => {
    return new Observable<FetchResult<StreamElementData>>((subscriber) => {
      this.client
        .subscribe<StreamElementData>({
          query: this.TXS_FROM_BLOCK_SUB,
          variables: { offset: { height } },
        })
        .subscribe({
          next: (value: FetchResult<StreamElementData>) => {
            subscriber.next(value);
          },
          error: (err: any) => {
            subscriber.error(err);
          },
          complete: () => {
            subscriber.complete();
          },
        });
    });
  };

  contractCallDeployments = (streamElementData: StreamElementData) => {
    return streamElementData.blocks.transactions.flatMap(
      (transaction) =>
        transaction.contractCalls
          // .filter((contractCall) => contractCall.__typename === 'ContractDeploy') // here we could only take contract deployments
          .map((contractCall) => contractCall.address.substring(2)), // address includes network-id prefix which we need to remove
    );
  };

  contractState = async (address: string): Promise<{ address: string, state: ContractState | undefined }> => {
    const observable = this.provider.contractStateObservable(address, { type: 'latest' }) as unknown as Observable<ContractState | undefined>;
    const state = await firstValueFrom(observable);
    return { address, state };
  };

  contractStates = async (address: string[]) => {
    return await Promise.all(address.map((address) => this.contractState(address)));
  };

  toContractDeploymentBlock = async (streamElementData: StreamElementData) => {
    const contractStateAddresses = await this.contractStates(this.contractCallDeployments(streamElementData));
    const contracts: ExtractedContractRecord[] = [];
    contractStateAddresses.forEach((contractStateAddress) => {
      if (contractStateAddress.state) {
        try {
          const contractStateData = (contractStateAddress.state as any).data;
          verifyContractState(this.verifierKeys, contractStateAddress.state);
          const item = {
            walletPublicKey: toHex((contractStateData as any)?.walletPublicKey?.bytes ?? ''),
            signingPublicKey: (contractStateData as any)?.signingPublicKey ?? '',
            contractAddress: contractStateAddress.address,
          };
          contracts.push(item);
          console.log(`Item`, item);
        } catch (e) {
          console.warn(
            'Contract ' +
              contractStateAddress.address +
              ' at blockHeight:' +
              streamElementData.blocks.height +
              ' state validation/parsing failed',
            e
          );
        }
      } else {
        console.warn(`Contract ${contractStateAddress.address} at block ${streamElementData.blocks.height} had undefined state.`);
      }
    });
    return {
      height: streamElementData.blocks.height,
      contracts,
    };
  };

  contractUpdateStateStream(blockHeight: number): Observable<ContractStateUpdateBlock> {
    return this.subscribeToBlocks(blockHeight).pipe(
      filter((element) => element.data != null),
      map((element) => element.data as StreamElementData),
      mergeMap((element) => this.toContractDeploymentBlock(element)),
    );
  }
}
