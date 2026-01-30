import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuditLogs } from '../auditSlice';
import Badge from '@components/common/UI/Badge';
import { formatDate } from '@utils/helpers/dateFormatter';

const LogDetails = () => {
    const { logId } = useParams();
    const navigate = useNavigate();
    const logs = useSelector(selectAuditLogs);
    
    const log = logs.find(l => l.id === logId);

    if (!log) {
        return (
            <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Log Not Found</h3>
                <p className="text-gray-600 mb-6">The requested audit log could not be found.</p>
                <button
                    onClick={() => navigate('/admin/audit-logs')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Back to Audit Logs
                </button>
            </div>
        );
    }

    const getActionColor = (action) => {
        const actionColors = {
            login: 'blue',
            logout: 'gray',
            create: 'green',
            update: 'yellow',
            delete: 'red',
            read: 'purple'
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

    const renderMetadata = () => {
        if (!log.metadata) return null;
        
        try {
            const metadata = typeof log.metadata === 'string' 
                ? JSON.parse(log.metadata) 
                : log.metadata;
            
            return (
                <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(metadata, null, 2)}
                    </pre>
                </div>
            );
        } catch (error) {
            return (
                <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm text-gray-700">{log.metadata}</code>
                </div>
            );
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <button
                        onClick={() => navigate('/admin/audit-logs')}
                        className="mb-4 text-gray-500 hover:text-gray-700"
                    >
                        ← Back to Audit Logs
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">Audit Log Details</h2>
                    <p className="text-gray-600">Log ID: {log.id}</p>
                </div>
                
                <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Export Log
                    </button>
                </div>
            </div>

            {/* Main Information Card */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Log Information</h3>
                            <div className="flex items-center space-x-3">
                                <Badge text={log.action} color={getActionColor(log.action)} />
                                <Badge text={log.severity} color={getSeverityColor(log.severity)} />
                                <span className="text-sm text-gray-500">
                                    {formatDate(log.timestamp, 'DD MMM YYYY, hh:mm:ss A')}
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-medium">{log.duration || 'N/A'} ms</div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* User Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-700">User Information</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-500">User Name</div>
                                    <div className="font-medium">{log.userName}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">User Email</div>
                                    <div className="font-medium">{log.userEmail}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">User ID</div>
                                    <div className="font-medium">{log.userId}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">User Role</div>
                                    <div className="font-medium">{log.userRole}</div>
                                </div>
                            </div>
                        </div>

                        {/* System Information */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-700">System Information</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-gray-500">IP Address</div>
                                    <div className="font-medium">{log.ipAddress || 'N/A'}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">User Agent</div>
                                    <div className="font-medium text-sm truncate" title={log.userAgent}>
                                        {log.userAgent || 'N/A'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Entity Type</div>
                                    <div className="font-medium">{log.entity || 'System'}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Entity ID</div>
                                    <div className="font-medium">{log.entityId || 'N/A'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Details */}
                    <div className="mt-8 space-y-4">
                        <h4 className="text-lg font-semibold text-gray-700">Action Details</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">{log.details}</p>
                        </div>
                    </div>

                    {/* Metadata */}
                    {log.metadata && (
                        <div className="mt-8 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-700">Metadata</h4>
                            {renderMetadata()}
                        </div>
                    )}

                    {/* Changes */}
                    {log.changes && (
                        <div className="mt-8 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-700">Changes Made</h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                                {typeof log.changes === 'object' ? (
                                    <div className="space-y-2">
                                        {Object.entries(log.changes).map(([key, value]) => (
                                            <div key={key} className="flex items-start">
                                                <div className="w-32 text-sm text-gray-500">{key}:</div>
                                                <div className="flex-1">
                                                    {typeof value === 'object' ? (
                                                        <pre className="text-sm text-gray-700">
                                                            {JSON.stringify(value, null, 2)}
                                                        </pre>
                                                    ) : (
                                                        <span className="text-gray-700">{String(value)}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-700">{log.changes}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Logs */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700">Related Activities</h4>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {logs
                            .filter(l => l.userId === log.userId && l.id !== log.id)
                            .slice(0, 5)
                            .map(relatedLog => (
                                <div key={relatedLog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="font-medium">{relatedLog.action}</div>
                                        <div className="text-sm text-gray-500">{relatedLog.details}</div>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {formatDate(relatedLog.timestamp, 'hh:mm A')}
                                    </div>
                                </div>
                            ))}
                        
                        {logs.filter(l => l.userId === log.userId && l.id !== log.id).length === 0 && (
                            <p className="text-gray-500 text-center py-4">No related activities found</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Security Assessment */}
            <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Security Assessment</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Risk Level</div>
                            <div className="text-sm text-gray-500">Based on action type and context</div>
                        </div>
                        <Badge 
                            text={log.severity.toUpperCase()} 
                            color={getSeverityColor(log.severity)}
                        />
                    </div>
                    
                    <div>
                        <div className="font-medium mb-2">Assessment</div>
                        <div className="text-sm text-gray-700">
                            {log.severity === 'critical' || log.severity === 'high' ? (
                                <span className="text-red-600">
                                    This action requires immediate review. Consider implementing additional security measures.
                                </span>
                            ) : log.severity === 'medium' ? (
                                <span className="text-yellow-600">
                                    This action should be monitored. Review for any unusual patterns.
                                </span>
                            ) : (
                                <span className="text-green-600">
                                    This action appears normal and follows expected patterns.
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <div className="font-medium mb-2">Recommendations</div>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {log.severity === 'critical' && (
                                <>
                                    <li>Immediately notify security team</li>
                                    <li>Temporarily restrict user access</li>
                                    <li>Conduct thorough investigation</li>
                                </>
                            )}
                            {log.severity === 'high' && (
                                <>
                                    <li>Review user permissions</li>
                                    <li>Enable additional monitoring</li>
                                    <li>Consider two-factor authentication</li>
                                </>
                            )}
                            {log.severity === 'medium' && (
                                <>
                                    <li>Monitor user activity</li>
                                    <li>Review access patterns</li>
                                </>
                            )}
                            {log.severity === 'low' && (
                                <li>Continue normal monitoring</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogDetails;
EOF