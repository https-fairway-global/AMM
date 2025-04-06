import express from 'express';
import cors from 'cors';
import pino from 'pino';
import type { Logger } from 'pino';

// Midnight SDK Imports (using paths that worked previously, with workarounds)
import { type ContractAddress, MidnightProvider } from '@midnight-ntwrk/midnight-js-provider'; // Reverted import path
import { type DeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';

// Local Imports
import {
  type DeployedIdentityRegistryContract,
  emptyState,
  type IdentityRegistryContract,
  type IdentityRegistryDerivedState,
  type IdentityRegistryProviders,
} from './common-types.js';
// Correcting the contract import path
import { Contract, CurvePoint, ledger, witnesses } from '@identity-amm/signature-registry-contract'; 
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { combineLatest, map, type Observable, retry, scan } from 'rxjs';
import * as utils from './utils/index.js';

// --- Configuration ---
const PORT = process.env.PORT || 3002; // Different port from amm-api
const SIGNATURE_REGISTRY_CONTRACT_ADDRESS_ENV = process.env.SIGNATURE_REGISTRY_CONTRACT_ADDRESS;
const NETWORK_ID: NetworkId = NetworkId.TestNet; 
const INDEXER_URL = process.env.INDEXER_URL || 'https://indexer.testnet-02.midnight.network/api/v1/graphql'; 
const PROVER_URL = process.env.PROVER_URL || 'http://127.0.0.1:6300/'; 
// TODO: Confirm the correct URL for ZkConfigProvider. Using localhost as placeholder.
const ZK_CONFIG_URL = process.env.ZK_CONFIG_URL || 'http://localhost:8891'; 
// --- End Configuration ---

// Use the specific contract type
const contractDefinition: IdentityRegistryContract = new Contract(witnesses);

// Logger setup
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// Global variable to hold the API instance
let identityApiInstance: IdentityAPI | null = null;

// --- IdentityAPI Class (Modified imports/types slightly) ---
export interface DeployedIdentityAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<IdentityRegistryDerivedState>;
  register: (pk: CurvePoint) => Promise<void>;
}

export class IdentityAPI implements DeployedIdentityAPI {
  private constructor(
    // Using 'any' temporarily due to persistent DeployedContract type issues
    public readonly deployedContract: any, // DeployedIdentityRegistryContract,
    public readonly providers: IdentityRegistryProviders,
    private readonly logger: Logger,
  ) {
    const combine = (
      acc: IdentityRegistryDerivedState,
      value: IdentityRegistryDerivedState,
    ): IdentityRegistryDerivedState => {
      return {
        whoami: value.whoami,
        // Add other relevant state properties if needed
      };
    };

    // Assuming deployedContract has the address directly or via deployTxData
    // Adjust based on actual structure after fixing 'any' type
    this.deployedContractAddress = deployedContract.deployTxData?.public?.contractAddress || deployedContract.contractAddress;
    if (!this.deployedContractAddress) {
        throw new Error("Could not determine contract address from deployedContract object.");
    }

    this.state$ = combineLatest(
      [
        providers.publicDataProvider
          .contractStateObservable(this.deployedContractAddress, { type: 'all' })
          .pipe(map((contractState: any) => ledger(contractState.data))), // Using 'any' for contractState data
      ],
      (ledgerState: any) => { // Using 'any' for ledgerState
        // TODO: Implement proper state derivation based on ledgerState
        const result: IdentityRegistryDerivedState = {
          whoami: 'derived-state-placeholder', // Update with actual logic
        };
        return result;
      },
    ).pipe(
      scan(combine, emptyState),
      retry({
        delay: 500,
      }),
    );

    // Log state changes (optional)
    this.state$.subscribe(state => {
      this.logger.debug({ state }, 'Identity contract state updated');
    });
  }

  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<IdentityRegistryDerivedState>;

  async register(pk: CurvePoint): Promise<void> {
    this.logger.info({ publicKey: pk }, `Registering public key...`);
    // Adjust call based on actual structure after fixing 'any' type
    // It might be deployedContract.functions.register or deployedContract.callTx.register
    if (this.deployedContract.callTx?.register) {
        await this.deployedContract.callTx.register(pk);
    } else if (typeof this.deployedContract.register === 'function') {
        await this.deployedContract.register(pk);
    } else {
        throw new Error("Could not find 'register' function on deployed contract object.");
    }
    this.logger.info({ publicKey: pk }, `Registration transaction submitted.`);
  }

  static async deploy(providers: IdentityRegistryProviders, logger: Logger): Promise<IdentityAPI> {
    logger.info('Deploying new Signature Registry contract...');
    // Using 'any' temporarily for DeployedContract return type
    const deployedContract: any = await deployContract(providers, {
      privateStateKey: 'identityRegistry', // Key for storing private state locally
      // TODO: Define initial private state if needed by the contract constructor/logic
      initialPrivateState: { localSecretKey: utils.randomBytes(32) }, // Example, adjust as needed
      contract: contractDefinition, // Use the specific contract definition
      // constructorArgs: [], // Add constructor arguments if the contract requires them
    });
    logger.info({ address: deployedContract.deployTxData?.public?.contractAddress || deployedContract.contractAddress }, 'Contract deployed successfully.');
    return new IdentityAPI(deployedContract, providers, logger);
  }

  static async subscribe(
    providers: IdentityRegistryProviders,
    contractAddress: ContractAddress,
    logger: Logger,
  ): Promise<IdentityAPI> {
    logger.info({ contractAddress }, 'Subscribing to existing Signature Registry contract...');
    // Using 'any' temporarily for DeployedContract return type
    const deployedGameContract: any = await findDeployedContract(providers, {
      privateStateKey: 'identityRegistry', // Must match the key used during deployment
      contractAddress,
      contract: contractDefinition, // Use the specific contract definition
    });
    logger.info({ contractAddress }, 'Successfully subscribed to contract.');
    return new IdentityAPI(deployedGameContract, providers, logger);
  }
}

// --- Server Initialization ---
async function initializeServer() {
  logger.info('Initializing Signature Registry API server...');

  let midnightProvider: MidnightProvider;
  try {
    logger.info('Initializing Midnight providers...');
    const fetchZkConfigProvider = new FetchZkConfigProvider(ZK_CONFIG_URL);
    const proofProvider = httpClientProofProvider(PROVER_URL);
    const publicDataProvider = indexerPublicDataProvider(INDEXER_URL, INDEXER_URL); 
    const privateStateProvider = levelPrivateStateProvider(); 

    midnightProvider = new MidnightProvider({
      networkId: NETWORK_ID,
      privateStateProvider,
      publicDataProvider,
      proofProvider,
      zkConfigProvider: fetchZkConfigProvider,
    });
    logger.info('Midnight providers initialized.');

  } catch (error) {
    logger.error({ err: error }, "Failed to initialize MidnightProvider");
    process.exit(1);
  }

  const providers: IdentityRegistryProviders = {
      midnightProvider,
      publicDataProvider: midnightProvider.publicDataProvider,
      privateStateProvider: midnightProvider.privateStateProvider,
      proofProvider: midnightProvider.proofProvider,
      zkConfigProvider: midnightProvider.zkConfigProvider,
      wallet: midnightProvider.wallet, // Assuming wallet is part of the provider
  };

  try {
    if (SIGNATURE_REGISTRY_CONTRACT_ADDRESS_ENV) {
      logger.info(`Found existing contract address in ENV: ${SIGNATURE_REGISTRY_CONTRACT_ADDRESS_ENV}`);
      identityApiInstance = await IdentityAPI.subscribe(providers, SIGNATURE_REGISTRY_CONTRACT_ADDRESS_ENV, logger);
    } else {
      logger.warn('No SIGNATURE_REGISTRY_CONTRACT_ADDRESS found in environment variables. Deploying a new contract...');
      identityApiInstance = await IdentityAPI.deploy(providers, logger);
      logger.info(`Using newly deployed contract address: ${identityApiInstance.deployedContractAddress}`);
      // NOTE: In a real setup, you'd want to persist this new address!
    }
  } catch (error) {
      logger.error({ err: error }, "Failed to deploy or subscribe to the Signature Registry contract");
      process.exit(1);
  }

  // --- Express App Setup ---
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(pino.Http({ logger }));

  // Basic readiness probe
  app.get('/', (_req, res) => {
    if (identityApiInstance) {
      res.send(`Signature Registry API is running. Contract Address: ${identityApiInstance.deployedContractAddress}`);
    } else {
      res.status(503).send('Signature Registry API is initializing or failed to initialize.');
    }
  });

  // Endpoint to get the contract address
  app.get('/address', (_req, res) => {
    if (identityApiInstance) {
      res.json({ contractAddress: identityApiInstance.deployedContractAddress });
    } else {
       res.status(503).send('API not ready.');
    }
  });

  // Endpoint to register a public key
  app.post('/register', async (req, res) => {
    if (!identityApiInstance) {
      return res.status(503).send('API not ready.');
    }

    const { publicKey } = req.body;
    if (!publicKey || typeof publicKey !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid publicKey in request body (must be a string).' });
    }

    try {
      // TODO: Parse the publicKey string into the CurvePoint type needed by the contract.
      // This depends heavily on how CurvePoint is serialized (e.g., hex, base64, object).
      // Placeholder - ASSUMING publicKey is directly usable or parseable
      const parsedPk: CurvePoint = publicKey as any; // VERY UNSAFE - REPLACE WITH ACTUAL PARSING
      
      logger.info({ body: req.body }, 'Received /register request');
      await identityApiInstance.register(parsedPk);
      res.status(202).json({ message: 'Registration request submitted.' }); // 202 Accepted
    } catch (error: any) {
      logger.error({ err: error, body: req.body }, 'Error during /register');
      res.status(500).json({ error: 'Failed to register public key.', details: error.message });
    }
  });

  app.listen(PORT, () => {
    logger.info(`Signature Registry API server listening on port ${PORT}`);
  });
}

initializeServer().catch(error => {
  logger.fatal({ err: error }, "Failed to start Signature Registry API server");
  process.exit(1);
});

// Export necessary types/classes if needed by other modules
export * from './utils/index.js';
export * from './common-types.js';
export { IdentityAPI }; // Export the class
