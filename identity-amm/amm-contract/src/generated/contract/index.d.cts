import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  user_secret_key(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
}

export type ImpureCircuits<T> = {
  create_pool(context: __compactRuntime.CircuitContext<T>,
              token0_0: bigint,
              token1_0: bigint,
              initial_reserve0_0: bigint,
              initial_reserve1_0: bigint,
              requires_verification_0: boolean,
              fee_bps_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  swap(context: __compactRuntime.CircuitContext<T>,
       pool_id_0: bigint,
       token_in_0: bigint,
       amount_in_0: bigint,
       min_amount_out_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  get_pool_count(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, bigint>;
  get_pool_info(context: __compactRuntime.CircuitContext<T>, pool_id_0: bigint): __compactRuntime.CircuitResults<T, { token0: bigint,
                                                                                                                      token1: bigint,
                                                                                                                      reserve0: bigint,
                                                                                                                      reserve1: bigint,
                                                                                                                      creator: bigint,
                                                                                                                      total_shares: bigint,
                                                                                                                      requires_verification: boolean,
                                                                                                                      fee: bigint
                                                                                                                    }>;
  get_user_shares(context: __compactRuntime.CircuitContext<T>,
                  pool_id_0: bigint,
                  user_address_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  initialize(context: __compactRuntime.CircuitContext<T>,
             registry_address_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  create_pool(context: __compactRuntime.CircuitContext<T>,
              token0_0: bigint,
              token1_0: bigint,
              initial_reserve0_0: bigint,
              initial_reserve1_0: bigint,
              requires_verification_0: boolean,
              fee_bps_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  swap(context: __compactRuntime.CircuitContext<T>,
       pool_id_0: bigint,
       token_in_0: bigint,
       amount_in_0: bigint,
       min_amount_out_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  get_pool_count(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, bigint>;
  get_pool_info(context: __compactRuntime.CircuitContext<T>, pool_id_0: bigint): __compactRuntime.CircuitResults<T, { token0: bigint,
                                                                                                                      token1: bigint,
                                                                                                                      reserve0: bigint,
                                                                                                                      reserve1: bigint,
                                                                                                                      creator: bigint,
                                                                                                                      total_shares: bigint,
                                                                                                                      requires_verification: boolean,
                                                                                                                      fee: bigint
                                                                                                                    }>;
  get_user_shares(context: __compactRuntime.CircuitContext<T>,
                  pool_id_0: bigint,
                  user_address_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
  initialize(context: __compactRuntime.CircuitContext<T>,
             registry_address_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  pools: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { token0: bigint,
                             token1: bigint,
                             reserve0: bigint,
                             reserve1: bigint,
                             creator: bigint,
                             total_shares: bigint,
                             requires_verification: boolean,
                             fee: bigint
                           };
    [Symbol.iterator](): Iterator<[bigint, { token0: bigint,
  token1: bigint,
  reserve0: bigint,
  reserve1: bigint,
  creator: bigint,
  total_shares: bigint,
  requires_verification: boolean,
  fee: bigint
}]>
  };
  userShares: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  readonly poolCount: bigint;
  readonly signatureRegistryAddress: bigint;
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
