import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchUserById, 
    updateUserStatus,
    selectCurrentUser,
    selectUsersLoading,
    selectUsersError 
} from '../userSlice';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import SecondaryButton from '@components/common/Button/SecondaryButton';
import Badge from '@components/common/UI/Badge';
import ConfirmModal from '@components/common/Modal/ConfirmModal';
import { formatDate } from '@utils/helpers/dateFormatter';
import { formatCurrency } from '@utils/helpers/currencyFormatter';
import { USER_ROLES, USER_STATUS } from '@utils/constants/userRoles';

const UserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user = useSelector(selectCurrentUser);
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    React.useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId]);

    const handleStatusChange = async (status) => {
        if (user) {
            await dispatch(updateUserStatus({ userId: user.id, status }));
        }
    };

    const getRoleBadge = (role) => {
        const roleConfig = {
            [USER_ROLES.ADMIN]: { color: 'red', label: 'Administrator' },
            [USER_ROLES.ADVISOR]: { color: 'purple', label: 'Financial Advisor' },
            [USER_ROLES.INVESTOR]: { color: 'blue', label: 'Investor' }
        };
        
        const config = roleConfig[role] || { color: 'gray', label: role };
        return <Badge text={config.label} color={config.color} />;
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            [USER_STATUS.ACTIVE]: { color: 'green', label: 'Active' },
            [USER_STATUS.INACTIVE]: { color: 'gray', label: 'Inactive' },
            [USER_STATUS.SUSPENDED]: { color: 'red', label: 'Suspended' },
            [USER_STATUS.PENDING]: { color: 'yellow', label: 'Pending' }
        };
        
        const config = statusConfig[status] || { color: 'gray', label: status };
        return <Badge text={config.label} color={config.color} />;
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'portfolio', label: 'Portfolio', visible: user?.role === USER_ROLES.INVESTOR },
        { id: 'transactions', label: 'Transactions' },
        { id: 'activity', label: 'Activity Log' },
        { id: 'documents', label: 'Documents' }
    ].filter(tab => tab.visible !== false);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <svg className="w-6 h-6 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <h3 className="text-lg font-semibold text-red-700">Error Loading User</h3>
                </div>
                <p className="text-red-600 mb-4">{error}</p>
                <SecondaryButton onClick={() => navigate('/admin/users')}>
                    Back to Users
                </SecondaryButton>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">User Not Found</h3>
                <p className="text-gray-600 mb-6">The requested user could not be found.</p>
                <SecondaryButton onClick={() => navigate('/admin/users')}>
                    Back to Users
                </SecondaryButton>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center mb-2">
                        <button
                            onClick={() => navigate('/admin/users')}
                            className="mr-4 text-gray-500 hover:text-gray-700"
                        >
                            ← Back
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                    </div>
                    <p className="text-gray-600">User ID: {user.id}</p>
                </div>
                
                <div className="flex space-x-3">
                    <SecondaryButton onClick={() => navigate(`/admin/users/edit/${user.id}`)}>
                        Edit User
                    </SecondaryButton>
                    {user.status !== USER_STATUS.SUSPENDED && (
                        <button
                            onClick={() => setShowSuspendModal(true)}
                            className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
                        >
                            Suspend User
                        </button>
                    )}
                </div>
            </div>

            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Avatar and Basic Info */}
                        <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600">
                                    {user.firstName?.[0]}{user.lastName?.[0]}
                                </span>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-gray-600">{user.email}</p>
                                <div className="flex items-center space-x-3 mt-2">
                                    {getRoleBadge(user.role)}
                                    {getStatusBadge(user.status)}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-500">Joined On</div>
                                <div className="font-semibold">{formatDate(user.createdAt)}</div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-500">Last Login</div>
                                <div className="font-semibold">
                                    {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-500">Phone</div>
                                <div className="font-semibold">{user.phone || 'N/A'}</div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-500">KYC Status</div>
                                <div className="font-semibold">
                                    {user.kycStatus === 'verified' ? (
                                        <Badge text="Verified" color="green" size="sm" />
                                    ) : (
                                        <Badge text="Pending" color="yellow" size="sm" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-200">
                    <div className="flex border-b border-gray-200">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-medium text-sm border-b-2 transition ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-700">Personal Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-sm text-gray-500">Full Name</div>
                                            <div className="font-medium">{user.firstName} {user.lastName}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Date of Birth</div>
                                            <div className="font-medium">
                                                {user.dateOfBirth ? formatDate(user.dateOfBirth, 'DD MMM YYYY') : 'Not provided'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">PAN Number</div>
                                            <div className="font-medium">{user.panNumber || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-700">Account Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="text-sm text-gray-500">Email Verified</div>
                                            <div className="font-medium">
                                                {user.emailVerified ? 'Yes' : 'No'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Two-Factor Auth</div>
                                            <div className="font-medium">
                                                {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Account Locked</div>
                                            <div className="font-medium">
                                                {user.isLocked ? 'Yes' : 'No'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {user.role === USER_ROLES.INVESTOR && (
                                    <div className="md:col-span-2 space-y-4">
                                        <h4 className="text-lg font-semibold text-gray-700">Investment Summary</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-blue-50 rounded-lg p-4">
                                                <div className="text-sm text-blue-600">Total Investment</div>
                                                <div className="text-xl font-bold text-gray-800">
                                                    {formatCurrency(user.totalInvestment || 0)}
                                                </div>
                                            </div>
                                            <div className="bg-green-50 rounded-lg p-4">
                                                <div className="text-sm text-green-600">Current Value</div>
                                                <div className="text-xl font-bold text-gray-800">
                                                    {formatCurrency(user.currentPortfolioValue || 0)}
                                                </div>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-4">
                                                <div className="text-sm text-purple-600">Active SIPs</div>
                                                <div className="text-xl font-bold text-gray-800">
                                                    {user.activeSIPs || 0}
                                                </div>
                                            </div>
                                            <div className="bg-yellow-50 rounded-lg p-4">
                                                <div className="text-sm text-yellow-600">XIRR</div>
                                                <div className="text-xl font-bold text-gray-800">
                                                    {(user.xirr || 0).toFixed(2)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'portfolio' && user.role === USER_ROLES.INVESTOR && (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <p className="text-gray-600">Portfolio details will be displayed here.</p>
                            </div>
                        )}

                        {activeTab === 'transactions' && (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-600">Transaction history will be displayed here.</p>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-600">User activity log will be displayed here.</p>
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-600">User documents will be displayed here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <div>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 text-red-600 hover:text-red-800"
                    >
                        Delete User Account
                    </button>
                </div>
                
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleStatusChange(
                            user.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE
                        )}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        {user.status === USER_STATUS.ACTIVE ? 'Deactivate' : 'Activate'}
                    </button>
                    
                    <PrimaryButton onClick={() => navigate(`/admin/users/edit/${user.id}`)}>
                        Edit User
                    </PrimaryButton>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={showSuspendModal}
                onClose={() => setShowSuspendModal(false)}
                onConfirm={() => handleStatusChange(USER_STATUS.SUSPENDED)}
                title="Suspend User Account"
                message={`Are you sure you want to suspend ${user.firstName}'s account? They will not be able to access the platform until unsuspended.`}
                confirmText="Suspend Account"
                confirmColor="red"
            />

            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {/* Handle delete */}}
                title="Delete User Account"
                message={`Are you sure you want to permanently delete ${user.firstName}'s account? This will remove all their data and cannot be undone.`}
                confirmText="Delete Account"
                confirmColor="red"
            />
        </div>
    );
};

export default UserDetails;
EOF