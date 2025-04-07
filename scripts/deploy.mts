// --- Polyfill globalThis.crypto for Node.js v18+ ESM ---
import { webcrypto } from 'crypto';
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = webcrypto as any; // Use 'as any' for broader compatibility
}
// --- End polyfill ---

// Import the setter and enum from the network-id package
import { setNetworkId, NetworkId as ConfigNetworkId } from '@midnight-ntwrk/midnight-js-network-id'; 
// Import NetworkId from ledger ONLY for type checking WalletBuilder.build
import { NetworkId } from '@midnight-ntwrk/ledger';

// Load environment variables from .env file
import {
    deployContract as deployContractFn,
    type DeployContractOptions,
} from '@midnight-ntwrk/midnight-js-contracts';
import type {
    VerifierKey,
    ZKConfigProvider,
    WalletProvider,
    MidnightProviders,
    MidnightProvider,
    PublicDataProvider,
    PrivateStateProvider,
    ProofProvider,
    ProverKey,
    ZKIR,
    ZKConfig,
    Contract,
    Witnesses
} from '@midnight-ntwrk/midnight-js-types';
import { WalletBuilder } from '@midnight-ntwrk/wallet';
import type { WalletState } from '@midnight-ntwrk/wallet-api';
import * as bip39 from 'bip39';
import dotenv from 'dotenv';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import fetch from 'node-fetch';
import { firstValueFrom } from 'rxjs';
import { type SigningKey } from '@midnight-ntwrk/compact-runtime';
import { sampleSigningKey } from '@midnight-ntwrk/compact-runtime';
// Import LedgerParameters from zswap
import { LedgerParameters } from '@midnight-ntwrk/zswap';

// --- Set Global Network ID --- 
setNetworkId(ConfigNetworkId.TestNet); // Use the enum from the network-id package here
console.log('Global Network ID set to TestNet');
// --- End Set Global Network ID ---

// Load environment variables from .env file
dotenv.config();

// Configuration Constants
const CONFIG = {
    proofServer: process.env.PROVER_URL || 'http://127.0.0.1:6300/',
    indexer: process.env.INDEXER_URL || 'https://indexer.testnet-02.midnight.network/api/v1/graphql',
    indexerWs: (process.env.INDEXER_URL || 'https://indexer.testnet-02.midnight.network/api/v1/graphql').replace(/^http/, 'ws') + '/ws',
    node: process.env.NODE_RPC_URL || 'https://rpc.testnet-02.midnight.network',
} as const;

// --- Interfaces ---

interface ContractConfig {
    name: string;
    contract: Contract<any, Witnesses<any>>;
    circuits: string[];
    privateStateId: string;
}

interface DeployedContractData {
    deployTxData: {
        public: {
            contractAddress: string;
        };
    };
}

interface ExtendedWalletProvider extends WalletProvider, MidnightProvider {
    coinPublicKey: string;
}

interface DeploymentProviders {
    publicDataProvider: PublicDataProvider;
    proofProvider: ProofProvider<string>;
    privateStateProvider: PrivateStateProvider<any>;
    walletProvider: WalletProvider;
    midnightProvider: MidnightProvider;
    zkConfigProvider: ZKConfigProvider<string>;
    ledgerParameters: LedgerParameters;
}

// --- Contract Loading ---

async function loadContracts(): Promise<ContractConfig[]> {
    console.log('\n=== Loading Contract Modules ===');

    // Import compiled contract modules (adjust paths if script location changes)
    const sigRegModule = await import('../identity-amm/signature-registry-contract/src/generated/contract/index.cjs');
    const ammModule = await import('../identity-amm/amm-contract/src/generated/contract/index.cjs');
    const ethVerifyModule = await import('../identity-amm/ethiopia-verification-contract/src/generated/contract/index.cjs');

    // Import specific witness types again for dummy functions
    const createSigRegWitness = (): import('../identity-amm/signature-registry-contract/src/generated/contract/index.cjs').Witnesses<any> => ({
        own_wallet_public_key: () => { throw new Error("Dummy own_wallet_public_key witness called during deployment"); }
    });

    const createAmmWitness = (): import('../identity-amm/amm-contract/src/generated/contract/index.cjs').Witnesses<any> => ({
        user_secret_key: () => { throw new Error("Dummy user_secret_key witness called during deployment"); }
    });

    const createEthiopiaWitness = (): import('../identity-amm/ethiopia-verification-contract/src/generated/contract/index.cjs').Witnesses<any> => ({
        parse_fayda_credential: () => { throw new Error("Dummy parse_fayda_credential witness called during deployment"); },
        user_secret_key: () => { throw new Error("Dummy user_secret_key witness called during deployment"); },
        current_time: () => { throw new Error("Dummy current_time witness called during deployment"); }
    });

    // TODO: Verify circuit names and state keys against actual contract implementations
    const contracts: ContractConfig[] = [
        {
            name: 'Signature Registry',
            contract: new sigRegModule.Contract(createSigRegWitness()), 
            circuits: [
                'register',
                'get_signing_key',
                'register_verification', 
                'is_user_verified', 
                'get_verification_expiration'
            ],
            privateStateId: 'identityRegistry' 
        },
        {
            name: 'AMM',
            contract: new ammModule.Contract(createAmmWitness()), 
            circuits: [
                'swap',
                'initialize',
                'get_user_shares',
                'get_pool_info',
                'get_pool_count',
                'create_pool',
                'add_liquidity'
            ],
            privateStateId: 'ammState'
        },
        {
            name: 'Ethiopia Verification',
            contract: new ethVerifyModule.Contract(createEthiopiaWitness()),
            circuits: [ 
                'register_verification',
                'is_user_verified',
                'get_verification_expiration',
                'verify_extra'
            ],
            privateStateId: 'ethiopiaVerification' 
        }
    ];

    console.log('Contract configurations loaded:', contracts.map(c => ({
        name: c.name,
        circuits: c.circuits,
        privateStateId: c.privateStateId
    })));

    return contracts;
}

// --- Health Checks ---

async function checkProofServer(): Promise<void> {
    console.log('\n=== Checking Proof Server ===');
    try {
        // Use node-fetch for the request
        const response = await fetch(CONFIG.proofServer, {}); // Make sure fetch is imported/required
        if (!response.ok) {
            // Use statusText for more descriptive errors if available
            throw new Error(`Proof server returned status ${response.status} ${response.statusText}`);
        }
        console.log(`✓ Proof server is running at ${CONFIG.proofServer}`);
    } catch (error: any) {
        console.error(`✗ Failed to connect to proof server at ${CONFIG.proofServer}:`, error.message);
        throw new Error('Please ensure the proof server is running (e.g., in Docker on port 6300)');
    }
}

// --- Provider Setup ---

async function createProviders(): Promise<DeploymentProviders> {
    // Dynamically import SDK components
    const { WalletBuilder } = await import('@midnight-ntwrk/wallet');
    const { levelPrivateStateProvider } = await import('@midnight-ntwrk/midnight-js-level-private-state-provider');
    const { httpClientProofProvider } = await import('@midnight-ntwrk/midnight-js-http-client-proof-provider');
    const { indexerPublicDataProvider } = await import('@midnight-ntwrk/midnight-js-indexer-public-data-provider');

    console.log('\n=== Initializing Wallet ===');

    const mnemonic = process.env.MNEMONIC;
    if (!mnemonic) throw new Error('MNEMONIC required in .env file');
    console.log('Using mnemonic from .env');

    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic format in .env');
    }
    console.log('✓ Valid BIP-39 mnemonic');

    console.log('\nGenerating seed from mnemonic...');
    const entropy = bip39.mnemonicToEntropy(mnemonic);
    // Ensure seed is 32 bytes (64 hex chars), pad if necessary (standard BIP39 entropy is usually sufficient)
    const seed = Buffer.from(entropy, 'hex').slice(0, 32).toString('hex').padEnd(64, '0');
    console.log('Using seed (first 32 bytes, hex):', seed);

    console.log('\nBuilding wallet...');
    // Use non-deprecated WalletBuilder.build, pass arguments in correct order
    const wallet = await WalletBuilder.build(
        CONFIG.indexer,
        CONFIG.indexerWs,
        CONFIG.proofServer,
        CONFIG.node,
        seed,                // 5th argument is seed
        NetworkId.TestNet,   // 6th argument is NetworkId (from zswap import)
        undefined            // 7th argument is optional minLogLevel
    );

    console.log('\nStarting wallet and waiting for sync...');
    wallet.start();

    await new Promise<void>((resolve, reject) => {
        let lastProgressString = '';
        let syncTimeoutId: NodeJS.Timeout | null = null;
        const maxSyncWaitTime = 60000; // Wait max 60 seconds for sync activity

        const startTimeout = () => {
             if (syncTimeoutId) clearTimeout(syncTimeoutId);
             syncTimeoutId = setTimeout(() => {
                 console.warn('Sync status unchanged for a while. Proceeding, but state might be incomplete.');
                 subscription.unsubscribe(); // Important to prevent memory leaks
                 resolve();
             }, maxSyncWaitTime);
        }

        const subscription = wallet.state().subscribe({
            next: (state: WalletState) => {
                startTimeout(); // Reset timeout on any state update

                // Simpler progress logging - check if syncProgress object exists
                const progressString = state.syncProgress
                    ? `Syncing... (Details: ${JSON.stringify(state.syncProgress)})` // Log the whole object for inspection
                    : 'Not actively syncing';

                if (progressString !== lastProgressString) {
                    console.log(`Sync status: ${progressString}`);
                    lastProgressString = progressString;
                }

                // Resolve when syncProgress is undefined (idle/synced)
                if (!state.syncProgress) { 
                     if (syncTimeoutId) clearTimeout(syncTimeoutId);
                     console.log('✓ Wallet synchronized or idle.');
                     subscription.unsubscribe(); // Important!
                     resolve();
                }
            },
            error: (err) => {
                if (syncTimeoutId) clearTimeout(syncTimeoutId);
                console.error('Error during wallet sync:', err);
                reject(err); // Reject the promise on error
            }
        });

        startTimeout(); // Start initial timeout
    });

    const finalState = await firstValueFrom(wallet.state());
    console.log('\n=== Wallet State ===');
    console.log('Coin Public Key (Bech32m):', finalState.coinPublicKey);
    console.log('Available Coins:', finalState.availableCoins?.length ?? 0);
    if (!finalState.availableCoins || finalState.availableCoins.length === 0) {
        console.warn('WARNING: Wallet has no available coins. Deployment might fail. Ensure wallet is funded with tDUST.');
    }

    // Adapter uses coinPublicKey (non-legacy)
    const walletProviderAdapter: WalletProvider & MidnightProvider = {
        coinPublicKey: finalState.coinPublicKey,
        balanceTx: wallet.balanceTransaction.bind(wallet) as any,
        submitTx: wallet.submitTransaction.bind(wallet)
    };

    // --- ZK Config Provider (Filesystem based) ---
    const zkConfigProvider: ZKConfigProvider<string> = {
        async getVerifierKey(circuitId: string): Promise<VerifierKey> {
            console.log(`zkConfigProvider: Getting verifier key for ${circuitId}`);
            // Assume circuitId is just the base name (e.g., 'register', 'swap')
            // We need to know which contract it belongs to. This requires a lookup or assumption.
            // For now, let's *assume* we can guess the contract dir based on the name,
            // but this is fragile and needs a better solution if names clash.
            const contractDir = circuitId.includes('verify') || circuitId.includes('register') || circuitId.includes('signing') || circuitId.includes('expiration')
                               ? (circuitId.includes('ethiopia') ? 'ethiopia-verification-contract' : 'signature-registry-contract') 
                               : 'amm-contract'; // Default guess
             if (!['signature-registry-contract', 'amm-contract', 'ethiopia-verification-contract'].includes(contractDir)) {
                 // A more robust check based on actual known circuits per contract would be better
                 console.warn(`zkConfigProvider: Could not reliably determine contract directory for circuit ${circuitId}. Guessing ${contractDir}.`);
             }

            const keyPath = join('identity-amm', contractDir, 'src', 'generated', 'keys', `${circuitId}.verifier`);
            console.log(`zkConfigProvider: Reading verifier key from ${keyPath}`);
            try {
                const keyData = await readFile(keyPath);
                console.log(`zkConfigProvider: Loaded verifier key for ${circuitId} (${keyData.length} bytes)`);
                // Cast the Uint8Array to the branded VerifierKey type
                return new Uint8Array(keyData) as VerifierKey;
            } catch (error: any) {
                 console.error(`zkConfigProvider: Error reading verifier key at ${keyPath}: ${error.message}`);
                 throw error;
            }
        },
        async getVerifierKeys(circuitIds: string[]): Promise<[string, VerifierKey][]> {
            return Promise.all(circuitIds.map(async id => [id, await this.getVerifierKey(id)] as [string, VerifierKey]));
        },
        async getZKIR(circuitId: string): Promise<ZKIR> { // Return branded ZKIR type
             console.log(`zkConfigProvider: Getting ZKIR for ${circuitId}`);
             const contractDir = circuitId.includes('verify') || circuitId.includes('register') || circuitId.includes('signing') || circuitId.includes('expiration')
                                ? (circuitId.includes('ethiopia') ? 'ethiopia-verification-contract' : 'signature-registry-contract') 
                                : 'amm-contract'; // Default guess
             const zkPath = join('identity-amm', contractDir, 'src', 'generated', 'zkir', `${circuitId}.zkir`);
             console.log(`zkConfigProvider: Reading ZKIR from ${zkPath}`);
             try {
                 const zkData = await readFile(zkPath);
                 console.log(`zkConfigProvider: Loaded ZKIR for ${circuitId} (${zkData.length} bytes)`);
                 // Cast the Uint8Array to the branded ZKIR type
                 return new Uint8Array(zkData) as ZKIR;
             } catch (error: any) {
                 console.error(`zkConfigProvider: Error reading ZKIR at ${zkPath}: ${error.message}`);
                 throw error;
             }
        },
        async getProverKey(circuitId: string): Promise<ProverKey> { // Return branded ProverKey type
             console.log(`zkConfigProvider: Getting prover key for ${circuitId}`);
             const contractDir = circuitId.includes('verify') || circuitId.includes('register') || circuitId.includes('signing') || circuitId.includes('expiration')
                                ? (circuitId.includes('ethiopia') ? 'ethiopia-verification-contract' : 'signature-registry-contract') 
                                : 'amm-contract'; // Default guess
             const keyPath = join('identity-amm', contractDir, 'src', 'generated', 'keys', `${circuitId}.prover`);
             console.log(`zkConfigProvider: Reading prover key from ${keyPath}`);
             try {
                const keyData = await readFile(keyPath);
                console.log(`zkConfigProvider: Loaded prover key for ${circuitId} (${keyData.length} bytes)`);
                 // Cast the Uint8Array to the branded ProverKey type
                return new Uint8Array(keyData) as ProverKey;
             } catch (error: any) {
                 console.error(`zkConfigProvider: Error reading prover key at ${keyPath}: ${error.message}`);
                 throw error;
             }
        },
        async get(circuitId: string): Promise<ZKConfig<string>> { // Return ZKConfig type
             console.log(`zkConfigProvider: Getting all artifacts for ${circuitId}`);
             // No directory guessing needed here as it calls the other methods which handle it
             const [verifierKey, proverKey, zkir] = await Promise.all([
                 this.getVerifierKey(circuitId),
                 this.getProverKey(circuitId),
                 this.getZKIR(circuitId)
             ]);
             return { circuitId, verifierKey, proverKey, zkir }; 
        }
    };

    // --- Generate Dummy Ledger Parameters ---
    console.log('Generating dummy LedgerParameters...');
    const dummyLedgerParams = LedgerParameters.dummyParameters();

    // --- Assemble Providers ---
    return {
        publicDataProvider: indexerPublicDataProvider(CONFIG.indexer, CONFIG.indexerWs),
        proofProvider: httpClientProofProvider(CONFIG.proofServer),
        privateStateProvider: levelPrivateStateProvider(),
        walletProvider: walletProviderAdapter,
        midnightProvider: walletProviderAdapter,
        zkConfigProvider: zkConfigProvider,
        ledgerParameters: dummyLedgerParams
    };
}

// --- Deployment Function ---

async function deployContract(
    providers: DeploymentProviders,
    contractConfig: ContractConfig,
    initialState: any
): Promise<DeployedContractData> {
    const { name, contract, privateStateId } = contractConfig;
    console.log(`\n=== Deploying ${name} ===`);
    console.log(`Private state ID: ${privateStateId}`);

    // Re-add signing key generation
    const deployerSigningKey = sampleSigningKey();
    console.log(`Using deployer SigningKey (Sampled): ${deployerSigningKey}`);

    // Let TypeScript infer the options type, add args
    const deployOptions = {
        contract: contract,
        privateStateId: privateStateId,
        initialPrivateState: initialState,
        signingKey: deployerSigningKey,
        args: [], // Add missing args property
    };

     console.log('Deployment options:', {
         contractName: contract.constructor.name,
         privateStateId: deployOptions.privateStateId,
         initialPrivateState: deployOptions.initialPrivateState,
         signingKey: deployOptions.signingKey,
         args: deployOptions.args // Log args
     });

    try {
        console.log(`Attempting deployment of ${name}...`);
        const deployedContract = await deployContractFn(providers, deployOptions);

        if (!deployedContract?.deployTxData?.public?.contractAddress) {
             throw new Error('Deployment succeeded but contract address was not found in the result.');
        }

        console.log(`✓ ${name} deployed successfully!`);
        console.log(`   Address: ${deployedContract.deployTxData.public.contractAddress}`);
        return deployedContract;
    } catch (error: any) {
        console.error(`✗ Failed to deploy ${name}:`, error.message);
        if (error.stack) {
            console.error("Stack Trace:", error.stack);
        }
        throw error;
    }
}

// --- Main Execution ---

async function main(): Promise<void> {
    console.log('Starting deployment script...');

    // 1. Check prerequisites
    await checkProofServer();

    // 2. Setup providers (includes wallet initialization and sync)
    const providers = await createProviders();

    // 3. Load contract configurations
    const contractsToDeploy = await loadContracts();
    const deployedAddresses: Record<string, string> = {};

    // 4. Deploy each contract sequentially
    for (const config of contractsToDeploy) {
        const initialContractState = {};

        const deployed = await deployContract(
            providers,
            config,
            initialContractState
        );
        const addressKey = config.name.toLowerCase().replace(/ /g, '_');
        deployedAddresses[addressKey] = deployed.deployTxData.public.contractAddress;
    }

    // 5. Save deployed addresses
    const outputPath = 'deployed-addresses.json';
    await writeFile(outputPath, JSON.stringify(deployedAddresses, null, 2));
    console.log(`\n✓ All contracts deployed. Addresses saved to ${outputPath}`);
    console.log(JSON.stringify(deployedAddresses, null, 2));
}

// --- Run Main ---
main().catch(err => {
    console.error('\n💥 Main deployment process failed:');
    console.error(err.stack || err.message || err);
    process.exit(1);
});
