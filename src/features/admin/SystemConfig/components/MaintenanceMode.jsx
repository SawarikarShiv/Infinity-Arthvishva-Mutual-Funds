import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMaintenanceMode, selectConfig } from '../configSlice';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import SecondaryButton from '@components/common/Button/SecondaryButton';
import ConfirmModal from '@components/common/Modal/ConfirmModal';

const MaintenanceMode = () => {
    const dispatch = useDispatch();
    const config = useSelector(selectConfig);
    
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [maintenanceMessage, setMaintenanceMessage] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');

    const isMaintenanceMode = config?.maintenanceMode || false;

    const handleToggleMaintenance = async () => {
        if (isMaintenanceMode) {
            // Turning off maintenance
            await dispatch(toggleMaintenanceMode({
                enabled: false,
                message: '',
                estimatedTime: ''
            }));
        } else {
            // Show confirmation before turning on
            setShowConfirmModal(true);
        }
    };

    const confirmEnableMaintenance = async () => {
        await dispatch(toggleMaintenanceMode({
            enabled: true,
            message: maintenanceMessage,
            estimatedTime: estimatedTime
        }));
        setShowConfirmModal(false);
        setMaintenanceMessage('');
        setEstimatedTime('');
    };

    const formatCountdown = (timeString) => {
        if (!timeString) return '';
        
        const targetTime = new Date(timeString);
        const now = new Date();
        const diffMs = targetTime - now;
        
        if (diffMs <= 0) return 'Maintenance complete';
        
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m remaining`;
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Maintenance Mode</h2>
                <p className="text-gray-600">Control platform availability for maintenance</p>
            </div>

            {/* Status Card */}
            <div className={`rounded-lg shadow p-6 ${
                isMaintenanceMode 
                    ? 'bg-yellow-50 border border-yellow-200' 
                    : 'bg-green-50 border border-green-200'
            }`}>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center mb-2">
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                                isMaintenanceMode ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <h3 className="text-lg font-semibold">
                                {isMaintenanceMode ? 'Maintenance Mode Active' : 'Platform is Live'}
                            </h3>
                        </div>
                        <p className={`text-sm ${
                            isMaintenanceMode ? 'text-yellow-700' : 'text-green-700'
                        }`}>
                            {isMaintenanceMode 
                                ? 'The platform is currently under maintenance. Users see a maintenance page.'
                                : 'The platform is fully accessible to all users.'
                            }
                        </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        {isMaintenanceMode && config?.maintenanceStartTime && (
                            <div className="text-sm bg-white px-3 py-1 rounded border">
                                Started: {new Date(config.maintenanceStartTime).toLocaleString()}
                            </div>
                        )}
                        
                        <button
                            onClick={handleToggleMaintenance}
                            className={`px-6 py-2 rounded-lg font-medium ${
                                isMaintenanceMode
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-yellow-600 text-white hover:bg-yellow-700'
                            }`}
                        >
                            {isMaintenanceMode ? 'End Maintenance' : 'Start Maintenance'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Current Status Details */}
            {isMaintenanceMode && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">Current Maintenance Details</h4>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm text-gray-500">Maintenance Message</div>
                            <div className="font-medium text-gray-800">{config.maintenanceMessage}</div>
                        </div>
                        
                        {config.estimatedEndTime && (
                            <div>
                                <div className="text-sm text-gray-500">Estimated Completion</div>
                                <div className="font-medium text-gray-800">
                                    {new Date(config.estimatedEndTime).toLocaleString()}
                                    <span className="ml-2 text-sm text-yellow-600">
                                        ({formatCountdown(config.estimatedEndTime)})
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <div className="text-sm text-gray-500">Affected Services</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                                    User Registration
                                </span>
                                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                                    Investment Transactions
                                </span>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                                    Portfolio Updates
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                    Read-only Access
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500">Active Users</div>
                    <div className="text-2xl font-bold text-gray-800">1,245</div>
                    <div className="text-sm text-green-600">Will be affected</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500">Active SIPs</div>
                    <div className="text-2xl font-bold text-gray-800">8,542</div>
                    <div className="text-sm text-yellow-600">Will be paused</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500">Pending Transactions</div>
                    <div className="text-2xl font-bold text-gray-800">342</div>
                    <div className="text-sm text-red-600">Will be queued</div>
                </div>
            </div>

            {/* Maintenance History */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700">Recent Maintenance Activities</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date & Time</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Duration</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Initiated By</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">15 Jan 2024, 02:00 AM</td>
                                <td className="py-3 px-4">2 hours</td>
                                <td className="py-3 px-4">Database Migration</td>
                                <td className="py-3 px-4">System Admin</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">08 Jan 2024, 11:00 PM</td>
                                <td className="py-3 px-4">45 minutes</td>
                                <td className="py-3 px-4">Security Patch</td>
                                <td className="py-3 px-4">Security Team</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">25 Dec 2023, 03:00 AM</td>
                                <td className="py-3 px-4">4 hours</td>
                                <td className="py-3 px-4">System Upgrade</td>
                                <td className="py-3 px-4">System Admin</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        Completed
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Schedule Maintenance */}
            <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Schedule Future Maintenance</h4>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Scheduled Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estimated Duration (hours)
                            </label>
                            <input
                                type="number"
                                min="0.5"
                                step="0.5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                defaultValue="2"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Maintenance Description
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="3"
                            placeholder="Describe the maintenance activity..."
                        />
                    </div>
                    
                    <div className="flex justify-end">
                        <SecondaryButton>
                            Schedule Maintenance
                        </SecondaryButton>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmEnableMaintenance}
                title="Enable Maintenance Mode"
                message={
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Are you sure you want to enable maintenance mode? This will:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            <li>Show a maintenance page to all users</li>
                            <li>Block new registrations and investments</li>
                            <li>Pause all automated transactions (SIPs)</li>
                            <li>Allow only read-only access for logged-in users</li>
                        </ul>
                        
                        <div className="space-y-3 pt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Maintenance Message (optional)
                                </label>
                                <textarea
                                    value={maintenanceMessage}
                                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    rows="2"
                                    placeholder="Explain why the platform is under maintenance..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estimated Completion Time (optional)
                                </label>
                                <input
                                    type="datetime-local"
                                    value={estimatedTime}
                                    onChange={(e) => setEstimatedTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                }
                confirmText="Enable Maintenance Mode"
                confirmColor="yellow"
            />
        </div>
    );
};

export default MaintenanceMode;
EOF