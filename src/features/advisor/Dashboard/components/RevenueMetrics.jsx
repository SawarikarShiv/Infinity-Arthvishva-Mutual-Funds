import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/Card';
import { BarChart, PieChart } from '../../../../components/common/Charts';
import { Badge } from '../../../../components/common/UI';
import { TrendingUp, DollarSign } from 'lucide-react';

const RevenueMetrics = () => {
  const revenueData = [
    { month: 'Jan', advisory: 45000, commission: 20000 },
    { month: 'Feb', advisory: 52000, commission: 22000 },
    { month: 'Mar', advisory: 61000, commission: 25000 },
    { month: 'Apr', advisory: 55000, commission: 20000 },
    { month: 'May', advisory: 72000, commission: 30000 },
    { month: 'Jun', advisory: 80000, commission: 35000 },
  ];

  const revenueBySource = [
    { name: 'Advisory Fees', value: 365000, color: '#3b82f6' },
    { name: 'Commissions', value: 152000, color: '#10b981' },
    { name: 'Portfolio Mgmt.', value: 98000, color: '#8b5cf6' },
    { name: 'Consultation', value: 45000, color: '#f59e0b' },
  ];

  const topClients = [
    { name: 'Rajesh Kumar', revenue: 85000, growth: '12%' },
    { name: 'Amit Patel', revenue: 72000, growth: '8%' },
    { name: 'Sneha Reddy', revenue: 65000, growth: '15%' },
    { name: 'Vikram Singh', revenue: 58000, growth: '5%' },
    { name: 'Priya Sharma', revenue: 52000, growth: '10%' },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={revenueData}
              xKey="month"
              yKeys={['advisory', 'commission']}
              height={300}
              colors={['#3b82f6', '#10b981']}
              legend={['Advisory Fees', 'Commissions']}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={revenueBySource}
              height={300}
              showLegend={true}
              legendPosition="right"
            />
          </CardContent>
        </Card>
      </div>

      {/* Top Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Top Revenue Generating Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-500">Revenue Generated</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                    <p className="font-bold text-lg text-gray-900">
                      ₹{client.revenue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <Badge variant="success" className="mt-1">
                    {client.growth} growth
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
                <div className="text-3xl font-bold text-green-600">
                  ₹{517000?.toLocaleString('en-IN')}
                </div>
              </div>
              <p className="text-gray-600 mt-2">Quarterly Revenue</p>
              <Badge variant="success" className="mt-2">+18% from last quarter</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {85}%
              </div>
              <p className="text-gray-600 mt-2">Client Retention Rate</p>
              <Badge variant="success" className="mt-2">Industry avg: 75%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                ₹{125000?.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600 mt-2">Avg. Revenue per Client</p>
              <Badge variant="success" className="mt-2">+12% YoY</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueMetrics;