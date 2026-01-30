import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InvestmentCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyInvestment: 5000,
    investmentPeriod: 10,
    expectedReturns: 12
  });

  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState([]);

  const calculateInvestment = () => {
    const { monthlyInvestment, investmentPeriod, expectedReturns } = formData;
    
    const monthlyRate = expectedReturns / 12 / 100;
    const months = investmentPeriod * 12;
    
    // Calculate future value of SIP
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalInvestment = monthlyInvestment * months;
    const wealthGained = futureValue - totalInvestment;
    
    // Generate chart data
    const data = [];
    let currentValue = 0;
    
    for (let year = 0; year <= investmentPeriod; year++) {
      for (let month = 1; month <= 12; month++) {
        if (year === 0 && month === 1) continue;
        
        const monthNumber = year * 12 + month;
        if (monthNumber > months) break;
        
        currentValue = (currentValue + monthlyInvestment) * (1 + monthlyRate);
        
        if (month === 12 || monthNumber === months) {
          data.push({
            year: year,
            value: Math.round(currentValue),
            investment: monthlyInvestment * monthNumber,
            returns: Math.round(currentValue - (monthlyInvestment * monthNumber))
          });
        }
      }
    }

    setResults({
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      wealthGained: Math.round(wealthGained),
      percentageGain: ((wealthGained / totalInvestment) * 100).toFixed(1)
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateInvestment();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Investment Calculator
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your financial future with our SIP calculator. See how small monthly investments can grow over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="space-y-6">
              {/* Monthly Investment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Investment
                  <span className="text-gray-400 ml-1">(₹{formData.monthlyInvestment.toLocaleString()})</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={formData.monthlyInvestment}
                  onChange={(e) => handleInputChange('monthlyInvestment', e.target.value)}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Investment Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period
                  <span className="text-gray-400 ml-1">({formData.investmentPeriod} years)</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={formData.investmentPeriod}
                  onChange={(e) => handleInputChange('investmentPeriod', e.target.value)}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>

              {/* Expected Returns */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Returns (Annual)
                  <span className="text-gray-400 ml-1">({formData.expectedReturns}%)</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={formData.expectedReturns}
                  onChange={(e) => handleInputChange('expectedReturns', e.target.value)}
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            {results && (
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {formatCurrency(results.futureValue)}
                  </div>
                  <div className="text-sm text-blue-600">Future Value</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {formatCurrency(results.wealthGained)}
                  </div>
                  <div className="text-sm text-green-600">Wealth Gained</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">
                    {results.percentageGain}%
                  </div>
                  <div className="text-sm text-purple-600">Returns</div>
                </div>
              </div>
            )}
          </div>

          {/* Chart Visualization */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Investment Growth Over Time</h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value / 100000}L`}
                    label={{ value: 'Portfolio Value', angle: -90, position: 'insideLeft' }}
                    tick={{ fill: '#6b7280' }}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Value']}
                    labelFormatter={(label) => `Year ${label}`}
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
                    activeDot={{ r: 6 }}
                    name="Portfolio Value"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Portfolio Value</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Wealth Gained</span>
              </div>
            </div>

            {/* Summary */}
            {results && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-600">
                    By investing <span className="font-semibold">{formatCurrency(formData.monthlyInvestment)}</span> monthly for{' '}
                    <span className="font-semibold">{formData.investmentPeriod} years</span> at{' '}
                    <span className="font-semibold">{formData.expectedReturns}%</span> annual returns:
                  </p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    Your investment of {formatCurrency(results.totalInvestment)} becomes{' '}
                    <span className="text-green-600">{formatCurrency(results.futureValue)}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            *This is a projected calculation based on the inputs provided. Actual returns may vary. 
            Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
EOF