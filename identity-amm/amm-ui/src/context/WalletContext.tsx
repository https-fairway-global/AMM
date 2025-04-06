import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import {
    DAppConnectorAPI,
    DAppConnectorWalletAPI,
    APIError,
    DAppConnectorWalletState,
    ServiceUriConfig
} from '@midnight-ntwrk/dapp-connector-api';
import { 
    Contract as RegistryContract // Alias the import
    // Circuits as RegistryCircuits, // Removed
    // Witnesses as RegistryWitnesses // Removed
} from '@identity-amm/signature-registry-contract';
// import { DeployedContract } from '@midnight-ntwrk/midnight-js-contracts'; // Remove this
// import { MidnightProvider } from '@midnight-ntwrk/compact-runtime'; // Remove this
// Import specific providers from their packages with correct casing
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id'; // For network ID
// import { useNotification } from '../contexts/NotificationContext'; // Commented out - Not implemented
import axios from 'axios'; // Import axios for making HTTP requests

// Placeholder contract address - Replace with actual deployed address
const SIGNATURE_REGISTRY_CONTRACT_ADDRESS = '0xPLACEHOLDER_REGISTRY_ADDRESS';
// Placeholder network ID - Replace with actual network ID (e.g., 'devnet')
const NETWORK_ID = 'testnet-02' as NetworkId; 

// Wallet connection states
export const WALLET_STATES = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error',
};

// Define the shape of the context data - simplified for frontend
interface WalletState {
  walletApi: DAppConnectorWalletAPI | null; // Renamed from 'wallet' to be specific
  walletState: string; 
  walletAddress: string | null;
  isConnecting: boolean;
  isMidnightAvailable: boolean;
  isVerified: boolean | null; // Status fetched from backend API
  fetchVerificationStatus: (address: string) => Promise<void>; // Function to call backend
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [walletApi, setWalletApi] = useState<DAppConnectorWalletAPI | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletState, setWalletState] = useState<string>(WALLET_STATES.DISCONNECTED);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMidnightAvailable = (window as any).midnight?.mnLace !== undefined;
  const getLaceApi = (): DAppConnectorAPI | undefined => (window as any).midnight?.mnLace;

  // TODO: Replace with actual API call
  const fetchVerificationStatus = async (address: string) => {
    console.log("Fetching verification status for:", address);
    // Define the API endpoint URL
    // TODO: Make this configurable or use environment variables
    const apiUrl = 'http://localhost:3001'; // Assuming default API port
    
    setIsLoadingVerification(true);
    setError(null);

    try {
      // Make GET request to the backend endpoint
      const response = await axios.get<{ isVerified: boolean }>(`${apiUrl}/verify/${address}`);
      
      console.log("Verification response:", response.data);
      setIsVerified(response.data.isVerified);

    } catch (err: any) {
      console.error("Failed to fetch verification status:", err);
      let errorMessage = "Failed to check verification status.";
      if (axios.isAxiosError(err) && err.response) {
        // Extract error message from backend response if available
        errorMessage = err.response.data?.error || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setIsVerified(false); // Assume not verified if check fails
    } finally {
      setIsLoadingVerification(false);
    }
  };

  const connectWallet = useCallback(async () => {
    const laceApi = getLaceApi();
    if (!laceApi) {
      console.error('Midnight Lace wallet not found');
      setWalletState(WALLET_STATES.ERROR); // Set error state
      return;
    }

    setIsConnecting(true);
    setWalletState(WALLET_STATES.CONNECTING);
    setIsVerified(null); // Reset verification status

    try {
      const enabledWalletApi = await laceApi.enable();
      const currentWalletState = await enabledWalletApi.state();
      const userAddress = currentWalletState.address;

      setWalletApi(enabledWalletApi); 
      setWalletAddress(userAddress);
      setWalletState(WALLET_STATES.CONNECTED);
      console.log('Lace Wallet connected:', userAddress);

      // Fetch verification status from backend API after connecting
      if (userAddress) {
        await fetchVerificationStatus(userAddress);
      }

    } catch (err) {
      console.error('Wallet connection failed:', err);
      setWalletState(WALLET_STATES.ERROR);
      setWalletApi(null);
      setWalletAddress(null);
      setIsVerified(null);
    } finally {
      setIsConnecting(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchVerificationStatus]); // Add fetchVerificationStatus dependency

  const disconnectWallet = useCallback(() => {
    console.log('Disconnecting wallet (clearing state)...');
    setWalletApi(null);
    setWalletAddress(null);
    setWalletState(WALLET_STATES.DISCONNECTED);
    setIsConnecting(false);
    setIsVerified(null);
  }, []);

  // Auto-connect check on load
  useEffect(() => {
    const checkConnection = async () => {
      const laceApi = getLaceApi();
      if (laceApi) {
          try {
              const enabled = await laceApi.isEnabled();
              if (enabled && walletState === WALLET_STATES.DISCONNECTED) { 
                  console.log('Wallet already enabled, attempting connection...');
                  connectWallet(); // Auto-connect
              } else if (!enabled) {
                  console.log('Wallet not enabled.');
                  setWalletState(WALLET_STATES.DISCONNECTED); // Ensure state reflects this
              }
          } catch (err) {
              console.error("Error checking if wallet is enabled:", err);
              setWalletState(WALLET_STATES.ERROR);
          }
      } else {
        console.log('Lace API not found on load.');
        setWalletState(WALLET_STATES.DISCONNECTED);
      }
    };
    const timer = setTimeout(checkConnection, 100);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [isMidnightAvailable]); // Re-check only if extension availability changes

  const value: WalletState = {
    walletApi,
    walletState,
    walletAddress,
    isConnecting,
    isMidnightAvailable,
    isVerified, // Expose verification status
    fetchVerificationStatus,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
} 