import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/common/Card';
import { DataTable } from '../../../../components/common/Table';
import { Badge } from '../../../../components/common/UI';
import { TrendingUp, TrendingDown } from 'lucide-react';

const ClientPerformance = ({ clients }) => {
  const columns = [
    {
      header: 'Client Name',
      accessor: 'name',
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-blue-600 font-medium">
              {row.name.charAt(0)}
            </span>
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      header: 'Portfolio Value',
      accessor: 'portfolioValue',
      cell: (row) => (
        <span className="font-medium">
          ₹{row.portfolioValue.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      header: 'XIRR',
      accessor: 'xirr',
      cell: (row) => {
        const isPositive = row.xirr >= 0;
        return (
          <div className="flex items-center">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <Badge variant={isPositive ? 'success' : 'error'}>
              {isPositive ? '+' : ''}{row.xirr.toFixed(2)}%
            </Badge>
          </div>
        );
      },
    },
    {
      header: 'Risk Score',
      accessor: 'riskScore',
      cell: (row) => {
        let variant = 'default';
        if (row.riskScore <= 3) variant = 'success';
        else if (row.riskScore <= 6) variant = 'warning';
        else variant = 'error';
        
        return (
          <Badge variant={variant}>
            {row.riskScore}/10
          </Badge>
        );
      },
    },
    {
      header: 'Last Review',
      accessor: 'lastReview',
      cell: (row) => (
        <span className="text-gray-600">{row.lastReview}</span>
      ),
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
  ];

  const sampleData = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      portfolioValue: 2450000,
      xirr: 12.5,
      riskScore: 4,
      lastReview: '2 weeks ago',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      portfolioValue: 1850000,
      xirr: 8.2,
      riskScore: 6,
      lastReview: '1 month ago',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Amit Patel',
      portfolioValue: 3200000,
      xirr: 15.3,
      riskScore: 7,
      lastReview: '3 days ago',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      portfolioValue: 1250000,
      xirr: -2.1,
      riskScore: 3,
      lastReview: '2 months ago',
      status: 'Review Needed',
    },
    {
      id: 5,
      name: 'Vikram Singh',
      portfolioValue: 2800000,
      xirr: 10.8,
      riskScore: 5,
      lastReview: '1 week ago',
      status: 'Active',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={clients || sampleData}
          pagination
          pageSize={5}
          searchable
          searchPlaceholder="Search clients..."
        />
      </CardContent>
    </Card>
  );
};

export default ClientPerformance;