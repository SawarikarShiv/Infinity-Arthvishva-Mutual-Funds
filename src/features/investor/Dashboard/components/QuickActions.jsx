import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Invest Now',
      description: 'Start a new investment',
      icon: '💰',
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'hover:bg-blue-100',
      onClick: () => navigate('/investor/funds')
    },
    {
      title: 'Start SIP',
      description: 'Setup Systematic Investment',
      icon: '📅',
      color: 'bg-green-50 text-green-600',
      hoverColor: 'hover:bg-green-100',
      onClick: () => navigate('/investor/funds?action=sip')
    },
    {
      title: 'Redeem',
      description: 'Withdraw your investment',
      icon: '🏧',
      color: 'bg-red-50 text-red-600',
      hoverColor: 'hover:bg-red-100',
      onClick: () => navigate('/investor/portfolio?action=redeem')
    },
    {
      title: 'Switch Funds',
      description: 'Transfer between funds',
      icon: '🔄',
      color: 'bg-purple-50 text-purple-600',
      hoverColor: 'hover:bg-purple-100',
      onClick: () => navigate('/investor/portfolio?action=switch')
    },
    {
      title: 'Add Funds',
      description: 'Top up your wallet',
      icon: '💳',
      color: 'bg-yellow-50 text-yellow-600',
      hoverColor: 'hover:bg-yellow-100',
      onClick: () => navigate('/investor/transactions?action=add-funds')
    },
    {
      title: 'Download Reports',
      description: 'Get portfolio statements',
      icon: '📄',
      color: 'bg-indigo-50 text-indigo-600',
      hoverColor: 'hover:bg-indigo-100',
      onClick: () => navigate('/investor/reports')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl 
              transition-all duration-200 transform hover:scale-105
              ${action.color} ${action.hoverColor}
            `}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-center">
              <div className="font-medium text-sm mb-1">{action.title}</div>
              <div className="text-xs opacity-75">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Need Help?</h4>
            <p className="text-sm text-gray-500">Our advisors are ready to assist you</p>
          </div>
          <button 
            onClick={() => navigate('/contact')}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Contact Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
EOF