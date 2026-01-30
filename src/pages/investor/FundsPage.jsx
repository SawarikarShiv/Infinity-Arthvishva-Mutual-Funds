import React, { useState } from 'react';
import InvestorLayout from '@components/layouts/InvestorLayout';
import { FundExplorer, FundComparison, FundDetails, SIPCalculator, FilterPanel } from '@features/investor/Funds';

const FundsPage = () => {
  const [activeView, setActiveView] = useState('explorer');
  const [selectedFund, setSelectedFund] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    risk: 'all',
    minInvestment: 0,
    returnsPeriod: '1y'
  });

  const funds = [
    {
      id: 'F001',
      name: 'SBI Bluechip Fund',
      fundHouse: 'SBI Mutual Fund',
      category: 'Large Cap',
      risk: 'Medium',
      returns: { '1y': 18.5, '3y': 15.2, '5y': 16.8 },
      nav: 125.45,
      minInvestment: 500,
      aum: 32500,
      expenseRatio: 1.05,
      rating: 4.5,
      isInWatchlist: true
    },
    {
      id: 'F002',
      name: 'HDFC Balanced Advantage',
      fundHouse: 'HDFC Mutual Fund',
      category: 'Hybrid',
      risk: 'Low',
      returns: { '1y': 14.2, '3y': 12.8, '5y': 13.5 },
      nav: 234.12,
      minInvestment: 1000,
      aum: 28700,
      expenseRatio: 0.95,
      rating: 4.3,
      isInWatchlist: false
    },
    {
      id: 'F003',
      name: 'ICICI Prudential Bluechip',
      fundHouse: 'ICICI Prudential',
      category: 'Large Cap',
      risk: 'Medium',
      returns: { '1y': 19.2, '3y': 16.5, '5y': 17.2 },
      nav: 189.67,
      minInvestment: 500,
      aum: 24500,
      expenseRatio: 1.12,
      rating: 4.6,
      isInWatchlist: true
    },
    {
      id: 'F004',
      name: 'Axis Long Term Equity',
      fundHouse: 'Axis Mutual Fund',
      category: 'ELSS',
      risk: 'High',
      returns: { '1y': 22.5, '3y': 18.8, '5y': 19.5 },
      nav: 456.78,
      minInvestment: 500,
      aum: 18900,
      expenseRatio: 1.25,
      rating: 4.7,
      isInWatchlist: false
    }
  ];

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleFundSelect = (fund) => {
    setSelectedFund(fund);
    setActiveView('details');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'explorer':
        return <FundExplorer funds={funds} onFundSelect={handleFundSelect} filters={filters} />;
      case 'comparison':
        return <FundComparison funds={funds.slice(0, 3)} />;
      case 'details':
        return selectedFund ? <FundDetails fund={selectedFund} /> : null;
      case 'calculator':
        return <SIPCalculator />;
      default:
        return <FundExplorer funds={funds} onFundSelect={handleFundSelect} filters={filters} />;
    }
  };

  return (
    <InvestorLayout>
      {/* Funds Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Explore Funds</h1>
            <p className="text-blue-100">
              Discover and invest in top-performing mutual funds
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
                My Watchlist
              </button>
              <button className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition font-medium">
                Start SIP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* View Toggle */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveView('explorer')}
            className={`px-4 py-2 rounded-lg transition ${
              activeView === 'explorer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Fund Explorer
          </button>
          <button
            onClick={() => setActiveView('comparison')}
            className={`px-4 py-2 rounded-lg transition ${
              activeView === 'comparison'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Compare Funds
          </button>
          <button
            onClick={() => setActiveView('calculator')}
            className={`px-4 py-2 rounded-lg transition ${
              activeView === 'calculator'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            SIP Calculator
          </button>
          {selectedFund && (
            <button
              onClick={() => setActiveView('details')}
              className={`px-4 py-2 rounded-lg transition ${
                activeView === 'details'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Fund Details
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow p-4 mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Market Snapshot</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sensex</span>
                  <span className="font-medium text-green-600">+1.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nifty 50</span>
                  <span className="font-medium text-green-600">+1.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gold</span>
                  <span className="font-medium text-red-600">-0.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderActiveView()}
          </div>
        </div>
      </div>
    </InvestorLayout>
  );
};

export default FundsPage;
EOF
