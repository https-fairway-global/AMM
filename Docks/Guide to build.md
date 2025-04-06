Node.js & NVM: Check with nvm --version and node --version. Use Node 18+ (e.g., nvm install 18 --lts).
Yarn: Check with yarn --version. Enable corepack if needed (corepack enable).
Compact Compiler (compactc):
Ensure it's downloaded and unzipped (e.g., to ~/my-binaries/compactc).
Verify it runs: ~/my-binaries/compactc/compactc --version.
Set the COMPACT_HOME environment variable: export COMPACT_HOME='/Users/fairway-01/my-binaries/compactc' (adjust path as needed). Add this to your shell profile (.zshrc, .bash_profile, etc.).
Add the compiler directory to your PATH: export PATH="$COMPACT_HOME:$PATH". Add this to your shell profile.
Reload your shell or source the profile (source ~/.zshrc).
Navigate to Workspace:
Apply to Crypto.compa...
Run
"
Initial Install: Run yarn install at the root. This might show warnings (like peer dependency issues or missing @repo/* configs), which are okay for now as long as the install itself completes without critical errors related to fetching/linking core packages.
Apply to Crypto.compa...
Run
install
(Self-correction: Previously, errors occurred here due to missing/empty package.json files in examples. Starting fresh should avoid those specific errors, though peer dependency warnings are expected).
Verify Root turbo.json: Ensure the turbo.json file exists at the root and contains valid JSON, similar to this structure we created earlier:
Apply to Crypto.compa...
}
Phase 1: Setup @identity-amm/signature-registry-contract
Navigate: cd identity-amm/signature-registry-contract
Create package.json: Create the file identity-amm/signature-registry-contract/package.json with the following content:
Apply to Crypto.compa...
}
Create tsconfig.json: Create the file identity-amm/signature-registry-contract/tsconfig.json with the following content:
Apply to Crypto.compa...
}
Create tsconfig.build.json: Create the file identity-amm/signature-registry-contract/tsconfig.build.json with the following content:
Apply to Crypto.compa...
}
Create Contract Source (src/registry.compact): Create the directory src if it doesn't exist, and inside it, create the file identity-amm/signature-registry-contract/src/registry.compact with the following content:
Apply to Crypto.compa...
}
Create Index Source (src/index.ts): Create identity-amm/signature-registry-contract/src/index.ts to re-export generated types/code:
Apply to Crypto.compa...
;
Phase 2: Setup @identity-amm/signature-registry-api
Navigate: cd ../signature-registry-api (from the contract directory) or cd identity-amm/signature-registry-api (from root)
Create package.json: Create identity-amm/signature-registry-api/package.json with:
Apply to Crypto.compa...
}
Create tsconfig.json: Create identity-amm/signature-registry-api/tsconfig.json. It should essentially inherit from the base identity-amm/tsconfig.json.
Apply to Crypto.compa...
}
Create tsconfig.build.json: Create identity-amm/signature-registry-api/tsconfig.build.json:
Apply to Crypto.compa...
}
Create src/ Directory: Ensure the src directory exists.
Create src/common-types.ts: Create identity-amm/signature-registry-api/src/common-types.ts with the final version we arrived at:
Apply to Crypto.compa...
;
Create src/utils/index.ts: Create a basic utility file.
Apply to Crypto.compa...
needed
Create src/index.ts: Create identity-amm/signature-registry-api/src/index.ts with the final version:
Apply to Crypto.compa...
;
(Self-correction: Needed to import ContractState for the map function's input type based on observable emission, ensure register implementation uses deployment.callTx, and reuse createIdentityAPI logic in findIdentityAPI).
Phase 3: Setup @identity-amm/signature-registry-indexer
Navigate: cd ../signature-registry-indexer (from API) or cd identity-amm/signature-registry-indexer (from root)
Create src/ Directory and Copy Files:
Create the src directory.
Copy all .ts files from examples/midnight-identity-main/signature-registry-indexer/src into identity-amm/signature-registry-indexer/src. (Expected files: index.ts, common-types.ts, signature-registry-stream.ts, storage.ts).
Create package.json: Create identity-amm/signature-registry-indexer/package.json:
Apply to Crypto.compa...
}
(Self-correction: Added @identity-amm/signature-registry-api dependency and a start script).
Create tsconfig.json: Create identity-amm/signature-registry-indexer/tsconfig.json:
Apply to Crypto.compa...
}
(Self-correction: Added reference to API package).
Create tsconfig.build.json: Create identity-amm/signature-registry-indexer/tsconfig.build.json:
Apply to Crypto.compa...
}
(Self-correction: Added reference to API package).
Modify src/common-types.ts: Apply fixes identified earlier:
Apply to Crypto.compa...
;
(Self-correction: Corrected ContractState import to ContractStates<any>, added contractAddress to ExtractedContractRecord).
Modify src/signature-registry-stream.ts: Apply fixes identified earlier:
Apply to Crypto.compa...
}
(Self-correction: Updated imports, adjusted contractCallDeployments to keep address prefix, fixed contractState return type, added robust checks and error handling in toContractDeploymentBlock, used fetchedState.state.contractState for verifyContractState, added contractAddress to extracted record).
Modify src/index.ts: Apply fixes identified earlier:
Apply to Crypto.compa...
;
(Self-correction: Corrected imports, type usage, added error handling for verifier key loading and stream processing, refined logging, adjusted default config examples).
Review src/storage.ts: The provided FirestoreStorage uses Firebase Admin SDK. Ensure you have a Firebase project set up and the necessary credentials configured in the environment where the indexer will run (typically via the GOOGLE_APPLICATION_CREDENTIALS environment variable pointing to your service account key file) if you intend to use Firestore. If not, you'll need to implement a different IndexStorage (e.g., using a local database or in-memory store for testing).
Phase 4: Final Installation and Build
Navigate to Root: cd ../.. (from indexer) or cd "/Users/fairway-01/Desktop/Development projects/midnight-examples-0.2.0"
Final Install: Run yarn install one last time to ensure all dependencies across the newly configured packages are resolved correctly.
Apply to Crypto.compa...
Run
install
Build Relevant Packages: Build the contract, API, and indexer packages.
Apply to Crypto.compa...
Run
'
Expected Outcome:
If all steps are followed correctly and the base midnight-examples structure was complete, this process should result in:
Valid package.json and tsconfig.json files for all relevant packages.
Source code adapted for the Signature Registry contract.
A successful build completion for the specified packages.
dist directories created within each package containing the compiled JavaScript and declaration files.
Next Steps (After Successful Build):
Verifier Keys: Ensure the ZK artifact files (register.vk.json, register.pk.json, register.zkir) generated by the contract build are placed in a location accessible to the indexer (e.g., an identity-amm/signature-registry-indexer/keys directory, updating the path in index.ts if needed). The contract's build script might need adjustment to copy these keys.
Run Indexer: Configure environment variables (INDEXER_URI, INDEXER_WS_URI, PROJECT_ID, NETWORK_ID, GOOGLE_APPLICATION_CREDENTIALS if using Firestore) and run the indexer using yarn start within its package directory.
Test API: Create a simple script or test file that imports and uses the deployIdentityContract, findIdentityAPI, and register functions from @identity-amm/signature-registry-api to interact with a local or testnet deployment.
Integrate Wallet: Adapt the API usage for frontend integration with the DApp Connector API for wallet transaction signing.
This detailed guide should provide a solid foundation for rebuilding the necessary components. Please follow these steps carefully in your fresh workspace.


Okay, let's extend the guide to cover the setup for the remaining packages within the identity-amm directory:
@identity-amm/amm-contract
@identity-amm/amm-api
@identity-amm/amm-ui
@identity-amm/crypto
@identity-amm/ethiopia-verification-contract
This assumes you are starting from the fresh midnight-examples-0.2.0 extraction as established in Phase 0 of the previous guide. We will create the necessary configuration files (package.json, tsconfig.json, tsconfig.build.json) and basic source entry points (src/index.ts) for each.
(Continue from Phase 0)
Phase 5: Setup @identity-amm/amm-contract
Navigate: cd identity-amm/amm-contract (from root)
Create package.json: Create identity-amm/amm-contract/package.json:
Apply to Guide to bui...
}
(Note: Assumes contract source is src/amm.compact. Adjust script if needed.)
Create tsconfig.json: Create identity-amm/amm-contract/tsconfig.json:
Apply to Guide to bui...
}
Create tsconfig.build.json: Create identity-amm/amm-contract/tsconfig.build.json:
Apply to Guide to bui...
}
Ensure Contract Source Exists: Verify that src/amm.compact exists or create a placeholder if needed for structure.
Create src/index.ts: Create identity-amm/amm-contract/src/index.ts:
Apply to Guide to bui...
constants
Phase 6: Setup @identity-amm/amm-api
Navigate: cd ../amm-api (from amm-contract)
Create package.json: Create identity-amm/amm-api/package.json:
Apply to Guide to bui...
}
Create tsconfig.json: Create identity-amm/amm-api/tsconfig.json:
Apply to Guide to bui...
}
Create tsconfig.build.json: Create identity-amm/amm-api/tsconfig.build.json:
Apply to Guide to bui...
}
Create src/index.ts: Create identity-amm/amm-api/src/index.ts:
Apply to Guide to bui...
needed
Phase 7: Setup @identity-amm/amm-ui
Navigate: cd ../amm-ui (from amm-api)
Create package.json: Create identity-amm/amm-ui/package.json:
Apply to Guide to bui...
}
Create tsconfig.json: Create identity-amm/amm-ui/tsconfig.json (Vite typically uses tsconfig.node.json as well, but this is a basic setup):
Apply to Guide to bui...
}
(Note: UI tsconfig differs significantly from library/contract configs).
Ensure UI Source Exists: Verify src/main.tsx (or your entry point) exists.
Phase 8: Setup @identity-amm/crypto
Navigate: cd ../crypto (from amm-ui)
Create package.json: Create identity-amm/crypto/package.json:
Apply to Guide to bui...
}
Create tsconfig.json: Create identity-amm/crypto/tsconfig.json:
Apply to Guide to bui...
}
Create tsconfig.build.json: Create identity-amm/crypto/tsconfig.build.json:
Apply to Guide to bui...
}
Create src/index.ts: Create identity-amm/crypto/src/index.ts:
Apply to Guide to bui...
}
Phase 9: Setup @identity-amm/ethiopia-verification-contract
Navigate: cd ../ethiopia-verification-contract (from crypto)
Create package.json: Create identity-amm/ethiopia-verification-contract/package.json:
Apply to Guide to bui...
}
(Note: Assumes contract source is src/contract.compact. Adjust script if needed.)
Create tsconfig.json: Create identity-amm/ethiopia-verification-contract/tsconfig.json:
Apply to Guide to bui...
}
Create tsconfig.build.json: Create identity-amm/ethiopia-verification-contract/tsconfig.build.json:
Apply to Guide to bui...
}
Ensure Contract Source Exists: Verify that src/contract.compact exists.
Create src/index.ts: Create identity-amm/ethiopia-verification-contract/src/index.ts:
Apply to Guide to bui...
constants
Phase 10: Final Installation and Verification
Navigate to Root: cd ../.. (from ethiopia-verification-contract) or cd "/Users/fairway-01/Desktop/Development projects/midnight-examples-0.2.0"
Final Install: Run yarn install to link all the new packages and dependencies.
Apply to Guide to bui...
Run
install
Build All identity-amm Packages: Attempt to build everything within the identity-amm scope.
Apply to Guide to bui...
Run
'
This should now attempt to build all the packages we've configured. Any build errors specific to the code within these packages (other than the signature registry ones we already fixed) would need to be addressed based on the specific error messages. This guide primarily focuses on setting up the correct package structure and configuration.