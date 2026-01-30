import React from 'react';
import InvestorLayout from '@components/layouts/InvestorLayout';

const TransactionsPage = () => {
  return (
    <InvestorLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-4xl mb-4">💰</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Transactions Page</h2>
          <p className="text-gray-600">
            This page will display all your investment transactions, SIP management, and transaction details.
          </p>
        </div>
      </div>
    </InvestorLayout>
  );
};

export default TransactionsPage;
EOF