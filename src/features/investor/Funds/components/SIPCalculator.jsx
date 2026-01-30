import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { TextInput, SelectInput } from '../../../components/common/Inputs';
import { LineChart } from '../../../components/common/Charts';
import { Calculator, TrendingUp, TrendingDown, Download } from 'lucide-react';

const SIPCalculator = () => {
  const [sipAmount, setSipAmount] = useState(5000);
  const [duration, setDuration] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);
  const [results, setResults] = useState(null);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = duration * 12;
    
    // Future value of SIP
    const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    // Total investment
    const totalInvestment = sipAmount * months;
    
    // Estimated returns
    const estimatedReturns = futureValue - totalInvestment;
    
    // Future value adjusted for inflation
    const monthlyInflation = inflationRate / 12 / 100;
    const inflationAdjustedFV = futureValue / Math.pow(1 + monthlyInflation, months);
    
    // Historical data for chart
    const historicalData = [];
    let accumulatedValue = 0;
    
    for (let year = 1; year <= duration; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthIndex = (year - 1) * 12 + month;
        accumulatedValue = sipAmount * ((Math.pow(1 + monthlyRate, monthIndex) - 1) / monthlyRate) * (1 + monthlyRate);
      }
      historicalData.push({
        year: `Year ${year}`,
        value: Math.round(accumulatedValue),
        investment: sipAmount * 12 * year,
      });
    }

    setResults({
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      inflationAdjustedFV: Math.round(inflationAdjustedFV),
      historicalData,
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [sipAmount, duration, expectedReturn, inflationRate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SIP Calculator</h1>
          <p className="text-gray-600">Calculate your potential SIP returns</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download size={18} />}>
            Export Results
          </SecondaryButton>
          <PrimaryButton icon={<Calculator size={18} />}>
            Save Calculation
          </PrimaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <TextInput
                  label="Monthly SIP Amount (₹)"
                  type="number"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  min="100"
                  step="500"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SIP Duration: {duration} years
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Annual Return: {expectedReturn}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                <SelectInput
                  label="Inflation Rate"
                  value={inflationRate}
                  onChange={setInflationRate}
                  options={[
                    { value: 4, label: '4% (Low)' },
                    { value: 6, label: '6% (Average)' },
                    { value: 8, label: '8% (High)' },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <TrendingUp size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span>Start SIP early for maximum benefit of compounding</span>
                </li>
                <li className="flex items-start">
                  <TrendingDown size={16} className="text-red-500 mr-2 mt-0.5" />
                  <span>Don't stop SIP during market downturns</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp size={16} className="text-blue-500 mr-2 mt-0.5" />
                  <span>Increase SIP amount periodically with salary hikes</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {results && (
            <>
              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.futureValue)}
                    </div>
                    <p className="text-gray-600 text-sm">Future Value</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.totalInvestment)}
                    </div>
                    <p className="text-gray-600 text-sm">Total Investment</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(results.estimatedReturns)}
                    </div>
                    <p className="text-gray-600 text-sm">Estimated Returns</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-gray-600">
                      {formatCurrency(results.inflationAdjustedFV)}
                    </div>
                    <p className="text-gray-600 text-sm">Inflation Adjusted</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={results.historicalData}
                    xKey="year"
                    yKeys={['value', 'investment']}
                    height={300}
                    colors={['#10b981', '#3b82f6']}
                    legend={['Portfolio Value', 'Total Invested']}
                  />
                </CardContent>
              </Card>

              {/* Yearly Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Yearly Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Yearly Investment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Year End Value
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Returns
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {results.historicalData.map((data, index) => {
                          const yearlyInvestment = sipAmount * 12;
                          const returns = data.value - (yearlyInvestment * (index + 1));
                          const returnPercentage = (returns / (yearlyInvestment * (index + 1))) * 100;
                          
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap font-medium">
                                {data.year}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {formatCurrency(yearlyInvestment)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap font-medium">
                                {formatCurrency(data.value)}
                              </td>
                              <td className={`px-6 py-4 whitespace-nowrap ${returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(1)}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* What-If Scenarios */}
              <Card>
                <CardHeader>
                  <CardTitle>What-If Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-sm text-gray-600">With 15% return</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(
                          sipAmount * ((Math.pow(1 + (15/12/100), duration * 12) - 1) / (15/12/100)) * (1 + (15/12/100))
                        )}
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-sm text-gray-600">With ₹10,000 SIP</p>
                      <p className="text-lg font-bold text-blue-600">
                        {formatCurrency(
                          10000 * ((Math.pow(1 + (expectedReturn/12/100), duration * 12) - 1) / (expectedReturn/12/100)) * (1 + (expectedReturn/12/100))
                        )}
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-sm text-gray-600">For 20 years</p>
                      <p className="text-lg font-bold text-purple-600">
                        {formatCurrency(
                          sipAmount * ((Math.pow(1 + (expectedReturn/12/100), 20 * 12) - 1) / (expectedReturn/12/100)) * (1 + (expectedReturn/12/100))
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;