import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/common/Card';
import { StatsCard } from '../../../../components/common/Card';
import { LineChart } from '../../../../components/common/Charts';
import { Badge } from '../../../../components/common/UI';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const AdvisorOverview = ({ advisorData }) => {
  const stats = [
    {
      title: 'Total Clients',
      value: advisorData?.totalClients || 0,
      change: '+12%',
      trend: 'up',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Portfolios',
      value: advisorData?.activePortfolios || 0,
      change: '+5%',
      trend: 'up',
      icon: <Target className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total AUM',
      value: `₹${(advisorData?.totalAUM || 0).toLocaleString('en-IN')}`,
      change: '+8.2%',
      trend: 'up',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Avg. Client XIRR',
      value: `${(advisorData?.avgXIRR || 0).toFixed(2)}%`,
      change: '+1.5%',
      trend: 'up',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const performanceData = [
    { month: 'Jan', revenue: 65000, clients: 15 },
    { month: 'Feb', revenue: 72000, clients: 18 },
    { month: 'Mar', revenue: 81000, clients: 22 },
    { month: 'Apr', revenue: 75000, clients: 20 },
    { month: 'May', revenue: 92000, clients: 25 },
    { month: 'Jun', revenue: 105000, clients: 28 },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Portfolio Review Completed',
      description: 'Reviewed Rajesh Kumar\'s portfolio',
      time: '2 hours ago',
      icon: '📊',
    },
    {
      id: 2,
      title: 'New Client Onboarded',
      description: 'Signed up new client Priya Sharma',
      time: '1 day ago',
      icon: '👥',
    },
    {
      id: 3,
      title: 'Meeting Scheduled',
      description: 'Scheduled quarterly review with Amit Patel',
      time: '2 days ago',
      icon: '📅',
    },
    {
      id: 4,
      title: 'Report Generated',
      description: 'Generated Q4 performance report',
      time: '3 days ago',
      icon: '📈',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {advisorData?.name || 'Advisor'}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your advisory business today
          </p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={performanceData}
              xKey="month"
              yKey="revenue"
              height={300}
              colors={['#10b981']}
              showGrid={true}
            />
          </CardContent>
        </Card>

        {/* Client Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
            <CardDescription>New clients acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={performanceData}
              xKey="month"
              yKey="clients"
              height={300}
              colors={['#3b82f6']}
              showGrid={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvisorOverview;