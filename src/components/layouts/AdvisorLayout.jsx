import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clsx } from 'clsx';
import { LogoIcon } from '@/assets';
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const AdvisorLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { user, advisorStats } = useSelector((state) => ({
    user: state.auth.user,
    advisorStats: state.advisor.stats,
  }));

  const navigation = [
    { name: 'Dashboard', href: '/advisor/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Clients', href: '/advisor/clients', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-7.748a4 4 0 00-4-4 4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4z' },
    { name: 'Reports', href: '/advisor/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Analytics', href: '/advisor/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Meetings', href: '/advisor/meetings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Messages', href: '/advisor/messages', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { name: 'Settings', href: '/advisor/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const stats = {
    totalClients: advisorStats?.totalClients || 12,
    activeMeetings: advisorStats?.activeMeetings || 5,
    pendingTasks: advisorStats?.pendingTasks || 8,
    monthlyRevenue: advisorStats?.monthlyRevenue || 125000,
  };

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
              
              <Link to="/advisor/dashboard" className="flex items-center ml-2 md:mr-24">
                <LogoIcon className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Advisor Portal
                </span>
              </Link>
            </div>

            {/* Stats Summary - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {stats.totalClients}
                </p>
                <p className="text-xs text-gray-500">Total Clients</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">
                  {stats.activeMeetings}
                </p>
                <p className="text-xs text-gray-500">Active Meetings</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ₹{stats.monthlyRevenue.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500">Monthly Revenue</p>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-64 pl-10 p-2"
                    placeholder="Search clients, reports..."
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <button className="hidden md:flex items-center px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                <UserGroupIcon className="h-4 w-4 mr-2" />
                Add Client
              </button>

              {/* Calendar Button */}
              <Link
                to="/advisor/meetings"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
              >
                <CalendarIcon className="h-6 w-6" />
                {stats.activeMeetings > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {stats.activeMeetings}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
              >
                <BellIcon className="h-6 w-6" />
                {stats.pendingTasks > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {stats.pendingTasks}
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
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Advisor'}</p>
                    <p className="text-xs text-gray-500">Advisor ID: {user?.advisorId || 'ADV-001'}</p>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Advisor'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'advisor@example.com'}</p>
                    </div>
                    <Link
                      to="/advisor/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/advisor/performance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Performance
                    </Link>
                    <Link
                      to="/advisor/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Settings
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
          <div className="md:hidden p-4 mb-4 bg-green-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-600">Total Clients</span>
                <p className="text-lg font-bold text-gray-900">{stats.totalClients}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Active Meetings</span>
                <p className="text-lg font-bold text-green-600">{stats.activeMeetings}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Pending Tasks</span>
                <p className="text-lg font-bold text-orange-600">{stats.pendingTasks}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Monthly Revenue</span>
                <p className="text-lg font-bold text-gray-900">
                  ₹{stats.monthlyRevenue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
              Navigation
            </div>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={clsx(
                      'flex items-center p-2 text-base font-medium rounded-lg group',
                      isActive(item.href)
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    <svg
                      className={clsx(
                        'w-6 h-6 transition duration-75',
                        isActive(item.href)
                          ? 'text-green-600'
                          : 'text-gray-400 group-hover:text-gray-900'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="ml-3">{item.name}</span>
                    {item.name === 'Clients' && (
                      <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {stats.totalClients}
                      </span>
                    )}
                    {item.name === 'Meetings' && stats.activeMeetings > 0 && (
                      <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {stats.activeMeetings}
                      </span>
                    )}
                    {item.name === 'Messages' && (
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        3
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Meetings */}
          <div className="mt-8 px-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Upcoming Meetings</h3>
            <div className="space-y-3">
              {[
                { client: 'Rajesh Kumar', time: '10:30 AM', type: 'Portfolio Review' },
                { client: 'Priya Sharma', time: '2:00 PM', type: 'New Investment' },
                { client: 'Amit Patel', time: '4:30 PM', type: 'Goal Planning' },
              ].map((meeting, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{meeting.client}</p>
                    <p className="text-xs text-gray-500">{meeting.type}</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{meeting.time}</span>
                </div>
              ))}
            </div>
            <Link
              to="/advisor/meetings"
              className="block mt-3 text-center text-sm text-green-600 hover:text-green-700"
            >
              View all meetings →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 px-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/advisor/clients/new"
                className="block px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-center"
              >
                Add New Client
              </Link>
              <Link
                to="/advisor/reports/generate"
                className="block px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Generate Report
              </Link>
              <Link
                to="/advisor/meetings/schedule"
                className="block px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Schedule Meeting
              </Link>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mt-8 px-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">This Month</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Revenue Target</span>
                    <span className="text-green-600 font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Client Satisfaction</span>
                    <span className="text-blue-600 font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
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
            {/* Breadcrumb can be added here */}
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

AdvisorLayout.propTypes = {
  children: PropTypes.node,
};

export default AdvisorLayout;
EOF