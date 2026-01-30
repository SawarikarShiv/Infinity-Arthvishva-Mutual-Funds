import React from 'react';
import InvestorLayout from '@components/layouts/InvestorLayout';

const ReportsPage = () => {
  return (
    <InvestorLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Reports Page</h2>
          <p className="text-gray-600">
            This page will display tax reports, portfolio analysis reports, and transaction statements.
          </p>
        </div>
      </div>
    </InvestorLayout>
  );
};

export default ReportsPage;
EOF