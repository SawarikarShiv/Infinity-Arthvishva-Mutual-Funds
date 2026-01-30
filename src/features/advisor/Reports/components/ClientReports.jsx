import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/Card';
import { DataTable } from '../../../../components/common/Table';
import { PrimaryButton, SecondaryButton } from '../../../../components/common/Button';
import { SelectInput, TextInput } from '../../../../components/common/Inputs';
import { Download, FileText, Calendar, Filter, Search } from 'lucide-react';

const ClientReports = () => {
  const [reportType, setReportType] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 1,
      client: 'Rajesh Kumar',
      type: 'Portfolio Performance',
      period: 'Q4 2023',
      generated: '2024-01-15',
      status: 'Generated',
      size: '2.4 MB',
      clientId: 1,
    },
    {
      id: 2,
      client: 'Priya Sharma',
      type: 'Tax Report',
      period: 'FY 2023-24',
      generated: '2024-01-12',
      status: 'Pending Review',
      size: '1.8 MB',
      clientId: 2,
    },
  ];

  const columns = [
    {
      header: 'Client',
      accessor: 'client',
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-blue-600 font-medium">
              {row.client.charAt(0)}
            </span>
          </div>
          <span className="font-medium text-gray-900">{row.client}</span>
        </div>
      ),
    },
    {
      header: 'Report Type',
      accessor: 'type',
      cell: (row) => (
        <div className="flex items-center">
          <FileText className="h-4 w-4 text-gray-500 mr-2" />
          {row.type}
        </div>
      ),
    },
    {
      header: 'Period',
      accessor: 'period',
    },
    {
      header: 'Generated',
      accessor: 'generated',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        const getStatusColor = (status) => {
          switch (status) {
            case 'Generated': return 'text-green-800 bg-green-100';
            case 'Pending Review': return 'text-yellow-800 bg-yellow-100';
            case 'In Progress': return 'text-blue-800 bg-blue-100';
            default: return 'text-gray-800 bg-gray-100';
          }
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
            {row.status}
          </span>
        );
      },
    },
    {
      header: 'Size',
      accessor: 'size',
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <SecondaryButton size="sm">Preview</SecondaryButton>
          <PrimaryButton size="sm" icon={<Download className="h-3 w-3" />}>
            Download
          </PrimaryButton>
        </div>
      ),
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = reportType === 'all' || report.type.toLowerCase().includes(reportType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const reportTypes = [
    { value: 'all', label: 'All Report Types' },
    { value: 'portfolio', label: 'Portfolio Performance' },
    { value: 'tax', label: 'Tax Report' },
    { value: 'risk', label: 'Risk Assessment' },
    { value: 'goal', label: 'Goal Progress' },
  ];

  const dateRanges = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'quarter', label: 'Last Quarter' },
    { value: 'year', label: 'Last Year' },
    { value: 'all', label: 'All Time' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Reports</h1>
          <p className="text-gray-600">Generate and manage client reports</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton>Export All</SecondaryButton>
          <PrimaryButton icon={<FileText className="h-4 w-4" />}>
            Generate Report
          </PrimaryButton>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <TextInput
                placeholder="Search reports by client or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <SelectInput
              label="Report Type"
              value={reportType}
              onChange={setReportType}
              options={reportTypes}
              icon={<Filter className="h-4 w-4" />}
            />
            <SelectInput
              label="Date Range"
              value={dateRange}
              onChange={setDateRange}
              options={dateRanges}
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredReports}
            pagination
            pageSize={10}
            searchable={false}
          />
        </CardContent>
      </Card>

      {/* Report Generation Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <PrimaryButton fullWidth>Generate Portfolio Summary</PrimaryButton>
              <SecondaryButton fullWidth>Create Tax Report</SecondaryButton>
              <SecondaryButton fullWidth>Generate Risk Assessment</SecondaryButton>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bulk Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <SelectInput
                label="Select Report Type"
                value="portfolio"
                onChange={() => {}}
                options={reportTypes.filter(t => t.value !== 'all')}
              />
              <PrimaryButton fullWidth icon={<FileText className="h-4 w-4" />}>
                Generate for All Clients
              </PrimaryButton>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Standard Portfolio</p>
                    <p className="text-sm text-gray-600">Includes performance metrics</p>
                  </div>
                </div>
                <SecondaryButton size="sm">Use</SecondaryButton>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Detailed Tax Report</p>
                    <p className="text-sm text-gray-600">Includes all tax documents</p>
                  </div>
                </div>
                <SecondaryButton size="sm">Use</SecondaryButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientReports;