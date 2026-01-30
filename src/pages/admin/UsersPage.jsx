import React from 'react';
import AdminLayout from '@components/layouts/AdminLayout';

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">User Management System</h2>
          <p className="text-gray-600">
            This page will display user list, user details, and user management functionalities.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
EOF