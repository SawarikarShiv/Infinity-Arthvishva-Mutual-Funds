import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/common/Card';
import { LineChart, BarChart } from '../../../../components/common/Charts';
import { PrimaryButton, SecondaryButton } from '../../../../components/common/Button';
import { SelectInput } from '../../../../components/common/Inputs';
import { Download, TrendingUp, Users, Target, DollarSign } from 'lucide-react';

const PerformanceReports = () => {
  const [timeframe, setTimeframe] = useState('quarter');
  const [metric, setMetric] = useState('xirr');

  // Sample performance data
  const advisorPerformance = {
    totalClients: 28,
    activeClients: 25,
    totalAUM: 62450000,
    averageXIRR: 11.8,
    benchmarkReturn: 9.5,
    clientRetention: 92,
  };

  const performanceTrend = [
    { month: 'Jul', advisor: 10.2, benchmark: 8.5, clients: 22 },
    { month: 'Aug', advisor: 10.8, benchmark: 8.8, clients: 23 },
    { month: 'Sep', advisor: 11.2, benchmark: 9.0, clients: 24 },
    { month: 'Oct', advisor: 11.0, benchmark: 9.2, clients: 25 },
    { month: 'Nov', advisor: 11.5, benchmark: 9.3, clients: 26 },
    { month: 'Dec', advisor: 11.8, benchmark: 9.5, clients: 28 },
  ];

  const topPerformers = [
    { rank: 1, client: 'Amit Patel', xirr: 15.3, aum: 3200000 },
    { rank: 2, client: 'Rajesh Kumar', xirr: 12.5, aum: 2450000 },
    { rank: 3, client: 'Vikram Singh', xirr: 10.8, aum: 2800000 },
    { rank: 4, client: 'Priya Sharma', xirr: 8.2, aum: 1850000 },
    { rank: 5, client: 'Sneha Reddy', xirr: -2.1, aum: 1250000 },
  ];

  const timeframes = [
    { value: 'month', label: 'Monthly' },
    { value: 'quarter', label: 'Quarterly' },
    { value: 'half-year', label: 'Half Yearly' },
    { value: 'year', label: 'Yearly' },
  ];

  const metrics = [
    { value: 'xirr', label: 'XIRR Performance' },
    { value: 'aum', label: 'AUM Growth' },
    { value: 'clients', label: 'Client Growth' },
    { value: 'retention', label: 'Retention Rate' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Reports</h1>
          <p className="text-gray-600">Track and analyze your advisory performance</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download className="h-4 w-4" />}>
            Export Report
          </SecondaryButton>
          <PrimaryButton>Generate Custom Report</PrimaryButton>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {advisorPerformance.averageXIRR}%
              </div>
              <p className="text-gray-600 mt-2">Average Client XIRR</p>
              <div className="flex items-center justify-center mt-2">
                {advisorPerformance.averageXIRR > advisorPerformance.benchmarkReturn ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${advisorPerformance.averageXIRR > advisorPerformance.benchmarkReturn ? 'text-green-600' : 'text-red-600'}`}>
                  {advisorPerformance.averageXIRR - advisorPerformance.benchmarkReturn > 0 ? '+' : ''}
                  {(advisorPerformance.averageXIRR - advisorPerformance.benchmarkReturn).toFixed(1)}% vs benchmark
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                ₹{(advisorPerformance.totalAUM / 1000000).toFixed(1)}M
              </div>
              <p className="text-gray-600 mt-2">Total AUM</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {advisorPerformance.totalClients}
              </div>
              <p className="text-gray-600 mt-2">Total Clients</p>
              <div className="flex items-center justify-center mt-2">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">{advisorPerformance.activeClients} active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {advisorPerformance.clientRetention}%
              </div>
              <p className="text-gray-600 mt-2">Client Retention</p>
              <div className="flex items-center justify-center mt-2">
                <Target className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Above industry avg.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SelectInput
              label="Timeframe"
              value={timeframe}
              onChange={setTimeframe}
              options={timeframes}
            />
            <SelectInput
              label="Primary Metric"
              value={metric}
              onChange={setMetric}
              options={metrics}
            />
            <SelectInput
              label="Compare With"
              value="benchmark"
              onChange={() => {}}
              options={[
                { value: 'benchmark', label: 'Benchmark' },
                { value: 'peers', label: 'Peer Average' },
                { value: 'target', label: 'Target' },
              ]}
            />
            <div className="flex items-end">
              <PrimaryButton fullWidth>Update View</PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance vs Benchmark */}
        <Card>
          <CardHeader>
            <CardTitle>Performance vs Benchmark</CardTitle>
            <CardDescription>XIRR comparison over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={performanceTrend}
              xKey="month"
              yKeys={['advisor', 'benchmark']}
              height={350}
              colors={['#3b82f6', '#94a3b8']}
              legend={['Your XIRR', 'Benchmark']}
              showGrid={true}
            />
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Clients</CardTitle>
            <CardDescription>Clients with highest XIRR performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((client) => (
                <div
                  key={client.rank}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      client.rank === 1 ? 'bg-yellow-100' :
                      client.rank === 2 ? 'bg-gray-100' :
                      client.rank === 3 ? 'bg-orange-100' : 'bg-gray-50'
                    }`}>
                      <span className={`font-bold ${
                        client.rank === 1 ? 'text-yellow-600' :
                        client.rank === 2 ? 'text-gray-600' :
                        client.rank === 3 ? 'text-orange-600' : 'text-gray-500'
                      }`}>
                        {client.rank}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{client.client}</h4>
                      <p className="text-sm text-gray-500">
                        AUM: ₹{client.aum.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${client.xirr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {client.xirr >= 0 ? '+' : ''}{client.xirr}%
                    </div>
                    <p className="text-sm text-gray-500">XIRR</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Strong performance in equity portfolios</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Excellent client communication</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                <span className="text-gray-700">High client retention rate</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Increase debt portfolio exposure</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Expand client acquisition channels</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Improve underperforming portfolios</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Conduct portfolio reviews for bottom 20% clients</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Consider tax-efficient strategies for high-value clients</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                <span className="text-gray-700">Implement systematic rebalancing process</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReports;