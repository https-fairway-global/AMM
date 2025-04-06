import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  own_wallet_public_key(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
}

export type ImpureCircuits<T> = {
  register(context: __compactRuntime.CircuitContext<T>,
           signing_key_0: { x: bigint, y: bigint }): __compactRuntime.CircuitResults<T, []>;
  get_signing_key(context: __compactRuntime.CircuitContext<T>,
                  wallet_address_0: bigint): __compactRuntime.CircuitResults<T, { x: bigint,
                                                                                  y: bigint
                                                                                }>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  register(context: __compactRuntime.CircuitContext<T>,
           signing_key_0: { x: bigint, y: bigint }): __compactRuntime.CircuitResults<T, []>;
  get_signing_key(context: __compactRuntime.CircuitContext<T>,
                  wallet_address_0: bigint): __compactRuntime.CircuitResults<T, { x: bigint,
                                                                                  y: bigint
                                                                                }>;
}

export type Ledger = {
  registeredSigningKeys: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { x: bigint, y: bigint };
    [Symbol.iterator](): Iterator<[bigint, { x: bigint, y: bigint }]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
