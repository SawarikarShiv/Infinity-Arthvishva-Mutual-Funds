import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { Badge } from '../../../components/common/UI';
import { DataTable } from '../../../components/common/Table';
import { TextInput, SelectInput } from '../../../components/common/Inputs';
import { Plus, PauseCircle, PlayCircle, Edit, Trash2, Calendar, TrendingUp } from 'lucide-react';

const SIPManagement = () => {
  const [showForm, setShowForm] = useState(false);

  const sips = [
    {
      id: 1,
      fundName: 'ICICI Bluechip Fund',
      amount: 10000,
      frequency: 'Monthly',
      startDate: '2023-01-15',
      nextDate: '2024-02-15',
      status: 'Active',
      installments: 13,
      totalInvested: 130000,
      category: 'Equity',
    },
    {
      id: 2,
      fundName: 'SBI Debt Fund',
      amount: 5000,
      frequency: 'Monthly',
      startDate: '2023-03-01',
      nextDate: '2024-02-01',
      status: 'Active',
      installments: 11,
      totalInvested: 55000,
      category: 'Debt',
    },
    {
      id: 3,
      fundName: 'HDFC Hybrid Fund',
      amount: 15000,
      frequency: 'Monthly',
      startDate: '2023-06-15',
      nextDate: '2024-02-15',
      status: 'Paused',
      installments: 8,
      totalInvested: 120000,
      category: 'Hybrid',
    },
    {
      id: 4,
      fundName: 'Axis Long Term Equity',
      amount: 20000,
      frequency: 'Monthly',
      startDate: '2023-09-01',
      nextDate: '2024-02-01',
      status: 'Active',
      installments: 5,
      totalInvested: 100000,
      category: 'ELSS',
    },
    {
      id: 5,
      fundName: 'Nippon Small Cap',
      amount: 8000,
      frequency: 'Monthly',
      startDate: '2023-11-15',
      nextDate: '2024-02-15',
      status: 'Active',
      installments: 3,
      totalInvested: 24000,
      category: 'Equity',
    },
  ];

  const columns = [
    {
      header: 'Fund Name',
      accessor: 'fundName',
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (row) => `₹${row.amount.toLocaleString('en-IN')}`,
    },
    {
      header: 'Frequency',
      accessor: 'frequency',
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
      header: 'Next Date',
      accessor: 'nextDate',
    },
    {
      header: 'Total Invested',
      accessor: 'totalInvested',
      cell: (row) => `₹${row.totalInvested.toLocaleString('en-IN')}`,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (row) => (
        <div className="flex space-x-2">
          {row.status === 'Active' ? (
            <SecondaryButton size="sm" icon={<PauseCircle size={14} />}>
              Pause
            </SecondaryButton>
          ) : (
            <SecondaryButton size="sm" icon={<PlayCircle size={14} />}>
              Resume
            </SecondaryButton>
          )}
          <SecondaryButton size="sm" icon={<Edit size={14} />}>
            Edit
          </SecondaryButton>
          <SecondaryButton size="sm" icon={<Trash2 size={14} />} variant="error">
            Stop
          </SecondaryButton>
        </div>
      ),
    },
  ];

  const totalMonthlySIP = sips
    .filter(sip => sip.status === 'Active')
    .reduce((sum, sip) => sum + sip.amount, 0);

  const totalInvested = sips.reduce((sum, sip) => sum + sip.totalInvested, 0);
  const activeSIPs = sips.filter(sip => sip.status === 'Active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SIP Management</h1>
          <p className="text-gray-600">Manage your Systematic Investment Plans</p>
        </div>
        <PrimaryButton icon={<Plus size={18} />} onClick={() => setShowForm(true)}>
          Start New SIP
        </PrimaryButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{totalMonthlySIP.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Monthly SIP Amount</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {activeSIPs}
              </div>
              <p className="text-gray-600">Active SIPs</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ₹{totalInvested.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Total Invested via SIP</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {sips.length}
              </div>
              <p className="text-gray-600">Total SIPs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SIP List */}
      <Card>
        <CardHeader>
          <CardTitle>Your SIPs ({sips.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={sips}
            pagination
            pageSize={10}
            searchable
            searchPlaceholder="Search SIPs..."
          />
        </CardContent>
      </Card>

      {/* SIP Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar size={20} className="mr-2" />
            Upcoming SIP Deductions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sips
              .filter(sip => sip.status === 'Active')
              .map((sip) => (
                <div key={sip.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{sip.fundName}</h4>
                      <p className="text-sm text-gray-600">
                        Next deduction: {new Date(sip.nextDate).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">₹{sip.amount.toLocaleString('en-IN')}</div>
                    <p className="text-sm text-gray-600">{sip.frequency}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* SIP Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits of SIP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <h4 className="font-medium mb-2">Rupee Cost Averaging</h4>
              <p className="text-sm text-gray-600">Buy more units when prices are low</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl mb-2">💪</div>
              <h4 className="font-medium mb-2">Financial Discipline</h4>
              <p className="text-sm text-gray-600">Regular investing builds wealth</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-medium mb-2">Power of Compounding</h4>
              <p className="text-sm text-gray-600">Small amounts grow significantly over time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New SIP Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Start New SIP</CardTitle>
              <CardDescription>
                Set up a new Systematic Investment Plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="Select Fund"
                    value=""
                    onChange={() => {}}
                    options={[
                      { value: 'icici', label: 'ICICI Bluechip Fund' },
                      { value: 'sbi', label: 'SBI Focused Equity Fund' },
                      { value: 'hdfc', label: 'HDFC Hybrid Fund' },
                    ]}
                    required
                  />
                  
                  <TextInput
                    label="SIP Amount (₹)"
                    type="number"
                    value=""
                    onChange={() => {}}
                    min="100"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="Frequency"
                    value="monthly"
                    onChange={() => {}}
                    options={[
                      { value: 'daily', label: 'Daily' },
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'quarterly', label: 'Quarterly' },
                    ]}
                    required
                  />
                  
                  <TextInput
                    label="Start Date"
                    type="date"
                    value=""
                    onChange={() => {}}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="Payment Method"
                    value="auto-debit"
                    onChange={() => {}}
                    options={[
                      { value: 'auto-debit', label: 'Auto Debit from Bank' },
                      { value: 'manual', label: 'Manual Payment' },
                    ]}
                    required
                  />
                  
                  <TextInput
                    label="Duration (Months)"
                    type="number"
                    value=""
                    onChange={() => {}}
                    min="1"
                    placeholder="Leave empty for indefinite"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <SecondaryButton type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton type="submit">
                    Start SIP
                  </PrimaryButton>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SIPManagement;