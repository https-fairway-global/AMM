// Placeholder: Add exports for generated types/constants based on the guide.

// export * from './generated/amm'; // Example export 

// Import the generated CommonJS module for values
import generated = require('./generated/contract/index.cjs');

// Import the generated types separately
import type * as generatedTypes from './generated/contract/index.d.cts';

// Export the Contract class value
export const Contract = generated.Contract;

// Export necessary types for consumers
export type Ledger = generatedTypes.Ledger;
export type Witnesses<T = unknown> = generatedTypes.Witnesses<T>;
export type Circuits<T = unknown> = generatedTypes.Circuits<T>;
export type ImpureCircuits<T = unknown> = generatedTypes.ImpureCircuits<T>;
export type ContractType<T = unknown> = generatedTypes.Contract<T>;

// Re-export constants if needed (example)
// export const contractReferenceLocations = generated.contractReferenceLocations;

// Consumers will need to instantiate it with their specific types. 