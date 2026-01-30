import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InvestorLayout from '@components/layouts/InvestorLayout';
import {
  PortfolioOverview,
  RecentInvestments,
  PerformanceMetrics,
  QuickActions,
  Watchlist
} from '@features/investor/Dashboard';
import {
  fetchDashboardData,
  selectDashboardLoading,
  selectDashboardError,
  selectPortfolioData,
  selectRecentInvestments,
  selectPerformanceMetrics,
  selectWatchlist
} from '@features/investor/Dashboard/dashboardSlice';
import Loader from '@components/common/Loader/Spinner';
import SkeletonLoader from '@components/common/Loader/SkeletonLoader';
import { useAuth } from '@features/auth/hooks/useAuth';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isLoading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);
  const portfolioData = useSelector(selectPortfolioData);
  const recentInvestments = useSelector(selectRecentInvestments);
  const performanceMetrics = useSelector(selectPerformanceMetrics);
  const watchlist = useSelector(selectWatchlist);

  useEffect(() => {
    dispatch(fetchDashboardData({ filter: 'all', timeRange: '1m' }));
  }, [dispatch]);

  if (isLoading && !portfolioData) {
    return (
      <InvestorLayout>
        <div className="p-6">
          <SkeletonLoader count={5} />
        </div>
      </InvestorLayout>
    );
  }

  if (error) {
    return (
      <InvestorLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-500 text-3xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Dashboard</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchDashboardData({ filter: 'all', timeRange: '1m' }))}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </InvestorLayout>
    );
  }

  const mockData = {
    portfolioData: portfolioData || {
      totalInvestment: 1250000,
      currentValue: 1450000,
      todayChange: 12500,
      xirr: 18.5,
      growthData: Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        value: 1300000 + Math.random() * 200000
      }))
    },
    recentInvestments: recentInvestments.length > 0 ? recentInvestments : [
      {
        id: 'INV001',
        fundName: 'SBI Bluechip Fund',
        fundHouse: 'SBI Mutual Fund',
        type: 'SIP',
        amount: 10000,
        units: 45.678,
        date: new Date().toISOString(),
        time: '10:30 AM',
        status: 'Completed',
        nav: 125.45
      },
      {
        id: 'INV002',
        fundName: 'HDFC Balanced Advantage',
        fundHouse: 'HDFC Mutual Fund',
        type: 'Lumpsum',
        amount: 50000,
        units: 213.456,
        date: new Date(Date.now() - 86400000).toISOString(),
        time: '11:15 AM',
        status: 'Completed',
        nav: 234.12
      }
    ],
    performanceMetrics: performanceMetrics || {
      assetAllocation: [
        { name: 'Equity', percentage: 65, color: '#3b82f6' },
        { name: 'Debt', percentage: 25, color: '#10b981' },
        { name: 'Gold', percentage: 5, color: '#f59e0b' },
        { name: 'Cash', percentage: 5, color: '#8b5cf6' }
      ],
      categoryAllocation: [
        { name: 'Large Cap', value: 40 },
        { name: 'Mid Cap', value: 20 },
        { name: 'Small Cap', value: 5 },
        { name: 'Debt', value: 25 },
        { name: 'Others', value: 10 }
      ],
      riskMetrics: {
        overall: 'Moderate',
        low: 25,
        moderate: 60,
        high: 15
      }
    },
    watchlist: watchlist.length > 0 ? watchlist : [
      {
        id: 'F001',
        name: 'SBI Bluechip Fund',
        fundHouse: 'SBI Mutual Fund',
        nav: 125.45,
        change: 1.25,
        risk: 'Medium',
        category: 'Equity'
      },
      {
        id: 'F002',
        name: 'HDFC Balanced Advantage',
        fundHouse: 'HDFC Mutual Fund',
        nav: 234.12,
        change: -0.45,
        risk: 'Low',
        category: 'Hybrid'
      }
    ]
  };

  return (
    <InvestorLayout>
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-b-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {user?.firstName || 'Investor'}!
            </h1>
            <p className="text-blue-100">
              Here's your investment dashboard for {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-sm text-blue-200">Last updated: Just now</div>
            <button
              onClick={() => dispatch(fetchDashboardData({ filter: 'all', timeRange: '1m' }))}
              disabled={isLoading}
              className="mt-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader size="sm" className="mr-2" />
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Data
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Portfolio Overview */}
        <PortfolioOverview portfolioData={mockData.portfolioData} />
        
        {/* Quick Actions */}
        <QuickActions />
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Investments */}
          <RecentInvestments investments={mockData.recentInvestments} />
          
          {/* Watchlist */}
          <Watchlist watchlist={mockData.watchlist} />
        </div>
        
        {/* Performance Metrics */}
        <PerformanceMetrics metrics={mockData.performanceMetrics} />
      </div>
    </InvestorLayout>
  );
};

export default DashboardPage;
EOF
