import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuditLogs, selectAuditLogs, selectAuditLogsLoading } from '../auditSlice';
import DataTable from '@components/common/Table/DataTable';
import Badge from '@components/common/UI/Badge';
import { formatDate } from '@utils/helpers/dateFormatter';

const AuditLogsList = () => {
    const dispatch = useDispatch();
    const logs = useSelector(selectAuditLogs);
    const loading = useSelector(selectAuditLogsLoading);
    
    const [filters, setFilters] = useState({
        actionType: 'all',
        userId: '',
        dateRange: {
            start: '',
            end: ''
        },
        search: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0
    });

    React.useEffect(() => {
        dispatch(fetchAuditLogs({
            page: pagination.page,
            limit: pagination.limit,
            filters
        }));
    }, [dispatch, pagination.page, pagination.limit, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const getActionColor = (action) => {
        const actionColors = {
            login: 'blue',
            logout: 'gray',
            create: 'green',
            update: 'yellow',
            delete: 'red',
            read: 'purple',
            export: 'indigo',
            import: 'pink'
        };
        return actionColors[action] || 'gray';
    };

    const getSeverityColor = (severity) => {
        const severityColors = {
            info: 'blue',
            low: 'green',
            medium: 'yellow',
            high: 'orange',
            critical: 'red'
        };
        return severityColors[severity] || 'gray';
    };

    const columns = [
        {
            key: 'timestamp',
            header: 'Timestamp',
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-medium">{formatDate(row.timestamp, 'DD MMM YYYY')}</div>
                    <div className="text-sm text-gray-500">
                        {new Date(row.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            )
        },
        {
            key: 'user',
            header: 'User',
            render: (row) => (
                <div>
                    <div className="font-medium">{row.userName}</div>
                    <div className="text-sm text-gray-500">{row.userEmail}</div>
                </div>
            )
        },
        {
            key: 'action',
            header: 'Action',
            render: (row) => (
                <Badge 
                    text={row.action} 
                    color={getActionColor(row.action)}
                    size="sm"
                />
            )
        },
        {
            key: 'entity',
            header: 'Entity',
            render: (row) => row.entity || 'System'
        },
        {
            key: 'details',
            header: 'Details',
            render: (row) => (
                <div className="max-w-xs truncate" title={row.details}>
                    {row.details}
                </div>
            )
        },
        {
            key: 'ip',
            header: 'IP Address',
            render: (row) => row.ipAddress || 'N/A'
        },
        {
            key: 'severity',
            header: 'Severity',
            render: (row) => (
                <Badge 
                    text={row.severity} 
                    color={getSeverityColor(row.severity)}
                    size="sm"
                />
            )
        }
    ];

    const actionTypes = [
        'all', 'login', 'logout', 'create', 'update', 'delete', 
        'read', 'export', 'import', 'security', 'system'
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Audit Logs</h2>
                <p className="text-gray-600">Monitor all platform activities and security events</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Action Type
                        </label>
                        <select
                            value={filters.actionType}
                            onChange={(e) => handleFilterChange('actionType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            {actionTypes.map(type => (
                                <option key={type} value={type}>
                                    {type === 'all' ? 'All Actions' : type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            User ID/Email
                        </label>
                        <input
                            type="text"
                            placeholder="Search user..."
                            value={filters.userId}
                            onChange={(e) => handleFilterChange('userId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date From
                        </label>
                        <input
                            type="date"
                            value={filters.dateRange.start}
                            onChange={(e) => handleFilterChange('dateRange', {
                                ...filters.dateRange,
                                start: e.target.value
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date To
                        </label>
                        <input
                            type="date"
                            value={filters.dateRange.end}
                            onChange={(e) => handleFilterChange('dateRange', {
                                ...filters.dateRange,
                                end: e.target.value
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search Details
                        </label>
                        <input
                            type="text"
                            placeholder="Search in log details..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    
                    <div className="flex items-end space-x-3">
                        <button
                            onClick={() => {
                                setFilters({
                                    actionType: 'all',
                                    userId: '',
                                    dateRange: { start: '', end: '' },
                                    search: ''
                                });
                                setPagination(prev => ({ ...prev, page: 1 }));
                            }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Clear Filters
                        </button>
                        
                        <button
                            onClick={() => {/* Handle export */}}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Export Logs
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Total Logs</div>
                    <div className="text-xl font-bold text-gray-800">12,458</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Today</div>
                    <div className="text-xl font-bold text-gray-800">342</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Security Events</div>
                    <div className="text-xl font-bold text-red-600">24</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">User Actions</div>
                    <div className="text-xl font-bold text-blue-600">8,924</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">System Events</div>
                    <div className="text-xl font-bold text-purple-600">1,245</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Avg/Day</div>
                    <div className="text-xl font-bold text-green-600">415</div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-lg shadow">
                <DataTable
                    columns={columns}
                    data={logs}
                    loading={loading}
                    emptyMessage="No audit logs found"
                />
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
                            <span className="font-medium">{pagination.total}</span> logs
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page * pagination.limit >= pagination.total}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Log Retention Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Log Retention Policy</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <div className="text-sm text-blue-600">Retention Period</div>
                        <div className="font-medium">90 days</div>
                    </div>
                    <div>
                        <div className="text-sm text-blue-600">Auto Archiving</div>
                        <div className="font-medium">Every 30 days</div>
                    </div>
                    <div>
                        <div className="text-sm text-blue-600">Storage Used</div>
                        <div className="font-medium">2.4 GB / 10 GB</div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-blue-600 mt-1">
                        <span>24% used</span>
                        <span>7.6 GB available</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditLogsList;
EOF