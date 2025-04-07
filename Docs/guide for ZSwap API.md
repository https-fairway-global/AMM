ZSwap API
@midnight/zswap v3.0.2 • Readme | API

Zswap TypeScript API
This document outlines the usage of the Zswap TS API

Network ID
Prior to any interaction, setNetworkId should be used to set the NetworkId to target the correct network.

Proof stages
Most transaction components will be in one of three stages: X, UnprovenX, or ProofErasedX. The UnprovenX stage is always the first one. It is possible to transition to the X stage by proving an UnprovenTransaction through the proof server. For testing, and where proofs aren't necessary, the ProofErasedX stage is used, which can be reached via eraseProof[s] from the other two stages.

Transaction structure
A Transaction runs in two phases: a guaranteed phase, handling fee payments and fast-to-verify operations, and a fallible phase, handling operations which may fail atomically, separately from the guaranteed phase. It therefore contains:

A "guaranteed" Offer
Optionally, a "fallible" Offer
Contract call information not accessible to this API
It also contains additional cryptographic glue that will be omitted in this document.

Zswap
A Zswap Offer consists of:

A set of Inputs, burning coins.
A set of Outputs, creating coins.
A set of Transients, indicating a coin that is created and burnt in the same transaction.
A mapping from TokenTypes to offer balance, positive when there are more inputs than outputs and vice versa.
Inputs can be created either from a QualifiedCoinInfo and a contract address, if the coin is contract-owned, or from a QualifiedCoinInfo and a ZswapLocalState, if it is user-owned. Similarly, Outputs can be created from a CoinInfo and a contract address for contract-owned coins, or from a CoinInfo and a user's public key(s), if it is user-owned. A Transient is created similarly to a Input, but directly converts an existing Output.

A QualifiedCoinInfo is a CoinInfo with an index into the Merkle tree of coin commitments that can be used to find the relevant coin to spend, while a CoinInfo consists of a coins TokenType, value, and a nonce.

State Structure
ZswapChainState holds the on-chain state of Zswap, while ZswaplocalState contains the local, wallet state.

## Classes

@midnight/zswap v3.0.2 / AuthorizedMint

Class: AuthorizedMint
A request to mint a coin, authorized by the mint's recipient

Constructors
new AuthorizedMint()
private new AuthorizedMint(): AuthorizedMint

Returns
AuthorizedMint

Properties
coin
readonly coin: CoinInfo;

The coin to be minted

recipient
readonly recipient: string;

The recipient of this mint

Methods
erase_proof()
erase_proof(): ProofErasedAuthorizedMint

Returns
ProofErasedAuthorizedMint

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): AuthorizedMint

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
AuthorizedMint

@midnight/zswap v3.0.2 / EncryptionSecretKey

Class: EncryptionSecretKey
Holds the encryption secret key of a user, which may be used to determine if a given offer contains outputs addressed to this user

Constructors
new EncryptionSecretKey()
private new EncryptionSecretKey(): EncryptionSecretKey

Returns
EncryptionSecretKey

Methods
test()
test(offer): boolean

Parameters
• offer: Offer

Returns
boolean

yesIKnowTheSecurityImplicationsOfThis_serialize()
yesIKnowTheSecurityImplicationsOfThis_serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

deserialize()
static deserialize(raw, netid): EncryptionSecretKey

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
EncryptionSecretKey

@midnight/zswap v3.0.2 / Input

Class: Input
A shielded transaction input

Constructors
new Input()
private new Input(): Input

Returns
Input

Properties
contractAddress
readonly contractAddress: undefined | string;

The contract address receiving the input, if the sender is a contract

nullifier
readonly nullifier: string;

The nullifier of the input

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): Input

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
Input

@midnight/zswap v3.0.2 / LocalState

Class: LocalState
The local state of a user/wallet, consisting of their secret key, and a set of unspent coins.

It also keeps track of coins that are in-flight, either expecting to spend or expecting to receive, and a local copy of the global coin commitment Merkle tree to generate proofs against.

Constructors
new LocalState()
new LocalState(): LocalState

Creates a new state with a randomly sampled secret key

Returns
LocalState

Properties
coinPublicKey
readonly coinPublicKey: string;

The coin public key of this wallet

coins
readonly coins: Set<QualifiedCoinInfo>;

The set of spendable coins of this wallet

encryptionPublicKey
readonly encryptionPublicKey: string;

The encryption public key of this wallet

firstFree
readonly firstFree: bigint;

The first free index in the internal coin commitments Merkle tree. This may be used to identify which merkle tree updates are necessary.

pendingOutputs
readonly pendingOutputs: Map<string, CoinInfo>;

The outputs that this wallet is expecting to receive in the future

pendingSpends
readonly pendingSpends: Map<string, QualifiedCoinInfo>;

The spends that this wallet is expecting to be finalized on-chain in the future

Methods
apply()
apply(offer): LocalState

Locally applies an offer to the current state, returning the updated state

Parameters
• offer: Offer

Returns
LocalState

applyCollapsedUpdate()
applyCollapsedUpdate(update): LocalState

Applies a collapsed Merkle tree update to the current local state, fast forwarding through the indices included in it, if it is a correct update.

The general flow for usage if Alice is in state A, and wants to ask Bob how to reach the new state B, is:

Find where she left off – what's her firstFree?
Find out where she's going – ask for Bob's firstFree.
Find what contents she does care about – ask Bob for the filtered entries she want to include proper in her tree.
In order, of Merkle tree indicies:
Insert (with apply offers Alice cares about).
Skip (with this method) sections Alice does not care about, obtaining the collapsed update covering the gap from Bob. Note that firstFree is not included in the tree itself, and both ends of updates are included.
Parameters
• update: MerkleTreeCollapsedUpdate

Returns
LocalState

applyFailed()
applyFailed(offer): LocalState

Locally marks an offer as failed, allowing inputs used in it to be spendable once more.

Parameters
• offer: Offer

Returns
LocalState

applyFailedProofErased()
applyFailedProofErased(offer): LocalState

Locally marks an proof-erased offer as failed, allowing inputs used in it to be spendable once more.

Parameters
• offer: ProofErasedOffer

Returns
LocalState

applyProofErased()
applyProofErased(offer): LocalState

Locally applies a proof-erased offer to the current state, returning the updated state

Parameters
• offer: ProofErasedOffer

Returns
LocalState

applyProofErasedTx()
applyProofErasedTx(tx, res): LocalState

Locally applies a proof-erased transaction to the current state, returning the updated state

Parameters
• tx: ProofErasedTransaction

• res: "success" | "partialSuccess" | "failure"

The result type of applying this transaction against the ledger state

Returns
LocalState

applySystemTx()
applySystemTx(tx): LocalState

Locally applies a system transaction to the current state, returning the updated state

Parameters
• tx: SystemTransaction

Returns
LocalState

applyTx()
applyTx(tx, res): LocalState

Locally applies a transaction to the current state, returning the updated state

Parameters
• tx: Transaction

• res: "success" | "partialSuccess" | "failure"

The result type of applying this transaction against the ledger state

Returns
LocalState

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

spend()
spend(coin): [LocalState, UnprovenInput]

Initiates a new spend of a specific coin, outputting the corresponding UnprovenInput, and the updated state marking this coin as in-flight.

Parameters
• coin: QualifiedCoinInfo

Returns
[LocalState, UnprovenInput]

spendFromOutput()
spendFromOutput(coin, output): [LocalState, UnprovenTransient]

Initiates a new spend of a new-yet-received output, outputting the corresponding UnprovenTransient, and the updated state marking this coin as in-flight.

Parameters
• coin: QualifiedCoinInfo

• output: UnprovenOutput

Returns
[LocalState, UnprovenTransient]

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

watchFor()
watchFor(coin): LocalState

Adds a coin to the list of coins that are expected to be received

This should be used if an output is creating a coin for this wallet, which does not contain a ciphertext to detect it. In this case, the wallet must know the commitment ahead of time to notice the receipt.

Parameters
• coin: CoinInfo

Returns
LocalState

yesIKnowTheSecurityImplicationsOfThis_encryptionSecretKey()
yesIKnowTheSecurityImplicationsOfThis_encryptionSecretKey(): EncryptionSecretKey

Returns
EncryptionSecretKey

deserialize()
static deserialize(raw, netid): LocalState

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
LocalState

fromSeed()
static fromSeed(seed): LocalState

Creates a new state from a predefined random seed (which can act as a recovery phrase)

Parameters
• seed: Uint8Array

Returns
LocalState


@midnight/zswap v3.0.2 / MerkleTreeCollapsedUpdate

Class: MerkleTreeCollapsedUpdate
A compact delta on the coin commitments Merkle tree, used to keep local spending trees in sync with the global state without requiring receiving all transactions.

Constructors
new MerkleTreeCollapsedUpdate(state, start, end)
new MerkleTreeCollapsedUpdate(
   state, 
   start, 
   end): MerkleTreeCollapsedUpdate

Create a new compact update from a non-compact state, and inclusive start and end indices

Parameters
• state: ZswapChainState

• start: bigint

• end: bigint

Returns
MerkleTreeCollapsedUpdate

Throws
If the indices are out-of-bounds for the state, or end < start

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): MerkleTreeCollapsedUpdate

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
MerkleTreeCollapsedUpdate


@midnight/zswap v3.0.2 / Offer

Class: Offer
A full Zswap offer; the zswap part of a transaction

Consists of sets of Inputs, Outputs, and Transients, as well as a deltas vector of the transaction value

Constructors
new Offer()
private new Offer(): Offer

Returns
Offer

Properties
deltas
readonly deltas: Map<string, bigint>;

The value of this offer for each token type; note that this may be negative

This is input coin values - output coin values, for value vectors

inputs
readonly inputs: Input[];

The inputs this offer is composed of

outputs
readonly outputs: Output[];

The outputs this offer is composed of

transient
readonly transient: Transient[];

The transients this offer is composed of

Methods
merge()
merge(other): Offer

Combine this offer with another

Parameters
• other: Offer

Returns
Offer

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): Offer

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
Offer

@midnight/zswap v3.0.2 / Output

Class: Output
A shielded transaction output

Constructors
new Output()
private new Output(): Output

Returns
Output

Properties
commitment
readonly commitment: string;

The commitment of the output

contractAddress
readonly contractAddress: undefined | string;

The contract address receiving the output, if the recipient is a contract

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): Output

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
Output

@midnight/zswap v3.0.2 • Readme | API

@midnight/zswap v3.0.2 / ProofErasedAuthorizedMint

Class: ProofErasedAuthorizedMint
A request to mint a coin, authorized by the mint's recipient, with the authorizing proof having been erased

Constructors
new ProofErasedAuthorizedMint()
private new ProofErasedAuthorizedMint(): ProofErasedAuthorizedMint

Returns
ProofErasedAuthorizedMint

Properties
coin
readonly coin: CoinInfo;

The coin to be minted

recipient
readonly recipient: string;

The recipient of this mint

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): ProofErasedAuthorizedMint

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ProofErasedAuthorizedMint

@midnight/zswap v3.0.2 / ProofErasedInput

Class: ProofErasedInput
A Input, with all proof information erased

Primarily for use in testing, or handling data known to be correct from external information

Constructors
new ProofErasedInput()
private new ProofErasedInput(): ProofErasedInput

Returns
ProofErasedInput

Properties
contractAddress
readonly contractAddress: undefined | string;

The contract address receiving the input, if the sender is a contract

nullifier
readonly nullifier: string;

The nullifier of the input

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): ProofErasedInput

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ProofErasedInput

@midnight/zswap v3.0.2 / ProofErasedOffer

Class: ProofErasedOffer
An Offer, with all proof information erased

Primarily for use in testing, or handling data known to be correct from external information

Constructors
new ProofErasedOffer()
private new ProofErasedOffer(): ProofErasedOffer

Returns
ProofErasedOffer

Properties
deltas
readonly deltas: Map<string, bigint>;

The value of this offer for each token type; note that this may be negative

This is input coin values - output coin values, for value vectors

inputs
readonly inputs: ProofErasedInput[];

The inputs this offer is composed of

outputs
readonly outputs: ProofErasedOutput[];

The outputs this offer is composed of

transient
readonly transient: ProofErasedTransient[];

The transients this offer is composed of

Methods
merge()
merge(other): ProofErasedOffer

Parameters
• other: ProofErasedOffer

Returns
ProofErasedOffer

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): ProofErasedOffer

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ProofErasedOffer


@midnight/zswap v3.0.2 / ProofErasedOutput

Class: ProofErasedOutput
An Output with all proof information erased

Primarily for use in testing, or handling data known to be correct from external information

Constructors
new ProofErasedOutput()
private new ProofErasedOutput(): ProofErasedOutput

Returns
ProofErasedOutput

Properties
commitment
readonly commitment: string;

The commitment of the output

contractAddress
readonly contractAddress: undefined | string;

The contract address receiving the output, if the recipient is a contract

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): ProofErasedOutput

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ProofErasedOutput


@midnight/zswap v3.0.2 / ProofErasedTransaction

Class: ProofErasedTransaction
Transaction, with all proof information erased

Primarily for use in testing, or handling data known to be correct from external information

Constructors
new ProofErasedTransaction()
private new ProofErasedTransaction(): ProofErasedTransaction

Returns
ProofErasedTransaction

Properties
fallibleCoins
readonly fallibleCoins: undefined | ProofErasedOffer;

The fallible Zswap offer

guaranteedCoins
readonly guaranteedCoins: undefined | ProofErasedOffer;

The guaranteed Zswap offer

mint
readonly mint: undefined | ProofErasedAuthorizedMint;

The mint this transaction represents, if applicable

Methods
fees()
fees(params): bigint

The cost of this transaction, in the atomic unit of the base token

Parameters
• params: LedgerParameters

Returns
bigint

identifiers()
identifiers(): string[]

Returns the set of identifiers contained within this transaction. Any of these may be used to watch for a specific transaction.

Returns
string[]

imbalances()
imbalances(guaranteed, fees?): Map<string, bigint>

For given fees, and a given section (guaranteed/fallible), what the surplus or deficit of this transaction in any token type is.

Parameters
• guaranteed: boolean

• fees?: bigint

Returns
Map<string, bigint>

merge()
merge(other): ProofErasedTransaction

Merges this transaction with another

Parameters
• other: ProofErasedTransaction

Returns
ProofErasedTransaction

Throws
If both transactions have contract interactions, or they spend the same coins

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): ProofErasedTransaction

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ProofErasedTransaction


@midnight/zswap v3.0.2 / ProofErasedTransient

Class: ProofErasedTransient
A Transient, with all proof information erased

Primarily for use in testing, or handling data known to be correct from external information

Constructors
new ProofErasedTransient()
private new ProofErasedTransient(): ProofErasedTransient

Returns
ProofErasedTransient

Properties
commitment
readonly commitment: string;

The commitment of the transient

contractAddress
readonly contractAddress: undefined | string;

The contract address creating the transient, if applicable

nullifier
readonly nullifier: string;

The nullifier of the transient

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): ProofErasedTransient

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ProofErasedTransient


@midnight/zswap v3.0.2 / SystemTransaction

Class: SystemTransaction
A priviledged transaction issued by the system.

Constructors
new SystemTransaction()
private new SystemTransaction(): SystemTransaction

Returns
SystemTransaction

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): Transaction

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
Transaction


@midnight/zswap v3.0.2 / Transaction

Class: Transaction
A Midnight transaction, consisting a guaranteed and fallible Offer, and contract call information hidden from this API.

The guaranteed section are run first, and fee payment is taken during this part. If it succeeds, the fallible section is also run, and atomically rolled back if it fails.

Constructors
new Transaction()
private new Transaction(): Transaction

Returns
Transaction

Properties
fallibleCoins
readonly fallibleCoins: undefined | Offer;

The fallible Zswap offer

guaranteedCoins
readonly guaranteedCoins: undefined | Offer;

The guaranteed Zswap offer

mint
readonly mint: undefined | AuthorizedMint;

The mint this transaction represents, if applicable

Methods
eraseProofs()
eraseProofs(): ProofErasedTransaction

Erases the proofs contained in this transaction

Returns
ProofErasedTransaction

fees()
fees(params): bigint

The cost of this transaction, in the atomic unit of the base token

Parameters
• params: LedgerParameters

Returns
bigint

identifiers()
identifiers(): string[]

Returns the set of identifiers contained within this transaction. Any of these may be used to watch for a specific transaction.

Returns
string[]

imbalances()
imbalances(guaranteed, fees?): Map<string, bigint>

For given fees, and a given section (guaranteed/fallible), what the surplus or deficit of this transaction in any token type is.

Parameters
• guaranteed: boolean

• fees?: bigint

Returns
Map<string, bigint>

merge()
merge(other): Transaction

Merges this transaction with another

Parameters
• other: Transaction

Returns
Transaction

Throws
If both transactions have contract interactions, or they spend the same coins

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

transactionHash()
transactionHash(): string

Returns the hash associated with this transaction. Due to the ability to merge transactions, this should not be used to watch for a specific transaction.

Returns
string

deserialize()
static deserialize(raw, netid): Transaction

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
Transaction

fromUnproven()
static fromUnproven(prove, unproven): Promise<Transaction>

Type hint that you should use an external proving function, for instance via the proof server.

Parameters
• prove

• unproven: UnprovenTransaction

Returns
Promise<Transaction>


@midnight/zswap v3.0.2 / TransactionCostModel

Class: TransactionCostModel
Constructors
new TransactionCostModel()
private new TransactionCostModel(): TransactionCostModel

Returns
TransactionCostModel

Properties
inputFeeOverhead
readonly inputFeeOverhead: bigint;

The increase in fees to expect from adding a new input to a transaction

outputFeeOverhead
readonly outputFeeOverhead: bigint;

The increase in fees to expect from adding a new output to a transaction

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): TransactionCostModel

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
TransactionCostModel

dummyTransactionCostModel()
static dummyTransactionCostModel(): TransactionCostModel

A dummy cost model, for use in testing

Returns
TransactionCostModel

@midnight/zswap v3.0.2 / Transient

Class: Transient
A shielded "transient"; an output that is immediately spent within the same transaction

Constructors
new Transient()
private new Transient(): Transient

Returns
Transient

Properties
commitment
readonly commitment: string;

The commitment of the transient

contractAddress
readonly contractAddress: undefined | string;

The contract address creating the transient, if applicable

nullifier
readonly nullifier: string;

The nullifier of the transient

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): Transient

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
Transient


@midnight/zswap v3.0.2 / UnprovenAuthorizedMint

Class: UnprovenAuthorizedMint
A request to mint a coin, authorized by the mint's recipient, without the proof for the authorization being generated

Constructors
new UnprovenAuthorizedMint()
private new UnprovenAuthorizedMint(): UnprovenAuthorizedMint

Returns
UnprovenAuthorizedMint

Properties
coin
readonly coin: CoinInfo;

The coin to be minted

recipient
readonly recipient: string;

The recipient of this mint

Methods
erase_proof()
erase_proof(): ProofErasedAuthorizedMint

Returns
ProofErasedAuthorizedMint

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): UnprovenAuthorizedMint

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
UnprovenAuthorizedMint


@midnight/zswap v3.0.2 / UnprovenInput

Class: UnprovenInput
A Input, before being proven

All "shielded" information in the input can still be extracted at this stage!

Constructors
new UnprovenInput()
private new UnprovenInput(): UnprovenInput

Returns
UnprovenInput

Properties
contractAddress
readonly contractAddress: undefined | string;

The contract address receiving the input, if the sender is a contract

nullifier
readonly nullifier: string;

The nullifier of the input

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): UnprovenInput

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
UnprovenInput

newContractOwned()
static newContractOwned(
   coin, 
   contract, 
   state): UnprovenInput

Creates a new input, spending a specific coin from a smart contract, against a state which contains this coin.

Note that inputs created in this way also need to be authorized by the contract

Parameters
• coin: QualifiedCoinInfo

• contract: string

• state: ZswapChainState

Returns
UnprovenInput

@midnight/zswap v3.0.2 / UnprovenOffer

Class: UnprovenOffer
A Offer, prior to being proven

All "shielded" information in the offer can still be extracted at this stage!

Constructors
new UnprovenOffer()
new UnprovenOffer(): UnprovenOffer

Returns
UnprovenOffer

Properties
deltas
readonly deltas: Map<string, bigint>;

The value of this offer for each token type; note that this may be negative

This is input coin values - output coin values, for value vectors

inputs
readonly inputs: UnprovenInput[];

The inputs this offer is composed of

outputs
readonly outputs: UnprovenOutput[];

The outputs this offer is composed of

transient
readonly transient: UnprovenTransient[];

The transients this offer is composed of

Methods
merge()
merge(other): UnprovenOffer

Combine this offer with another

Parameters
• other: UnprovenOffer

Returns
UnprovenOffer

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): UnprovenOffer

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
UnprovenOffer

fromInput()
static fromInput(
   input, 
   type_, 
   value): UnprovenOffer

Creates a singleton offer, from an UnprovenInput and its value vector

Parameters
• input: UnprovenInput

• type_: string

• value: bigint

Returns
UnprovenOffer

fromOutput()
static fromOutput(
   output, 
   type_, 
   value): UnprovenOffer

Creates a singleton offer, from an UnprovenOutput and its value vector

Parameters
• output: UnprovenOutput

• type_: string

• value: bigint

Returns
UnprovenOffer

fromTransient()
static fromTransient(transient): UnprovenOffer

Creates a singleton offer, from an UnprovenTransient

Parameters
• transient: UnprovenTransient

Returns
UnprovenOffer


@midnight/zswap v3.0.2 / UnprovenOutput

Class: UnprovenOutput
An Output before being proven

All "shielded" information in the output can still be extracted at this stage!

Constructors
new UnprovenOutput()
private new UnprovenOutput(): UnprovenOutput

Returns
UnprovenOutput

Properties
commitment
readonly commitment: string;

The commitment of the output

contractAddress
readonly contractAddress: undefined | string;

The contract address receiving the output, if the recipient is a contract

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): UnprovenOutput

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
UnprovenOutput

new()
static new(
   coin, 
   target_cpk, 
   target_epk?): UnprovenOutput

Creates a new output, targeted to a user's coin public key.

Optionally the output contains a ciphertext encrypted to the user's encryption public key, which may be omitted only if the CoinInfo is transferred to the recipient another way

Parameters
• coin: CoinInfo

• target_cpk: string

• target_epk?: string

Returns
UnprovenOutput

newContractOwned()
static newContractOwned(coin, contract): UnprovenOutput

Creates a new output, targeted to a smart contract

A contract must also explicitly receive a coin created in this way for the output to be valid

Parameters
• coin: CoinInfo

• contract: string

Returns
UnprovenOutput


@midnight/zswap v3.0.2 / UnprovenTransaction

Class: UnprovenTransaction
Transaction, prior to being proven

All "shielded" information in the transaction can still be extracted at this stage!

Constructors
new UnprovenTransaction(guaranteed, fallible)
new UnprovenTransaction(guaranteed, fallible?): UnprovenTransaction

Creates the transaction from guaranteed/fallible UnprovenOffers

Parameters
• guaranteed: UnprovenOffer

• fallible?: UnprovenOffer

Returns
UnprovenTransaction

Properties
fallibleCoins
readonly fallibleCoins: undefined | UnprovenOffer;

The fallible Zswap offer

guaranteedCoins
readonly guaranteedCoins: undefined | UnprovenOffer;

The guaranteed Zswap offer

mint
readonly mint: undefined | UnprovenAuthorizedMint;

The mint this transaction represents, if applicable

Methods
eraseProofs()
eraseProofs(): ProofErasedTransaction

Erases the proofs contained in this transaction

Returns
ProofErasedTransaction

identifiers()
identifiers(): string[]

Returns the set of identifiers contained within this transaction. Any of these may be used to watch for a specific transaction.

Returns
string[]

merge()
merge(other): UnprovenTransaction

Merges this transaction with another

Parameters
• other: UnprovenTransaction

Returns
UnprovenTransaction

Throws
If both transactions have contract interactions, or they spend the same coins

serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): UnprovenTransaction

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
UnprovenTransaction

fromMint()
static fromMint(mint): UnprovenTransaction

Creates a minting claim transaction, the funds claimed must have been legitimately minted previously.

Parameters
• mint: UnprovenAuthorizedMint

Returns
UnprovenTransaction


@midnight/zswap v3.0.2 / UnprovenTransient

Class: UnprovenTransient
A Transient, before being proven

All "shielded" information in the transient can still be extracted at this stage!

Constructors
new UnprovenTransient()
private new UnprovenTransient(): UnprovenTransient

Returns
UnprovenTransient

Properties
commitment
readonly commitment: string;

The commitment of the transient

contractAddress
readonly contractAddress: undefined | string;

The contract address creating the transient, if applicable

nullifier
readonly nullifier: string;

The nullifier of the transient

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

deserialize()
static deserialize(raw, netid): UnprovenTransient

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
UnprovenTransient

newFromContractOwnedOutput()
static newFromContractOwnedOutput(coin, output): UnprovenTransient

Creates a new contract-owned transient, from a given output and its coin.

The QualifiedCoinInfo should have an mt_index of 0

Parameters
• coin: QualifiedCoinInfo

• output: UnprovenOutput

Returns
UnprovenTransient


@midnight/zswap v3.0.2 / ZswapChainState

Class: ZswapChainState
The on-chain state of Zswap, consisting of a Merkle tree of coin commitments, a set of nullifiers, an index into the Merkle tree, and a set of valid past Merkle tree roots

Constructors
new ZswapChainState()
new ZswapChainState(): ZswapChainState

Returns
ZswapChainState

Properties
firstFree
readonly firstFree: bigint;

The first free index in the coin commitment tree

Methods
serialize()
serialize(netid): Uint8Array

Parameters
• netid: NetworkId

Returns
Uint8Array

toString()
toString(compact?): string

Parameters
• compact?: boolean

Returns
string

tryApply()
tryApply(offer, whitelist?): [ZswapChainState, Map<string, bigint>]

Try to apply an Offer to the state, returning the updated state and a map on newly inserted coin commitments to their inserted indices.

Parameters
• offer: Offer

• whitelist?: Set<string>

A set of contract addresses that are of interest. If set, only these addresses are tracked, and all other information is discarded.

Returns
[ZswapChainState, Map<string, bigint>]

tryApplyProofErased()
tryApplyProofErased(offer, whitelist?): [ZswapChainState, Map<string, bigint>]

tryApply for ProofErasedOffers

Parameters
• offer: ProofErasedOffer

• whitelist?: Set<string>

Returns
[ZswapChainState, Map<string, bigint>]

deserialize()
static deserialize(raw, netid): ZswapChainState

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ZswapChainState

deserializeFromLedgerState()
static deserializeFromLedgerState(raw, netid): ZswapChainState

Given a whole ledger serialized state, deserialize only the Zswap portion

Parameters
• raw: Uint8Array

• netid: NetworkId

Returns
ZswapChainState

## Enumeration

@midnight/zswap v3.0.2 / NetworkId

Enumeration: NetworkId
The network currently being targeted

Enumeration Members
DevNet
DevNet: 1;

A developer network, not guaranteed to be persistent

MainNet
MainNet: 3;

The Midnight mainnet

TestNet
TestNet: 2;

A persistent testnet

Undeployed
Undeployed: 0;

A local test network


## Functions

@midnight/zswap v3.0.2 / createCoinInfo

Function: createCoinInfo()
createCoinInfo(type_, value): CoinInfo

Creates a new CoinInfo, sampling a uniform nonce

Parameters
• type_: string

• value: bigint

Returns
CoinInfo


@midnight/zswap v3.0.2 / nativeToken

Function: nativeToken()
nativeToken(): TokenType

The base/system token type

Returns
TokenType

@midnight/zswap v3.0.2 / nativeToken

Function: nativeToken()
nativeToken(): TokenType

The base/system token type

Returns
TokenType

@midnight/zswap v3.0.2 / sampleContractAddress

Function: sampleContractAddress()
sampleContractAddress(): ContractAddress

Samples a uniform contract address, for use in testing

Returns
ContractAddress

@midnight/zswap v3.0.2 / sampleTokenType

Function: sampleTokenType()
sampleTokenType(): TokenType

Samples a uniform token type, for use in testing

Returns
TokenType

## Globals

@midnight/zswap v3.0.2
Enumerations
NetworkId
Classes
AuthorizedMint
EncryptionSecretKey
Input
LedgerParameters
LocalState
MerkleTreeCollapsedUpdate
Offer
Output
ProofErasedAuthorizedMint
ProofErasedInput
ProofErasedOffer
ProofErasedOutput
ProofErasedTransaction
ProofErasedTransient
SystemTransaction
Transaction
TransactionCostModel
Transient
UnprovenAuthorizedMint
UnprovenInput
UnprovenOffer
UnprovenOutput
UnprovenTransaction
UnprovenTransient
ZswapChainState
Type Aliases
CoinCommitment
CoinInfo
CoinPublicKey
ContractAddress
EncPublicKey
Nonce
Nullifier
QualifiedCoinInfo
TokenType
TransactionHash
TransactionId
Functions
createCoinInfo
nativeToken
sampleCoinPublicKey
sampleContractAddress
sampleTokenType


## Type Aliases


@midnight/zswap v3.0.2 / CoinCommitment

Type alias: CoinCommitment
type CoinCommitment: string;

A Zswap coin commitment, as a hex-encoded 256-bit bitstring

@midnight/zswap v3.0.2 / CoinInfo

Type alias: CoinInfo
type CoinInfo: {
  nonce: Nonce;
  type: TokenType;
  value: bigint;
};

Information required to create a new coin, alongside details about the recipient

Type declaration
nonce
nonce: Nonce;

type
type: TokenType;

value
value: bigint;


@midnight/zswap v3.0.2 / CoinPublicKey

Type alias: CoinPublicKey
type CoinPublicKey: string;

A user public key capable of receiving Zswap coins, as a hex-encoded 35-byte string


@midnight/zswap v3.0.2 / ContractAddress

Type alias: ContractAddress
type ContractAddress: string;

A contract address, as a hex-encoded 35-byte string


@midnight/zswap v3.0.2 / EncPublicKey

Type alias: EncPublicKey
type EncPublicKey: string;

An encryption public key, used to inform users of new coins sent to them


@midnight/zswap v3.0.2 / Nonce

Type alias: Nonce
type Nonce: string;

A Zswap nonce, as a hex-encoded 256-bit string


@midnight/zswap v3.0.2 / Nullifier

Type alias: Nullifier
type Nullifier: string;

A Zswap nullifier, as a hex-encoded 256-bit bitstring


@midnight/zswap v3.0.2 / QualifiedCoinInfo

Type alias: QualifiedCoinInfo
type QualifiedCoinInfo: {
  mt_index: bigint;
  nonce: Nonce;
  type: TokenType;
  value: bigint;
};

Information required to spend an existing coin, alongside authorization of the owner

Type declaration
mt_index
mt_index: bigint;

nonce
nonce: Nonce;

type
type: TokenType;

value
value: bigint;


@midnight/zswap v3.0.2 / TokenType

Type alias: TokenType
type TokenType: string;

A token type (or color), as a hex-encoded 35-byte string


@midnight/zswap v3.0.2 / TransactionHash

Type alias: TransactionHash
type TransactionHash: string;

The hash of a transaction, as a hex-encoded 256-bit bytestring


@midnight/zswap v3.0.2 / TransactionId

Type alias: TransactionId
type TransactionId: string;

A transaction identifier, used to index merged transactions