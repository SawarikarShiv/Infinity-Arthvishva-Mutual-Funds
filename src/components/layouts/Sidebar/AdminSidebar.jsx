import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  HomeIcon,
  ServerIcon,
  ArchiveBoxIcon,
  BellAlertIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline';
import SidebarItem from './SidebarItem';
import { LogoIcon } from '@/assets';

const AdminSidebar = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    {
      id: 'users',
      label: 'User Management',
      icon: UserGroupIcon,
      badge: 24,
      children: [
        { label: 'All Users', href: '/admin/users', badge: 156 },
        { label: 'Investors', href: '/admin/users/investors', badge: 120 },
        { label: 'Advisors', href: '/admin/users/advisors', badge: 24 },
        { label: 'Admins', href: '/admin/users/admins', badge: 8 },
        { label: 'Pending Approval', href: '/admin/users/pending', badge: 4 },
        { label: 'Suspended', href: '/admin/users/suspended', badge: 2 },
      ],
    },
    {
      id: 'system',
      label: 'System Config',
      icon: CogIcon,
      children: [
        { label: 'General Settings', href: '/admin/config/general' },
        { label: 'Email Templates', href: '/admin/config/email' },
        { label: 'SMS Settings', href: '/admin/config/sms' },
        { label: 'Payment Gateway', href: '/admin/config/payment' },
        { label: 'API Keys', href: '/admin/config/api' },
        { label: 'Maintenance', href: '/admin/config/maintenance' },
      ],
    },
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: ServerIcon,
      badge: 3,
      children: [
        { label: 'System Health', href: '/admin/monitoring/health' },
        { label: 'Performance Metrics', href: '/admin/monitoring/performance' },
        { label: 'Error Logs', href: '/admin/monitoring/errors' },
        { label: 'API Usage', href: '/admin/monitoring/api-usage' },
      ],
    },
    { id: 'audit', label: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldCheckIcon, badge: 156 },
    { id: 'reports', label: 'Reports', href: '/admin/reports', icon: DocumentTextIcon },
    { id: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: ChartPieIcon },
    { id: 'backup', label: 'Backup & Restore', href: '/admin/backup', icon: ArchiveBoxIcon },
    { id: 'notifications', label: 'Notifications', href: '/admin/notifications', icon: BellAlertIcon, badge: 12 },
  ];

  const systemStatus = {
    cpu: 24,
    memory: 68,
    storage: 42,
    activeUsers: 342,
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-gray-900">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-800">
          <Link to="/admin/dashboard" className="flex items-center">
            <LogoIcon className="h-8 w-8 text-white" />
            <span className="ml-3 text-white font-bold text-lg">Admin Panel</span>
          </Link>
        </div>
        
        {/* System Status */}
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            System Status
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">CPU Usage</span>
                <span className={clsx(
                  'font-medium',
                  systemStatus.cpu > 80 ? 'text-red-400' : 
                  systemStatus.cpu > 60 ? 'text-yellow-400' : 'text-green-400'
                )}>
                  {systemStatus.cpu}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={clsx(
                    'h-1.5 rounded-full',
                    systemStatus.cpu > 80 ? 'bg-red-500' : 
                    systemStatus.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  )}
                  style={{ width: `${systemStatus.cpu}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Memory</span>
                <span className={clsx(
                  'font-medium',
                  systemStatus.memory > 80 ? 'text-red-400' : 
                  systemStatus.memory > 60 ? 'text-yellow-400' : 'text-green-400'
                )}>
                  {systemStatus.memory}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className={clsx(
                    'h-1.5 rounded-full',
                    systemStatus.memory > 80 ? 'bg-red-500' : 
                    systemStatus.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  )}
                  style={{ width: `${systemStatus.memory}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Active Users</span>
                <span className="text-blue-400 font-medium">{systemStatus.activeUsers}</span>
              </div>
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
                className="text-gray-300 hover:bg-gray-800 hover:text-white"
                iconClassName="text-gray-400 group-hover:text-gray-300"
                badgeClassName="bg-gray-800 text-gray-300"
              >
                {item.children?.map((child) => (
                  <SidebarItem
                    key={child.label}
                    label={child.label}
                    href={child.href}
                    badge={child.badge}
                    className="ml-4 text-sm text-gray-400 hover:text-white"
                    badgeClassName="bg-gray-800 text-gray-300"
                  />
                ))}
              </SidebarItem>
            ))}
          </nav>
        </div>
        
        {/* Quick Stats */}
        <div className="flex-shrink-0 border-t border-gray-800 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded p-3">
              <p className="text-xs text-gray-400">Today's Signups</p>
              <p className="text-lg font-bold text-white">24</p>
            </div>
            <div className="bg-gray-800 rounded p-3">
              <p className="text-xs text-gray-400">Investments</p>
              <p className="text-lg font-bold text-green-400">₹12.5L</p>
            </div>
          </div>
        </div>
        
        {/* Admin Info */}
        <div className="flex-shrink-0 p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
              <span className="text-blue-300 font-semibold">A</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                Admin User
              </p>
              <p className="text-xs text-gray-400">
                Last login: 2 hours ago
              </p>
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

export default AdminSidebar;
EOF
