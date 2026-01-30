import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PerformanceMetrics = ({ metrics = {} }) => {
  const {
    assetAllocation = [],
    categoryAllocation = [],
    riskMetrics = {},
    performanceMetrics = {}
  } = metrics;

  // Asset allocation pie chart data
  const assetData = assetAllocation.map(item => ({
    name: item.name,
    value: item.percentage,
    color: item.color
  }));

  // Category allocation bar chart data
  const categoryData = categoryAllocation;

  // Risk metrics display
  const riskLevels = [
    { level: 'Low Risk', value: riskMetrics.low || 0, color: '#10b981' },
    { level: 'Moderate Risk', value: riskMetrics.moderate || 0, color: '#f59e0b' },
    { level: 'High Risk', value: riskMetrics.high || 0, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-700">Performance Metrics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-md font-medium text-gray-700 mb-4">Asset Allocation</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {assetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {assetData.map((asset, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-sm text-gray-600">{asset.name}</span>
                <span className="ml-auto text-sm font-medium">{asset.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Allocation Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h4 className="text-md font-medium text-gray-700 mb-4">Category Allocation</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 100]}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h4 className="text-md font-medium text-gray-700 mb-4">Risk Profile</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Overall Risk Level</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                riskMetrics.overall === 'Low' ? 'bg-green-500' :
                riskMetrics.overall === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="font-semibold">{riskMetrics.overall || 'Moderate'}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {riskLevels.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: risk.color }}
                  />
                  <span className="text-sm text-gray-600">{risk.level}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${risk.value}%`,
                        backgroundColor: risk.color
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{risk.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Alpha</div>
          <div className={`text-xl font-bold ${
            (performanceMetrics.alpha || 0) >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(performanceMetrics.alpha || 0).toFixed(2)}%
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Beta</div>
          <div className="text-xl font-bold text-gray-800">
            {(performanceMetrics.beta || 0).toFixed(2)}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Sharpe Ratio</div>
          <div className="text-xl font-bold text-green-600">
            {(performanceMetrics.sharpeRatio || 0).toFixed(2)}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500 mb-1">Sortino Ratio</div>
          <div className="text-xl font-bold text-green-600">
            {(performanceMetrics.sortinoRatio || 0).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
EOF