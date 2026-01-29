import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  WalletIcon,
  ChartBarIcon,
  TargetIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  BellIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import SidebarItem from './SidebarItem';
import { LogoIcon } from '@/assets';

const InvestorSidebar = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const portfolioStats = {
    totalValue: 1250000,
    todayChange: 12500,
    holdings: 8,
    sipActive: 3,
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', href: '/investor/dashboard', icon: HomeIcon },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: WalletIcon,
      badge: portfolioStats.holdings,
      children: [
        { label: 'Holdings', href: '/investor/portfolio/holdings' },
        { label: 'Asset Allocation', href: '/investor/portfolio/allocation' },
        { label: 'Performance', href: '/investor/portfolio/performance' },
        { label: 'Transaction History', href: '/investor/portfolio/transactions' },
      ],
    },
    {
      id: 'funds',
      label: 'Explore Funds',
      icon: ChartBarIcon,
      children: [
        { label: 'All Funds', href: '/investor/funds' },
        { label: 'Top Performers', href: '/investor/funds/top' },
        { label: 'New Funds', href: '/investor/funds/new' },
        { label: 'Recommended for You', href: '/investor/funds/recommended' },
        { label: 'Compare Funds', href: '/investor/funds/compare' },
        { label: 'Watchlist', href: '/investor/funds/watchlist', badge: 5 },
      ],
    },
    {
      id: 'goals',
      label: 'My Goals',
      icon: TargetIcon,
      children: [
        { label: 'All Goals', href: '/investor/goals' },
        { label: 'Create New Goal', href: '/investor/goals/new' },
        { label: 'Goal Progress', href: '/investor/goals/progress' },
        { label: 'Goal Calculator', href: '/investor/goals/calculator' },
      ],
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: CurrencyRupeeIcon,
      badge: portfolioStats.sipActive,
      children: [
        { label: 'All Transactions', href: '/investor/transactions' },
        { label: 'SIP Management', href: '/investor/transactions/sip' },
        { label: 'Lumpsum Investments', href: '/investor/transactions/lumpsum' },
        { label: 'Redemptions', href: '/investor/transactions/redemptions' },
        { label: 'Switch Transactions', href: '/investor/transactions/switches' },
        { label: 'Pending Transactions', href: '/investor/transactions/pending', badge: 2 },
      ],
    },
    { id: 'reports', label: 'Reports', href: '/investor/reports', icon: DocumentTextIcon },
    { id: 'settings', label: 'Settings', href: '/investor/settings', icon: CogIcon },
    { id: 'help', label: 'Help & Support', href: '/investor/help', icon: QuestionMarkCircleIcon },
  ];

  const quickActions = [
    { label: 'Invest Now', href: '/investor/funds/invest', variant: 'primary' },
    { label: 'Start SIP', href: '/investor/transactions/sip/new', variant: 'secondary' },
    { label: 'Redeem', href: '/investor/transactions/redeem', variant: 'secondary' },
    { label: 'Switch Funds', href: '/investor/transactions/switch', variant: 'secondary' },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <Link to="/investor/dashboard" className="flex items-center">
            <LogoIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-gray-900 font-bold text-lg">Investor Portal</span>
          </Link>
        </div>
        
        {/* Portfolio Summary */}
        <div className="p-4 border-b border-gray-200">
          <div className="mb-3">
            <p className="text-xs text-gray-500">Portfolio Value</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{portfolioStats.totalValue.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-500">Today's Change</p>
              <p className="text-sm font-semibold text-green-600">
                +₹{portfolioStats.todayChange.toLocaleString('en-IN')}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Holdings</p>
              <p className="text-sm font-semibold text-gray-900">
                {portfolioStats.holdings}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active SIPs</p>
              <p className="text-sm font-semibold text-blue-600">
                {portfolioStats.sipActive}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
                badge={item.badge}
                isExpanded={expandedItems[item.id]}
                onToggle={() => toggleItem(item.id)}
              >
                {item.children?.map((child) => (
                  <SidebarItem
                    key={child.label}
                    label={child.label}
                    href={child.href}
                    badge={child.badge}
                    className="ml-4 text-sm"
                  />
                ))}
              </SidebarItem>
            ))}
          </nav>
        </div>
        
        {/* Quick Actions */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className={clsx(
                  'block px-3 py-2 text-sm font-medium rounded-lg text-center transition-colors duration-200',
                  action.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Recent Activity & Support */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="space-y-4">
            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Recent Activity</h4>
                <BellIcon className="h-4 w-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="text-xs">
                  <p className="text-gray-700">SIP of ₹5,000 processed</p>
                  <p className="text-gray-500">HDFC Equity Fund • Today</p>
                </div>
                <div className="text-xs">
                  <p className="text-gray-700">Goal progress: 65%</p>
                  <p className="text-gray-500">Retirement Plan • Updated</p>
                </div>
              </div>
            </div>
            
            {/* Support */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="text-sm font-medium text-blue-900">Need Help?</h4>
              </div>
              <p className="text-xs text-blue-700 mb-3">
                Our investment advisors are ready to assist you.
              </p>
              <div className="flex space-x-2">
                <Link
                  to="/investor/help/chat"
                  className="flex-1 px-2 py-1.5 bg-white text-blue-600 text-xs font-medium rounded border border-blue-200 text-center hover:bg-blue-50"
                >
                  Chat Now
                </Link>
                <Link
                  to="/investor/help/schedule"
                  className="flex-1 px-2 py-1.5 bg-blue-600 text-white text-xs font-medium rounded text-center hover:bg-blue-700"
                >
                  Schedule Call
                </Link>
              </div>
            </div>
            
            {/* Advisor Info */}
            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <StarIcon className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-900">Your Advisor</p>
                <p className="text-xs text-gray-500">Rajesh Mehta</p>
              </div>
              <Link
                to="/investor/advisor"
                className="ml-auto text-xs text-blue-600 hover:text-blue-700"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for conditional classes
function clsx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default InvestorSidebar;
EOF