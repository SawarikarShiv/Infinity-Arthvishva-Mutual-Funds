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
  CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';

const InvestorLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { user, portfolio } = useSelector((state) => ({
    user: state.auth.user,
    portfolio: state.investor.portfolio,
  }));

  const navigation = [
    { name: 'Dashboard', href: '/investor/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Portfolio', href: '/investor/portfolio', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Explore Funds', href: '/investor/funds', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
    { name: 'My Goals', href: '/investor/goals', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Transactions', href: '/investor/transactions', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Reports', href: '/investor/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Settings', href: '/investor/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const totalPortfolioValue = portfolio?.currentValue || 0;
  const totalReturns = portfolio?.returns || 0;
  const returnPercentage = portfolio?.returnPercentage || 0;

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
              
              <Link to="/investor/dashboard" className="flex items-center ml-2 md:mr-24">
                <LogoIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Investor Portal
                </span>
              </Link>
            </div>

            {/* Portfolio Summary - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ₹{totalPortfolioValue.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500">Portfolio Value</p>
              </div>
              <div className="text-right">
                <p className={clsx(
                  'text-sm font-medium',
                  totalReturns >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {totalReturns >= 0 ? '+' : ''}₹{Math.abs(totalReturns).toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-500">Total Returns</p>
              </div>
              <div className="text-right">
                <p className={clsx(
                  'text-sm font-medium',
                  returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {returnPercentage >= 0 ? '+' : ''}{returnPercentage}%
                </p>
                <p className="text-xs text-gray-500">Returns</p>
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
                    placeholder="Search funds, transactions..."
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <button className="hidden md:flex items-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <CurrencyRupeeIcon className="h-4 w-4 mr-2" />
                Invest Now
              </button>

              {/* Notifications */}
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg relative"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  2
                </span>
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
                      {user?.name?.charAt(0) || 'I'}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'Investor'}</p>
                    <p className="text-xs text-gray-500">Investor ID: {user?.investorId || 'INV-001'}</p>
                  </div>
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Investor'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'investor@example.com'}</p>
                    </div>
                    <Link
                      to="/investor/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/investor/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Account Settings
                    </Link>
                    <Link
                      to="/investor/documents"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Documents
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
          {/* Portfolio Summary - Mobile */}
          <div className="md:hidden p-4 mb-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Portfolio Value</span>
              <span className="text-lg font-bold text-gray-900">
                ₹{totalPortfolioValue.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-xs text-gray-500">Returns</span>
                <p className={clsx(
                  'text-sm font-semibold',
                  totalReturns >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {totalReturns >= 0 ? '+' : ''}₹{Math.abs(totalReturns).toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Change</span>
                <p className={clsx(
                  'text-sm font-semibold',
                  returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  {returnPercentage >= 0 ? '+' : ''}{returnPercentage}%
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
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    <svg
                      className={clsx(
                        'w-6 h-6 transition duration-75',
                        isActive(item.href)
                          ? 'text-blue-600'
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
                    {item.name === 'Portfolio' && (
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {portfolio?.holdings?.length || 0}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 px-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                to="/investor/funds/invest"
                className="block px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
              >
                Invest in Funds
              </Link>
              <Link
                to="/investor/goals/new"
                className="block px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Create Goal
              </Link>
              <Link
                to="/investor/sip"
                className="block px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
              >
                Start SIP
              </Link>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-8 px-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Transactions</h3>
            <div className="space-y-3">
              {[
                { name: 'HDFC Equity Fund', amount: '₹5,000', type: 'SIP', date: 'Today' },
                { name: 'SBI Bluechip Fund', amount: '₹10,000', type: 'Lumpsum', date: '2 days ago' },
                { name: 'ICICI Prudential', amount: '₹7,500', type: 'SIP', date: '1 week ago' },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.name}</p>
                    <p className="text-xs text-gray-500">{transaction.type} • {transaction.date}</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{transaction.amount}</span>
                </div>
              ))}
            </div>
            <Link
              to="/investor/transactions"
              className="block mt-3 text-center text-sm text-blue-600 hover:text-blue-700"
            >
              View all transactions →
            </Link>
          </div>

          {/* Help & Support */}
          <div className="mt-8 px-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-xs text-gray-600 mb-3">
                Our investment advisors are available to help you.
              </p>
              <button className="w-full px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Schedule Call
              </button>
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

InvestorLayout.propTypes = {
  children: PropTypes.node,
};

export default InvestorLayout;

