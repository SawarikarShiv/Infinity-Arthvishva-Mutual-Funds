import React, { useState } from 'react';
import { formatCurrency } from '@utils/helpers/currencyFormatter';
import Badge from '@components/common/UI/Badge';

const Watchlist = ({ watchlist = [] }) => {
  const [sortBy, setSortBy] = useState('change');
  const [filter, setFilter] = useState('all');

  const handleSort = (type) => {
    setSortBy(type);
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600 bg-green-50';
    if (change < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'Low':
        return <Badge text="Low" color="green" size="sm" />;
      case 'Medium':
        return <Badge text="Medium" color="yellow" size="sm" />;
      case 'High':
        return <Badge text="High" color="red" size="sm" />;
      default:
        return <Badge text={risk} color="gray" size="sm" />;
    }
  };

  // Filter and sort watchlist
  const filteredWatchlist = watchlist
    .filter(item => {
      if (filter === 'all') return true;
      if (filter === 'equity') return item.category === 'Equity';
      if (filter === 'debt') return item.category === 'Debt';
      if (filter === 'hybrid') return item.category === 'Hybrid';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'change') return b.change - a.change;
      if (sortBy === 'nav') return b.nav - a.nav;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">My Watchlist</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Manage Watchlist →
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Funds
        </button>
        <button
          onClick={() => handleFilter('equity')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            filter === 'equity'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Equity
        </button>
        <button
          onClick={() => handleFilter('debt')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            filter === 'debt'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Debt
        </button>
        <button
          onClick={() => handleFilter('hybrid')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            filter === 'hybrid'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Hybrid
        </button>
      </div>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => handleSort('change')}
            className={`text-sm font-medium ${
              sortBy === 'change' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => handleSort('nav')}
            className={`text-sm font-medium ${
              sortBy === 'nav' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            NAV
          </button>
          <button
            onClick={() => handleSort('name')}
            className={`text-sm font-medium ${
              sortBy === 'name' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Name
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {filteredWatchlist.length} funds
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fund Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NAV
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredWatchlist.length > 0 ? (
              filteredWatchlist.map((fund, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{fund.name}</div>
                      <div className="text-sm text-gray-500">{fund.fundHouse}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(fund.nav)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`px-2 py-1 rounded inline-block ${getChangeColor(fund.change)}`}>
                      <span className="font-medium">
                        {fund.change > 0 ? '+' : ''}{fund.change}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {getRiskBadge(fund.risk)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{fund.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                        Invest
                      </button>
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No funds in watchlist</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Add funds to watchlist
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Stats */}
      {filteredWatchlist.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredWatchlist.filter(f => f.change > 0).length}
              </div>
              <div className="text-sm text-gray-600">Gaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {filteredWatchlist.filter(f => f.change < 0).length}
              </div>
              <div className="text-sm text-gray-600">Declining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredWatchlist.length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
EOF
