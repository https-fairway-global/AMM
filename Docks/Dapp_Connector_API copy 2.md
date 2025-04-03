DApp connector API
@midnight-ntwrk/dapp-connector-api v1.2.3

Midnight DApp connector API
This API provides a comprehensive interface for the DApp connector operations, defining the structure of the wallet state it exposes, the methods for interacting with it, and the types and variables used within.

Installation
The Midnight DApp connector API is available as an NPM package with the namespace @midnight-ntwrk/dapp-connector-api. It can be installed using any node package manager, such as Yarn. To install the package using Yarn, execute the following command:

yarn add @midnight-ntwrk/dapp-connector-api

Package usage
The package provides the type declarations that are documented in the documentation of this package.

The DApp connector API should be exposed through the global variable as follows:

window.midnight.{walletName}

Available methods
Name	Description
apiVersion	Provides a semver string version of the DApp connector API
enable	Returns a promise with the DAppConnectorWalletAPI or error
isEnabled	Returns a promise with a boolean showing whether the DApp is authorized to access the API or not
name	The name of the wallet that implements the API
serviceUriConfig	Returns a promise with ServiceUriConfig or error if the DApp is not authorized.
API usage
Authorizing a DApp
To authorize a DApp, call the enable() method and wait for the user to respond to the request.

try {
  const api = await window.midnight.{walletName}.enable();

  // api is available here
} catch (error) {
  console.log('an error occurred', error);
}

Checking if the DApp is authorized
To check if the DApp is authorized, use the isEnabled() method as follows:

try {
  const isEnabled = await window.midnight.{walletName}.isEnabled();
} catch (error) {
  console.log('an error occurred', error);
}

Getting information about the DApp connector API
Name
To get the name of the wallet, use the name property in the implemented DApp connector API:

const name = window.midnight.{walletName}.name;

console.log('Wallet name', name);

API version
To get the API version, use the apiVersion property as follows:

const apiVersion = window.midnight.{walletName}.apiVersion;

console.log('API version', apiVersion);

Getting the service URI config
Midnight wallet users can configure the node, indexer, and proving server URIs in the wallet settings. To enable DApps to access and utilize these URLs, the following property is exposed:

Name	Description
Node URL	The node the wallet is pointing to
Indexer URL	The indexer URL the wallet is pointing to
Proving Server URL	The proving server URL the wallet is pointing to
To get the service URI config, use the API as follows:

try {
  const serviceUriConfig = await window.midnight.{walletName}.serviceUriConfig();

  console.log('serviceUriConfig', serviceUriConfig);
} catch (error) {
  console.log('an error occurred', error);
}

Note: The DApp must be authorized before calling this method, otherwise it will throw an error.

Interacting with the API
After calling the enable() method and the user approves the authorization request, you will receive an instance of the DAppConnectorWalletAPI, which includes the following properties:

Name	Description	Note
balanceAndProveTransaction	Balances and proves a transaction	-
submitTransaction	Submits a balanced and proven transaction	-
state	Returns DAppConnectorWalletState object	-
balanceTransaction	Balances a transaction	This method is deprecated and will be removed in version 2.0.0
proveTransaction	Proves a transaction	This method is deprecated and will be removed in version 2.0.0
Getting the wallet state
To get the wallet state, call the state() API method, which will return a promise with the DAppConnectorWalletState object as follows:

try {
  const state = await api.state();

  console.log('Wallet state', state);
} catch (error) {
  console.log('an error occurred', error);
}

Balancing and proving a transaction
To balance and prove a transaction, begin by creating a transaction in your DApp. You can follow the guide on how to create a transaction here.

This method accepts the following properties:

Name	Data type	Required?
transaction	Transaction	Yes
newCoins	CoinInfo[]	No
Below, you'll find an example of how to balance and prove a transaction:

try {
  // assuming we have a transaction at hand here
  const transaction;

  const balancedAndProvenTransaction = await api.balanceAndProveTransaction(transaction);
} catch (error) {
  console.log('an error occurred', error);
}


Submitting a transaction
With the balanced and proven transaction from above, you can now submit it.

The submitTransaction() method accepts the following parameters:

Name	Data type	Required?
transaction	Transaction	Yes
Below, you'll find an example of how to submit a transaction:

try {
  const submittedTransaction = await api.submitTransaction(balancedAndProvenTransaction);
} catch (error) {
  console.log('an error occurred', error);
}


Examples
In this section, you'll find examples demonstrating how to fully utilize the DApp connector API.

Submitting a transaction
This example demonstrates how to authorize and submit a transaction from a DApp's perspective using the DApp connector API.

try {
  const api = await window.midnight.{walletName}.enable();

  // assuming this is a transaction we've already created
  // [link to create transaction docs is in the "Balancing and proving a transaction" section]
  const transaction;

  const balancedAndProvenTransaction = await api.balanceAndProveTransaction(transaction);

  const submittedTx = await api.submitTransaction(balancedAndProvenTransaction);

  console.log(submittedTx);
} catch (error) {
  console.log('an error occurred', error);
}


## Classes


@midnight-ntwrk/dapp-connector-api / APIError

Class: APIError
Whenever there's a function called that returns a promise, an error with the shape can be thrown.

Extends
CustomError
Constructors
new APIError()
new APIError(code, reason): APIError

Parameters
code
ErrorCode

reason
string

Returns
APIError

Overrides
CustomError.constructor

Properties
code
code: ErrorCode

The code of the error that's thrown

reason
reason: string

The reason the error is thrown

## Globals

@midnight-ntwrk/dapp-connector-api v1.2.3
Classes
APIError
Interfaces
DAppConnectorAPI
DAppConnectorWalletAPI
DAppConnectorWalletState
ServiceUriConfig
Type Aliases
ErrorCode
Variables
ErrorCodes


## Interfaces


@midnight-ntwrk/dapp-connector-api / DAppConnectorAPI

Interface: DAppConnectorAPI
DApp Connector API Definition

When errors occur in functions returning a promise, they should be thrown in the form of an APIError.

Properties
apiVersion
apiVersion: string

Semver string. DApps are encouraged to check the compatibility whenever this changes.

enable()
enable: () => Promise<DAppConnectorWalletAPI>

Request access to the wallet, returns the wallet api on approval

Returns
Promise<DAppConnectorWalletAPI>

isEnabled()
isEnabled: () => Promise<boolean>

Check if the wallet has authorized the dapp

Returns
Promise<boolean>

name
name: string

The name of the wallet

serviceUriConfig()
serviceUriConfig: () => Promise<ServiceUriConfig>

Request the services (pub-sub, node, and proof server) URIs.

Returns
Promise<ServiceUriConfig>


@midnight-ntwrk/dapp-connector-api / DAppConnectorWalletAPI

Interface: DAppConnectorWalletAPI
Shape of the Wallet API in the DApp Connector

Properties
balanceAndProveTransaction()
balanceAndProveTransaction: (tx, newCoins) => Promise<Transaction>

It will try to balance given transaction and prove it

Parameters
tx
Transaction

Transaction to balance

newCoins
CoinInfo[]

New coins created by transaction, for which wallet will watch for

Returns
Promise<Transaction>

Proved transaction or error

balanceTransaction()
balanceTransaction: (tx, newCoins) => Promise<BalanceTransactionToProve | NothingToProve>

Balances the provided transaction.

Parameters
tx
Transaction

Transaction to balance

newCoins
CoinInfo[]

CoinInfo array of coins created by the transaction, which the wallet will watch for and apply to the state

The newCoins parameter should be used in cases where a new coin is created (for example, a DApp mints a coin and wants to send it to the wallet). Because of how Midnight works, newly created coins must be explicitly sent to the wallet using this method. This allows the wallet to monitor them and incorporate them into its state.

Returns
Promise<BalanceTransactionToProve | NothingToProve>

BalanceTransactionToProve or NothingToProve recipe (for the already balanced transaction) or error.

Remarks
Balancing a transaction means that for any given output and transaction fees, the wallet will take the available coins from the state to cover them.

Deprecated
Deprecated since version 1.1.0 and will be removed in version 2.0.0. Please use the balanceAndProveTransaction method instead.

proveTransaction()
proveTransaction: (recipe) => Promise<Transaction>

Calls the proving server with the proving recipe and returns the proven transaction or error.

Parameters
recipe
ProvingRecipe

ProvingRecipe with data to prove

Returns
Promise<Transaction>

Transaction or error

Remarks
Proof generation takes time and resources, therefore depending on the user's computer specs, this can be an expensive operation
There can be wallet implementations that do not need to support proving, in which case this method should return an error
Deprecated
Deprecated since version 1.1.0 and will be removed in version 2.0.0. Please use the balanceAndProveTransaction method instead.

state()
state: () => Promise<DAppConnectorWalletState>

Returns a promise with the exposed wallet state

Returns
Promise<DAppConnectorWalletState>

submitTransaction()
submitTransaction: (tx) => Promise<string>

It will submit given transaction to the node

Submits the provided transaction to the node

Parameters
tx
Transaction

Transaction to submit

Returns
Promise<string>

TransactionIdentifier - First transaction identifier from identifiers list or error

Param
Transaction to submit

Returns
First transaction identifier from identifiers list or error


@midnight-ntwrk/dapp-connector-api / DAppConnectorWalletState

Interface: DAppConnectorWalletState
The shape of the wallet state that must be exposed

Properties
address
address: string

The wallet address, which is a concatenation of coinPublicKey and encryptionPublicKey

coinPublicKey
coinPublicKey: string

The coin public key

encryptionPublicKey
encryptionPublicKey: string

The encryption public key


@midnight-ntwrk/dapp-connector-api / ServiceUriConfig

Interface: ServiceUriConfig
The services configuration

Properties
indexerUri
indexerUri: string

Pub-sub indexer URI

indexerWsUri
indexerWsUri: string

Pub-sub indexer WebSocket URI

proverServerUri
proverServerUri: string

Prover Server URI

substrateNodeUri
substrateNodeUri: string

Substrate URI

## Type aliases

@midnight-ntwrk/dapp-connector-api / ErrorCode

Type Alias: ErrorCode
ErrorCode: typeof ErrorCodes[keyof typeof ErrorCodes]

ErrorCode type definition

## Variables 

@midnight-ntwrk/dapp-connector-api / ErrorCodes

Variable: ErrorCodes
const ErrorCodes: object

The following error codes can be thrown by the dapp connector.

Type declaration
InternalError
readonly InternalError: "InternalError" = 'InternalError'

The dapp connector wasn't able to process the request

InvalidRequest
readonly InvalidRequest: "InvalidRequest" = 'InvalidRequest'

Can be thrown in various circumstances, e.g. one being a malformed transaction

Rejected
readonly Rejected: "Rejected" = 'Rejected'

The user rejected the request

