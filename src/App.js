import React, { useState } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import YieldTracker from './components/YieldTracker';

function App() {
  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleWalletConnected = (wallet) => {
    setConnectedWallet(wallet);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="title-section">
            <h1>DeFi Yield Tracker</h1>
            <p>Track your DeFi farming rewards and yields</p>
          </div>
          <WalletConnect onWalletConnected={handleWalletConnected} />
        </div>
      </header>
      <main>
        <div className="container">
          {connectedWallet ? (
            <div className="dashboard">
              <h2>Dashboard</h2>
              <p>Welcome! Your wallet is connected.</p>
              <YieldTracker walletAddress={connectedWallet} />
            </div>
          ) : (
            <div className="welcome">
              <h2>Welcome to DeFi Yield Tracker</h2>
              <p>Connect your wallet to start tracking your DeFi yields and farming rewards.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;