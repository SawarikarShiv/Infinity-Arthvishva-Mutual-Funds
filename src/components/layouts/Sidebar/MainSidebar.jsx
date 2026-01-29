import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  CalculatorIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  InformationCircleIcon,
  PhoneIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import SidebarItem from './SidebarItem';
import { LogoMain } from '@/assets';

const MainSidebar = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const navigation = [
    { id: 'home', label: 'Home', href: '/', icon: HomeIcon },
    {
      id: 'products',
      label: 'Products',
      icon: ChartBarIcon,
      children: [
        { label: 'Equity Funds', href: '/funds/equity' },
        { label: 'Debt Funds', href: '/funds/debt' },
        { label: 'Hybrid Funds', href: '/funds/hybrid' },
        { label: 'SIP Plans', href: '/sip' },
        { label: 'ELSS Funds', href: '/funds/elss' },
        { label: 'Index Funds', href: '/funds/index' },
        { label: 'Sectoral Funds', href: '/funds/sectoral' },
      ],
    },
    {
      id: 'tools',
      label: 'Investment Tools',
      icon: CalculatorIcon,
      children: [
        { label: 'SIP Calculator', href: '/tools/sip-calculator' },
        { label: 'Lumpsum Calculator', href: '/tools/lumpsum-calculator' },
        { label: 'Goal Planner', href: '/tools/goal-planner' },
        { label: 'Risk Profiler', href: '/tools/risk-profiler' },
        { label: 'Tax Calculator', href: '/tools/tax-calculator' },
        { label: 'Retirement Planner', href: '/tools/retirement-planner' },
      ],
    },
    { id: 'performance', label: 'Fund Performance', href: '/performance', icon: ArrowTrendingUpIcon },
    { id: 'research', label: 'Market Research', href: '/research', icon: CurrencyRupeeIcon },
    { id: 'about', label: 'About Us', href: '/about', icon: InformationCircleIcon },
    { id: 'team', label: 'Our Team', href: '/team', icon: UserGroupIcon },
    { id: 'security', label: 'Security', href: '/security', icon: ShieldCheckIcon },
    { id: 'contact', label: 'Contact', href: '/contact', icon: PhoneIcon },
  ];

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <LogoMain className="h-8 w-auto" />
          </Link>
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
                isExpanded={expandedItems[item.id]}
                onToggle={() => toggleItem(item.id)}
              >
                {item.children?.map((child) => (
                  <SidebarItem
                    key={child.label}
                    label={child.label}
                    href={child.href}
                    className="ml-4 text-sm"
                  />
                ))}
              </SidebarItem>
            ))}
          </nav>
        </div>
        
        {/* Call to Action */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-white">
            <h4 className="text-sm font-semibold mb-2">Ready to Invest?</h4>
            <p className="text-xs opacity-90 mb-3">
              Start your investment journey with expert guidance
            </p>
            <div className="space-y-2">
              <Link
                to="/register"
                className="block w-full text-center px-3 py-2 bg-white text-blue-600 text-sm font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                Open Account
              </Link>
              <Link
                to="/contact"
                className="block w-full text-center px-3 py-2 bg-transparent border border-white text-white text-sm font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                Talk to Advisor
              </Link>
            </div>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="flex-shrink-0 p-4">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-xs text-gray-500">
                Need immediate assistance?
              </p>
              <div className="mt-1">
                <a
                  href="tel:18001234567"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  1800-123-4567
                </a>
                <span className="text-xs text-gray-500 mx-2">•</span>
                <a
                  href="mailto:support@infinityarthvishva.com"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
EOF