import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { SelectInput, TextInput } from '../../../components/common/Inputs';
import { Badge } from '../../../components/common/UI';
import { DataTable } from '../../../components/common/Table';
import { BarChart, PieChart } from '../../../components/common/Charts';
import { Download, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

const TransactionReport = () => {
  const [dateRange, setDateRange] = useState('month');
  const [transactionType, setTransactionType] = useState('all');
  const [category, setCategory] = useState('all');

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      fundName: 'ICICI Bluechip Fund',
      type: 'Purchase',
      amount: 50000,
      category: 'Equity',
      paymentMethod: 'UPI',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2024-01-10',
      fundName: 'SBI Debt Fund',
      type: 'SIP',
      amount: 10000,
      category: 'Debt',
      paymentMethod: 'Auto Debit',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2024-01-05',
      fundName: 'HDFC Hybrid Fund',
      type: 'Redemption',
      amount: 25000,
      category: 'Hybrid',
      paymentMethod: 'Bank Transfer',
      status: 'Processing',
    },
    {
      id: 4,
      date: '2023-12-28',
      fundName: 'Axis Long Term Equity',
      type: 'Purchase',
      amount: 75000,
      category: 'ELSS',
      paymentMethod: 'UPI',
      status: 'Completed',
    },
    {
      id: 5,
      date: '2023-12-15',
      fundName: 'Nippon Small Cap',
      type: 'SIP',
      amount: 15000,
      category: 'Equity',
      paymentMethod: 'Auto Debit',
      status: 'Completed',
    },
    {
      id: 6,
      date: '2023-12-01',
      fundName: 'ICICI Bluechip Fund',
      type: 'Switch',
      amount: 30000,
      category: 'Equity',
      paymentMethod: 'System',
      status: 'Completed',
    },
    {
      id: 7,
      date: '2023-11-25',
      fundName: 'Aditya Birla Sun Life Debt',
      type: 'Purchase',
      amount: 40000,
      category: 'Debt',
      paymentMethod: 'UPI',
      status: 'Completed',
    },
    {
      id: 8,
      date: '2023-11-15',
      fundName: 'SBI Focused Equity',
      type: 'Redemption',
      amount: 20000,
      category: 'Equity',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
    },
  ];

  const columns = [
    {
      header: 'Date',
      accessor: 'date',
      cell: (row) => format(new Date(row.date), 'dd MMM yyyy'),
    },
    {
      header: 'Fund Name',
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
      header: 'Category',
      accessor: 'category',
      cell: (row) => (
        <Badge variant={
          row.category === 'Equity' ? 'blue' :
          row.category === 'Debt' ? 'green' :
          row.category === 'Hybrid' ? 'purple' :
          row.category === 'ELSS' ? 'yellow' : 'gray'
        }>
          {row.category}
        </Badge>
      ),
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
      header: 'Payment Method',
      accessor: 'paymentMethod',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <Badge variant={
          row.status === 'Completed' ? 'success' :
          row.status === 'Processing' ? 'warning' :
          row.status === 'Failed' ? 'error' : 'default'
        }>
          {row.status}
        </Badge>
      ),
    },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = transactionType === 'all' || transaction.type === transactionType;
    const matchesCategory = category === 'all' || transaction.category === category;
    
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
        startDate = new Date(0);
    }
    
    const matchesDate = transactionDate >= startDate && transactionDate <= today;
    
    return matchesType && matchesCategory && matchesDate;
  });

  // Calculate summary statistics
  const totalPurchases = filteredTransactions
    .filter(t => t.type === 'Purchase' || t.type === 'SIP')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRedemptions = filteredTransactions
    .filter(t => t.type === 'Redemption')
    .reduce((sum, t) => sum + t.amount, 0);

  const netFlow = totalPurchases - totalRedemptions;

  // Category distribution
  const categoryDistribution = filteredTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'Purchase' || transaction.type === 'SIP') {
      const existing = acc.find(item => item.category === transaction.category);
      if (existing) {
        existing.amount += transaction.amount;
      } else {
        acc.push({ category: transaction.category, amount: transaction.amount });
      }
    }
    return acc;
  }, []);

  // Monthly trend
  const monthlyTrend = filteredTransactions.reduce((acc, transaction) => {
    const month = format(new Date(transaction.date), 'MMM yyyy');
    const existing = acc.find(item => item.month === month);
    
    if (existing) {
      if (transaction.type === 'Purchase' || transaction.type === 'SIP') {
        existing.inflow += transaction.amount;
      } else if (transaction.type === 'Redemption') {
        existing.outflow += transaction.amount;
      }
    } else {
      acc.push({
        month,
        inflow: transaction.type === 'Purchase' || transaction.type === 'SIP' ? transaction.amount : 0,
        outflow: transaction.type === 'Redemption' ? transaction.amount : 0,
      });
    }
    
    return acc;
  }, []).sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Report</h1>
          <p className="text-gray-600">Detailed analysis of your investment transactions</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download size={18} />}>
            Export Report
          </SecondaryButton>
          <PrimaryButton>Generate Custom Report</PrimaryButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{totalPurchases.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Total Inflow</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                ₹{totalRedemptions.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Total Outflow</p>
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

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredTransactions.length}
              </div>
              <p className="text-gray-600">Total Transactions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              icon={<Calendar size={18} />}
            />
            <SelectInput
              label="Transaction Type"
              value={transactionType}
              onChange={setTransactionType}
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
              label="Category"
              value={category}
              onChange={setCategory}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'Equity', label: 'Equity' },
                { value: 'Debt', label: 'Debt' },
                { value: 'Hybrid', label: 'Hybrid' },
                { value: 'ELSS', label: 'ELSS' },
              ]}
            />
            <div className="flex items-end">
              <PrimaryButton fullWidth>Apply Filters</PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Investment by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={categoryDistribution}
              height={300}
              showLegend={true}
            />
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cash Flow Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={monthlyTrend}
              xKey="month"
              yKeys={['inflow', 'outflow']}
              height={300}
              colors={['#10b981', '#ef4444']}
              legend={['Inflow', 'Outflow']}
            />
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredTransactions}
            pagination
            pageSize={10}
            searchable
            searchPlaceholder="Search transactions..."
          />
        </CardContent>
      </Card>

      {/* Payment Method Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">UPI</div>
              <p className="text-gray-600">Most Used Method</p>
              <p className="text-sm text-gray-500">45% of transactions</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">Auto Debit</div>
              <p className="text-gray-600">SIP Payments</p>
              <p className="text-sm text-gray-500">30% of transactions</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Bank Transfer</div>
              <p className="text-gray-600">Redemptions</p>
              <p className="text-sm text-gray-500">25% of transactions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp size={20} className="text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-green-800">Consistent Investing</p>
                  <p className="text-sm text-green-700">You've made regular investments for 6 consecutive months</p>
                </div>
              </div>
              <Badge variant="success">Good</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Calendar size={20} className="text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-blue-800">SIP Discipline</p>
                  <p className="text-sm text-blue-700">All your SIPs are deducted on time every month</p>
                </div>
              </div>
              <Badge variant="success">Excellent</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <TrendingDown size={20} className="text-yellow-500 mr-3" />
                <div>
                  <p className="font-medium text-yellow-800">High Redemptions</p>
                  <p className="text-sm text-yellow-700">Consider reviewing your redemption pattern</p>
                </div>
              </div>
              <Badge variant="warning">Review Needed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionReport;