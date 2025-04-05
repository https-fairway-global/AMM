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
- Compact Compiler (`compactc` v0.22.0 or compatible)
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
    # yarn turbo build --filter='@identity-amm/*'
    ```

## Current Status & Known Issues (As of 2024-04-05)

The project currently builds successfully using `yarn turbo build --filter='@identity-amm/*'`. However, there are significant limitations due to the current state of the Compact compiler (v0.22.0) and the example code:

1.  **Non-Functional AMM Logic:** Division operations required for core AMM calculations (in `swap` and `add_liquidity` within `amm-contract`) have been replaced with non-functional placeholders (`a / b` is treated as `a`). This was necessary to overcome compiler limitations/bugs related to the division operator and recursion/iteration. **As a result, the AMM contract does not perform correct swap or liquidity calculations.**
2.  **Missing Contract Type Definitions:** The build process for `amm-contract` is currently not generating its TypeScript declaration file (`dist/index.d.ts`) correctly, despite the configuration appearing valid. This requires a temporary `@ts-ignore` comment in `amm-api/src/index.ts` to allow the build to complete. This impacts type safety when interacting with the contract from the API layer.
3.  **Placeholder Verification Logic:** The Ethiopian ID verification logic (`placeholder_is_user_verified`, `verify_oracle_signature`) within the Compact code consists of placeholders returning `true`. Actual verification mechanisms need to be implemented.

**Next Steps:**

*   Implement correct division logic in `amm-contract`, likely using a **witness-based approach** where division is calculated off-chain and verified on-chain.
*   Diagnose and fix the root cause of the missing TypeScript declaration file generation for `amm-contract`.
*   Implement the actual Fayda ID verification logic, potentially involving cross-contract calls or appropriate oracle patterns.

## Development

- Run linters: `yarn turbo lint`
- Run type checking: `yarn turbo typecheck`
- Run tests (setup required): `yarn turbo test`

## Contributing

(Add contribution guidelines here)

## License

(Specify project license here, e.g., MIT, Apache 2.0)
