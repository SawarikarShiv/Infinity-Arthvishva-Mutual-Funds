import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartPieIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  CurrencyRupeeIcon,
  BellAlertIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import SidebarItem from './SidebarItem';
import { LogoIcon } from '@/assets';

const AdvisorSidebar = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const advisorStats = {
    totalClients: 12,
    activeMeetings: 5,
    pendingTasks: 8,
    monthlyRevenue: 125000,
    clientSatisfaction: 92,
    targetAchievement: 65,
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', href: '/advisor/dashboard', icon: HomeIcon },
    {
      id: 'clients',
      label: 'Clients',
      icon: UserGroupIcon,
      badge: advisorStats.totalClients,
      children: [
        { label: 'All Clients', href: '/advisor/clients' },
        { label: 'New Clients', href: '/advisor/clients/new', badge: 2 },
        { label: 'Portfolio Reviews', href: '/advisor/clients/reviews' },
        { label: 'Risk Profiles', href: '/advisor/clients/risk-profiles' },
        { label: 'Client Notes', href: '/advisor/clients/notes' },
        { label: 'Archived Clients', href: '/advisor/clients/archived' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: DocumentTextIcon,
      children: [
        { label: 'Client Reports', href: '/advisor/reports/clients' },
        { label: 'Performance Reports', href: '/advisor/reports/performance' },
        { label: 'Revenue Reports', href: '/advisor/reports/revenue' },
        { label: 'Commission Reports', href: '/advisor/reports/commission' },
        { label: 'Custom Reports', href: '/advisor/reports/custom' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: ChartPieIcon,
      children: [
        { label: 'Portfolio Analytics', href: '/advisor/analytics/portfolio' },
        { label: 'Client Analytics', href: '/advisor/analytics/clients' },
        { label: 'Market Analytics', href: '/advisor/analytics/market' },
        { label: 'Performance Analytics', href: '/advisor/analytics/performance' },
      ],
    },
    {
      id: 'meetings',
      label: 'Meetings',
      icon: CalendarIcon,
      badge: advisorStats.activeMeetings,
      children: [
        { label: 'Upcoming', href: '/advisor/meetings/upcoming' },
        { label: 'Schedule New', href: '/advisor/meetings/schedule' },
        { label: 'Meeting History', href: '/advisor/meetings/history' },
        { label: 'Calendar View', href: '/advisor/meetings/calendar' },
      ],
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: ChatBubbleLeftRightIcon,
      badge: 3,
      children: [
        { label: 'Messages', href: '/advisor/messages' },
        { label: 'Email Campaigns', href: '/advisor/communication/email' },
        { label: 'SMS Alerts', href: '/advisor/communication/sms' },
        { label: 'Announcements', href: '/advisor/communication/announcements' },
      ],
    },
    { id: 'settings', label: 'Settings', href: '/advisor/settings', icon: CogIcon },
    { id: 'training', label: 'Training', href: '/advisor/training', icon: AcademicCapIcon },
  ];

  const performanceMetrics = [
    { label: 'Revenue Target', value: advisorStats.targetAchievement, color: 'bg-green-500' },
    { label: 'Client Satisfaction', value: advisorStats.clientSatisfaction, color: 'bg-blue-500' },
    { label: 'Task Completion', value: 78, color: 'bg-purple-500' },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <Link to="/advisor/dashboard" className="flex items-center">
            <LogoIcon className="h-8 w-8 text-green-600" />
            <span className="ml-3 text-gray-900 font-bold text-lg">Advisor Portal</span>
          </Link>
        </div>
        
        {/* Performance Metrics */}
        <div className="p-4 border-b border-gray-200">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-500">Monthly Revenue</p>
              <CurrencyRupeeIcon className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              ₹{advisorStats.monthlyRevenue.toLocaleString('en-IN')}
            </p>
          </div>
          
          <div className="space-y-3">
            {performanceMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{metric.label}</span>
                  <span className="font-medium text-gray-900">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`${metric.color} h-1.5 rounded-full`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
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
        
        {/* Quick Stats */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded p-3">
              <p className="text-xs text-blue-700">Active Meetings</p>
              <p className="text-lg font-bold text-blue-900">{advisorStats.activeMeetings}</p>
            </div>
            <div className="bg-orange-50 rounded p-3">
              <p className="text-xs text-orange-700">Pending Tasks</p>
              <p className="text-lg font-bold text-orange-900">{advisorStats.pendingTasks}</p>
            </div>
          </div>
          
          {/* Upcoming Meetings */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Next Meeting</h4>
              <BellAlertIcon className="h-4 w-4 text-gray-400" />
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium text-gray-900">Rajesh Kumar</p>
              <p className="text-xs text-gray-500 mb-2">Portfolio Review</p>
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-600">Today, 10:30 AM</span>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-2">
            <Link
              to="/advisor/clients/new"
              className="block px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 text-center transition-colors duration-200"
            >
              Add New Client
            </Link>
            <Link
              to="/advisor/meetings/schedule"
              className="block px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center transition-colors duration-200"
            >
              Schedule Meeting
            </Link>
          </div>
        </div>
        
        {/* Support & Resources */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="space-y-3">
            {/* Market Updates */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-900">Market Updates</p>
                <p className="text-xs text-gray-500">Latest insights</p>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                New
              </span>
            </div>
            
            {/* Training Resources */}
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <AcademicCapIcon className="h-4 w-4 text-purple-600 mr-2" />
                <h4 className="text-xs font-medium text-purple-900">Training Resources</h4>
              </div>
              <p className="text-xs text-purple-700 mb-2">
                New course: Advanced Portfolio Management
              </p>
              <Link
                to="/advisor/training"
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                Explore →
              </Link>
            </div>
            
            {/* Support */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Need immediate help?</p>
              <a
                href="tel:18001234567"
                className="text-sm font-medium text-green-600 hover:text-green-700"
              >
                Call Support: 1800-123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorSidebar;
EOF
