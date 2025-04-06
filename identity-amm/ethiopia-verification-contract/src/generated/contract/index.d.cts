import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<T> = {
  parse_fayda_credential(context: __compactRuntime.WitnessContext<Ledger, T>,
                         credential_json_0: string): [T, { id: bigint,
                                                           issuer: bigint,
                                                           issuance_date: bigint,
                                                           valid_until: bigint,
                                                           subject_id: bigint,
                                                           citizenship: bigint,
                                                           region: bigint,
                                                           signature: bigint[]
                                                         }];
  user_secret_key(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
  current_time(context: __compactRuntime.WitnessContext<Ledger, T>): [T, bigint];
}

export type ImpureCircuits<T> = {
  register_verification(context: __compactRuntime.CircuitContext<T>,
                        credential_json_0: string): __compactRuntime.CircuitResults<T, []>;
  is_user_verified(context: __compactRuntime.CircuitContext<T>,
                   user_address_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  get_verification_expiration(context: __compactRuntime.CircuitContext<T>,
                              user_address_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  register_verification(context: __compactRuntime.CircuitContext<T>,
                        credential_json_0: string): __compactRuntime.CircuitResults<T, []>;
  is_user_verified(context: __compactRuntime.CircuitContext<T>,
                   user_address_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  get_verification_expiration(context: __compactRuntime.CircuitContext<T>,
                              user_address_0: bigint): __compactRuntime.CircuitResults<T, bigint>;
}

export type Ledger = {
  verifiedUsers: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
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
