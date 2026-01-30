import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { formatCurrency } from '@utils/helpers/currencyFormatter';
import { formatDate } from '@utils/helpers/dateFormatter';

const PlatformStats = () => {
    // Mock data - replace with actual API data
    const performanceMetrics = {
        conversionRate: 3.2,
        retentionRate: 85.5,
        avgSessionDuration: '4m 32s',
        bounceRate: 28.4,
        pageViews: 154200,
        uniqueVisitors: 45210
    };

    const revenueData = [
        { month: 'Jan', revenue: 8500000, users: 9800 },
        { month: 'Feb', revenue: 9200000, users: 10200 },
        { month: 'Mar', revenue: 10500000, users: 10800 },
        { month: 'Apr', revenue: 11200000, users: 11250 },
        { month: 'May', revenue: 11800000, users: 11500 },
        { month: 'Jun', revenue: 12200000, users: 11800 },
        { month: 'Jul', revenue: 12500000, users: 12200 },
        { month: 'Aug', revenue: 12800000, users: 12400 },
        { month: 'Sep', revenue: 13000000, users: 12543 },
        { month: 'Oct', revenue: 13500000, users: 12800 }
    ];

    const trafficSources = [
        { source: 'Direct', visitors: 18500, percentage: 41 },
        { source: 'Organic Search', visitors: 12400, percentage: 27 },
        { source: 'Social Media', visitors: 6800, percentage: 15 },
        { source: 'Referral', visitors: 4520, percentage: 10 },
        { source: 'Email', visitors: 2250, percentage: 5 },
        { source: 'Others', visitors: 1140, percentage: 2 }
    ];

    const userAcquisition = [
        { channel: 'Google Ads', cost: 450000, conversions: 1250, cpa: 360 },
        { channel: 'Facebook Ads', cost: 320000, conversions: 850, cpa: 376 },
        { channel: 'LinkedIn Ads', cost: 180000, conversions: 320, cpa: 562 },
        { channel: 'SEO', cost: 150000, conversions: 2100, cpa: 71 },
        { channel: 'Content Marketing', cost: 120000, conversions: 950, cpa: 126 }
    ];

    const deviceBreakdown = [
        { device: 'Mobile', users: 31500, percentage: 70 },
        { device: 'Desktop', users: 11250, percentage: 25 },
        { device: 'Tablet', users: 2250, percentage: 5 }
    ];

    const topPages = [
        { page: '/dashboard', views: 45200, avgTime: '3m 45s' },
        { page: '/funds', views: 38500, avgTime: '2m 30s' },
        { page: '/sip-calculator', views: 28500, avgTime: '4m 15s' },
        { page: '/login', views: 25400, avgTime: '1m 20s' },
        { page: '/register', views: 19800, avgTime: '5m 10s' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Platform Analytics</h2>
                <p className="text-gray-600">Detailed insights into platform performance and user behavior</p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Conversion Rate</div>
                    <div className="text-2xl font-bold text-gray-800">{performanceMetrics.conversionRate}%</div>
                    <div className="text-sm text-green-600">+0.4%</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Retention Rate</div>
                    <div className="text-2xl font-bold text-gray-800">{performanceMetrics.retentionRate}%</div>
                    <div className="text-sm text-green-600">+2.1%</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Avg. Session</div>
                    <div className="text-2xl font-bold text-gray-800">{performanceMetrics.avgSessionDuration}</div>
                    <div className="text-sm text-green-600">+32s</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Bounce Rate</div>
                    <div className="text-2xl font-bold text-gray-800">{performanceMetrics.bounceRate}%</div>
                    <div className="text-sm text-red-600">-1.2%</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Page Views</div>
                    <div className="text-2xl font-bold text-gray-800">
                        {(performanceMetrics.pageViews / 1000).toFixed(1)}k
                    </div>
                    <div className="text-sm text-green-600">+12.5%</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Unique Visitors</div>
                    <div className="text-2xl font-bold text-gray-800">
                        {(performanceMetrics.uniqueVisitors / 1000).toFixed(1)}k
                    </div>
                    <div className="text-sm text-green-600">+8.4%</div>
                </div>
            </div>

            {/* Revenue & Users Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue & User Growth</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" />
                                <YAxis 
                                    yAxisId="left"
                                    tickFormatter={(value) => `₹${value / 1000000}M`}
                                />
                                <YAxis 
                                    yAxisId="right"
                                    orientation="right"
                                    tickFormatter={(value) => `${value / 1000}k`}
                                />
                                <Tooltip 
                                    formatter={(value, name) => [
                                        name === 'revenue' 
                                            ? formatCurrency(value)
                                            : value.toLocaleString(),
                                        name === 'revenue' ? 'Revenue' : 'Users'
                                    ]}
                                />
                                <Area 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#8b5cf6" 
                                    fill="#8b5cf6" 
                                    fillOpacity={0.1}
                                    name="revenue"
                                />
                                <Area 
                                    yAxisId="right"
                                    type="monotone" 
                                    dataKey="users" 
                                    stroke="#10b981" 
                                    fill="#10b981" 
                                    fillOpacity={0.1}
                                    name="users"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Traffic Sources</h3>
                    <div className="space-y-4">
                        {trafficSources.map((source, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">{source.source}</span>
                                    <span className="text-sm text-gray-500">
                                        {source.visitors.toLocaleString()} ({source.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${source.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Acquisition Costs */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">User Acquisition Costs</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userAcquisition}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="channel" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip 
                                formatter={(value, name) => {
                                    if (name === 'cost') return [formatCurrency(value), 'Cost'];
                                    if (name === 'cpa') return [`₹${value}`, 'CPA'];
                                    return [value, 'Conversions'];
                                }}
                            />
                            <Bar yAxisId="left" dataKey="conversions" fill="#3b82f6" name="conversions" />
                            <Bar yAxisId="right" dataKey="cpa" fill="#f59e0b" name="cpa" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Device Breakdown & Top Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Breakdown */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Device Breakdown</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deviceBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="users"
                                    label={({ device, percentage }) => `${device}: ${percentage}%`}
                                >
                                    <Cell fill="#3b82f6" />
                                    <Cell fill="#10b981" />
                                    <Cell fill="#8b5cf6" />
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => [value.toLocaleString(), 'Users']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Pages */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Performing Pages</h3>
                    <div className="space-y-4">
                        {topPages.map((page, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{page.page}</div>
                                        <div className="text-sm text-gray-500">Avg: {page.avgTime}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-900">
                                        {(page.views / 1000).toFixed(1)}k views
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Geographic Distribution</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Detailed Map →
                    </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { city: 'Mumbai', users: 12500, growth: '+12%' },
                        { city: 'Delhi', users: 11200, growth: '+8%' },
                        { city: 'Bangalore', users: 9800, growth: '+15%' },
                        { city: 'Hyderabad', users: 6800, growth: '+10%' },
                        { city: 'Chennai', users: 5200, growth: '+6%' },
                        { city: 'Others', users: 19543, growth: '+9%' }
                    ].map((location, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-500">{location.city}</div>
                            <div className="text-xl font-bold text-gray-800">
                                {(location.users / 1000).toFixed(1)}k
                            </div>
                            <div className={`text-sm ${location.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {location.growth}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Performance Summary</h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">Platform growth is steady at 12% MoM</span>
                        <span className="font-medium text-blue-700">Excellent</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">User retention improved by 2.1%</span>
                        <span className="font-medium text-blue-700">Good</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">Acquisition costs are within budget</span>
                        <span className="font-medium text-blue-700">Optimal</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">Mobile traffic dominates at 70%</span>
                        <span className="font-medium text-blue-700">Expected</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-300">
                    <p className="text-sm text-blue-600">
                        Recommendation: Focus on improving conversion rate from mobile users and reducing bounce rate on key landing pages.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlatformStats;
EOF