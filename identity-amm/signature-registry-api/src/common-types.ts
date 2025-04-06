// Placeholder: Add common-types.ts content based on the guide.
// This should include shared types like IdentityRecord, ContractStates, etc.

// export interface IdentityRecord { ... }
// export type ContractStates<T> = { ... }; // Example Exports 

import {
  type PublicDataProvider,
  type PrivateStateProvider,
  type ProofProvider,
  type ZKConfigProvider,
  type WalletProvider,
  type MidnightProvider,
  type MidnightProviders
} from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract, type Contract as GenericContractConstraint, type Witnesses as GenericWitnessesConstraint } from '@midnight-ntwrk/midnight-js-contracts';
import { Contract } from '@identity-amm/signature-registry-contract';
import { type CurvePoint, type ContractAddress, type WitnessContext } from '@midnight-ntwrk/compact-runtime';
import { type CoinPublicKey } from '@midnight-ntwrk/ledger'; // Corrected import: CoinPublicKey

// 1. Define the Private State type matching the contract's witnesses
// Use `never` as the contract has no private state related to witnesses.
export type IdentityRegistryPrivateState = never;

// 2. Define the shape of the Witnesses object satisfying the SDK constraint
// Extend the generic constraint and add specific witness signatures.
export interface IdentityRegistryWitnesses extends GenericWitnessesConstraint<IdentityRegistryPrivateState> {
    // Explicitly define the witness signature using a standard function type
    own_wallet_public_key: (context: WitnessContext<any, IdentityRegistryPrivateState>) => [IdentityRegistryPrivateState, bigint]; 
    // Add the index signature required by GenericWitnessesConstraint
    [key: string]: (context: WitnessContext<any, IdentityRegistryPrivateState>) => [IdentityRegistryPrivateState, any];
}

// 3. Define the specific Contract Instance type using the imported class and our types
// This should now satisfy the constraint because IdentityRegistryWitnesses extends the required base type
export type IdentityRegistryContract = GenericContractConstraint<IdentityRegistryPrivateState, IdentityRegistryWitnesses>;

// 4. Define related types based on the correctly typed instance
// Circuit keys based on the simple signature registry contract
export type IdentityRegistryCircuitKeys = 'register' | 'get_signing_key';

// Schema for private state (empty in this case)
export type IdentityRegistryPrivateStateSchema = { identityRegistry: never };

// Use the aggregate MidnightProviders type as expected by SDK functions
export type IdentityRegistryProviders = MidnightProviders<IdentityRegistryCircuitKeys, IdentityRegistryPrivateStateSchema>;

// 5. Define the Deployed Contract type using the specific instance type
// This should also satisfy the constraint now.
export type DeployedIdentityRegistryContract = FoundContract<IdentityRegistryPrivateState, IdentityRegistryContract>;

// 6. Define the Derived state based on API needs
// Store a map of Wallet Public Key (stringified Field) to Signing Public Key (CurvePoint)
export type IdentityRegistryDerivedState = {
  readonly registrations: ReadonlyMap<string, CurvePoint>; // Key: Wallet Address (Field as string), Value: Signing Key (CurvePoint)
};

// 7. Define the empty state
export const emptyState: IdentityRegistryDerivedState = {
  registrations: new Map<string, CurvePoint>(),
}; 