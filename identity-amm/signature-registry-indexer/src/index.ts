import { concatMap, from, mergeMap, retry } from 'rxjs';
import { type Config } from './common-types.js';
import { type SignatureRegistryStream, SignatureRegistryStreamImpl } from './signature-registry-stream.js';
import { FirestoreStorage, type IndexStorage } from './storage.js';
import { Contract } from '@identity-amm/signature-registry-contract';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import type { VerifierKey } from '@midnight-ntwrk/midnight-js-types';
import type { VerificationRegistryContractInstance } from '@identity-amm/signature-registry-api';

// Define placeholder witnesses similar to the API
const placeholderWitnesses = {
    parse_fayda_credential: (): [Record<string, never>, any] => [{}, {}], // Simplified return for placeholder
    user_secret_key: (): [Record<string, never>, bigint] => [{}, 0n],
    current_time: (): [Record<string, never>, bigint] => [{}, 0n],
};

async function runIndex(config: Config, storage: IndexStorage) {
  const zkConfigProvider = new NodeZkConfigProvider<'register_verification'>('dist/');
  const circuitIds: ['register_verification'] = ['register_verification'];
  const verifierKeys: Array<['register_verification', VerifierKey]> = await zkConfigProvider.getVerifierKeys(
    circuitIds
  );

  const streamImpl: SignatureRegistryStream = new SignatureRegistryStreamImpl(config, verifierKeys);

  const stream = from(storage.getBlockHeight()).pipe(
    concatMap((blockHeightOpt) => {
      const blockHeight = blockHeightOpt ?? 0;
      console.log('Starting from block height:', blockHeight);
      return streamImpl.contractUpdateStateStream(blockHeight);
    }),
    retry({
      count: 10,
      delay: 500,
      resetOnSuccess: true,
    }),
    mergeMap(async (element) => {
      await Promise.all(element.contracts.map((contract: any) => storage.saveContract(contract)));
      return element;
    }, 1),
    mergeMap(async (element) => {
      if (element.height % 1 === 0 || element.contracts.length > 0) {
        await storage.saveBlockHeight(element.height);
        console.log('Saved block with height:', element.height);
      }
      return element;
    }, 1),
  );

  return stream.subscribe({
    next: (_element) => {
      // Add logging or processing logic here later if needed
    },
    error: (err) => {
      console.error('Subscription error:', err);
    },
  });
}

const main = (): void => {
  try {
    console.log('Starting IDP Indexer');

    const config: Config = {
      indexerUri: process.env.INDEXER_URI ?? 'http://localhost:8088/api/v1/graphql',
      indexerWsUri: process.env.INDEXER_WS_URI ?? 'ws://localhost:8088/api/v1/graphql/ws',
      projectId: process.env.PROJECT_ID ?? 'btow-playground',
      networkId: process.env.NETWORK_ID ?? 'Undeployed',
    };

    console.log('Config', config);

    // Pass arguments to FirestoreStorage constructor
    const storage: IndexStorage = new FirestoreStorage(config.projectId, config.networkId);

    runIndex(config, storage)
      .then((subscription) => {
        console.log('Subscription created successfully:', subscription);
      })
      .catch((error) => {
        console.error('Error handling promise of subscription:', error);
        throw error;
      });
  } catch (e) {
    console.error('Error starting Battleship Indexer:', e);
  }
};

main();
