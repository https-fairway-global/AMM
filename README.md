# Ethiopian Identity AMM Project

This project implements an Automated Market Maker (AMM) on the Midnight network, featuring selective liquidity pools restricted to users verified as Ethiopian nationals via the Fayda ID system.

## Workspace Structure

This is a monorepo managed using Yarn workspaces and Turborepo.

- `identity-amm/`: Contains the core packages for the Ethiopian Identity AMM.
  - `signature-registry-contract`: Compact contract for verifying Fayda credentials and registering user verification status.
  - `signature-registry-api`: TypeScript API for interacting with the verification contract.
  - `signature-registry-indexer`: Service to index verification events from the contract.
  - `amm-contract`: Compact contract implementing the AMM logic (swaps, liquidity provision).
  - `amm-api`: TypeScript API for interacting with the AMM contract.
  - `amm-ui`: Frontend application (e.g., React/Vite) for the AMM.
  - `crypto`: Shared cryptographic utilities.
  - `ethiopia-verification-contract`: (Potentially redundant if logic is in signature-registry, clarify purpose).
- `examples/`: Contains example usage and potentially related contracts.
- `Docks/`: Documentation files.

## Prerequisites

- Node.js (v18+ recommended)
- Yarn (v1.22+)
- Compact Compiler (`compactc`)
- Git

Refer to `Docks/Guide to build.md` for detailed setup instructions.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    yarn install
    ```
2.  **Build Packages:**
    ```bash
    yarn turbo build
    # Or build specific packages
    # yarn turbo build --filter='@identity-amm/signature-registry-contract'
    ```

## Development

- Run linters: `yarn turbo lint`
- Run type checking: `yarn turbo typecheck`
- Run tests (setup required): `yarn turbo test`

## Contributing

(Add contribution guidelines here)

## License

(Specify project license here, e.g., MIT, Apache 2.0)
