import React from 'react';
import Swap from './components/Swap'; // Import the Swap component
import { useWallet, WALLET_STATES } from './context/WalletContext'; // Import the hook and states
import './App.css'; // Add specific styles for App

function App() {
  // Get wallet state and functions from context
  const { 
    walletState, // Use walletState string
    walletAddress, // Renamed from account
    isConnecting, 
    isMidnightAvailable, // Check if extension is detected
    isVerified, // Get verification status
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  const renderVerificationStatus = () => {
    if (walletState !== WALLET_STATES.CONNECTED) return null;
    if (isVerified === null) return <span className="verification-status loading">Checking verification...</span>;
    if (isVerified === true) return <span className="verification-status verified">✓ Verified</span>;
    return <span className="verification-status not-verified">✗ Not Verified</span>;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Identity AMM UI</h1>
        <div className="wallet-info">
          {/* Conditional rendering based on walletState */}
          {walletState === WALLET_STATES.CONNECTED && walletAddress ? (
            <>
              <span className="verification-status-container">
                {renderVerificationStatus()}
              </span>
              <span>{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
              <button onClick={disconnectWallet}>Disconnect</button>
            </>
          ) : walletState === WALLET_STATES.CONNECTING ? (
            <button disabled>Connecting...</button>
          ) : (
            <button onClick={connectWallet} disabled={!isMidnightAvailable}>
              {!isMidnightAvailable ? 'Lace Wallet Not Found' : 'Connect Wallet'}
            </button>
          )}
          {/* Removed explicit error display, handled by state logic */}
        </div>
      </header>
      <main>
        <Swap />
        {/* TODO: Add other components like Liquidity Management */}
      </main>
    </div>
  );
}

export default App; 