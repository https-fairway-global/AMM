import type { ContractState} from '@midnight-ntwrk/ledger';
import { type CurvePoint } from '@midnight-ntwrk/compact-runtime';
import {
  type PublicDataProvider,
  type PrivateStateProvider,
  type ProofProvider,
  type ZKConfigProvider,
  type WalletProvider,
} from '@midnight-ntwrk/midnight-js-types';

export type Config = {
  indexerUri: string;
  indexerWsUri: string;
  projectId: string;
  networkId: string;
};

export type Transaction = {
  hash: string;
  identifiers: string[];
  contractCalls: Array<{
    address: string;
    __typename: string;
  }>;
};

export type ContractStateUpdateBlock = {
  height: number;
  contracts: ExtractedContractRecord[];
};

export type ContractStateAddress = {
  address: string;
  state: ContractState;
};

export type StreamElementData = {
  blocks: {
    height: number;
    hash: string;
    transactions: Transaction[];
  };
};

export type ExtractedContractRecord = {
  walletPublicKey: string;
  signingPublicKey: CurvePoint;
};

export type IdentityRegistryCircuitKeys = 'register' | 'get_signing_key';
export type IdentityRegistryPrivateStateSchema = { identityRegistry: never };

export type IdentityRegistryProviders = {
  readonly publicDataProvider: PublicDataProvider;
  readonly privateStateProvider: PrivateStateProvider<IdentityRegistryPrivateStateSchema>;
  readonly proofProvider: ProofProvider<IdentityRegistryCircuitKeys>;
  readonly zkConfigProvider: ZKConfigProvider<IdentityRegistryCircuitKeys>;
  readonly walletProvider: WalletProvider;
};
