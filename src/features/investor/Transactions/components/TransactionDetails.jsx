import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/common/Card';
import { Badge } from '../../../components/common/UI';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { Receipt, Download, Share2, Printer } from 'lucide-react';
import { format } from 'date-fns';

const TransactionDetails = ({ transactionId }) => {
  // Sample transaction data
  const transaction = {
    id: transactionId || 'TXN001234',
    date: '2024-01-15',
    time: '14:30:45',
    fundName: 'ICICI Prudential Bluechip Fund',
    fundHouse: 'ICICI Prudential Mutual Fund',
    type: 'Purchase',
    amount: 50000,
    units: 1092.45,
    nav: 45.78,
    navDate: '2024-01-15',
    status: 'Completed',
    paymentMethod: 'UPI',
    paymentId: 'UPI123456789',
    charges: {
      stampDuty: 0.005,
      stt: 0.001,
      gst: 0.18,
      totalCharges: 124.50,
    },
    bankDetails: {
      accountNumber: 'XXXXXX1234',
      bankName: 'HDFC Bank',
      ifsc: 'HDFC0000123',
    },
    transactionDetails: {
      orderId: 'ORD202401151430',
      referenceId: 'REF987654321',
      amcCode: 'ICICI',
      folioNumber: 'FOL123456789',
    },
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'green';
      case 'processing': return 'yellow';
      case 'failed': return 'red';
      case 'pending': return 'gray';
      default: return 'gray';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'purchase': return 'green';
      case 'redemption': return 'red';
      case 'sip': return 'blue';
      case 'switch': return 'purple';
      default: return 'gray';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In real app, this would download a PDF
    console.log('Downloading receipt...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Transaction Receipt - ${transaction.id}`,
        text: `Transaction details for ${transaction.fundName}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Details</h1>
          <p className="text-gray-600">Transaction ID: {transaction.id}</p>
        </div>
        <div className="flex space-x-3">
          <SecondaryButton icon={<Share2 size={18} />} onClick={handleShare}>
            Share
          </SecondaryButton>
          <SecondaryButton icon={<Download size={18} />} onClick={handleDownload}>
            Download
          </SecondaryButton>
          <SecondaryButton icon={<Printer size={18} />} onClick={handlePrint}>
            Print
          </SecondaryButton>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Transaction Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Receipt size={20} className="mr-2" />
                Transaction Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Transaction Date & Time</p>
                    <p className="font-medium">
                      {format(new Date(transaction.date), 'dd MMM yyyy')} at {transaction.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transaction Type</p>
                    <Badge variant={getTypeColor(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Fund Name</p>
                    <p className="font-medium">{transaction.fundName}</p>
                    <p className="text-sm text-gray-600">{transaction.fundHouse}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge variant={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Investment Amount</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Units Allotted</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {transaction.units.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">NAV</p>
                    <p className="font-medium">₹{transaction.nav.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">As of {format(new Date(transaction.navDate), 'dd MMM yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Charges</p>
                    <p className="font-medium text-red-600">
                      {formatCurrency(transaction.charges.totalCharges)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">{transaction.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Reference ID</p>
                    <p className="font-medium">{transaction.paymentId}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Bank Details</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Bank Name</p>
                        <p className="font-medium">{transaction.bankDetails.bankName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Account Number</p>
                        <p className="font-medium">{transaction.bankDetails.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">IFSC Code</p>
                        <p className="font-medium">{transaction.bankDetails.ifsc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Charges & Actions */}
        <div className="space-y-6">
          {/* Charges Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Charges Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stamp Duty</span>
                  <span className="font-medium">
                    {formatCurrency(transaction.amount * transaction.charges.stampDuty / 100)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Securities Transaction Tax (STT)</span>
                  <span className="font-medium">
                    {formatCurrency(transaction.amount * transaction.charges.stt / 100)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">GST</span>
                  <span className="font-medium">
                    {formatCurrency(transaction.amount * transaction.charges.gst / 100)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total Charges</span>
                    <span className="text-red-600">
                      {formatCurrency(transaction.charges.totalCharges)}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Net Amount Invested</span>
                    <span className="text-green-600">
                      {formatCurrency(transaction.amount - transaction.charges.totalCharges)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Reference Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-medium">{transaction.transactionDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reference ID</p>
                  <p className="font-medium">{transaction.transactionDetails.referenceId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">AMC Code</p>
                  <p className="font-medium">{transaction.transactionDetails.amcCode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Folio Number</p>
                  <p className="font-medium">{transaction.transactionDetails.folioNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SecondaryButton fullWidth>Download Statement</SecondaryButton>
                <SecondaryButton fullWidth>Raise Query</SecondaryButton>
                {transaction.type === 'Purchase' && (
                  <PrimaryButton fullWidth>Set up SIP</PrimaryButton>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium">Payment Initiated</p>
                <p className="text-sm text-gray-600">14:25:30 | UPI payment request sent</p>
              </div>
              <span className="text-sm text-gray-500">14:25</span>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium">Payment Confirmed</p>
                <p className="text-sm text-gray-600">14:28:15 | Payment received from bank</p>
              </div>
              <span className="text-sm text-gray-500">14:28</span>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium">Order Placed</p>
                <p className="text-sm text-gray-600">14:29:45 | Purchase order placed with AMC</p>
              </div>
              <span className="text-sm text-gray-500">14:29</span>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium">Units Allotted</p>
                <p className="text-sm text-gray-600">14:30:45 | Units credited to your folio</p>
              </div>
              <span className="text-sm text-gray-500">14:30</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card>
        <CardHeader>
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              • This is an electronic receipt. No physical receipt will be dispatched.
            </p>
            <p className="text-gray-600">
              • The NAV applicable is the NAV of the business day on which the funds are received.
            </p>
            <p className="text-gray-600">
              • Please retain this receipt for your records and future references.
            </p>
            <p className="text-gray-600">
              • For any discrepancies, please contact our customer support within 7 working days.
            </p>
            <p className="text-gray-600">
              • This transaction is subject to the terms and conditions of the fund house.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionDetails;