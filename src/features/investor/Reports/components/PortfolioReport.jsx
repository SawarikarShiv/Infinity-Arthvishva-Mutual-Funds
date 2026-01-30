import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { SelectInput } from '../../../components/common/Inputs';
import { Badge } from '../../../components/common/UI';
import { PieChart, BarChart, LineChart } from '../../../components/common/Charts';
import { Download, FileText, TrendingUp, TrendingDown, Award } from 'lucide-react';

const PortfolioReport = () => {
  const [reportPeriod, setReportPeriod] = useState('quarterly');
  const [view, setView] = useState('overview');

  // Sample portfolio data
  const portfolio = {
    totalValue: 2450000,
    totalInvested: 2000000,
    totalReturns: 450000,
    xirr: 12.5,
    currentMonthReturn: 2.3,
    vsBenchmark: 1.8,
  };

  const assetAllocation = [
    { category: 'Equity', value: 1347500, percentage: 55, color: '#3b82f6' },
    { category: 'Debt', value: 612500, percentage: 25, color: '#10b981' },
    { category: 'Hybrid', value: 294000, percentage: 12, color: '#8b5cf6' },
    { category: 'Gold', value: 122500, percentage: 5, color: '#f59e0b' },
    { category: 'Cash', value: 73500, percentage: 3, color: '#6b7280' },
  ];

  const topHoldings = [
    { name: 'ICICI Bluechip Fund', category: 'Equity', value: 490000, allocation: 20, return: 18.5 },
    { name: 'SBI Debt Fund', category: 'Debt', value: 367500, allocation: 15, return: 7.2 },
    { name: 'HDFC Hybrid Fund', category: 'Hybrid', value: 294000, allocation: 12, return: 11.3 },
    { name: 'Nippon Small Cap', category: 'Equity', value: 245000, allocation: 10, return: 25.8 },
    { name: 'Aditya Birla Debt', category: 'Debt', value: 245000, allocation: 10, return: 6.8 },
  ];

  const performanceHistory = [
    { month: 'Jul', value: 2100000, benchmark: 2050000 },
    { month: 'Aug', value: 2150000, benchmark: 2100000 },
    { month: 'Sep', value: 2250000, benchmark: 2180000 },
    { month: 'Oct', value: 2300000, benchmark: 2250000 },
    { month: 'Nov', value: 2350000, benchmark: 2300000 },
    { month: 'Dec', value: 2450000, benchmark: 2400000 },
  ];

  const categoryPerformance = [
    { category: 'Equity', value: 1347500, invested: 1100000, return: 22.5 },
    { category: 'Debt', value: 612500, invested: 580000, return: 5.6 },
    { category: 'Hybrid', value: 294000, invested: 270000, return: 8.9 },
    { category: 'Gold', value: 122500, invested: 110000, return: 11.4 },
    { category: 'Cash', value: 73500, invested: 73500, return: 0 },
  ];

  const riskMetrics = {
    sharpeRatio: 1.2,
    beta: 0.85,
    alpha: 2.3,
    standardDeviation: 12.5,
    maxDrawdown: -8.2,
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Portfolio Report</h1>
          <p className="text-gray-600">Comprehensive analysis of your investment portfolio</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download size={18} />}>
            Export PDF
          </SecondaryButton>
          <PrimaryButton icon={<FileText size={18} />}>
            Share Report
          </PrimaryButton>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(portfolio.totalValue)}
              </div>
              <p className="text-gray-600">Current Portfolio Value</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(portfolio.totalReturns)}
              </div>
              <p className="text-gray-600">Total Returns</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {portfolio.xirr}%
              </div>
              <p className="text-gray-600">XIRR (Annualized)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {portfolio.currentMonthReturn}%
              </div>
              <p className="text-gray-600">This Month's Return</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SelectInput
              label="Report Period"
              value={reportPeriod}
              onChange={setReportPeriod}
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
                { value: 'half-yearly', label: 'Half Yearly' },
                { value: 'yearly', label: 'Yearly' },
              ]}
            />
            <SelectInput
              label="View"
              value={view}
              onChange={setView}
              options={[
                { value: 'overview', label: 'Overview' },
                { value: 'performance', label: 'Performance' },
                { value: 'holdings', label: 'Holdings' },
                { value: 'risk', label: 'Risk Analysis' },
              ]}
            />
            <SelectInput
              label="Compare With"
              value="benchmark"
              onChange={() => {}}
              options={[
                { value: 'benchmark', label: 'Benchmark' },
                { value: 'category', label: 'Category Average' },
                { value: 'target', label: 'Target Return' },
              ]}
            />
            <div className="flex items-end">
              <PrimaryButton fullWidth>Update Report</PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={assetAllocation}
              height={300}
              showLegend={true}
              legendPosition="right"
            />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
              {assetAllocation.map((asset, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold">{asset.percentage}%</div>
                  <div className="text-sm text-gray-600">{asset.category}</div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(asset.value)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={performanceHistory}
              xKey="month"
              yKeys={['value', 'benchmark']}
              height={300}
              colors={['#10b981', '#94a3b8']}
              legend={['Your Portfolio', 'Benchmark']}
            />
          </CardContent>
        </Card>
      </div>

      {/* Top Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topHoldings.map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    holding.category === 'Equity' ? 'bg-blue-100' :
                    holding.category === 'Debt' ? 'bg-green-100' :
                    holding.category === 'Hybrid' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <span className={`font-bold ${
                      holding.category === 'Equity' ? 'text-blue-600' :
                      holding.category === 'Debt' ? 'text-green-600' :
                      holding.category === 'Hybrid' ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {holding.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{holding.name}</h4>
                    <p className="text-sm text-gray-600">{holding.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{formatCurrency(holding.value)}</div>
                  <div className="flex items-center justify-end">
                    {holding.return >= 0 ? (
                      <TrendingUp size={14} className="text-green-500 mr-1" />
                    ) : (
                      <TrendingDown size={14} className="text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${holding.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.return >= 0 ? '+' : ''}{holding.return}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{holding.allocation}% of portfolio</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={categoryPerformance}
            xKey="category"
            yKeys={['return']}
            height={250}
            colors={['#3b82f6']}
          />
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Invested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Returns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return %
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categoryPerformance.map((category, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={
                        category.category === 'Equity' ? 'blue' :
                        category.category === 'Debt' ? 'green' :
                        category.category === 'Hybrid' ? 'purple' : 'yellow'
                      }>
                        {category.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatCurrency(category.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(category.invested)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`font-medium ${category.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(category.value - category.invested)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${category.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {category.return >= 0 ? (
                          <TrendingUp size={14} className="mr-1" />
                        ) : (
                          <TrendingDown size={14} className="mr-1" />
                        )}
                        {category.return >= 0 ? '+' : ''}{category.return}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {riskMetrics.sharpeRatio}
            </div>
            <p className="text-gray-600 text-sm">Sharpe Ratio</p>
            <Badge variant="success" className="mt-2">Good</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {riskMetrics.beta}
            </div>
            <p className="text-gray-600 text-sm">Beta</p>
            <Badge variant="success" className="mt-2">Less Volatile</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {riskMetrics.alpha}%
            </div>
            <p className="text-gray-600 text-sm">Alpha</p>
            <Badge variant="success" className="mt-2">Outperforming</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {riskMetrics.standardDeviation}%
            </div>
            <p className="text-gray-600 text-sm">Std. Deviation</p>
            <Badge variant="warning" className="mt-2">Moderate Risk</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {riskMetrics.maxDrawdown}%
            </div>
            <p className="text-gray-600 text-sm">Max Drawdown</p>
            <Badge variant="error" className="mt-2">High Risk</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award size={20} className="mr-2" />
            Portfolio Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium text-green-800">✅ Well Diversified</p>
              <p className="text-sm text-green-700">
                Your portfolio is well diversified across asset classes
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-800">📈 Consider Increasing Equity</p>
              <p className="text-sm text-blue-700">
                For long-term goals, consider increasing equity allocation to 60-70%
              </p>
            </div>
            
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-medium text-yellow-800">⚠️ Rebalance Portfolio</p>
              <p className="text-sm text-yellow-700">
                Your equity allocation has drifted above target. Consider rebalancing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioReport;