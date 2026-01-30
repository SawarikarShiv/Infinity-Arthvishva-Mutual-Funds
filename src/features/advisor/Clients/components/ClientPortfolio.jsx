import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/Card';
import { PieChart, BarChart } from '../../../../components/common/Charts';
import { Badge } from '../../../../components/common/UI';
import { PrimaryButton, SecondaryButton } from '../../../../components/common/Button';
import { Download, TrendingUp, TrendingDown, User } from 'lucide-react';

const ClientPortfolio = ({ clientId }) => {
  // Sample data for demonstration
  const client = {
    id: 1,
    name: 'Rajesh Kumar',
    portfolioValue: 2450000,
    totalInvested: 2000000,
    overallReturn: 22.5,
    currentXIRR: 12.5,
    riskScore: 4,
  };

  const assetAllocation = [
    { name: 'Equity', value: 55, color: '#3b82f6' },
    { name: 'Debt', value: 25, color: '#10b981' },
    { name: 'Hybrid', value: 12, color: '#8b5cf6' },
    { name: 'Gold', value: 5, color: '#f59e0b' },
    { name: 'Cash', value: 3, color: '#6b7280' },
  ];

  const holdings = [
    { name: 'ICICI Bluechip Fund', category: 'Equity', allocation: 20, return: 18.5, value: 490000 },
    { name: 'SBI Debt Fund', category: 'Debt', allocation: 15, return: 7.2, value: 367500 },
    { name: 'HDFC Hybrid Fund', category: 'Hybrid', allocation: 12, return: 11.3, value: 294000 },
    { name: 'Nippon Small Cap', category: 'Equity', allocation: 10, return: 25.8, value: 245000 },
    { name: 'Aditya Birla Debt', category: 'Debt', allocation: 10, return: 6.8, value: 245000 },
    { name: 'Axis Gold Fund', category: 'Gold', allocation: 5, return: 9.2, value: 122500 },
    { name: 'Kotak Equity Fund', category: 'Equity', allocation: 8, return: 15.6, value: 196000 },
    { name: 'SBI Liquid Fund', category: 'Debt', allocation: 3, return: 5.5, value: 73500 },
    { name: 'Cash Balance', category: 'Cash', allocation: 3, return: 0, value: 73500 },
  ];

  const performanceHistory = [
    { month: 'Jul', value: 2100000 },
    { month: 'Aug', value: 2150000 },
    { month: 'Sep', value: 2250000 },
    { month: 'Oct', value: 2300000 },
    { month: 'Nov', value: 2350000 },
    { month: 'Dec', value: 2450000 },
  ];

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="success">Active Client</Badge>
                  <span className="text-gray-600">Risk Score: {client.riskScore}/10</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <SecondaryButton icon={<Download className="h-4 w-4" />}>
                Export Report
              </SecondaryButton>
              <PrimaryButton>Schedule Review</PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                ₹{client.portfolioValue.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600 mt-2">Current Portfolio Value</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                +{client.overallReturn}%
              </div>
              <p className="text-gray-600 mt-2">Overall Return</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+₹4,50,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {client.currentXIRR}%
              </div>
              <p className="text-gray-600 mt-2">Current XIRR</p>
              <Badge variant="success" className="mt-2">Above Benchmark</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                ₹{client.totalInvested.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600 mt-2">Total Invested</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Distribution by asset class</p>
              </div>
            </div>
            <PieChart
              data={assetAllocation}
              height={300}
              showLegend={true}
              legendPosition="right"
            />
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={performanceHistory}
              xKey="month"
              yKeys={['value']}
              height={300}
              colors={['#10b981']}
            />
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fund Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {holdings.map((holding, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{holding.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={
                        holding.category === 'Equity' ? 'blue' :
                        holding.category === 'Debt' ? 'green' :
                        holding.category === 'Hybrid' ? 'purple' : 'yellow'
                      }>
                        {holding.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${holding.allocation}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 font-medium text-gray-900">{holding.allocation}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${holding.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.return >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {holding.return >= 0 ? '+' : ''}{holding.return}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      ₹{holding.value.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPortfolio;