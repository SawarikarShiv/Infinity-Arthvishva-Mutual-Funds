import React from 'react';
import { formatDate } from '@utils/helpers/dateFormatter';
import { formatCurrency } from '@utils/helpers/currencyFormatter';
import Badge from '@components/common/UI/Badge';

const RecentInvestments = ({ investments = [] }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'failed':
        return 'red';
      case 'processing':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'sip':
        return 'purple';
      case 'lumpsum':
        return 'blue';
      case 'redemption':
        return 'red';
      case 'switch':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Recent Investments</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fund Name
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {investments.length > 0 ? (
              investments.map((investment, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{investment.fundName}</div>
                      <div className="text-sm text-gray-500">{investment.fundHouse}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge 
                      text={investment.type} 
                      color={getTypeColor(investment.type)}
                      size="sm"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(investment.amount)}
                    </div>
                    {investment.units && (
                      <div className="text-sm text-gray-500">
                        {investment.units.toFixed(3)} units
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(investment.date)}
                    </div>
                    {investment.time && (
                      <div className="text-xs text-gray-500">
                        {investment.time}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Badge 
                      text={investment.status} 
                      color={getStatusColor(investment.status)}
                      size="sm"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        View
                      </button>
                      {investment.status === 'pending' && (
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No recent investments found</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Start your first investment
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {investments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              Showing {investments.length} of {investments.length} investments
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentInvestments;
EOF