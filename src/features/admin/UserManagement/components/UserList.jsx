import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchUsers, 
    deleteUser, 
    updateUserStatus,
    selectUsers,
    selectUsersLoading,
    selectUsersError 
} from '../userSlice';
import DataTable from '@components/common/Table/DataTable';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import SecondaryButton from '@components/common/Button/SecondaryButton';
import ConfirmModal from '@components/common/Modal/ConfirmModal';
import Badge from '@components/common/UI/Badge';
import { formatDate } from '@utils/helpers/dateFormatter';
import { USER_ROLES, USER_STATUS } from '@utils/constants/userRoles';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [filters, setFilters] = useState({
        role: 'all',
        status: 'all',
        search: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0
    });

    const [sortConfig, setSortConfig] = useState({
        key: 'createdAt',
        direction: 'desc'
    });

    // Fetch users on component mount and when filters change
    React.useEffect(() => {
        dispatch(fetchUsers({
            page: pagination.page,
            limit: pagination.limit,
            filters,
            sort: sortConfig
        }));
    }, [dispatch, pagination.page, pagination.limit, filters, sortConfig]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (selectedUser) {
            await dispatch(deleteUser(selectedUser.id));
            setShowDeleteModal(false);
            setSelectedUser(null);
        }
    };

    const handleStatusChange = async (userId, status) => {
        await dispatch(updateUserStatus({ userId, status }));
    };

    const getRoleBadge = (role) => {
        const roleConfig = {
            admin: { color: 'red', label: 'Admin' },
            advisor: { color: 'purple', label: 'Advisor' },
            investor: { color: 'blue', label: 'Investor' }
        };
        
        const config = roleConfig[role] || { color: 'gray', label: role };
        return <Badge text={config.label} color={config.color} size="sm" />;
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { color: 'green', label: 'Active' },
            inactive: { color: 'gray', label: 'Inactive' },
            suspended: { color: 'red', label: 'Suspended' },
            pending: { color: 'yellow', label: 'Pending' }
        };
        
        const config = statusConfig[status] || { color: 'gray', label: status };
        return <Badge text={config.label} color={config.color} size="sm" />;
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            sortable: true,
            render: (row) => (
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                            {row.firstName?.[0]}{row.lastName?.[0]}
                        </span>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">
                            {row.firstName} {row.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{row.email}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'phone',
            header: 'Phone',
            render: (row) => row.phone || 'N/A'
        },
        {
            key: 'role',
            header: 'Role',
            sortable: true,
            render: (row) => getRoleBadge(row.role)
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (row) => getStatusBadge(row.status)
        },
        {
            key: 'createdAt',
            header: 'Joined',
            sortable: true,
            render: (row) => formatDate(row.createdAt, 'DD MMM YYYY')
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (row) => (
                <div className="flex space-x-2">
                    <SecondaryButton
                        size="sm"
                        onClick={() => {/* Handle view details */}}
                    >
                        View
                    </SecondaryButton>
                    {row.status !== 'suspended' && (
                        <button
                            onClick={() => handleStatusChange(row.id, 'suspended')}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                            Suspend
                        </button>
                    )}
                    <button
                        onClick={() => handleDelete(row)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-700">{error}</span>
                </div>
                <button
                    onClick={() => dispatch(fetchUsers({ page: 1, limit: 10 }))}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                    <p className="text-gray-600">Manage all platform users</p>
                </div>
                <PrimaryButton onClick={() => {/* Handle add user */}}>
                    Add New User
                </PrimaryButton>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                        </label>
                        <select
                            value={filters.role}
                            onChange={(e) => handleFilterChange('role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="advisor">Advisor</option>
                            <option value="investor">Investor</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setFilters({
                                    role: 'all',
                                    status: 'all',
                                    search: ''
                                });
                                setPagination(prev => ({ ...prev, page: 1 }));
                            }}
                            className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Total Users</div>
                    <div className="text-2xl font-bold text-gray-800">1,245</div>
                    <div className="text-sm text-green-600">+12% from last month</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Active Users</div>
                    <div className="text-2xl font-bold text-gray-800">1,023</div>
                    <div className="text-sm text-green-600">82% active rate</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">New This Month</div>
                    <div className="text-2xl font-bold text-gray-800">143</div>
                    <div className="text-sm text-blue-600">+23 from last month</div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="text-sm text-gray-500">Advisors</div>
                    <div className="text-2xl font-bold text-gray-800">48</div>
                    <div className="text-sm text-purple-600">Managing ₹425Cr+</div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow">
                <DataTable
                    columns={columns}
                    data={users}
                    loading={loading}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    emptyMessage="No users found"
                />
                
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
                            <span className="font-medium">{pagination.total}</span> users
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page * pagination.limit >= pagination.total}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}? This action cannot be undone.`}
                confirmText="Delete User"
                confirmColor="red"
            />
        </div>
    );
};

export default UserList;
EOF
