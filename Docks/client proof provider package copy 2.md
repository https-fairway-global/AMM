@midnight-ntwrk/midnight-js-http-client-proof-provider v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-http-client-proof-provider / DEFAULT_CONFIG

Variable: DEFAULT_CONFIG
const DEFAULT_CONFIG: Object

The default configuration for the proof server client.

Type declaration
timeout
timeout: number = 300000

The default timeout for prove requests.

zkConfig
zkConfig: undefined = undefined

The default ZK configuration to use. It is overwritten with a proper ZK configuration only if a call transaction is being proven.


@midnight-ntwrk/midnight-js-http-client-proof-provider v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-http-client-proof-provider / httpClientProofProvider

Function: httpClientProofProvider()
httpClientProofProvider<K>(url): ProofProvider<K>

Creates a ProofProvider by creating a client for a running proof server. Allows for HTTP and HTTPS. The data passed to 'proveTx' are intended to be secret, so usage of this function should be heavily scrutinized.

Type parameters
• K extends string

Parameters
• url: string

The url of a running proof server.

Returns
ProofProvider<K>


@midnight-ntwrk/midnight-js-http-client-proof-provider v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-http-client-proof-provider / serializePayload

Function: serializePayload()
serializePayload<K>(unprovenTx, zkConfig?): Promise<ArrayBuffer>

Creates a serialized proving server payload from the given transaction and ZK configuration.

Type parameters
• K extends string

Parameters
• unprovenTx: UnprovenTransaction

The transaction being proven.

• zkConfig?: ZKConfig<K>

The ZK artifacts needed to prove the transaction. Undefined if a deployment transaction is being proven.

Returns
Promise<ArrayBuffer>



@midnight-ntwrk/midnight-js-http-client-proof-provider v0.2.5 • API

Midnight.js API Reference v0.2.5 / @midnight-ntwrk/midnight-js-http-client-proof-provider / serializeZKConfig

Function: serializeZKConfig()
serializeZKConfig<K>(zkConfig?): Uint8Array

Serializes a ZKConfig using Borsh format.

Type parameters
• K extends string

Parameters
• zkConfig?: ZKConfig<K>

The configuration to serialize.

Returns
Uint8Array


