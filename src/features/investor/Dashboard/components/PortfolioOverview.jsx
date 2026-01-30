import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '@components/common/Card/StatsCard';
import { formatCurrency } from '@utils/helpers/currencyFormatter';

const PortfolioOverview = ({ portfolioData }) => {
  const {
    totalInvestment = 0,
    currentValue = 0,
    totalReturns = 0,
    todayChange = 0,
    xirr = 0,
    growthData = []
  } = portfolioData || {};

  const calculateReturns = () => {
    const returns = currentValue - totalInvestment;
    const returnsPercentage = totalInvestment > 0 ? (returns / totalInvestment) * 100 : 0;
    return { returns, returnsPercentage };
  };

  const { returns, returnsPercentage } = calculateReturns();

  const stats = [
    {
      title: 'Total Investment',
      value: formatCurrency(totalInvestment),
      change: null,
      icon: '💰',
      color: 'blue'
    },
    {
      title: 'Current Value',
      value: formatCurrency(currentValue),
      change: todayChange >= 0 ? `+${formatCurrency(todayChange)}` : formatCurrency(todayChange),
      icon: '📈',
      color: returns >= 0 ? 'green' : 'red'
    },
    {
      title: 'Total Returns',
      value: formatCurrency(returns),
      change: returnsPercentage >= 0 ? `+${returnsPercentage.toFixed(2)}%` : `${returnsPercentage.toFixed(2)}%`,
      icon: returns >= 0 ? '📊' : '📉',
      color: returns >= 0 ? 'green' : 'red'
    },
    {
      title: 'XIRR',
      value: `${xirr.toFixed(2)}%`,
      change: null,
      icon: '🎯',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Portfolio Overview</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
            Add Funds
          </button>
          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition">
            Start SIP
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Portfolio Growth</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tickFormatter={(value) => `₹${value / 1000}k`}
                tick={{ fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Value']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
EOF