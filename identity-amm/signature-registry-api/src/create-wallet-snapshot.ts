import { WalletBuilder } from '@midnight-ntwrk/wallet';
// Import NetworkId from zswap package as suggested by error
import { NetworkId } from '@midnight-ntwrk/zswap'; 
import { firstValueFrom, filter, map, timeout, throwError, Observable } from 'rxjs';

// --- Configuration ---
// !! IMPORTANT: Replace this with your actual API wallet seed phrase !!
// !! DO NOT commit this default seed to version control if using for anything sensitive !!
const WALLET_SEED = process.env.WALLET_SEED || '0000000000000000000000000000000000000000000000000000000000000000'; // Default 32-byte zero seed

const NETWORK_ID: NetworkId = NetworkId.TestNet; 
const INDEXER_HTTP_URL = process.env.INDEXER_URL || 'https://indexer.testnet-02.midnight.network/api/v1/graphql'; 
const INDEXER_WSS_URL = INDEXER_HTTP_URL.replace(/^http/, 'ws'); 
const PROVER_URL = process.env.PROVER_URL || 'http://127.0.0.1:6300/'; // Needs to be accessible
const NODE_RPC_URL = process.env.NODE_RPC_URL || 'https://rpc.testnet-02.midnight.network'; 
const LOG_LEVEL = (process.env.LOG_LEVEL || 'info') as any; // Use 'info' or 'debug' to see progress
const SYNC_TIMEOUT_MS = 120000; // 2 minutes timeout for sync
// --- End Configuration ---

async function createSnapshot() {
  console.log(`[INFO] Building wallet from seed for Network: ${NETWORK_ID}...`);
  console.log(`[INFO] Ensure this wallet address has been funded with tDUST on TestNet-02.`);

  let wallet;
  try {
    wallet = await WalletBuilder.buildFromSeed(
      INDEXER_HTTP_URL,
      INDEXER_WSS_URL,
      PROVER_URL,
      NODE_RPC_URL, 
      WALLET_SEED,
      NETWORK_ID, // Use the NetworkId imported from @midnight-ntwrk/zswap
      LOG_LEVEL 
    );
  } catch (error: any) {
    console.error(`[FATAL] Failed to build wallet: ${error?.message}`, error);
    process.exit(1);
  }

  // Correctly get the address using firstValueFrom *after* the pipe
  const address$ = wallet.state().pipe(map(s => s.address));
  console.log(`[INFO] Wallet Address: ${await firstValueFrom(address$)}`);
  console.log('[INFO] Starting wallet sync... This might take a few minutes.');
  
  wallet.start();

  try {
    // Wait for the wallet to sync at least partially or see a balance update
    console.log(`[INFO] Waiting for wallet sync progress (timeout: ${SYNC_TIMEOUT_MS / 1000}s)...`);
    // Ensure the source observable type is correctly inferred or specified if needed
    const syncState$ = wallet.state().pipe(
        filter(state => {
          const hasSynced = state.syncProgress ? state.syncProgress.synced > 0n : false;
          const hasBalance = Object.keys(state.balances).length > 0 && Object.values(state.balances).some(b => b > 0n);
          if (hasSynced) console.log(`[DEBUG] Sync progress: ${state.syncProgress?.synced}/${state.syncProgress?.total}`);
          if (hasBalance) console.log(`[DEBUG] Wallet balance detected:`, state.balances);
          return hasSynced || hasBalance;
        }),
        timeout({
          first: SYNC_TIMEOUT_MS,
          with: () => throwError(() => new Error('Timeout waiting for wallet sync progress or balance update.'))
        })
      );
    await firstValueFrom(syncState$);
    console.log('[INFO] Wallet appears to have synced or received funds.');

  } catch (error: any) {
    console.warn(`[WARN] Wallet sync check failed or timed out: ${error?.message}. Proceeding to serialize anyway, but state might be incomplete if not funded/synced.`);
  }

  try {
    console.log('[INFO] Serializing wallet state...');
    const serializedState = await wallet.serializeState();
    console.log('[SUCCESS] Wallet state serialized successfully!\n');
    console.log('------------------------- SERIALIZED STATE (Copy this) -------------------------');
    console.log(serializedState);
    console.log('--------------------------------------------------------------------------------');
    console.log('\n[INFO] Store this serialized state securely (e.g., in an environment variable).');
    console.log('[INFO] Update the main API server to use WalletBuilder.restore() with this state.');

  } catch (error: any) {
    console.error(`[FATAL] Failed to serialize wallet state: ${error?.message}`, error);
  } finally {
     if (wallet) {
        console.log('[INFO] Closing wallet connection...');
        await wallet.close();
        console.log('[INFO] Wallet closed.');
     }
  }
}

createSnapshot().catch(err => {
  console.error("[FATAL] Script failed:", err);
  process.exit(1);
}); 