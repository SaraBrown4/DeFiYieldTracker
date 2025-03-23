import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './WalletConnect.css';

const WalletConnect = ({ onWalletConnected }) => {
  const [wallet, setWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const checkIfWalletConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          onWalletConnected && onWalletConnected(accounts[0]);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this application');
      return;
    }

    setIsConnecting(true);
    
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        onWalletConnected && onWalletConnected(accounts[0]);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    onWalletConnected && onWalletConnected(null);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="wallet-connect">
      {!wallet ? (
        <button 
          className="connect-btn" 
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-info">
          <span className="wallet-address">{formatAddress(wallet)}</span>
          <button className="disconnect-btn" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;