# @identity-amm/signature-registry-indexer

Indexer service that monitors the Midnight network for events related to the `@identity-amm/signature-registry-contract` and stores relevant data (e.g., in Firestore).

## Running

(Requires configuration, e.g., environment variables for network URIs, credentials)

```bash
yarn workspace @identity-amm/signature-registry-indexer build
yarn workspace @identity-amm/signature-registry-indexer start
``` 