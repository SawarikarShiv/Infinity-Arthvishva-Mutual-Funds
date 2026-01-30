import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchUsers, 
    fetchUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    updateUserStatus,
    selectUsers,
    selectCurrentUser,
    selectUsersLoading,
    selectUsersError,
    selectUsersPagination 
} from '../userSlice';

export const useUsers = () => {
    const dispatch = useDispatch();
    
    const users = useSelector(selectUsers);
    const currentUser = useSelector(selectCurrentUser);
    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);
    const pagination = useSelector(selectUsersPagination);
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [bulkAction, setBulkAction] = useState(null);

    const getUsers = useCallback((params) => {
        return dispatch(fetchUsers(params));
    }, [dispatch]);

    const getUserById = useCallback((userId) => {
        return dispatch(fetchUserById(userId));
    }, [dispatch]);

    const addUser = useCallback((userData) => {
        return dispatch(createUser(userData));
    }, [dispatch]);

    const editUser = useCallback(({ id, ...userData }) => {
        return dispatch(updateUser({ id, ...userData }));
    }, [dispatch]);

    const removeUser = useCallback((userId) => {
        return dispatch(deleteUser(userId));
    }, [dispatch]);

    const changeUserStatus = useCallback(({ userId, status }) => {
        return dispatch(updateUserStatus({ userId, status }));
    }, [dispatch]);

    const handleSelectUser = useCallback((userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    }, []);

    const handleSelectAll = useCallback((userIds) => {
        if (selectedUsers.length === userIds.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers([...userIds]);
        }
    }, [selectedUsers.length]);

    const handleBulkAction = useCallback(async (action, data) => {
        setBulkAction(action);
        try {
            switch (action) {
                case 'activate':
                    await Promise.all(selectedUsers.map(userId => 
                        dispatch(updateUserStatus({ userId, status: 'active' }))
                    ));
                    break;
                case 'deactivate':
                    await Promise.all(selectedUsers.map(userId => 
                        dispatch(updateUserStatus({ userId, status: 'inactive' }))
                    ));
                    break;
                case 'suspend':
                    await Promise.all(selectedUsers.map(userId => 
                        dispatch(updateUserStatus({ userId, status: 'suspended' }))
                    ));
                    break;
                case 'delete':
                    await Promise.all(selectedUsers.map(userId => 
                        dispatch(deleteUser(userId))
                    ));
                    break;
                case 'assign_role':
                    await Promise.all(selectedUsers.map(userId => 
                        dispatch(updateUser({ id: userId, role: data.role }))
                    ));
                    break;
                default:
                    break;
            }
            setSelectedUsers([]);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setBulkAction(null);
        }
    }, [dispatch, selectedUsers]);

    const exportUsers = useCallback((format = 'csv') => {
        // Implement export logic
        console.log(`Exporting users in ${format} format`);
        
        // Mock export data
        const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Joined Date'];
        const data = users.map(user => [
            user.id,
            `${user.firstName} ${user.lastName}`,
            user.email,
            user.role,
            user.status,
            new Date(user.createdAt).toLocaleDateString()
        ]);

        if (format === 'csv') {
            const csvContent = [
                headers.join(','),
                ...data.map(row => row.join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
        }

        return { success: true, count: users.length };
    }, [users]);

    const getStatistics = useCallback(() => {
        const stats = {
            total: users.length,
            active: users.filter(u => u.status === 'active').length,
            inactive: users.filter(u => u.status === 'inactive').length,
            suspended: users.filter(u => u.status === 'suspended').length,
            pending: users.filter(u => u.status === 'pending').length,
            admins: users.filter(u => u.role === 'admin').length,
            advisors: users.filter(u => u.role === 'advisor').length,
            investors: users.filter(u => u.role === 'investor').length,
            newThisMonth: users.filter(u => {
                const joinDate = new Date(u.createdAt);
                const now = new Date();
                return joinDate.getMonth() === now.getMonth() && 
                       joinDate.getFullYear() === now.getFullYear();
            }).length
        };

        return stats;
    }, [users]);

    const searchUsers = useCallback((query, filters = {}) => {
        let results = [...users];

        // Apply search query
        if (query) {
            const searchLower = query.toLowerCase();
            results = results.filter(user => 
                user.firstName?.toLowerCase().includes(searchLower) ||
                user.lastName?.toLowerCase().includes(searchLower) ||
                user.email?.toLowerCase().includes(searchLower) ||
                user.phone?.includes(query)
            );
        }

        // Apply filters
        if (filters.role && filters.role !== 'all') {
            results = results.filter(user => user.role === filters.role);
        }

        if (filters.status && filters.status !== 'all') {
            results = results.filter(user => user.status === filters.status);
        }

        // Apply date range filter
        if (filters.dateRange) {
            const { start, end } = filters.dateRange;
            results = results.filter(user => {
                const joinDate = new Date(user.createdAt);
                return (!start || joinDate >= new Date(start)) && 
                       (!end || joinDate <= new Date(end));
            });
        }

        return results;
    }, [users]);

    return {
        // State
        users,
        currentUser,
        loading,
        error,
        pagination,
        selectedUsers,
        bulkAction,
        
        // Actions
        getUsers,
        getUserById,
        addUser,
        editUser,
        removeUser,
        changeUserStatus,
        
        // Selection
        handleSelectUser,
        handleSelectAll,
        
        // Bulk Actions
        handleBulkAction,
        
        // Export
        exportUsers,
        
        // Statistics
        getStatistics,
        
        // Search
        searchUsers,
        
        // Helpers
        hasSelection: selectedUsers.length > 0,
        selectedCount: selectedUsers.length,
        isAllSelected: selectedUsers.length > 0 && selectedUsers.length === users.length
    };
};
EOF
