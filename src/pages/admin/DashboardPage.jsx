import React from 'react';
import AdminLayout from '@components/layouts/AdminLayout';

const DashboardPage = () => {
  const platformStats = [
    { title: 'Total Users', value: '10,245', change: '+5.2%', icon: '👥' },
    { title: 'Active Investors', value: '8,567', change: '+12.8%', icon: '💰' },
    { title: 'Total AUM', value: '₹525Cr', change: '+8.3%', icon: '📈' },
    { title: 'Monthly Revenue', value: '₹2.5Cr', change: '+15.7%', icon: '💵' },
    { title: 'Active Advisors', value: '245', change: '+3.4%', icon: '👔' },
    { title: 'Platform Uptime', value: '99.9%', change: '+0.1%', icon: '🖥️' }
  ];

  const recentSignups = [
    { name: 'Rohit Verma', type: 'Investor', date: 'Today', status: 'verified' },
    { name: 'Meena Patel', type: 'Advisor', date: 'Yesterday', status: 'pending' },
    { name: 'Suresh Kumar', type: 'Investor', date: '2 days ago', status: 'verified' },
    { name: 'Anjali Shah', type: 'Investor', date: '3 days ago', status: 'verified' }
  ];

  const systemHealth = [
    { component: 'API Server', status: 'healthy', response: '45ms' },
    { component: 'Database', status: 'healthy', response: '12ms' },
    { component: 'File Storage', status: 'healthy', response: '28ms' },
    { component: 'Email Service', status: 'warning', response: '120ms' }
  ];

  return (
    <AdminLayout>
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100">
              Platform overview and system monitoring
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition">
                System Logs
              </button>
              <button className="px-4 py-2 bg-white text-purple-700 rounded-lg hover:bg-purple-50 transition font-medium">
                Quick Actions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {platformStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl">{stat.icon}</div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Signups */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Signups</h2>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  View All →
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSignups.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-800">{user.name}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.type === 'Investor' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {user.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{user.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.status === 'verified' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-purple-600 hover:text-purple-800 text-sm">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">System Health</h2>
              
              <div className="space-y-4">
                {systemHealth.map((component, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium text-gray-800">{component.component}</div>
                      <div className={`w-3 h-3 rounded-full ${
                        component.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status: {component.status}</span>
                      <span className="text-gray-600">Response: {component.response}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-600">Last Updated</div>
                    <div className="font-medium">Just now</div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-2xl font-bold mb-1">2,457</div>
            <div className="text-blue-100">Active Sessions Today</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold mb-1">₹12.5L</div>
            <div className="text-green-100">Transactions Today</div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-2xl font-bold mb-1">3</div>
            <div className="text-red-100">System Alerts</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
EOF
