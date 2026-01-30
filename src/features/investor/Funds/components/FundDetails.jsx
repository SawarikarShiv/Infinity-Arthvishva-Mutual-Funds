import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../../components/common/Card';
import { Badge } from '../../../components/common/UI';
import { PrimaryButton, SecondaryButton } from '../../../components/common/Button';
import { LineChart, BarChart } from '../../../components/common/Charts';
import { Tabs } from '../../../components/common/Navigation';
import { TrendingUp, TrendingDown, Star, Download, Share2, Heart } from 'lucide-react';

const FundDetails = ({ fundId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample fund data
  const fund = {
    id: fundId || 1,
    name: 'ICICI Prudential Bluechip Fund',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Equity - Large Cap',
    subCategory: 'Large Cap Fund',
    riskLevel: 'High',
    rating: 4.5,
    nav: 45.67,
    navDate: '2024-01-22',
    aum: 45200, // in crores
    expenseRatio: 0.85,
    minInvestment: 500,
    minSIP: 100,
    exitLoad: '1% if redeemed within 1 year',
    benchmark: 'Nifty 50 TRI',
    returns: {
      oneDay: 0.45,
      oneWeek: 1.23,
      oneMonth: 2.56,
      threeMonths: 5.34,
      sixMonths: 8.92,
      oneYear: 18.5,
      threeYear: 15.2,
      fiveYear: 12.8,
      sinceInception: 14.3,
    },
    performance: [
      { period: '1M', fund: 2.56, benchmark: 2.12 },
      { period: '3M', fund: 5.34, benchmark: 4.56 },
      { period: '6M', fund: 8.92, benchmark: 7.45 },
      { period: '1Y', fund: 18.5, benchmark: 16.23 },
      { period: '3Y', fund: 15.2, benchmark: 14.12 },
      { period: '5Y', fund: 12.8, benchmark: 11.45 },
    ],
    historicalData: [
      { date: 'Jan 2023', nav: 38.45 },
      { date: 'Feb 2023', nav: 39.12 },
      { date: 'Mar 2023', nav: 40.23 },
      { date: 'Apr 2023', nav: 41.56 },
      { date: 'May 2023', nav: 42.34 },
      { date: 'Jun 2023', nav: 43.12 },
      { date: 'Jul 2023', nav: 43.89 },
      { date: 'Aug 2023', nav: 44.23 },
      { date: 'Sep 2023', nav: 43.56 },
      { date: 'Oct 2023', nav: 44.89 },
      { date: 'Nov 2023', nav: 45.12 },
      { date: 'Dec 2023', nav: 45.67 },
    ],
    holdings: [
      { stock: 'Reliance Industries', sector: 'Energy', weight: 8.5 },
      { stock: 'HDFC Bank', sector: 'Banking', weight: 7.8 },
      { stock: 'Infosys', sector: 'IT', weight: 6.9 },
      { stock: 'TCS', sector: 'IT', weight: 6.2 },
      { stock: 'ICICI Bank', sector: 'Banking', weight: 5.8 },
      { stock: 'Larsen & Toubro', sector: 'Infrastructure', weight: 4.7 },
      { stock: 'Bharti Airtel', sector: 'Telecom', weight: 4.3 },
      { stock: 'Others', sector: 'Various', weight: 45.8 },
    ],
    sectorAllocation: [
      { sector: 'Financial Services', weight: 25.4 },
      { sector: 'Information Technology', weight: 18.3 },
      { sector: 'Energy', weight: 12.6 },
      { sector: 'Consumer Goods', weight: 9.8 },
      { sector: 'Healthcare', weight: 8.2 },
      { sector: 'Automobile', weight: 6.5 },
      { sector: 'Others', weight: 19.2 },
    ],
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'documents', label: 'Documents' },
    { id: 'analysis', label: 'Analysis' },
  ];

  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  ICICI Prudential Bluechip Fund is an open-ended equity scheme predominantly investing 
                  in large cap stocks. The fund aims to generate long-term capital appreciation by 
                  investing in companies having strong growth potential.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-600">Fund Manager</p>
                    <p className="font-medium">Mr. Sankaran Naren</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Launch Date</p>
                    <p className="font-medium">May 23, 2008</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fund Size</p>
                    <p className="font-medium">₹45,200 Cr</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Returns Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={fund.historicalData}
                  xKey="date"
                  yKeys={['nav']}
                  height={300}
                  colors={['#3b82f6']}
                  showGrid={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance vs Benchmark</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={fund.performance}
                  xKey="period"
                  yKeys={['fund', 'benchmark']}
                  height={300}
                  colors={['#10b981', '#94a3b8']}
                  legend={['Fund Returns', 'Benchmark Returns']}
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fund.holdings.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{holding.stock}</p>
                        <p className="text-sm text-gray-600">{holding.sector}</p>
                      </div>
                      <div className="w-48">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${holding.weight}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 font-medium">{holding.weight}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={fund.sectorAllocation}
                  xKey="sector"
                  yKeys={['weight']}
                  height={300}
                  colors={['#8b5cf6']}
                  horizontal
                />
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Fund Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{fund.name}</h1>
                  <p className="text-gray-600">{fund.fundHouse}</p>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Heart size={24} fill={isFavorite ? '#ef4444' : 'none'} />
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge variant="blue">{fund.category}</Badge>
                <Badge variant="red">{fund.riskLevel} Risk</Badge>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{fund.rating}/5</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <SecondaryButton icon={<Download size={18} />}>
                Factsheet
              </SecondaryButton>
              <SecondaryButton icon={<Share2 size={18} />}>
                Share
              </SecondaryButton>
              <PrimaryButton>Invest Now</PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">₹{fund.nav}</div>
            <p className="text-gray-600 text-sm">Current NAV</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className={`text-2xl font-bold ${fund.returns.oneYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear}%
            </div>
            <p className="text-gray-600 text-sm">1 Year Return</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{fund.expenseRatio}%</div>
            <p className="text-gray-600 text-sm">Expense Ratio</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">₹{fund.aum} Cr</div>
            <p className="text-gray-600 text-sm">AUM</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">₹{fund.minInvestment}</div>
            <p className="text-gray-600 text-sm">Min. Investment</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{fund.exitLoad}</div>
            <p className="text-gray-600 text-sm">Exit Load</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {renderTabContent()}

      {/* Investment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Options</CardTitle>
          <CardDescription>Choose how you want to invest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-bold text-lg mb-2">Lump Sum</h3>
              <p className="text-gray-600 mb-4">One-time investment</p>
              <PrimaryButton fullWidth>Invest Now</PrimaryButton>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-bold text-lg mb-2">SIP</h3>
              <p className="text-gray-600 mb-4">Systematic Investment Plan</p>
              <p className="text-sm text-gray-500 mb-4">Min. SIP: ₹{fund.minSIP}</p>
              <PrimaryButton fullWidth>Start SIP</PrimaryButton>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-bold text-lg mb-2">SWP</h3>
              <p className="text-gray-600 mb-4">Systematic Withdrawal Plan</p>
              <PrimaryButton fullWidth>Start SWP</PrimaryButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundDetails;