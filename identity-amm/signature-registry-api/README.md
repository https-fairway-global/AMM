# @identity-amm/signature-registry-api

TypeScript library providing an API to interact with the `@identity-amm/signature-registry-contract`.

Includes functions for:
- Deploying the contract
- Registering signing keys (`register`)
- Retrieving signing keys (`get_signing_key`)

## Building

```bash
yarn workspace @identity-amm/signature-registry-api build
```

## Configuration

The API requires several environment variables to be set:

*   `PROVER_URL`: URL of the running Midnight Proof Server (e.g., `http://127.0.0.1:6300/`). **This server MUST be running for the API to function.** See [Midnight Documentation](https://docs.midnight.network/) for instructions on running the proof server (usually via Docker).
*   `NODE_RPC_URL`: URL of the Midnight Network RPC node (e.g., `https://rpc.testnet-02.midnight.network`).
*   `INDEXER_URL`: Base HTTP URL for the Midnight Indexer GraphQL API (e.g., `https://indexer.testnet-02.midnight.network/api/v1/graphql`). The WebSocket URL (`INDEXER_WSS_URL`) is derived from this.
*   `WALLET_SEED`: A 64-character hex string representing the seed phrase for the backend wallet used by the API for deployment and transactions. **Must be kept secure and not committed.** Defaults to an insecure zero seed if not set.
*   `ZK_CONFIG_URL` (Optional): URL potentially used by the `FetchZkConfigProvider` to fetch contract metadata. Defaults to `http://localhost:8891`. Its exact necessity in the current proof server flow should be verified.
*   `SIGNATURE_REGISTRY_CONTRACT_ADDRESS` (Optional): If set, the API will attempt to subscribe to an existing contract at this address instead of deploying a new one on startup.
*   `LOG_LEVEL` (Optional): Sets the logging level for the wallet builder (e.g., `info`, `debug`). Defaults to `info`.

### Dependencies and Considerations

*   **Proof Server:** As mentioned, a running Midnight Proof Server accessible at `PROVER_URL` is essential.
*   **Bech32m Decoding:** The API currently uses `@cosmjs/encoding` to decode Bech32m-encoded public keys (`coinPublicKey`) obtained from the wallet state. Verify that `fromBech32` from this library is appropriate for Midnight's specific format and prefix requirements.

## Running the API

1.  Ensure all required environment variables are set (e.g., via a `.env` file and `dotenv`, or by exporting them in your shell).
2.  Ensure the Midnight Proof Server is running.
3.  Build the API: `yarn workspace @identity-amm/signature-registry-api build`
4.  Start the server: `node dist/index.js`

The API server will start (defaulting to port 3002), initialize the wallet, derive the necessary public key field, connect to the providers, and either deploy a new contract or subscribe to an existing one based on the `SIGNATURE_REGISTRY_CONTRACT_ADDRESS` environment variable. 