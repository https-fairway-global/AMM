// Placeholder: Add index.ts content based on the guide.
// This should export the main API functions (e.g., deployIdentityContract, findIdentityAPI, register).

// export * from './common-types';
// export * from './utils';

// export const deployIdentityContract = () => { ... };
// export const findIdentityAPI = () => { ... };
// export const register = () => { ... }; // Example Exports 

import express from 'express';
import cors from 'cors';
// Pino removed

// Midnight SDK Imports
import { type ContractAddress, type CurvePoint, type WitnessContext } from '@midnight-ntwrk/compact-runtime'; 
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { type PublicDataProvider, type PrivateStateProvider, type ProofProvider, type WalletProvider, type MidnightProvider as MidnightSubmitProvider, type UnbalancedTransaction, type BalancedTransaction, type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { CoinInfo } from '@midnight-ntwrk/ledger'; 
import { WalletBuilder } from '@midnight-ntwrk/wallet';
import type { Wallet } from '@midnight-ntwrk/wallet-api';
import { NetworkId as ZswapNetworkId } from '@midnight-ntwrk/zswap';

// Local Imports
import {
  type DeployedIdentityRegistryContract,
  emptyState,
  type IdentityRegistryContract,
  type IdentityRegistryDerivedState,
  type IdentityRegistryProviders,
  type IdentityRegistryCircuitKeys,
  type IdentityRegistryPrivateStateSchema,
  type IdentityRegistryWitnesses,
  type IdentityRegistryPrivateState,
} from './common-types.js'; 
import { Contract, ledger } from '@identity-amm/signature-registry-contract'; 
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { combineLatest, map, type Observable, retry, scan, filter, shareReplay, take } from 'rxjs';
import * as utils from './utils/index.js';

// --- Configuration ---
const PORT = process.env.PORT || 3002; 
const SIGNATURE_REGISTRY_CONTRACT_ADDRESS_ENV = process.env.SIGNATURE_REGISTRY_CONTRACT_ADDRESS;
const WALLET_SEED = process.env.WALLET_SEED || '0000000000000000000000000000000000000000000000000000000000000000'; // Default seed if no snapshot
const WALLET_SERIALIZED_STATE = process.env.WALLET_SERIALIZED_STATE; // Read serialized state from env

const NETWORK_ID_FOR_BUILDER: ZswapNetworkId = ZswapNetworkId.TestNet; // Use the enum from zswap
const INDEXER_HTTP_URL = process.env.INDEXER_URL || 'https://indexer.testnet-02.midnight.network/api/v1/graphql'; 
const INDEXER_WSS_URL = INDEXER_HTTP_URL.replace(/^http/, 'ws'); 
const PROVER_URL = process.env.PROVER_URL || 'http://127.0.0.1:6300/'; 
const NODE_RPC_URL = process.env.NODE_RPC_URL || 'https://rpc.testnet-02.midnight.network';
const ZK_CONFIG_URL = process.env.ZK_CONFIG_URL || 'http://localhost:8891'; // Placeholder
const LOG_LEVEL = (process.env.LOG_LEVEL || 'info') as any; 
// --- End Configuration ---

// Update witness function signature to match common-types
function getWitnesses(walletInstance: Wallet): IdentityRegistryWitnesses {
    return {
        own_wallet_public_key: (context: WitnessContext<any, IdentityRegistryPrivateState>): [IdentityRegistryPrivateState, bigint] => {
            console.warn("[WITNESS] own_wallet_public_key: Using placeholder 0n. Needs implementation.");
            const walletKeyField: bigint = 0n;
            // Since private state is never, cast undefined to never for the return type
            return [undefined as never, walletKeyField];
        },
    };
}

let contractDefinition: IdentityRegistryContract;
let identityApiInstance: IdentityAPI | null = null;
let wallet: Wallet;

// --- IdentityAPI Class --- 
export class IdentityAPI { 
  private constructor(
    // Use `any` for deployedContract to bypass strict type checks for now
    public readonly deployedContract: any,
    public readonly providers: IdentityRegistryProviders,
  ) {
    const combineRegistrations = (
      acc: IdentityRegistryDerivedState,
      ledgerData: any | null 
    ): IdentityRegistryDerivedState => {
        const signingKeysMap = ledgerData?.registered_signing_keys as Map<bigint, CurvePoint> | undefined;
        if (!signingKeysMap) { 
            console.warn('[DEBUG] combineRegistrations received null or invalid ledger map.');
            return acc; 
        }
      const updatedRegistrations = new Map<string, CurvePoint>(); 
      for (const [walletKeyField, signingKey] of signingKeysMap.entries()) {
          const walletKeyString = walletKeyField.toString();
          updatedRegistrations.set(walletKeyString, signingKey);
      }
      console.log(`[DEBUG] Rebuilt registration map from ledger. Size: ${updatedRegistrations.size}`);
      return { registrations: updatedRegistrations };
    };

    // Assume contractAddress is directly available
    this.deployedContractAddress = deployedContract.contractAddress;

    this.state$ = combineLatest(
      [
        (providers.publicDataProvider)
          .contractStateObservable(this.deployedContractAddress, { type: 'all' })
          .pipe(map((contractState: any) => {
             try {
                const parsed = ledger(contractState.data) as any;
                return parsed;
             } catch (e: any) {
                console.error(`[ERROR] Error parsing signature registry ledger data: ${e?.message}`, { contractStateData: contractState.data, error: e });
                return null;
             }
           })),
      ],
      (parsedLedgerData: any | null) => parsedLedgerData,
    ).pipe(
      filter((state): state is any => state !== null),
      scan(combineRegistrations, emptyState),
      retry({ delay: 500 }),
      shareReplay(1)
    );

    this.state$.subscribe(state => {
      console.log(`[DEBUG] Signature registry derived state updated. Registration Count: ${state.registrations.size}`);
    });
  }

  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<IdentityRegistryDerivedState>;

  async register(signing_key: CurvePoint): Promise<void> {
    console.log('[INFO] Registering signing key...', signing_key);
    // Assume register method is directly available
    await this.deployedContract.register(signing_key);
    console.log('[INFO] Registration transaction submitted for key:', signing_key);
  }

  async getSigningKey(walletAddressField: bigint): Promise<CurvePoint> {
    console.log('[INFO] Getting signing key for wallet address (Field): ', walletAddressField);
    // Assume get_signing_key method is directly available
    const signingKey = await this.deployedContract.get_signing_key(walletAddressField);
    console.log('[INFO] Retrieved signing key:', signingKey);
    return signingKey;
  }

  static async deploy(providers: IdentityRegistryProviders): Promise<IdentityAPI> {
    console.log('[INFO] Deploying new Signature Registry contract...');
    const deployedContract = await deployContract(providers, {
      privateStateKey: 'identityRegistry',
      initialPrivateState: undefined as never,
      contract: contractDefinition as any, // Cast to any to bypass type check
    });
    // Access address via deployTxData (a common pattern)
    const address = deployedContract.deployTxData?.public?.contractAddress;
    if (!address) {
        throw new Error("Could not retrieve contract address after deployment.");
    }
    console.log(`[INFO] Contract deployed successfully. Address: ${address}`);
    return new IdentityAPI(deployedContract, providers);
  }

  static async subscribe(
    providers: IdentityRegistryProviders,
    contractAddress: ContractAddress,
  ): Promise<IdentityAPI> {
    console.log(`[INFO] Subscribing to existing Signature Registry contract: ${contractAddress}`);
    const deployedContract = await findDeployedContract(providers, {
      privateStateKey: 'identityRegistry',
      contractAddress,
      // Cast contractDefinition if necessary, but try without first
      contract: contractDefinition as any, // Cast to any to bypass type check
    });
    console.log(`[INFO] Successfully subscribed to contract: ${contractAddress}`);
    return new IdentityAPI(deployedContract, providers);
  }
}

// --- Server Initialization ---
async function initializeServer() {
  console.log('[INFO] Initializing Signature Registry API server...');

  let providers: IdentityRegistryProviders;
  let wallet: Wallet;
  try {
    console.log('[INFO] Initializing individual Midnight providers...');
    const zkConfigProvider = new FetchZkConfigProvider<IdentityRegistryCircuitKeys>(ZK_CONFIG_URL);
    const proofProviderImpl = httpClientProofProvider(PROVER_URL);
    const publicDataProviderImpl = indexerPublicDataProvider(INDEXER_HTTP_URL, INDEXER_WSS_URL);
    const privateStateProviderImpl = levelPrivateStateProvider<IdentityRegistryPrivateStateSchema>();

    // Always build wallet from seed
    console.warn('[WARN] Building wallet from seed. WALLET_SEED env var should be set for persistence/security.');
    wallet = await WalletBuilder.buildFromSeed(
        INDEXER_HTTP_URL,
        INDEXER_WSS_URL,
        PROVER_URL,
        NODE_RPC_URL,
        WALLET_SEED,
        NETWORK_ID_FOR_BUILDER,
        LOG_LEVEL
    );
    console.log('[INFO] Wallet instance built from seed.');

    console.log('[INFO] Individual providers instantiated.');

    // Create adapter objects for WalletProvider and MidnightSubmitProvider
    const walletProviderAdapter: WalletProvider = {
        coinPublicKey: "PLACEHOLDER_COIN_PUBLIC_KEY",
        balanceTx: wallet.balanceTransaction.bind(wallet) as any,
    };
    const midnightSubmitProviderAdapter: MidnightSubmitProvider = {
        submitTx: wallet.submitTransaction.bind(wallet),
    };

    // Initialize contractDefinition with witnesses
    contractDefinition = new Contract(getWitnesses(wallet));

    // Assemble providers object using the adapter objects
    providers = {
      zkConfigProvider,
      proofProvider: proofProviderImpl,
      publicDataProvider: publicDataProviderImpl,
      privateStateProvider: privateStateProviderImpl,
      walletProvider: walletProviderAdapter,
      midnightProvider: midnightSubmitProviderAdapter,
    };
    console.log('[INFO] Providers object assembled.');

    console.log('[INFO] Wallet initialized.');

  } catch (error: any) {
    console.error(`[ERROR] Failed to initialize/assemble Midnight providers or wallet: ${error?.message}`, error);
    process.exit(1);
  }

  // Deploy or Subscribe 
  try {
    if (SIGNATURE_REGISTRY_CONTRACT_ADDRESS_ENV) {
      identityApiInstance = await IdentityAPI.subscribe(providers, SIGNATURE_REGISTRY_CONTRACT_ADDRESS_ENV);
    } else {
      identityApiInstance = await IdentityAPI.deploy(providers);
    }
  } catch (error: any) {
      console.error(`[ERROR] Failed to deploy or subscribe to the Signature Registry contract: ${error?.message}`, error);
      console.warn('[WARN] Proceeding without a valid IdentityAPI instance due to deploy/subscribe error.');
  }

  // Express App Setup 
  const app = express();
  app.use(cors());
  app.use(express.json());
  // Removed pinoHttp middleware

  // Basic readiness probe
  app.get('/', (_req, res) => {
    if (identityApiInstance) {
      res.send(`Signature Registry API is running. Contract Address: ${identityApiInstance.deployedContractAddress}`);
    } else {
      res.status(503).send('Signature Registry API is initializing or failed to initialize/deploy/subscribe.');
    }
  });

  // Endpoint to get the contract address
  app.get('/address', (_req, res) => {
    if (identityApiInstance) {
      res.json({ address: identityApiInstance.deployedContractAddress });
    } else {
       res.status(503).send('API not ready or contract not available.');
    }
  });

  // Endpoint to get the current derived state (registrations)
  app.get('/state', (_req, res) => {
    if (identityApiInstance) {
        identityApiInstance.state$.pipe(take(1)).subscribe({
            next: (state) => {
                const registrationsObj = Object.fromEntries(state.registrations.entries());
                res.json({ registrations: registrationsObj });
            },
            error: (err) => {
                console.error("[ERROR] Error fetching state: ", err);
                res.status(500).send('Error fetching state');
            }
        });
    } else {
      res.status(503).send('API not initialized');
    }
  });

  // Updated /register endpoint
  app.post('/register', async(req, res) => {
    if (!identityApiInstance) {
      res.status(503).send('API not initialized');
      return;
    }
    try {
      const { signing_key } = req.body as { signing_key: { x: string, y: string } };
      if (!signing_key || typeof signing_key.x !== 'string' || typeof signing_key.y !== 'string') {
          res.status(400).send('Invalid or missing signing_key in request body. Expected CurvePoint { x: string, y: string }.');
          return;
      }
      const signingKeyBigInt: CurvePoint = {
          x: BigInt(signing_key.x),
          y: BigInt(signing_key.y)
      };
      await identityApiInstance.register(signingKeyBigInt);
      res.status(200).send('Registration submitted');
      return;
    } catch (error: any) {
      console.error(`[ERROR] /register endpoint failed: ${error?.message}`, error);
       if (error instanceof SyntaxError || (error instanceof TypeError && error.message.includes("BigInt"))) {
           res.status(400).send('Invalid format for signing_key coordinates (must be convertible to BigInt).');
       } else {
           res.status(500).send('Registration failed');
       }
       return;
    }
  });

  // New endpoint to get signing key
  app.get('/signing-key/:walletAddress', async (req, res) => {
    if (!identityApiInstance) {
      res.status(503).send('API not initialized');
      return;
    }
    try {
      const walletAddressString = req.params.walletAddress;
      const walletAddressField = BigInt(walletAddressString);

      const signingKey = await identityApiInstance.getSigningKey(walletAddressField);
      const signingKeyString = {
          x: signingKey.x.toString(),
          y: signingKey.y.toString()
      };
      res.status(200).json(signingKeyString);
      return;
    } catch (error: any) {
        if (error?.message?.includes("Lookup failed")) {
             console.log(`[INFO] Signing key not found for address: ${req.params.walletAddress}`);
             res.status(404).send('Signing key not found for the given wallet address.');
             return;
        }
       if (error instanceof SyntaxError || (error instanceof TypeError && error.message.includes("BigInt"))) {
           res.status(400).send('Invalid walletAddress parameter (must be convertible to BigInt).');
           return;
       } else {
            console.error(`[ERROR] /signing-key/:walletAddress endpoint failed: ${error?.message}`, error);
            res.status(500).send('Failed to get signing key');
            return;
       }
    }
  });

  app.listen(PORT, () => {
    console.log(`[INFO] Signature Registry API server listening on port ${PORT}`);
    if (identityApiInstance) {
      console.log(`[INFO] Contract Address: ${identityApiInstance.deployedContractAddress}`);
    }
  });
}

initializeServer().catch(error => {
  console.error(`[FATAL] Failed to start Signature Registry API server: ${error?.message}`, error);
  process.exit(1);
});

export * from './utils/index.js';
export * from './common-types.js';

// Removed redundant export: export { IdentityAPI }; 