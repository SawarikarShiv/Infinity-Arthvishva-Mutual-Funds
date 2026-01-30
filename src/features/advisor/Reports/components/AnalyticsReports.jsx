import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/common/Card';
import { LineChart, BarChart, PieChart } from '../../../../components/common/Charts';
import { PrimaryButton, SecondaryButton } from '../../../../components/common/Button';
import { SelectInput } from '../../../../components/common/Inputs';
import { Download, TrendingUp, Users, Target, DollarSign, BarChart3 } from 'lucide-react';

const AnalyticsReports = () => {
  const [period, setPeriod] = useState('quarter');
  const [view, setView] = useState('overview');

  // Analytics data
  const overviewMetrics = [
    { 
      title: 'Revenue Growth', 
      value: '+18.5%', 
      change: '+2.3% from last quarter',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    { 
      title: 'Client Growth', 
      value: '+12.3%', 
      change: '+4 new clients',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    { 
      title: 'AUM Growth', 
      value: '+15.2%', 
      change: '₹92.5L increase',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    { 
      title: 'Retention Rate', 
      value: '92.5%', 
      change: 'Above industry avg.',
      icon: <Target className="h-6 w-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const revenueTrend = [
    { month: 'Jul', revenue: 65000, target: 70000 },
    { month: 'Aug', revenue: 72000, target: 72000 },
    { month: 'Sep', revenue: 81000, target: 75000 },
    { month: 'Oct', revenue: 75000, target: 78000 },
    { month: 'Nov', revenue: 92000, target: 80000 },
    { month: 'Dec', revenue: 105000, target: 85000 },
  ];

  const revenueSources = [
    { name: 'Advisory Fees', value: 365000, color: '#3b82f6' },
    { name: 'Commission', value: 152000, color: '#10b981' },
    { name: 'Portfolio Management', value: 98000, color: '#8b5cf6' },
    { name: 'Consultation', value: 45000, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Analytics</h1>
          <p className="text-gray-600">Deep insights into your advisory business</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download className="h-4 w-4" />}>
            Export Analytics
          </SecondaryButton>
          <PrimaryButton icon={<BarChart3 className="h-4 w-4" />}>
            Custom Analytics
          </PrimaryButton>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <div className={metric.color}>{metric.icon}</div>
                </div>
                <SelectInput
                  size="sm"
                  value={period}
                  onChange={setPeriod}
                  options={[
                    { value: 'month', label: 'Mo' },
                    { value: 'quarter', label: 'Q' },
                    { value: 'year', label: 'Y' },
                  ]}
                  className="w-20"
                />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-gray-900 font-medium mt-1">{metric.title}</p>
                <p className="text-sm text-gray-600 mt-1">{metric.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend vs Target</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={revenueTrend}
              xKey="month"
              yKeys={['revenue', 'target']}
              height={300}
              colors={['#10b981', '#94a3b8']}
              legend={['Actual Revenue', 'Target']}
              showGrid={true}
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  ₹{revenueTrend.reduce((sum, month) => sum + month.revenue, 0).toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  ₹{revenueTrend.reduce((sum, month) => sum + month.target, 0).toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600">Total Target</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {((revenueTrend.reduce((sum, month) => sum + month.revenue, 0) / 
                    revenueTrend.reduce((sum, month) => sum + month.target, 0) * 100) - 100).toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600">Above Target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>Breakdown by income stream</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={revenueSources}
              height={300}
              showLegend={true}
              legendPosition="right"
            />
          </CardContent>
        </Card>
      </div>

      {/* Client Segmentation */}
      <Card>
        <CardHeader>
          <CardTitle>Client Segmentation Analysis</CardTitle>
          <CardDescription>Client distribution by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Segment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Clients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total AUM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Annual Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Revenue per Client
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { segment: 'High Net Worth', clients: 8, aum: 28500000, revenue: 420000 },
                  { segment: 'Affluent', clients: 12, aum: 22500000, revenue: 315000 },
                  { segment: 'Mass Affluent', clients: 8, aum: 11450000, revenue: 160000 },
                ].map((segment, index) => {
                  const avgRevenue = segment.revenue / segment.clients;
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{segment.segment}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-2" />
                          {segment.clients} clients
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        ₹{(segment.aum / 100000).toFixed(1)}L
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                        ₹{segment.revenue.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₹{avgRevenue.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReports;