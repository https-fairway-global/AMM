Midnight JS API
Midnight.js API Reference v0.2.5 • Readme | API

Midnight.js
Midnight.js is a Typescript-based application development framework for the Midnight blockchain. Analogous to Web3.js for Ethereum, or polkadot.js for Polkadot, it contains utilities for:

Creating and submitting transactions
Interacting with wallets
Querying for block and state information
Subscribing to chain events
Due to the privacy-preservation properties of the Midnight system, Midnight.js also contains a number of utilities that are unique to it:

Executing smart contracts locally
Incorporating private state into contract execution
Persisting, querying, and updating private state
Creating and verifying zero-knowledge proofs
Package structure
types - Contains types and interfaces common to all other packages.
contracts - Contains utilities for interacting with Midnight smart contracts.
indexer-public-data-provider - Contains a cross-environment implementation of a Midnight indexer client.
node-zk-config-provider - Contains a file system based Node.js utility for retrieving zero-knowledge artifacts.
fetch-zk-config-provider - Contains a fetch based cross-environment utility for retrieving zero-knowledge artifacts.
network-id - Contains utilities for setting the network id used by ledger, zswap, and compact-runtime dependencies.
http-client-proof-provider - Contains a cross-environment implementation of a proof-server client.
level-private-state-provider - Contains a cross-environment implementation of a persistent private state store based on Level.


midnight-js-contracts
@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts

@midnight-ntwrk/midnight-js-contracts
Classes
CallTxFailedError
ContractTypeError
DeployTxFailedError
InsertVerifierKeyTxFailedError
RemoveVerifierKeyTxFailedError
ReplaceMaintenanceAuthorityTxFailedError
TxFailedError
Interfaces
Contract
Type Aliases
CallOptions
CallOptionsBase
CallOptionsBaseWithArguments
CallResult
CallResultPrivate
CallResultPublic
CallTxOptions
CircuitCallTxInterface
CircuitMaintenanceTxInterface
CircuitMaintenanceTxInterfaces
CircuitParameters
CircuitReturnType
ContractMaintenanceTxInterface
ContractStates
DeployContractOptions
DeployTxOptions
DeployTxOptionsBase
DeployTxOptionsBaseWithArguments
DeployedContract
FinalizedCallTxData
FinalizedDeployTxData
FinalizedDeployTxDataBase
FindDeployedContractOptions
FoundContract
ImpureCircuit
ImpureCircuitId
ImpureCircuits
InitialStateParameters
PartitionedTranscript
SubmitTxOptions
UnsubmittedCallTxData
UnsubmittedDeployTxData
UnsubmittedDeployTxDataBase
UnsubmittedDeployTxPrivateDataBase
UnsubmittedDeployTxPublicDataBase
UnsubmittedTxData
Witness
Witnesses
Functions
call
createCallTxOptions
createCircuitCallTxInterface
createCircuitMaintenanceTxInterface
createCircuitMaintenanceTxInterfaces
createContractMaintenanceTxInterface
createUnprovenCallTx
createUnprovenCallTxFromInitialStates
createUnprovenDeployTx
createUnprovenDeployTxFromVerifierKeys
deployContract
findDeployedContract
getImpureCircuitIds
getStates
submitCallTx
submitInsertVerifierKeyTx
submitRemoveVerifierKeyTx
submitReplaceAuthorityTx
submitTx
verifierKeysEqual
verifyContractState

## Classes

@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / CallTxFailedError

Class: CallTxFailedError
An error indicating that a call transaction was not successfully applied by the consensus node.

Extends
TxFailedError
Constructors
new CallTxFailedError(finalizedTxData, circuitId)
new CallTxFailedError(finalizedTxData, circuitId): CallTxFailedError

Parameters
• finalizedTxData: FinalizedTxData

The finalization data of the call transaction that failed.

• circuitId: string

The name of the circuit that was called to build the transaction.

Returns
CallTxFailedError

Overrides
TxFailedError.constructor

Properties
circuitId?
optional readonly circuitId: string

The name of the circuit that was called to create the call transaction that failed. Only defined if a call transaction failed.

Inherited from
TxFailedError.circuitId

finalizedTxData
readonly finalizedTxData: FinalizedTxData

The finalization data of the transaction that failed.

Inherited from
TxFailedError.finalizedTxData

@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / ContractTypeError

Class: ContractTypeError
The error that is thrown when there is a contract type mismatch between a given contract type, and the initial state that is deployed at a given contract address.

Remarks
This error is typically thrown during calls to findDeployedContract where the supplied contract address represents a different type of contract to the contract type given.

Extends
TypeError
Constructors
new ContractTypeError(contractState, circuitIds)
new ContractTypeError(contractState, circuitIds): ContractTypeError

Initializes a new ContractTypeError.

Parameters
• contractState: ContractState

The initial deployed contract state.

• circuitIds: string[]

The circuits that are undefined, or have a verifier key mismatch with the key present in contractState.

Returns
ContractTypeError

Overrides
TypeError.constructor

Properties
circuitIds
readonly circuitIds: string[]

The circuits that are undefined, or have a verifier key mismatch with the key present in contractState.

contractState
readonly contractState: ContractState

The initial deployed contract state.


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / DeployTxFailedError

Class: DeployTxFailedError
An error indicating that a deploy transaction was not successfully applied by the consensus node.

Extends
TxFailedError
Constructors
new DeployTxFailedError(finalizedTxData)
new DeployTxFailedError(finalizedTxData): DeployTxFailedError

Parameters
• finalizedTxData: FinalizedTxData

The finalization data of the deployment transaction that failed.

Returns
DeployTxFailedError

Overrides
TxFailedError.constructor

Properties
circuitId?
optional readonly circuitId: string

The name of the circuit that was called to create the call transaction that failed. Only defined if a call transaction failed.

Inherited from
TxFailedError.circuitId

finalizedTxData
readonly finalizedTxData: FinalizedTxData

The finalization data of the transaction that failed.

Inherited from
TxFailedError.finalizedTxData


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / InsertVerifierKeyTxFailedError

Class: InsertVerifierKeyTxFailedError
An error indicating that a verifier key insertion transaction failed.

Extends
TxFailedError
Constructors
new InsertVerifierKeyTxFailedError(finalizedTxData)
new InsertVerifierKeyTxFailedError(finalizedTxData): InsertVerifierKeyTxFailedError

Parameters
• finalizedTxData: FinalizedTxData

Returns
InsertVerifierKeyTxFailedError

Overrides
TxFailedError.constructor

Properties
circuitId?
optional readonly circuitId: string

The name of the circuit that was called to create the call transaction that failed. Only defined if a call transaction failed.

Inherited from
TxFailedError.circuitId

finalizedTxData
readonly finalizedTxData: FinalizedTxData

The finalization data of the transaction that failed.

Inherited from
TxFailedError.finalizedTxData


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / RemoveVerifierKeyTxFailedError

Class: RemoveVerifierKeyTxFailedError
An error indicating that a verifier key removal transaction failed.

Extends
TxFailedError
Constructors
new RemoveVerifierKeyTxFailedError(finalizedTxData)
new RemoveVerifierKeyTxFailedError(finalizedTxData): RemoveVerifierKeyTxFailedError

Parameters
• finalizedTxData: FinalizedTxData

Returns
RemoveVerifierKeyTxFailedError

Overrides
TxFailedError.constructor

Properties
circuitId?
optional readonly circuitId: string

The name of the circuit that was called to create the call transaction that failed. Only defined if a call transaction failed.

Inherited from
TxFailedError.circuitId

finalizedTxData
readonly finalizedTxData: FinalizedTxData

The finalization data of the transaction that failed.

Inherited from
TxFailedError.finalizedTxData


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / ReplaceMaintenanceAuthorityTxFailedError

Class: ReplaceMaintenanceAuthorityTxFailedError
An error indicating that a contract maintenance authority replacement transaction failed.

Extends
TxFailedError
Constructors
new ReplaceMaintenanceAuthorityTxFailedError(finalizedTxData)
new ReplaceMaintenanceAuthorityTxFailedError(finalizedTxData): ReplaceMaintenanceAuthorityTxFailedError

Parameters
• finalizedTxData: FinalizedTxData

Returns
ReplaceMaintenanceAuthorityTxFailedError

Overrides
TxFailedError.constructor

Properties
circuitId?
optional readonly circuitId: string

The name of the circuit that was called to create the call transaction that failed. Only defined if a call transaction failed.

Inherited from
TxFailedError.circuitId

finalizedTxData
readonly finalizedTxData: FinalizedTxData

The finalization data of the transaction that failed.

Inherited from
TxFailedError.finalizedTxData


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / TxFailedError

Class: TxFailedError
An error indicating that a transaction submitted to a consensus node failed.

Extends
Error
Constructors
new TxFailedError(finalizedTxData, circuitId)
new TxFailedError(finalizedTxData, circuitId?): TxFailedError

Parameters
• finalizedTxData: FinalizedTxData

The finalization data of the transaction that failed.

• circuitId?: string

The name of the circuit that was called to create the call transaction that failed. Only defined if a call transaction failed.

Returns
TxFailedError

Overrides
Error.constructor

Properties
circuitId?
optional readonly circuitId: string

The name of the circuit that was called to create the call transaction that failed. Only defined if a call transaction failed.

finalizedTxData
readonly finalizedTxData: FinalizedTxData

The finalization data of the transaction that failed.


## Functions 

@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / createCircuitCallTxInterface

Function: createCircuitCallTxInterface()
createCircuitCallTxInterface<PSS, PSK, C>(providers, contract, contractAddress, privateStateKey): CircuitCallTxInterface<PSS[PSK], C>

Creates a circuit call transaction interface for a contract.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

• C extends Contract<PSS[PSK], Witnesses<PSS[PSK]>>

Parameters
• providers: MidnightProviders<ImpureCircuitId<C>, PSS>

The providers to use to build transactions.

• contract: C

The contract to use to execute circuits.

• contractAddress: string

The ledger address of the contract.

• privateStateKey: PSK

The address of the state of the witnesses of the contract.

Returns
CircuitCallTxInterface<PSS[PSK], C>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / createUnprovenCallTx

Function: createUnprovenCallTx()
createUnprovenCallTx<PSS, PSK, C, ICK>(publicDataProvider, privateStateProvider, walletProvider, options): Promise<UnsubmittedCallTxData<PSS[PSK], C, ICK>>

Calls a circuit using states fetched from the public data provider and private state provider, then creates an unbalanced, unproven, unsubmitted, call transaction.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

• C extends Contract<PSS[PSK], Witnesses<PSS[PSK]>>

• ICK extends string

Parameters
• publicDataProvider: PublicDataProvider

The provider to use to fetch the contract ledger and Zswap chain states.

• privateStateProvider: PrivateStateProvider<PSS>

The provider to use to fetch the contract private state.

• walletProvider: WalletProvider

The provider to use to fetch the current user's Zswap coin public key.

• options: CallTxOptions<PSS, PSK, C, ICK>

Configuration.

Returns
Promise<UnsubmittedCallTxData<PSS[PSK], C, ICK>>

A promise that contains all data produced by the circuit call and an unproven transaction assembled from the call result.



@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / createUnprovenCallTxFromInitialStates

Function: createUnprovenCallTxFromInitialStates()
createUnprovenCallTxFromInitialStates<PS, C, ICK>(initialZswapChainState, options): Promise<UnsubmittedCallTxData<PS, C, ICK>>

Calls a circuit using the provided initial states and creates an unbalanced, unproven, unsubmitted, call transaction.

Type parameters
• PS

• C extends Contract<PS, Witnesses<PS>>

• ICK extends string

Parameters
• initialZswapChainState: ZswapChainState

The contract's initial Zswap chain state.

• options: CallOptions<PS, C, ICK>

Configuration.

Returns
Promise<UnsubmittedCallTxData<PS, C, ICK>>

A promise that contains all data produced by the circuit call and an unproven transaction assembled from the call result.



@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / createUnprovenDeployTx

Function: createUnprovenDeployTx()
createUnprovenDeployTx<PS, C>(zkConfigProvider, walletProvider, options): Promise<UnsubmittedDeployTxData<PS>>

Calls a contract constructor and creates an unbalanced, unproven, unsubmitted, deploy transaction from the constructor results.

Type parameters
• PS

• C extends Contract<PS, Witnesses<PS>>

Parameters
• zkConfigProvider: ZKConfigProvider<ImpureCircuitId<C>>

The provider to use to fetch ZK artifacts.

• walletProvider: WalletProvider

The provider to use to get the current user's Zswap coin public key.

• options: DeployTxOptions<PS, C>

Configuration.

Returns
Promise<UnsubmittedDeployTxData<PS>>

A promise that contains all data produced by the constructor call and an unproven transaction assembled from the constructor result.



@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / createUnprovenDeployTxFromVerifierKeys

Function: createUnprovenDeployTxFromVerifierKeys()
createUnprovenDeployTxFromVerifierKeys<PS, C>(verifierKeys, coinPublicKey, options): Promise<UnsubmittedDeployTxData<PS>>

Calls a contract constructor and creates an unbalanced, unproven, unsubmitted, deploy transaction from the constructor results.

Type parameters
• PS

• C extends Contract<PS, Witnesses<PS>>

Parameters
• verifierKeys: [ImpureCircuitId<C>, VerifierKey][]

The verifier keys for the contract being deployed.

• coinPublicKey: string

The Zswap coin public key of the current user.

• options: DeployTxOptions<PS, C>

Configuration.

Returns
Promise<UnsubmittedDeployTxData<PS>>

A promise that contains all data produced by the contract constructor call and an unproven deployment transaction assembled from the contract constructor result.


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / deployContract

Function: deployContract()
deployContract<PSS, PSK, C>(providers, options): Promise<DeployedContract<PSS[PSK], C>>

Creates and submits a contract deployment transaction. This function is the entry point for the transaction construction workflow and is used to create a DeployedContract instance.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

• C extends Contract<PSS[PSK], Witnesses<PSS[PSK]>>

Parameters
• providers: MidnightProviders<ImpureCircuitId<C>, PSS>

The providers used to manage the transaction lifecycle.

• options: DeployContractOptions<PSS, PSK, C>

Configuration.

Returns
Promise<DeployedContract<PSS[PSK], C>>

Throws
DeployTxFailedError If the transaction is submitted successfully but produces an error when executed by the node.


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / findDeployedContract

Function: findDeployedContract()
findDeployedContract<PSS, PSK, C>(providers, options): Promise<FoundContract<PSS[PSK], C>>

Creates an instance of FoundContract given the address of a deployed contract and the private address with an existing private state. The current value at the private address is used as the initialPrivateState value in the finalizedDeployTxData property of the returned FoundContract.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

• C extends Contract<PSS[PSK], Witnesses<PSS[PSK]>>

Parameters
• providers: MidnightProviders<ImpureCircuitId<C>, PSS>

The providers used to manage the transaction lifecycle.

• options: FindDeployedContractOptions<PSS, PSK, C>

Configuration.

Returns
Promise<FoundContract<PSS[PSK], C>>

Throws
Error No contract state could be found at contractAddress.

Throws
TypeError Thrown if contractAddress is not correctly formatted as a contract address.

Throws
ContractTypeError One or more circuits defined on contract are undefined on the contract state found at contractAddress, or have mis-matched verifier keys.


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / getImpureCircuitIds

Function: getImpureCircuitIds()
getImpureCircuitIds<C>(contract): ImpureCircuitId<C>[]

Typesafe version of Object.keys(contract.impureCircuits).

Type parameters
• C extends Contract<any, Witnesses<any>>

The contract type for which we would like impure circuit IDs.

Parameters
• contract: C

The contract having impure circuits for which we want ids.

Returns
ImpureCircuitId<C>[]




@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / getStates

Function: getStates()
getStates<PSS, PSK>(publicDataProvider, privateStateProvider, contractAddress, privateStateKey): Promise<ContractStates<PSS[PSK]>>

Retrieves the Zswap, ledger, and private states of the contract corresponding to the given identifier using the given providers.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

Parameters
• publicDataProvider: PublicDataProvider

The provider to use to fetch the public states (Zswap and ledger).

• privateStateProvider: PrivateStateProvider<PSS>

The provider to use to fetch the private state.

• contractAddress: string

The ledger address of the contract.

• privateStateKey: PSK

The identifier for the private state of the contract.

Returns
Promise<ContractStates<PSS[PSK]>>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / submitCallTx

Function: submitCallTx()
submitCallTx<PSS, PSK, C, ICKS, ICK>(providers, options): Promise<FinalizedCallTxData<PSS[PSK], C, ICK>>

Creates and submits a transaction for the invocation of a circuit on a given contract.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

• C extends Contract<PSS[PSK], Witnesses<PSS[PSK]>>

• ICKS extends string

• ICK extends string

Parameters
• providers: MidnightProviders<ICKS, PSS>

The providers used to manage the invocation lifecycle.

• options: CallTxOptions<PSS, PSK, C, ICK>

Configuration.

Returns
Promise<FinalizedCallTxData<PSS[PSK], C, ICK>>

A Promise that resolves with the finalized transaction data for the invocation of circuitId on contract with the given args; or rejects with an error if the invocation fails.


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / submitInsertVerifierKeyTx

Function: submitInsertVerifierKeyTx()
submitInsertVerifierKeyTx<PSS, PSK>(providers, privateStateKey, contractAddress, circuitId, newVk): Promise<FinalizedTxData>

Constructs and submits a transaction that adds a new verifier key to the blockchain for the given circuit ID at the given contract address.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

Parameters
• providers: MidnightProviders<string, PrivateStateSchema>

The providers to use to manage the transaction lifecycle.

• privateStateKey: PSK

The private state key for the contract.

• contractAddress: string

The address of the contract containing the circuit for which the verifier key should be inserted.

• circuitId: string

The circuit for which the verifier key should be inserted.

• newVk: VerifierKey

The new verifier key for the circuit.

Returns
Promise<FinalizedTxData>

A promise that resolves with the finalized transaction data, or rejects if an error occurs along the way.

TODO: We'll likely want to modify ZKConfigProvider provider so that the verifier keys are automatically rotated in this function. This likely involves storing key versions along with keys in ZKConfigProvider. By default, artifacts for the latest version would be fetched to build transactions.

Previous
submitCallTx


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / submitRemoveVerifierKeyTx

Function: submitRemoveVerifierKeyTx()
submitRemoveVerifierKeyTx<PSS, PSK>(providers, privateStateKey, contractAddress, circuitId): Promise<FinalizedTxData>

Constructs and submits a transaction that removes the current verifier key stored on the blockchain for the given circuit ID at the given contract address.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

Parameters
• providers: MidnightProviders<string, PrivateStateSchema>

The providers to use to manage the transaction lifecycle.

• privateStateKey: PSK

The private state key for the contract.

• contractAddress: string

The address of the contract containing the circuit for which the verifier key should be removed.

• circuitId: string

The circuit for which the verifier key should be removed.

Returns
Promise<FinalizedTxData>

A promise that resolves with the finalized transaction data, or rejects if an error occurs along the way.

TODO: We'll likely want to modify ZKConfigProvider provider so that the verifier keys are automatically rotated in this function. This likely involves storing key versions along with keys in ZKConfigProvider. By default, artifacts for the latest version would be fetched to build transactions.


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / submitReplaceAuthorityTx

Function: submitReplaceAuthorityTx()
submitReplaceAuthorityTx<PSS, PSK>(providers, privateStateKey, contractAddress): (newAuthority) => Promise<FinalizedTxData>

Constructs and submits a transaction that replaces the maintenance authority stored on the blockchain for this contract. After the transaction is finalized, the current signing key stored in the given private state provider is overwritten with the given new authority key.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends string

Parameters
• providers: MidnightProviders<string, PrivateStateSchema>

The providers to use to manage the transaction lifecycle.

• privateStateKey: PSK

THe key at which the contract being update has its state stored.

• contractAddress: string

The address of the contract for which the maintenance authority should be updated.

TODO: There are at least three options we should support in the future:

Replace authority and maintain key (current).
Replace authority and do not maintain key.
Add additional authorities and maintain original key.
Returns
Function

Parameters
• newAuthority: string

The signing key of the new contract maintenance authority.

Returns
Promise<FinalizedTxData>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / submitTx

Function: submitTx()
submitTx<C, ICK>(providers, options): Promise<FinalizedTxData>

Proves, balances, and submits an unproven deployment or call transaction using the given providers, according to the given options.

Type parameters
• C extends Contract<any, Witnesses<any>>

• ICK extends string

Parameters
• providers: MidnightProviders<ICK, PrivateStateSchema>

The providers used to manage the transaction lifecycle.

• options: SubmitTxOptions<ICK>

Configuration.

Returns
Promise<FinalizedTxData>

A promise that resolves with the finalized transaction data for the invocation, or rejects if an error occurs along the way.



@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / verifierKeysEqual

Function: verifierKeysEqual()
verifierKeysEqual(a, b): boolean

Checks that two verifier keys are equal. Does initial length check match for efficiency.

Parameters
• a: Uint8Array

First verifier key.

• b: Uint8Array

Second verifier key.

Returns
boolean


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / verifyContractState

Function: verifyContractState()
verifyContractState(verifierKeys, contractState): void

Checks that the given contractState contains the given verifierKeys.

Parameters
• verifierKeys: [string, VerifierKey][]

The verifier keys the client has for the deployed contract we're checking.

• contractState: ContractState

The (typically already deployed) contract state containing verifier keys.

Returns
void

Throws
ContractTypeError When one or more of the local and deployed verifier keys do not match.


## Interfaces

@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / Contract

Interface: Contract<PS, W>
Interface for a contract. The data types defined in this file are generic shapes for the artifacts produced by the compactc compiler. In other words, this Contract interface should match the shape of any Contract class produced by compactc. Midnight.js uses it for generic constraints.

Type parameters
• PS = any

The private state modified by the contract witnesses.

• W extends Witnesses<PS> = Witnesses<PS>

The contract witnesses type.

Properties
impureCircuits
readonly impureCircuits: ImpureCircuits<PS>

The impure circuits defined in a contract. These circuits can be used to create call transactions.

witnesses
readonly witnesses: W

The private oracle of the contract.

Methods
initialState()
initialState(context, ...args): ConstructorResult<PS>

Constructs the initial public state of the public oracle of a contract. This is used during deployment transaction construction.

Parameters
• context: ConstructorContext<PS>

• ...args: any[]

Returns
ConstructorResult<PS>


## Type Aliases

@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / CircuitCallTxInterface

Type alias: CircuitCallTxInterface<PS, C>
CircuitCallTxInterface<PS, C>: { [ICK in ImpureCircuitId<C>]: Function }

A type that lifts each circuit defined in a contract to a function that builds and submits a call transaction.

Type parameters
• PS

• C extends Contract<PS>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / CircuitMaintenanceTxInterface

Type alias: CircuitMaintenanceTxInterface
CircuitMaintenanceTxInterface: Object

An interface for creating maintenance transactions for a specific circuit defined in a given contract.

Type declaration
insertVerifierKey()
Constructs and submits a transaction that adds a new verifier key to the blockchain for this circuit at this contract's address.

Parameters
• newVk: VerifierKey

The new verifier key to add for this circuit.

Returns
Promise<FinalizedTxData>

removeVerifierKey()
Constructs and submits a transaction that removes the current verifier key stored on the blockchain for this circuit at this contract's address.

Returns
Promise<FinalizedTxData>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / CircuitMaintenanceTxInterfaces

Type alias: CircuitMaintenanceTxInterfaces<C>
CircuitMaintenanceTxInterfaces<C>: { [ICK in ImpureCircuitId<C>]: CircuitMaintenanceTxInterface }

A set of maintenance transaction creation interfaces, one for each circuit defined in a given contract, keyed by the circuit name.

Type parameters
• C extends Contract


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / CircuitParameters

Type alias: CircuitParameters<C, K>
CircuitParameters<C, K>: Parameters<C["impureCircuits"][K]> extends [CircuitContext<any>, ...(infer A)] ? A : never

The parameter types of the circuits in a contract.

Type parameters
• C extends Contract

• K extends ImpureCircuitId<C>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / CircuitReturnType

Type alias: CircuitReturnType<C, K>
CircuitReturnType<C, K>: ReturnType<C["impureCircuits"][K]> extends CircuitResults<any, infer U> ? U : never

The return types of the circuits in a contract.

Type parameters
• C extends Contract

• K extends ImpureCircuitId<C>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / ContractMaintenanceTxInterface

Type alias: ContractMaintenanceTxInterface
ContractMaintenanceTxInterface: Object

Interface for creating maintenance transactions for a contract that was deployed.

Type declaration
replaceAuthority()
Constructs and submits a transaction that replaces the maintenance authority stored on the blockchain for this contract.

Parameters
• newAuthority: string

The new contract maintenance authority for this contract.

Returns
Promise<FinalizedTxData>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / ContractStates

Type alias: ContractStates<PS>
ContractStates<PS>: Object

General object holding states for particular contract.

Type parameters
• PS

Type declaration
contractState
readonly contractState: ContractState

The (public) ledger state of a contract.

privateState
readonly privateState: PS

The private state of a contract.

zswapChainState
readonly zswapChainState: ZswapChainState

The (public) Zswap chain state of a contract.


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / DeployContractOptions

Type alias: DeployContractOptions<PSS, PSK, C>
DeployContractOptions<PSS, PSK, C>: DeployTxOptionsBaseWithArguments<PSS[PSK], C> & Object

Configuration for deployContract.

Type declaration
privateStateKey
readonly privateStateKey: PSK

An identifier for the private state of the contract being deployed.

signingKey?
optional readonly signingKey: SigningKey

The signing key to add as the to-be-deployed contract's maintenance authority. If undefined, a new signing key is sampled and used as the CMA then stored in the private state provider under the newly deployed contract's address. Otherwise, the passed signing key is added as the CMA. The second case is useful when you want to use the same CMA for two different contracts.

Type parameters
• PSS extends PrivateStateSchema

• PSK extends PrivateStateKey<PSS>

• C extends Contract<PSS[PSK]>


@midnight-ntwrk/midnight-js-contracts v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-contracts / DeployTxOptions

Type alias: DeployTxOptions<PS, C>
DeployTxOptions<PS, C>: DeployTxOptionsBaseWithArguments<PS, C> & Object

Complete deployment transaction configuration.

Type declaration
signingKey
readonly signingKey: SigningKey

The signing key to add as the to-be-deployed contract's maintenance authority.

Type parameters
• PS

• C extends Contract<PS>