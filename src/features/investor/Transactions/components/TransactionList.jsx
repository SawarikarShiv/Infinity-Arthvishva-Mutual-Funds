import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/common/Card';
import { DataTable } from '../../../components/common/Table';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { TextInput, SelectInput } from '../../../components/common/Inputs';
import { Badge } from '../../../components/common/UI';
import { Search, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      fundName: 'ICICI Bluechip Fund',
      type: 'Purchase',
      amount: 50000,
      units: 1092.45,
      nav: 45.78,
      status: 'Completed',
      transactionId: 'TXN001234',
      category: 'Equity',
    },
    {
      id: 2,
      date: '2024-01-10',
      fundName: 'SBI Debt Fund',
      type: 'SIP',
      amount: 10000,
      units: 392.16,
      nav: 25.50,
      status: 'Completed',
      transactionId: 'TXN001235',
      category: 'Debt',
    },
    {
      id: 3,
      date: '2024-01-05',
      fundName: 'HDFC Hybrid Fund',
      type: 'Redemption',
      amount: 25000,
      units: -625.00,
      nav: 40.00,
      status: 'Processing',
      transactionId: 'TXN001236',
      category: 'Hybrid',
    },
    {
      id: 4,
      date: '2023-12-28',
      fundName: 'Axis Long Term Equity',
      type: 'Purchase',
      amount: 75000,
      units: 956.14,
      nav: 78.42,
      status: 'Completed',
      transactionId: 'TXN001237',
      category: 'ELSS',
    },
    {
      id: 5,
      date: '2023-12-15',
      fundName: 'Nippon Small Cap',
      type: 'SIP',
      amount: 15000,
      units: 125.00,
      nav: 120.00,
      status: 'Completed',
      transactionId: 'TXN001238',
      category: 'Equity',
    },
    {
      id: 6,
      date: '2023-12-01',
      fundName: 'ICICI Bluechip Fund',
      type: 'Switch',
      amount: 30000,
      units: 0,
      nav: 0,
      status: 'Completed',
      transactionId: 'TXN001239',
      category: 'Equity',
    },
    {
      id: 7,
      date: '2023-11-25',
      fundName: 'Aditya Birla Sun Life Debt',
      type: 'Purchase',
      amount: 40000,
      units: 1587.30,
      nav: 25.20,
      status: 'Completed',
      transactionId: 'TXN001240',
      category: 'Debt',
    },
    {
      id: 8,
      date: '2023-11-15',
      fundName: 'SBI Focused Equity',
      type: 'Redemption',
      amount: 20000,
      units: -159.24,
      nav: 125.64,
      status: 'Completed',
      transactionId: 'TXN001241',
      category: 'Equity',
    },
  ];

  const columns = [
    {
      header: 'Date',
      accessor: 'date',
      cell: (row) => format(new Date(row.date), 'dd MMM yyyy'),
    },
    {
      header: 'Fund',
      accessor: 'fundName',
    },
    {
      header: 'Type',
      accessor: 'type',
      cell: (row) => {
        const getTypeColor = (type) => {
          switch (type.toLowerCase()) {
            case 'purchase': return 'green';
            case 'redemption': return 'red';
            case 'sip': return 'blue';
            case 'switch': return 'purple';
            default: return 'gray';
          }
        };
        return (
          <Badge variant={getTypeColor(row.type)}>
            {row.type}
          </Badge>
        );
      },
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (row) => (
        <div className={`font-medium ${row.type === 'Purchase' || row.type === 'SIP' ? 'text-green-600' : 'text-red-600'}`}>
          {row.type === 'Purchase' || row.type === 'SIP' ? '+' : '-'}₹{row.amount.toLocaleString('en-IN')}
        </div>
      ),
    },
    {
      header: 'Units',
      accessor: 'units',
      cell: (row) => (
        <div className={row.units >= 0 ? 'text-green-600' : 'text-red-600'}>
          {row.units >= 0 ? '+' : ''}{row.units.toFixed(2)}
        </div>
      ),
    },
    {
      header: 'NAV',
      accessor: 'nav',
      cell: (row) => row.nav > 0 ? `₹${row.nav.toFixed(2)}` : '-',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => {
        const getStatusColor = (status) => {
          switch (status.toLowerCase()) {
            case 'completed': return 'green';
            case 'processing': return 'yellow';
            case 'failed': return 'red';
            case 'pending': return 'gray';
            default: return 'gray';
          }
        };
        return (
          <Badge variant={getStatusColor(row.status)}>
            {row.status}
          </Badge>
        );
      },
    },
    {
      header: 'Transaction ID',
      accessor: 'transactionId',
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.fundName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    // Filter by date range
    const transactionDate = new Date(transaction.date);
    const today = new Date();
    let startDate = new Date();
    
    switch (dateRange) {
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0); // Beginning of time
    }
    
    const matchesDate = transactionDate >= startDate && transactionDate <= today;
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const totalPurchases = transactions
    .filter(t => t.type === 'Purchase' || t.type === 'SIP')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRedemptions = transactions
    .filter(t => t.type === 'Redemption')
    .reduce((sum, t) => sum + t.amount, 0);

  const netFlow = totalPurchases - totalRedemptions;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600">View and manage your investment transactions</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download size={18} />}>
            Export CSV
          </SecondaryButton>
          <PrimaryButton>New Transaction</PrimaryButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{totalPurchases.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Total Purchases</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                ₹{totalRedemptions.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Total Redemptions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netFlow >= 0 ? '+' : ''}₹{netFlow.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Net Flow</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <TextInput
                placeholder="Search by fund name or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
              />
            </div>
            <SelectInput
              label="Transaction Type"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'Purchase', label: 'Purchase' },
                { value: 'Redemption', label: 'Redemption' },
                { value: 'SIP', label: 'SIP' },
                { value: 'Switch', label: 'Switch' },
              ]}
              icon={<Filter size={18} />}
            />
            <SelectInput
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Processing', label: 'Processing' },
                { value: 'Pending', label: 'Pending' },
                { value: 'Failed', label: 'Failed' },
              ]}
            />
            <SelectInput
              label="Date Range"
              value={dateRange}
              onChange={setDateRange}
              options={[
                { value: 'week', label: 'Last Week' },
                { value: 'month', label: 'Last Month' },
                { value: 'quarter', label: 'Last Quarter' },
                { value: 'year', label: 'Last Year' },
                { value: 'all', label: 'All Time' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Transactions ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredTransactions}
            pagination
            pageSize={10}
            searchable={false}
          />
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchases
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Redemptions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Flow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transactions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {['2024-01', '2023-12', '2023-11'].map((month) => {
                  const monthTransactions = transactions.filter(t => 
                    t.date.startsWith(month)
                  );
                  const purchases = monthTransactions
                    .filter(t => t.type === 'Purchase' || t.type === 'SIP')
                    .reduce((sum, t) => sum + t.amount, 0);
                  const redemptions = monthTransactions
                    .filter(t => t.type === 'Redemption')
                    .reduce((sum, t) => sum + t.amount, 0);
                  const net = purchases - redemptions;
                  
                  return (
                    <tr key={month}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {format(new Date(month + '-01'), 'MMM yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-green-600">
                          <TrendingUp size={14} className="mr-1" />
                          ₹{purchases.toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-red-600">
                          <TrendingDown size={14} className="mr-1" />
                          ₹{redemptions.toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`font-medium ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {net >= 0 ? '+' : ''}₹{net.toLocaleString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {monthTransactions.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionList;