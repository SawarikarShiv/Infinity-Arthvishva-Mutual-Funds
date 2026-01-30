import React from 'react';
import AdvisorLayout from '@components/layouts/AdvisorLayout';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Clients', value: '245', change: '+12%', icon: '👥' },
    { title: 'Assets Under Advisory', value: '₹125Cr', change: '+8.5%', icon: '💰' },
    { title: 'Monthly Revenue', value: '₹12.5L', change: '+15%', icon: '📈' },
    { title: 'Client Satisfaction', value: '4.8★', change: '+0.2', icon: '⭐' }
  ];

  const recentActivities = [
    { client: 'Rajesh Sharma', action: 'Portfolio Review', time: '2 hours ago', status: 'completed' },
    { client: 'Priya Patel', action: 'New SIP Started', time: '5 hours ago', status: 'completed' },
    { client: 'Amit Kumar', action: 'Goal Planning Session', time: '1 day ago', status: 'scheduled' },
    { client: 'Sunita Reddy', action: 'Tax Saving Consultation', time: '2 days ago', status: 'completed' }
  ];

  const topClients = [
    { name: 'Vikram Singh', portfolio: '₹2.5Cr', returns: '18.5%', risk: 'Moderate' },
    { name: 'Neha Gupta', portfolio: '₹1.8Cr', returns: '16.2%', risk: 'Conservative' },
    { name: 'Rahul Mehta', portfolio: '₹1.5Cr', returns: '21.3%', risk: 'Aggressive' }
  ];

  return (
    <AdvisorLayout>
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Advisor Dashboard</h1>
            <p className="text-green-100">
              Welcome back! Here's your advisory overview for today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition font-medium">
              + New Client
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800">{activity.client}</div>
                      <div className="text-sm text-gray-600">{activity.action}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{activity.time}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        activity.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {activity.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Clients */}
          <div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Top Performing Clients</h2>
              
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-gray-800">{client.name}</div>
                        <div className="text-sm text-gray-600">Portfolio: {client.portfolio}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        client.risk === 'Aggressive' ? 'bg-red-100 text-red-700' :
                        client.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {client.risk}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">Returns</div>
                        <div className="text-lg font-bold text-green-600">{client.returns}</div>
                      </div>
                      <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium">Client Review</div>
              <div className="text-sm text-gray-500">Schedule meetings</div>
            </button>
            <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
              <div className="text-2xl mb-2">📄</div>
              <div className="font-medium">Generate Reports</div>
              <div className="text-sm text-gray-500">Client statements</div>
            </button>
            <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
              <div className="text-2xl mb-2">💼</div>
              <div className="font-medium">Portfolio Rebalance</div>
              <div className="text-sm text-gray-500">Optimize allocations</div>
            </button>
            <button className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium">Goal Planning</div>
              <div className="text-sm text-gray-500">Set new targets</div>
            </button>
          </div>
        </div>
      </div>
    </AdvisorLayout>
  );
};

export default DashboardPage;
EOF
