import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBackup, restoreBackup, selectBackups, selectBackupLoading } from '../configSlice';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import SecondaryButton from '@components/common/Button/SecondaryButton';
import ConfirmModal from '@components/common/Modal/ConfirmModal';
import { formatDate } from '@utils/helpers/dateFormatter';
import { formatFileSize } from '@utils/helpers/numberFormatter';

const BackupRestore = () => {
    const dispatch = useDispatch();
    const backups = useSelector(selectBackups);
    const loading = useSelector(selectBackupLoading);
    
    const [selectedBackup, setSelectedBackup] = useState(null);
    const [showRestoreModal, setShowRestoreModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [backupType, setBackupType] = useState('full');
    const [backupName, setBackupName] = useState('');

    const handleCreateBackup = async () => {
        const name = backupName || `backup_${new Date().toISOString().split('T')[0]}`;
        await dispatch(createBackup({
            type: backupType,
            name: name,
            includeData: true,
            includeSettings: true,
            includeFiles: backupType === 'full'
        }));
        setBackupName('');
    };

    const handleRestoreBackup = async (backupId) => {
        setSelectedBackup(backupId);
        setShowRestoreModal(true);
    };

    const confirmRestore = async () => {
        if (selectedBackup) {
            await dispatch(restoreBackup(selectedBackup));
            setShowRestoreModal(false);
            setSelectedBackup(null);
        }
    };

    const handleDeleteBackup = async (backupId) => {
        setSelectedBackup(backupId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedBackup) {
            // Implement delete backup logic
            console.log('Delete backup:', selectedBackup);
            setShowDeleteModal(false);
            setSelectedBackup(null);
        }
    };

    const backupTypes = [
        { id: 'full', label: 'Full Backup', description: 'Database + Files + Settings', size: '~2.5 GB' },
        { id: 'database', label: 'Database Only', description: 'Only database tables', size: '~1.2 GB' },
        { id: 'incremental', label: 'Incremental', description: 'Changes since last backup', size: '~500 MB' }
    ];

    const getBackupStatusColor = (status) => {
        const colors = {
            completed: 'bg-green-100 text-green-800',
            in_progress: 'bg-blue-100 text-blue-800',
            failed: 'bg-red-100 text-red-800',
            scheduled: 'bg-yellow-100 text-yellow-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getBackupTypeColor = (type) => {
        const colors = {
            full: 'bg-purple-100 text-purple-800',
            database: 'bg-blue-100 text-blue-800',
            incremental: 'bg-green-100 text-green-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Backup & Restore</h2>
                <p className="text-gray-600">Manage database backups and restore points</p>
            </div>

            {/* Create Backup Section */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Create New Backup</h3>
                
                <div className="space-y-6">
                    {/* Backup Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Select Backup Type
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {backupTypes.map(type => (
                                <div
                                    key={type.id}
                                    onClick={() => setBackupType(type.id)}
                                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                                        backupType === type.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="flex items-center mb-2">
                                        <div className={`w-3 h-3 rounded-full mr-2 ${
                                            backupType === type.id ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}></div>
                                        <span className="font-medium">{type.label}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                                    <div className="text-xs text-gray-500">Size: {type.size}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Backup Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Backup Name (optional)
                        </label>
                        <input
                            type="text"
                            value={backupName}
                            onChange={(e) => setBackupName(e.target.value)}
                            placeholder="Enter a descriptive name for the backup"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="includeData"
                                defaultChecked
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="includeData" className="ml-2 text-sm text-gray-700">
                                Include all user data and transactions
                            </label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="includeSettings"
                                defaultChecked
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="includeSettings" className="ml-2 text-sm text-gray-700">
                                Include system settings and configurations
                            </label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="compressBackup"
                                defaultChecked
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="compressBackup" className="ml-2 text-sm text-gray-700">
                                Compress backup file to save space
                            </label>
                        </div>
                    </div>

                    {/* Create Backup Button */}
                    <div className="pt-4 border-t border-gray-200">
                        <PrimaryButton
                            onClick={handleCreateBackup}
                            isLoading={loading}
                            disabled={loading}
                            className="w-full md:w-auto"
                        >
                            Create Backup Now
                        </PrimaryButton>
                        <p className="text-sm text-gray-500 mt-2">
                            Note: Creating a full backup may take several minutes depending on database size.
                        </p>
                    </div>
                </div>
            </div>

            {/* Backup Schedule */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Automated Backup Schedule</h3>
                    <SecondaryButton>Configure Schedule</SecondaryButton>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Schedule</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Next Run</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Retention</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">Daily at 2:00 AM</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                        Incremental
                                    </span>
                                </td>
                                <td className="py-3 px-4">Tomorrow, 2:00 AM</td>
                                <td className="py-3 px-4">30 days</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        Active
                                    </span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">Weekly on Sunday</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                        Full
                                    </span>
                                </td>
                                <td className="py-3 px-4">Next Sunday, 3:00 AM</td>
                                <td className="py-3 px-4">90 days</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        Active
                                    </span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">Monthly on 1st</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                        Full
                                    </span>
                                </td>
                                <td className="py-3 px-4">1 Feb 2024, 4:00 AM</td>
                                <td className="py-3 px-4">1 year</td>
                                <td className="py-3 px-4">
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                        Active
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Backup List */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700">Available Backups</h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Backup Name</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Date Created</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Size</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backups.map(backup => (
                                <tr key={backup.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900">{backup.name}</div>
                                        <div className="text-sm text-gray-500">{backup.description}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div>{formatDate(backup.createdAt)}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(backup.createdAt).toLocaleTimeString()}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getBackupTypeColor(backup.type)}`}>
                                            {backup.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        {formatFileSize(backup.size)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getBackupStatusColor(backup.status)}`}>
                                            {backup.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleRestoreBackup(backup.id)}
                                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                Restore
                                            </button>
                                            <button
                                                onClick={() => {/* Handle download */}}
                                                className="px-3 py-1 text-sm text-green-600 hover:text-green-800"
                                            >
                                                Download
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBackup(backup.id)}
                                                className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {backups.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">No Backups Available</h4>
                        <p className="text-gray-600 mb-4">Create your first backup to get started</p>
                    </div>
                )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500">Total Backups</div>
                    <div className="text-2xl font-bold text-gray-800">{backups.length}</div>
                    <div className="text-sm text-blue-600">Across all types</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500">Storage Used</div>
                    <div className="text-2xl font-bold text-gray-800">
                        {formatFileSize(backups.reduce((sum, b) => sum + b.size, 0))}
                    </div>
                    <div className="text-sm text-green-600">65% of quota</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500">Last Backup</div>
                    <div className="text-2xl font-bold text-gray-800">
                        {backups.length > 0 ? formatDate(backups[0].createdAt, 'DD MMM') : 'Never'}
                    </div>
                    <div className="text-sm text-yellow-600">Create backup now</div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-sm text-gray-500">Auto Backup</div>
                    <div className="text-2xl font-bold text-gray-800">3</div>
                    <div className="text-sm text-purple-600">Scheduled tasks</div>
                </div>
            </div>

            {/* Restore Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Restore Instructions</h4>
                <ol className="list-decimal list-inside space-y-2 text-blue-600">
                    <li>Select a backup from the list above</li>
                    <li>Click "Restore" to initiate the restoration process</li>
                    <li>The system will enter maintenance mode during restoration</li>
                    <li>All users will be logged out during the process</li>
                    <li>Restoration typically takes 5-15 minutes depending on backup size</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-blue-700">Important:</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                        Restoring from backup will overwrite all current data. Make sure to create a backup before restoring.
                    </p>
                </div>
            </div>

            {/* Confirmation Modals */}
            <ConfirmModal
                isOpen={showRestoreModal}
                onClose={() => {
                    setShowRestoreModal(false);
                    setSelectedBackup(null);
                }}
                onConfirm={confirmRestore}
                title="Restore from Backup"
                message="Are you sure you want to restore from this backup? This will overwrite all current data and the system will enter maintenance mode during the restoration process."
                confirmText="Yes, Restore Now"
                confirmColor="blue"
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedBackup(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Backup"
                message="Are you sure you want to delete this backup? This action cannot be undone."
                confirmText="Yes, Delete Backup"
                confirmColor="red"
            />
        </div>
    );
};

export default BackupRestore;
EOF