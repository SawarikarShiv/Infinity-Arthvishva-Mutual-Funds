import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clsx } from 'clsx';

// CORRECT Heroicons imports
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

// Simple Logo component
const LogoIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  
  // Mock data for now
  const user = {
    name: 'Admin Name',
    email: 'admin@example.com',
    role: 'Administrator'
  };
  
  const adminStats = {
    totalUsers: 156,
    activeAdvisors: 24,
    pendingApprovals: 8,
    platformRevenue: 450000
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: HomeIcon,
      badge: null
    },
    { 
      name: 'User Management', 
      href: '/admin/users', 
      icon: UsersIcon,
      badge: adminStats.pendingApprovals > 0 ? adminStats.pendingApprovals : null
    },
    { 
      name: 'System Config', 
      href: '/admin/config', 
      icon: Cog6ToothIcon,
      badge: null
    },
    { 
      name: 'Audit Logs', 
      href: '/admin/audit-logs', 
      icon: DocumentTextIcon,
      badge: null
    },
    { 
      name: 'Analytics', 
      href: '/admin/analytics', 
      icon: ChartBarIcon,
      badge: null
    },
    { 
      name: 'Security', 
      href: '/admin/security', 
      icon: ShieldCheckIcon,
      badge: null
    },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
              
              <Link to="/admin/dashboard" className="flex items-center ml-2 md:mr-24">
                <LogoIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Admin Portal
                </span>
              </Link>
            </div>

            {/* Stats Summary */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {adminStats.totalUsers}
                </p>
                <p className="text-xs text-gray-500">Total Users</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">
                  {adminStats.activeAdvisors}
                </p>
                <p className="text-xs text-gray-500">Active Advisors</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-600">
                  {adminStats.pendingApprovals}
                </p>
                <p className="text-xs text-gray-500">Pending Approvals</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 pl-10 p-2"
                    placeholder="Search users, logs..."
                  />
                </div>
              </div>

              {/* Notifications */}
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
              >
                <BellIcon className="h-6 w-6" />
                {adminStats.pendingApprovals > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {adminStats.pendingApprovals}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                    </div>
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/admin/security"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Security Settings
                    </Link>
                    <div className="border-t border-gray-100">
                      <Link
                        to="/logout"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform duration-300 bg-white border-r border-gray-200 md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          {/* Stats Summary - Mobile */}
          <div className="md:hidden p-4 mb-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-600">Total Users</span>
                <p className="text-lg font-bold text-gray-900">{adminStats.totalUsers}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Active Advisors</span>
                <p className="text-lg font-bold text-green-600">{adminStats.activeAdvisors}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Pending Approvals</span>
                <p className="text-lg font-bold text-red-600">{adminStats.pendingApprovals}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Platform Revenue</span>
                <p className="text-lg font-bold text-gray-900">
                  ₹{adminStats.platformRevenue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
              Administration
            </div>
            <ul className="space-y-2">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={clsx(
                        'flex items-center p-2 text-base font-medium rounded-lg group',
                        isActive(item.href)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-900 hover:bg-gray-100'
                      )}
                    >
                      <IconComponent
                        className={clsx(
                          'w-6 h-6 transition duration-75',
                          isActive(item.href)
                            ? 'text-blue-600'
                            : 'text-gray-400 group-hover:text-gray-900'
                        )}
                      />
                      <span className="ml-3">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 px-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/admin/users/new"
                className="block px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
              >
                Add New User
              </Link>
              <Link
                to="/admin/reports/generate"
                className="block px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Generate System Report
              </Link>
              <Link
                to="/admin/backup"
                className="block px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Backup System
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-8 px-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Load</span>
                  <span className="text-sm font-medium text-green-600">Normal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={clsx(
        'pt-16 transition-all duration-300',
        isSidebarOpen ? 'md:pl-64' : 'md:pl-0'
      )}>
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminLayout;