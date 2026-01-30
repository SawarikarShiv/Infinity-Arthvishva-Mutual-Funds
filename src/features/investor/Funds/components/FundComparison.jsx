import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/common/Card';
import { Badge } from '../../../components/common/UI';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { SelectInput } from '../../../components/common/Inputs';
import { BarChart } from '../../../components/common/Charts';
import { TrendingUp, TrendingDown, X, Check } from 'lucide-react';

const FundComparison = () => {
  const [selectedFunds, setSelectedFunds] = useState(['ICICI Bluechip Fund', 'SBI Focused Equity Fund']);
  const [fund1, setFund1] = useState('ICICI Bluechip Fund');
  const [fund2, setFund2] = useState('SBI Focused Equity Fund');

  const funds = [
    {
      id: 1,
      name: 'ICICI Bluechip Fund',
      category: 'Equity',
      riskLevel: 'High',
      nav: 45.67,
      aum: 45200,
      expenseRatio: 0.85,
      minInvestment: 500,
      returns: {
        oneYear: 18.5,
        threeYear: 15.2,
        fiveYear: 12.8,
      },
      rating: 4.5,
    },
    {
      id: 2,
      name: 'SBI Focused Equity Fund',
      category: 'Equity',
      riskLevel: 'Very High',
      nav: 125.89,
      aum: 32100,
      expenseRatio: 0.92,
      minInvestment: 5000,
      returns: {
        oneYear: 22.3,
        threeYear: 18.7,
        fiveYear: 16.4,
      },
      rating: 4.3,
    },
    {
      id: 3,
      name: 'HDFC Debt Fund',
      category: 'Debt',
      riskLevel: 'Low',
      nav: 25.45,
      aum: 28700,
      expenseRatio: 0.45,
      minInvestment: 1000,
      returns: {
        oneYear: 7.2,
        threeYear: 6.8,
        fiveYear: 7.1,
      },
      rating: 4.2,
    },
    {
      id: 4,
      name: 'Axis Long Term Equity Fund',
      category: 'ELSS',
      riskLevel: 'High',
      nav: 78.34,
      aum: 38900,
      expenseRatio: 0.88,
      minInvestment: 500,
      returns: {
        oneYear: 16.8,
        threeYear: 14.2,
        fiveYear: 13.5,
      },
      rating: 4.6,
    },
  ];

  const selectedFundData = funds.filter(fund => 
    selectedFunds.includes(fund.name) || fund.name === fund1 || fund.name === fund2
  );

  const comparisonData = selectedFundData.map(fund => ({
    name: fund.name,
    '1Y Return': fund.returns.oneYear,
    '3Y Return': fund.returns.threeYear,
    '5Y Return': fund.returns.fiveYear,
    'Expense Ratio': fund.expenseRatio,
    'Min Investment': fund.minInvestment / 1000, // Scale for chart
  }));

  const getComparisonRow = (title, accessor) => (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
        {title}
      </td>
      {selectedFundData.map((fund, index) => (
        <td key={index} className="px-6 py-4 whitespace-nowrap">
          {typeof accessor === 'function' ? accessor(fund) : fund[accessor]}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fund Comparison</h1>
          <p className="text-gray-600">Compare mutual funds side by side</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton>Clear All</SecondaryButton>
          <PrimaryButton>Save Comparison</PrimaryButton>
        </div>
      </div>

      {/* Fund Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Funds to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SelectInput
              label="Fund 1"
              value={fund1}
              onChange={setFund1}
              options={funds.map(f => ({ value: f.name, label: f.name }))}
            />
            <SelectInput
              label="Fund 2"
              value={fund2}
              onChange={setFund2}
              options={funds.map(f => ({ value: f.name, label: f.name }))}
            />
            <div className="flex items-end">
              <PrimaryButton
                onClick={() => {
                  const newSelected = [fund1, fund2];
                  setSelectedFunds(newSelected);
                }}
              >
                Compare Selected
              </PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Funds */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Funds ({selectedFundData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedFundData.map((fund) => (
              <Card key={fund.id} className="relative">
                <CardContent className="pt-6">
                  <button
                    onClick={() => {
                      setSelectedFunds(selectedFunds.filter(name => name !== fund.name));
                      if (fund1 === fund.name) setFund1('');
                      if (fund2 === fund.name) setFund2('');
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">{fund.name}</h3>
                    <div className="flex justify-center space-x-2 mb-4">
                      <Badge variant="blue">{fund.category}</Badge>
                      <Badge variant={
                        fund.riskLevel === 'Low' ? 'green' :
                        fund.riskLevel === 'Medium' ? 'yellow' : 'red'
                      }>
                        {fund.riskLevel}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">NAV:</span>
                        <span className="font-bold">₹{fund.nav}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">1Y Return:</span>
                        <span className={`font-bold ${fund.returns.oneYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expense Ratio:</span>
                        <span className="font-bold">{fund.expenseRatio}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min. Investment:</span>
                        <span className="font-bold">₹{fund.minInvestment}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={comparisonData}
            xKey="name"
            yKeys={['1Y Return', '3Y Return', '5Y Return']}
            height={400}
            colors={['#10b981', '#3b82f6', '#8b5cf6']}
            legend={['1 Year', '3 Years', '5 Years']}
          />
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parameter
                  </th>
                  {selectedFundData.map((fund, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {fund.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getComparisonRow('Category', 'category')}
                {getComparisonRow('Risk Level', 'riskLevel')}
                {getComparisonRow('NAV', fund => `₹${fund.nav}`)}
                {getComparisonRow('AUM (Cr)', fund => `₹${(fund.aum / 100).toFixed(0)} Cr`)}
                {getComparisonRow('Expense Ratio', fund => `${fund.expenseRatio}%`)}
                {getComparisonRow('Min. Investment', fund => `₹${fund.minInvestment}`)}
                {getComparisonRow('1 Year Return', fund => (
                  <div className={`flex items-center ${fund.returns.oneYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund.returns.oneYear >= 0 ? 
                      <TrendingUp size={16} className="mr-1" /> : 
                      <TrendingDown size={16} className="mr-1" />
                    }
                    {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear}%
                  </div>
                ))}
                {getComparisonRow('3 Year Return', fund => `${fund.returns.threeYear}%`)}
                {getComparisonRow('5 Year Return', fund => `${fund.returns.fiveYear}%`)}
                {getComparisonRow('Rating', fund => `${fund.rating}/5`)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedFundData.map((fund, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{fund.name}</h4>
                  <Badge variant={
                    fund.returns.oneYear >= 15 ? 'success' :
                    fund.returns.oneYear >= 10 ? 'warning' : 'error'
                  }>
                    {fund.returns.oneYear >= 15 ? 'Strong Buy' :
                     fund.returns.oneYear >= 10 ? 'Hold' : 'Sell'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Suitable For</p>
                    <p className="font-medium">
                      {fund.riskLevel === 'High' ? 'Aggressive investors' :
                       fund.riskLevel === 'Medium' ? 'Moderate investors' : 'Conservative investors'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Investment Horizon</p>
                    <p className="font-medium">5+ years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tax Efficiency</p>
                    <p className="font-medium">
                      {fund.category === 'ELSS' ? 'Tax Saving (80C)' : 'Regular'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Our Rating</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Check 
                          key={i} 
                          size={16} 
                          className={`${i < Math.floor(fund.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 font-medium">{fund.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundComparison;