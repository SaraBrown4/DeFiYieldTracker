import React, { useState, useEffect } from 'react';
import './YieldTracker.css';

const YieldTracker = ({ walletAddress }) => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    if (walletAddress) {
      loadYieldData();
    }
  }, [walletAddress]);

  const loadYieldData = async () => {
    setIsLoading(true);
    
    // Simulate loading mock data for now
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          protocol: 'Uniswap V3',
          pair: 'ETH/USDC',
          amount: '2.5 ETH',
          value: '$4,250.00',
          apy: '15.2%',
          earned: '$125.30',
          status: 'active'
        },
        {
          id: 2,
          protocol: 'Compound',
          pair: 'cUSDC',
          amount: '10,000 USDC',
          value: '$10,000.00',
          apy: '4.8%',
          earned: '$48.75',
          status: 'active'
        },
        {
          id: 3,
          protocol: 'Aave',
          pair: 'aETH',
          amount: '1.2 ETH',
          value: '$2,040.00',
          apy: '3.2%',
          earned: '$15.42',
          status: 'active'
        }
      ];
      
      setPositions(mockData);
      const total = mockData.reduce((sum, pos) => {
        return sum + parseFloat(pos.value.replace(/[$,]/g, ''));
      }, 0);
      setTotalValue(total);
      setIsLoading(false);
    }, 1500);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!walletAddress) {
    return (
      <div className="yield-tracker">
        <p>Connect your wallet to view yield positions</p>
      </div>
    );
  }

  return (
    <div className="yield-tracker">
      <div className="tracker-header">
        <h3>Your DeFi Positions</h3>
        <div className="total-value">
          <span className="label">Total Portfolio Value:</span>
          <span className="value">{formatCurrency(totalValue)}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your positions...</p>
        </div>
      ) : positions.length > 0 ? (
        <div className="positions-grid">
          {positions.map(position => (
            <div key={position.id} className="position-card">
              <div className="card-header">
                <div className="protocol-info">
                  <h4>{position.protocol}</h4>
                  <span className="pair">{position.pair}</span>
                </div>
                <span className={`status ${position.status}`}>{position.status}</span>
              </div>
              
              <div className="card-body">
                <div className="amount-info">
                  <div className="metric">
                    <span className="label">Amount:</span>
                    <span className="value">{position.amount}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Value:</span>
                    <span className="value">{position.value}</span>
                  </div>
                </div>
                
                <div className="yield-info">
                  <div className="metric">
                    <span className="label">APY:</span>
                    <span className="value apy">{position.apy}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Earned:</span>
                    <span className="value earned">{position.earned}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-positions">
          <p>No DeFi positions found for this wallet</p>
          <small>Make sure you have active positions in supported protocols</small>
        </div>
      )}
    </div>
  );
};

export default YieldTracker;