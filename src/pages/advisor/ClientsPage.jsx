import React from 'react';
import AdvisorLayout from '@components/layouts/AdvisorLayout';

const ClientsPage = () => {
  return (
    <AdvisorLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Clients</h1>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Clients Management</h2>
          <p className="text-gray-600">
            This page will display client list, portfolio details, meetings, and notes.
          </p>
        </div>
      </div>
    </AdvisorLayout>
  );
};

export default ClientsPage;
EOF