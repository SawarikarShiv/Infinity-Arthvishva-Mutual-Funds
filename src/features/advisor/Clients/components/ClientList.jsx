import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/Card';
import { DataTable } from '../../../../components/common/Table';
import { Badge } from '../../../../components/common/UI';
import { PrimaryButton, SecondaryButton } from '../../../../components/common/Button';
import { TextInput, SelectInput } from '../../../../components/common/Inputs';
import { Search, Filter, UserPlus, Phone, Mail } from 'lucide-react';

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const columns = [
    {
      header: 'Client',
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-blue-600 font-bold">
              {row.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Mail className="h-3 w-3 text-gray-400" />
              <p className="text-xs text-gray-500">{row.email}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'phone',
      cell: (row) => (
        <div className="flex items-center">
          <Phone className="h-3 w-3 text-gray-400 mr-1" />
          {row.phone}
        </div>
      ),
    },
    {
      header: 'Portfolio Value',
      accessor: 'portfolioValue',
      cell: (row) => (
        <span className="font-medium text-gray-900">
          ₹{row.portfolioValue?.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      header: 'Risk Profile',
      accessor: 'riskProfile',
      cell: (row) => {
        const getRiskColor = (risk) => {
          switch (risk.toLowerCase()) {
            case 'conservative': return 'blue';
            case 'moderate': return 'green';
            case 'aggressive': return 'red';
            default: return 'gray';
          }
        };
        return (
          <Badge variant={getRiskColor(row.riskProfile)}>
            {row.riskProfile}
          </Badge>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Last Meeting',
      accessor: 'lastMeeting',
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <SecondaryButton size="sm">View</SecondaryButton>
          <PrimaryButton size="sm">Contact</PrimaryButton>
        </div>
      ),
    },
  ];

  const sampleData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      portfolioValue: 2450000,
      riskProfile: 'Moderate',
      status: 'Active',
      lastMeeting: '2024-01-15',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      portfolioValue: 1850000,
      riskProfile: 'Conservative',
      status: 'Active',
      lastMeeting: '2024-01-10',
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 9876543212',
      portfolioValue: 3200000,
      riskProfile: 'Aggressive',
      status: 'Active',
      lastMeeting: '2024-01-18',
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 9876543213',
      portfolioValue: 1250000,
      riskProfile: 'Moderate',
      status: 'Review Needed',
      lastMeeting: '2023-12-20',
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 9876543214',
      portfolioValue: 2800000,
      riskProfile: 'Conservative',
      status: 'Active',
      lastMeeting: '2024-01-12',
    },
  ];

  const filteredData = sampleData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || client.riskProfile === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage your client relationships and portfolios</p>
        </div>
        <PrimaryButton icon={<UserPlus className="h-4 w-4" />}>
          Add New Client
        </PrimaryButton>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <TextInput
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <SelectInput
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Review Needed', label: 'Review Needed' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
              icon={<Filter className="h-4 w-4" />}
            />
            <SelectInput
              label="Risk Profile"
              value={riskFilter}
              onChange={setRiskFilter}
              options={[
                { value: 'all', label: 'All Risk Profiles' },
                { value: 'Conservative', label: 'Conservative' },
                { value: 'Moderate', label: 'Moderate' },
                { value: 'Aggressive', label: 'Aggressive' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client List ({filteredData.length} clients)</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            pageSize={10}
            searchable={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientList;