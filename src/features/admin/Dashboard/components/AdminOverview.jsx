import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatsCard from '@components/common/Card/StatsCard';
import { formatCurrency } from '@utils/helpers/currencyFormatter';
import { formatDate } from '@utils/helpers/dateFormatter';

const AdminOverview = () => {
    // Mock data - replace with actual API data
    const platformStats = {
        totalUsers: 12543,
        activeUsers: 10234,
        newUsersToday: 145,
        totalInvestment: 1250000000, // 125 crores
        todaysInvestment: 25000000, // 2.5 crores
        activeSIPs: 8542,
        pendingTransactions: 342,
        platformRevenue: 12500000 // 1.25 crores
    };

    const growthData = [
        { month: 'Jan', users: 10500, investment: 1050000000 },
        { month: 'Feb', users: 10800, investment: 1080000000 },
        { month: 'Mar', users: 11000, investment: 1100000000 },
        { month: 'Apr', users: 11250, investment: 1125000000 },
        { month: 'May', users: 11500, investment: 1150000000 },
        { month: 'Jun', users: 11800, investment: 1180000000 },
        { month: 'Jul', users: 12000, investment: 1200000000 },
        { month: 'Aug', users: 12200, investment: 1220000000 },
        { month: 'Sep', users: 12400, investment: 1240000000 },
        { month: 'Oct', users: 12543, investment: 1250000000 }
    ];

    const userDistribution = [
        { name: 'Investors', value: 11489, color: '#3b82f6' },
        { name: 'Advisors', value: 754, color: '#8b5cf6' },
        { name: 'Admins', value: 25, color: '#ef4444' },
        { name: 'Pending', value: 275, color: '#f59e0b' }
    ];

    const investmentByCategory = [
        { category: 'Equity Funds', amount: 750000000, percentage: 60 },
        { category: 'Debt Funds', amount: 300000000, percentage: 24 },
        { category: 'Hybrid Funds', amount: 125000000, percentage: 10 },
        { category: 'Others', amount: 75000000, percentage: 6 }
    ];

    const recentActivities = [
        { id: 1, user: 'Rajesh Kumar', action: 'New SIP Started', amount: '₹5,000', time: '10:30 AM' },
        { id: 2, user: 'Priya Sharma', action: 'Portfolio Redeemed', amount: '₹1,25,000', time: '11:15 AM' },
        { id: 3, user: 'Amit Patel', action: 'KYC Verified', amount: '-', time: '12:45 PM' },
        { id: 4, user: 'Sunita Reddy', action: 'New Registration', amount: '-', time: '1:30 PM' },
        { id: 5, user: 'Vikram Singh', action: 'Large Investment', amount: '₹10,00,000', time: '2:15 PM' }
    ];

    const statsCards = [
        {
            title: 'Total Users',
            value: platformStats.totalUsers.toLocaleString(),
            change: '+3.2%',
            icon: '👥',
            color: 'blue'
        },
        {
            title: 'Active Users',
            value: platformStats.activeUsers.toLocaleString(),
            change: '+2.1%',
            icon: '✅',
            color: 'green'
        },
        {
            title: "Today's Investment",
            value: formatCurrency(platformStats.todaysInvestment),
            change: '+15.5%',
            icon: '💰',
            color: 'yellow'
        },
        {
            title: 'Platform Revenue',
            value: formatCurrency(platformStats.platformRevenue),
            change: '+12.8%',
            icon: '📈',
            color: 'purple'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
                <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Platform Growth</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" />
                                <YAxis 
                                    yAxisId="left"
                                    tickFormatter={(value) => `${value / 1000}k`}
                                    label={{ value: 'Users', angle: -90, position: 'insideLeft' }}
                                />
                                <YAxis 
                                    yAxisId="right"
                                    orientation="right"
                                    tickFormatter={(value) => `₹${value / 10000000}Cr`}
                                    label={{ value: 'Investment', angle: 90, position: 'insideRight' }}
                                />
                                <Tooltip 
                                    formatter={(value, name) => [
                                        name === 'users' 
                                            ? `${value.toLocaleString()} users`
                                            : formatCurrency(value),
                                        name === 'users' ? 'Users' : 'Investment'
                                    ]}
                                />
                                <Line 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="users" 
                                    stroke="#3b82f6" 
                                    strokeWidth={3}
                                    name="users"
                                />
                                <Line 
                                    yAxisId="right"
                                    type="monotone" 
                                    dataKey="investment" 
                                    stroke="#10b981" 
                                    strokeWidth={3}
                                    name="investment"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* User Distribution */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">User Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                >
                                    {userDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value) => [value.toLocaleString(), 'Users']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {userDistribution.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div 
                                    className="w-3 h-3 rounded-full mr-2" 
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-sm text-gray-600">{item.name}</span>
                                <span className="ml-auto text-sm font-medium">
                                    {item.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Investment Distribution */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Investment Distribution by Category</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={investmentByCategory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="category" 
                                angle={-45}
                                textAnchor="end"
                                height={60}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis 
                                tickFormatter={(value) => `₹${value / 10000000}Cr`}
                            />
                            <Tooltip 
                                formatter={(value) => [formatCurrency(value), 'Amount']}
                            />
                            <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Activities & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">Recent Activities</h3>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All →
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {recentActivities.map(activity => (
                            <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600">
                                            {activity.user.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{activity.user}</div>
                                        <div className="text-sm text-gray-500">{activity.action}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-gray-900">{activity.amount}</div>
                                    <div className="text-sm text-gray-500">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">Quick Stats</h3>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-2">Active SIPs</div>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-gray-800">
                                    {platformStats.activeSIPs.toLocaleString()}
                                </div>
                                <div className="text-sm text-green-600">+8.5%</div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500 mb-2">Pending Transactions</div>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-gray-800">
                                    {platformStats.pendingTransactions}
                                </div>
                                <div className="text-sm text-red-600">+12</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500 mb-2">Avg. Investment Size</div>
                            <div className="text-2xl font-bold text-gray-800">₹1.2L</div>
                        </div>

                        <div>
                            <div className="text-sm text-gray-500 mb-2">Platform Uptime</div>
                            <div className="text-2xl font-bold text-green-600">99.95%</div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Last updated: {formatDate(new Date())}</p>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
EOF