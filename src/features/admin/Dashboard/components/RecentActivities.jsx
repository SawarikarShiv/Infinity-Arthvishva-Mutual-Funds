import React, { useState } from 'react';
import { formatDate } from '@utils/helpers/dateFormatter';
import Badge from '@components/common/UI/Badge';

const RecentActivities = () => {
    const [filter, setFilter] = useState('all');

    const activities = [
        {
            id: 1,
            user: 'Rajesh Kumar',
            action: 'user_registration',
            details: 'New investor registered with email rajesh.k@email.com',
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            severity: 'info',
            ipAddress: '203.0.113.45',
            status: 'completed'
        },
        {
            id: 2,
            user: 'System',
            action: 'system_backup',
            details: 'Automated daily backup completed successfully',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            severity: 'info',
            ipAddress: '127.0.0.1',
            status: 'completed'
        },
        {
            id: 3,
            user: 'Priya Sharma',
            action: 'investment',
            details: 'Started new SIP of ₹5,000 in SBI Bluechip Fund',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
            severity: 'info',
            ipAddress: '198.51.100.23',
            status: 'pending'
        },
        {
            id: 4,
            user: 'Admin',
            action: 'config_update',
            details: 'Updated platform maintenance settings',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
            severity: 'medium',
            ipAddress: '192.168.1.100',
            status: 'completed'
        },
        {
            id: 5,
            user: 'Amit Patel',
            action: 'kyc_verification',
            details: 'KYC documents submitted for verification',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
            severity: 'low',
            ipAddress: '203.0.113.78',
            status: 'in_progress'
        },
        {
            id: 6,
            user: 'System',
            action: 'security_alert',
            details: 'Multiple failed login attempts detected from IP 203.0.113.45',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
            severity: 'high',
            ipAddress: '203.0.113.45',
            status: 'resolved'
        },
        {
            id: 7,
            user: 'Vikram Singh',
            action: 'large_transaction',
            details: 'Redeemed ₹10,00,000 from portfolio',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            severity: 'medium',
            ipAddress: '198.51.100.89',
            status: 'completed'
        },
        {
            id: 8,
            user: 'System',
            action: 'performance_alert',
            details: 'API response time exceeded threshold (2.5s)',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            severity: 'medium',
            ipAddress: '127.0.0.1',
            status: 'investigating'
        }
    ];

    const getActionColor = (action) => {
        const actionColors = {
            user_registration: 'blue',
            system_backup: 'purple',
            investment: 'green',
            config_update: 'yellow',
            kyc_verification: 'indigo',
            security_alert: 'red',
            large_transaction: 'orange',
            performance_alert: 'pink'
        };
        return actionColors[action] || 'gray';
    };

    const getSeverityColor = (severity) => {
        const severityColors = {
            info: 'blue',
            low: 'green',
            medium: 'yellow',
            high: 'red',
            critical: 'red'
        };
        return severityColors[severity] || 'gray';
    };

    const getStatusColor = (status) => {
        const statusColors = {
            completed: 'green',
            pending: 'yellow',
            in_progress: 'blue',
            resolved: 'green',
            investigating: 'orange',
            failed: 'red'
        };
        return statusColors[status] || 'gray';
    };

    const filteredActivities = activities.filter(activity => {
        if (filter === 'all') return true;
        if (filter === 'security') return activity.severity === 'high' || activity.severity === 'critical';
        if (filter === 'user') return activity.user !== 'System' && activity.user !== 'Admin';
        if (filter === 'system') return activity.user === 'System';
        return true;
    });

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const diffMs = now - timestamp;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 60) {
            return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Recent Activities</h2>
                    <p className="text-gray-600">Monitor platform activities and system events</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Export Logs
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'all'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    All Activities
                </button>
                <button
                    onClick={() => setFilter('security')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'security'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Security Events
                </button>
                <button
                    onClick={() => setFilter('user')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'user'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    User Activities
                </button>
                <button
                    onClick={() => setFilter('system')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        filter === 'system'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    System Events
                </button>
            </div>

            {/* Activities List */}
            <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Time</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">User</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Action</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Details</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Severity</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActivities.map(activity => (
                                <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="text-sm text-gray-900">{getTimeAgo(activity.timestamp)}</div>
                                        <div className="text-xs text-gray-500">
                                            {formatDate(activity.timestamp, 'hh:mm A')}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900">{activity.user}</div>
                                        <div className="text-xs text-gray-500">{activity.ipAddress}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Badge 
                                            text={activity.action.replace('_', ' ')}
                                            color={getActionColor(activity.action)}
                                            size="sm"
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="max-w-xs text-sm text-gray-700">
                                            {activity.details}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Badge 
                                            text={activity.severity}
                                            color={getSeverityColor(activity.severity)}
                                            size="sm"
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <Badge 
                                            text={activity.status.replace('_', ' ')}
                                            color={getStatusColor(activity.status)}
                                            size="sm"
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredActivities.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">No Activities Found</h4>
                        <p className="text-gray-600">No activities match the selected filter criteria.</p>
                    </div>
                )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Total Activities Today</div>
                    <div className="text-2xl font-bold text-gray-800">342</div>
                    <div className="text-sm text-green-600">+12% from yesterday</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Security Events</div>
                    <div className="text-2xl font-bold text-red-600">8</div>
                    <div className="text-sm text-red-600">+3 from yesterday</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Avg. Response Time</div>
                    <div className="text-2xl font-bold text-gray-800">1.2s</div>
                    <div className="text-sm text-green-600">-0.3s improvement</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Active Investigations</div>
                    <div className="text-2xl font-bold text-yellow-600">3</div>
                    <div className="text-sm text-yellow-600">Needs attention</div>
                </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Recent Security Alerts</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {activities
                            .filter(a => a.severity === 'high' || a.severity === 'critical')
                            .slice(0, 3)
                            .map(alert => (
                                <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="font-medium text-red-700">{alert.details}</div>
                                            <div className="text-sm text-red-600">
                                                {getTimeAgo(alert.timestamp)} • {alert.user} • {alert.ipAddress}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                                        Investigate
                                    </button>
                                </div>
                            ))}
                        
                        {activities.filter(a => a.severity === 'high' || a.severity === 'critical').length === 0 && (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-green-600">No critical security alerts in the last 24 hours</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Activity Insights */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Activity Insights</h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">Peak activity hours:</span>
                        <span className="font-medium text-blue-700">10 AM - 2 PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">Most active user type:</span>
                        <span className="font-medium text-blue-700">Investors (85%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">Common actions:</span>
                        <span className="font-medium text-blue-700">Portfolio checks, SIP setup</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-600">System health:</span>
                        <span className="font-medium text-green-600">Excellent (99.9% uptime)</span>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-300">
                    <p className="text-sm text-blue-600">
                        Monitor user activity patterns to optimize platform performance and identify potential issues early.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecentActivities;
EOF