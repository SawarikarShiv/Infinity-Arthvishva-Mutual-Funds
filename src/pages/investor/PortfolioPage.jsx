import React, { useState } from 'react';
import InvestorLayout from '@components/layouts/InvestorLayout';
import { HoldingsList, AssetAllocation, TransactionHistory, PortfolioAnalysis } from '@features/investor/Portfolio';

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('holdings');
  const [timeRange, setTimeRange] = useState('1m');

  const portfolioStats = {
    totalValue: 1450000,
    totalInvestment: 1250000,
    totalReturns: 200000,
    returnsPercentage: 16.0,
    todayChange: 12500,
    xirr: 18.5
  };

  const holdings = [
    {
      id: 'H001',
      fundName: 'SBI Bluechip Fund',
      fundHouse: 'SBI Mutual Fund',
      category: 'Large Cap',
      units: 125.456,
      averageCost: 95.45,
      currentNav: 125.45,
      currentValue: 15725,
      investment: 11965,
      profitLoss: 3760,
      profitLossPercentage: 31.4,
      weightage: 10.8
    },
    {
      id: 'H002',
      fundName: 'HDFC Balanced Advantage',
      fundHouse: 'HDFC Mutual Fund',
      category: 'Hybrid',
      units: 213.456,
      averageCost: 210.12,
      currentNav: 234.12,
      currentValue: 50000,
      investment: 44800,
      profitLoss: 5200,
      profitLossPercentage: 11.6,
      weightage: 34.5
    },
    {
      id: 'H003',
      fundName: 'ICICI Prudential Bluechip',
      fundHouse: 'ICICI Prudential',
      category: 'Large Cap',
      units: 89.123,
      averageCost: 165.67,
      currentNav: 189.67,
      currentValue: 16900,
      investment: 14780,
      profitLoss: 2120,
      profitLossPercentage: 14.3,
      weightage: 11.7
    },
    {
      id: 'H004',
      fundName: 'Axis Long Term Equity',
      fundHouse: 'Axis Mutual Fund',
      category: 'ELSS',
      units: 45.678,
      averageCost: 410.23,
      currentNav: 456.78,
      currentValue: 20870,
      investment: 18740,
      profitLoss: 2130,
      profitLossPercentage: 11.4,
      weightage: 14.4
    }
  ];

  const tabs = [
    { id: 'holdings', label: 'Holdings', icon: '📊' },
    { id: 'allocation', label: 'Asset Allocation', icon: '⚖️' },
    { id: 'transactions', label: 'Transaction History', icon: '📝' },
    { id: 'analysis', label: 'Portfolio Analysis', icon: '🔍' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'holdings':
        return <HoldingsList holdings={holdings} />;
      case 'allocation':
        return <AssetAllocation holdings={holdings} />;
      case 'transactions':
        return <TransactionHistory />;
      case 'analysis':
        return <PortfolioAnalysis />;
      default:
        return <HoldingsList holdings={holdings} />;
    }
  };

  return (
    <InvestorLayout>
      {/* Portfolio Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Portfolio</h1>
            <p className="text-blue-100">
              Overview of all your mutual fund investments in one place
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
              Export Statement
            </button>
            <button className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition font-medium">
              + Add Investment
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Total Value</div>
            <div className="text-2xl font-bold text-gray-800">₹14.5L</div>
            <div className="text-sm text-green-600">+₹20,000 (16.0%)</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Total Investment</div>
            <div className="text-2xl font-bold text-gray-800">₹12.5L</div>
            <div className="text-sm text-gray-500">Since inception</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-500 mb-1">XIRR</div>
            <div className="text-2xl font-bold text-green-600">18.5%</div>
            <div className="text-sm text-gray-500">Annualized returns</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <div className="text-sm text-gray-500 mb-1">Today's Change</div>
            <div className="text-2xl font-bold text-green-600">+₹12,500</div>
            <div className="text-sm text-gray-500">+0.87%</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 text-center font-medium transition ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-6">
            {renderActiveTab()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-medium">Add Funds</div>
            <div className="text-sm text-gray-500">Top up your portfolio</div>
          </button>
          <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-medium">Switch Funds</div>
            <div className="text-sm text-gray-500">Transfer between schemes</div>
          </button>
          <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
            <div className="text-2xl mb-2">🏧</div>
            <div className="font-medium">Redeem</div>
            <div className="text-sm text-gray-500">Withdraw your investment</div>
          </button>
          <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
            <div className="text-2xl mb-2">📄</div>
            <div className="font-medium">Statements</div>
            <div className="text-sm text-gray-500">Download reports</div>
          </button>
        </div>
      </div>
    </InvestorLayout>
  );
};

export default PortfolioPage;
EOF