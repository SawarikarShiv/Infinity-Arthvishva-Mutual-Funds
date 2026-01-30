import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { SelectInput } from '../../../components/common/Inputs';
import { Badge } from '../../../components/common/UI';
import { DataTable } from '../../../components/common/Table';
import { BarChart } from '../../../components/common/Charts';
import { Download, FileText, Calculator, Calendar } from 'lucide-react';

const TaxReport = () => {
  const [financialYear, setFinancialYear] = useState('2023-24');
  const [reportType, setReportType] = useState('capital-gains');

  const financialYears = [
    { value: '2023-24', label: 'FY 2023-24' },
    { value: '2022-23', label: 'FY 2022-23' },
    { value: '2021-22', label: 'FY 2021-22' },
    { value: '2020-21', label: 'FY 2020-21' },
  ];

  const reportTypes = [
    { value: 'capital-gains', label: 'Capital Gains' },
    { value: 'dividend', label: 'Dividend Income' },
    { value: 'elss', label: 'ELSS Investments' },
    { value: 'consolidated', label: 'Consolidated Report' },
  ];

  // Sample tax data
  const capitalGains = [
    {
      id: 1,
      fundName: 'ICICI Bluechip Fund',
      purchaseDate: '2022-01-15',
      saleDate: '2023-12-20',
      purchaseAmount: 100000,
      saleAmount: 125000,
      holdingPeriod: '1 year 11 months',
      gainType: 'Long Term',
      taxableAmount: 0,
      taxRate: '10%',
      taxAmount: 0,
    },
    {
      id: 2,
      fundName: 'SBI Focused Equity Fund',
      purchaseDate: '2023-06-10',
      saleDate: '2023-12-15',
      purchaseAmount: 50000,
      saleAmount: 45000,
      holdingPeriod: '6 months',
      gainType: 'Short Term',
      taxableAmount: -5000,
      taxRate: '15%',
      taxAmount: 0,
    },
    {
      id: 3,
      fundName: 'Axis Long Term Equity',
      purchaseDate: '2021-03-01',
      saleDate: '2023-11-30',
      purchaseAmount: 75000,
      saleAmount: 120000,
      holdingPeriod: '2 years 8 months',
      gainType: 'Long Term',
      taxableAmount: 45000,
      taxRate: '10%',
      taxAmount: 4500,
    },
  ];

  const dividendIncome = [
    {
      id: 1,
      fundName: 'HDFC Dividend Yield Fund',
      amount: 12500,
      date: '2023-12-15',
      taxDeducted: 1250,
    },
    {
      id: 2,
      fundName: 'ICICI Dividend Fund',
      amount: 8500,
      date: '2023-09-20',
      taxDeducted: 850,
    },
    {
      id: 3,
      fundName: 'SBI Dividend Fund',
      amount: 6200,
      date: '2023-06-15',
      taxDeducted: 620,
    },
  ];

  const elssInvestments = [
    {
      id: 1,
      fundName: 'Axis Long Term Equity Fund',
      amount: 150000,
      date: '2023-01-15',
      lockinEnd: '2026-01-15',
    },
    {
      id: 2,
      fundName: 'ICICI Prudential Long Term Equity',
      amount: 100000,
      date: '2023-02-20',
      lockinEnd: '2026-02-20',
    },
    {
      id: 3,
      fundName: 'SBI Long Term Equity Fund',
      amount: 50000,
      date: '2023-03-10',
      lockinEnd: '2026-03-10',
    },
  ];

  const columns = {
    'capital-gains': [
      {
        header: 'Fund Name',
        accessor: 'fundName',
      },
      {
        header: 'Holding Period',
        accessor: 'holdingPeriod',
      },
      {
        header: 'Gain Type',
        accessor: 'gainType',
        cell: (row) => (
          <Badge variant={row.gainType === 'Long Term' ? 'green' : 'red'}>
            {row.gainType}
          </Badge>
        ),
      },
      {
        header: 'Purchase Amount',
        accessor: 'purchaseAmount',
        cell: (row) => `₹${row.purchaseAmount.toLocaleString('en-IN')}`,
      },
      {
        header: 'Sale Amount',
        accessor: 'saleAmount',
        cell: (row) => `₹${row.saleAmount.toLocaleString('en-IN')}`,
      },
      {
        header: 'Taxable Amount',
        accessor: 'taxableAmount',
        cell: (row) => (
          <div className={`font-medium ${row.taxableAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{row.taxableAmount.toLocaleString('en-IN')}
          </div>
        ),
      },
      {
        header: 'Tax Amount',
        accessor: 'taxAmount',
        cell: (row) => `₹${row.taxAmount.toLocaleString('en-IN')}`,
      },
    ],
    'dividend': [
      {
        header: 'Fund Name',
        accessor: 'fundName',
      },
      {
        header: 'Dividend Amount',
        accessor: 'amount',
        cell: (row) => `₹${row.amount.toLocaleString('en-IN')}`,
      },
      {
        header: 'Payment Date',
        accessor: 'date',
      },
      {
        header: 'TDS Deducted',
        accessor: 'taxDeducted',
        cell: (row) => `₹${row.taxDeducted.toLocaleString('en-IN')}`,
      },
    ],
    'elss': [
      {
        header: 'Fund Name',
        accessor: 'fundName',
      },
      {
        header: 'Investment Amount',
        accessor: 'amount',
        cell: (row) => `₹${row.amount.toLocaleString('en-IN')}`,
      },
      {
        header: 'Investment Date',
        accessor: 'date',
      },
      {
        header: 'Lock-in End Date',
        accessor: 'lockinEnd',
      },
    ],
  };

  const currentData = reportType === 'capital-gains' ? capitalGains :
                     reportType === 'dividend' ? dividendIncome :
                     reportType === 'elss' ? elssInvestments : [];

  const totalCapitalGains = capitalGains.reduce((sum, item) => sum + item.taxableAmount, 0);
  const totalDividend = dividendIncome.reduce((sum, item) => sum + item.amount, 0);
  const totalELSS = elssInvestments.reduce((sum, item) => sum + item.amount, 0);
  const totalTaxLiability = capitalGains.reduce((sum, item) => sum + item.taxAmount, 0);

  const chartData = [
    { category: 'Long Term Gains', amount: 45000 },
    { category: 'Short Term Gains', amount: -5000 },
    { category: 'Dividend Income', amount: 27200 },
    { category: 'ELSS Investment', amount: 300000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tax Report</h1>
          <p className="text-gray-600">View and download your tax reports</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Download size={18} />}>
            Export Report
          </SecondaryButton>
          <PrimaryButton icon={<FileText size={18} />}>
            Generate ITR
          </PrimaryButton>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalCapitalGains >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{totalCapitalGains.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Capital Gains</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ₹{totalDividend.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Dividend Income</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ₹{totalELSS.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">ELSS Investment</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                ₹{totalTaxLiability.toLocaleString('en-IN')}
              </div>
              <p className="text-gray-600">Tax Liability</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SelectInput
              label="Financial Year"
              value={financialYear}
              onChange={setFinancialYear}
              options={financialYears}
              icon={<Calendar size={18} />}
            />
            <SelectInput
              label="Report Type"
              value={reportType}
              onChange={setReportType}
              options={reportTypes}
              icon={<FileText size={18} />}
            />
            <SelectInput
              label="Tax Regime"
              value="new"
              onChange={() => {}}
              options={[
                { value: 'new', label: 'New Tax Regime' },
                { value: 'old', label: 'Old Tax Regime' },
              ]}
              icon={<Calculator size={18} />}
            />
            <div className="flex items-end">
              <PrimaryButton fullWidth>Generate Report</PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            data={chartData}
            xKey="category"
            yKeys={['amount']}
            height={300}
            colors={['#3b82f6']}
          />
        </CardContent>
      </Card>

      {/* Detailed Report */}
      <Card>
        <CardHeader>
          <CardTitle>
            {reportType === 'capital-gains' && 'Capital Gains Report'}
            {reportType === 'dividend' && 'Dividend Income Report'}
            {reportType === 'elss' && 'ELSS Investments Report'}
            {reportType === 'consolidated' && 'Consolidated Tax Report'}
          </CardTitle>
          <CardDescription>
            Financial Year: {financialYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reportType === 'consolidated' ? (
            <div className="space-y-6">
              {/* Capital Gains Section */}
              <div>
                <h3 className="text-lg font-bold mb-4">Capital Gains</h3>
                <DataTable
                  columns={columns['capital-gains']}
                  data={capitalGains}
                  pagination={false}
                />
              </div>

              {/* Dividend Section */}
              <div>
                <h3 className="text-lg font-bold mb-4">Dividend Income</h3>
                <DataTable
                  columns={columns['dividend']}
                  data={dividendIncome}
                  pagination={false}
                />
              </div>

              {/* ELSS Section */}
              <div>
                <h3 className="text-lg font-bold mb-4">ELSS Investments</h3>
                <DataTable
                  columns={columns['elss']}
                  data={elssInvestments}
                  pagination={false}
                />
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns[reportType]}
              data={currentData}
              pagination
              pageSize={10}
              searchable
              searchPlaceholder="Search transactions..."
            />
          )}
        </CardContent>
      </Card>

      {/* Tax Planning Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Planning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Harvest Losses</h4>
              <p className="text-sm text-green-700">
                Offset capital gains with capital losses to reduce tax liability
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">ELSS Investment</h4>
              <p className="text-sm text-blue-700">
                Invest up to ₹1.5 lakh in ELSS funds for Section 80C deduction
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-bold text-purple-800 mb-2">Holding Period</h4>
              <p className="text-sm text-purple-700">
                Hold equity funds for over 1 year to qualify for lower LTCG tax
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Long Term Capital Gains (LTCG) on equity funds are taxed at 10% above ₹1 lakh exemption</li>
            <li>• Short Term Capital Gains (STCG) on equity funds are taxed at 15%</li>
            <li>• Dividend income is taxable as per your income tax slab</li>
            <li>• ELSS funds have a 3-year lock-in period</li>
            <li>• This report is for informational purposes. Consult a tax advisor for accurate filing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxReport;