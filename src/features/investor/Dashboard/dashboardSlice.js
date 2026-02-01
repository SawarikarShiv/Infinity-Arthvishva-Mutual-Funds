import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatCurrency, formatPercentage } from '../../../utils/helpers/numberFormatter';
import { calculateReturns, calculateAssetAllocation } from '../../../utils/helpers/portfolioCalculations';

// Mock data for development
const MOCK_DASHBOARD_DATA = {
  portfolioOverview: {
    totalValue: 1250000,
    totalInvested: 1000000,
    totalReturns: 250000,
    todayGain: 12500,
    annualReturns: 15.8,
    monthlyReturns: 1.2,
    xirr: 14.5,
    riskScore: 6.2,
    goalProgress: 65
  },
  assetAllocation: [
    { category: 'Equity', value: 750000, percentage: 60, color: '#3B82F6' },
    { category: 'Debt', value: 350000, percentage: 28, color: '#10B981' },
    { category: 'Hybrid', value: 100000, percentage: 8, color: '#F59E0B' },
    { category: 'Cash', value: 50000, percentage: 4, color: '#6B7280' }
  ],
  recentInvestments: [
    { id: 1, fundName: 'HDFC Equity Fund', type: 'SIP', amount: 5000, date: '2024-01-15', status: 'Completed', returns: 12.5 },
    { id: 2, fundName: 'ICICI Prudential Bluechip', type: 'Lumpsum', amount: 25000, date: '2024-01-10', status: 'Completed', returns: 8.2 },
    { id: 3, fundName: 'SBI Focused Equity', type: 'SIP', amount: 7000, date: '2024-01-05', status: 'Processing', returns: null },
    { id: 4, fundName: 'Kotak Emerging Equity', type: 'SIP', amount: 3000, date: '2024-01-01', status: 'Completed', returns: 15.3 }
  ],
  watchlist: [
    { id: 1, fundName: 'Axis Bluechip Fund', category: 'Large Cap', nav: 45.23, change: 1.23, risk: 'Moderate' },
    { id: 2, fundName: 'Mirae Asset Tax Saver', category: 'ELSS', nav: 78.45, change: -0.45, risk: 'High' },
    { id: 3, fundName: 'Aditya Birla Savings', category: 'Debt', nav: 12.34, change: 0.12, risk: 'Low' },
    { id: 4, fundName: 'Nippon Small Cap', category: 'Small Cap', nav: 156.78, change: 2.34, risk: 'Very High' }
  ],
  performanceMetrics: {
    month: 1.2,
    quarter: 4.5,
    halfYear: 9.2,
    year: 15.8,
    threeYear: 45.2,
    fiveYear: 78.5
  },
  quickActions: [
    { id: 1, title: 'Start SIP', icon: '💸', path: '/investor/transactions/new-sip' },
    { id: 2, title: 'Invest Lumpsum', icon: '💰', path: '/investor/funds/explore' },
    { id: 3, title: 'Set Goal', icon: '🎯', path: '/investor/goals/new' },
    { id: 4, title: 'Generate Report', icon: '📊', path: '/investor/reports/tax' }
  ],
  alerts: [
    { id: 1, type: 'warning', message: 'SIP date approaching for HDFC Equity Fund', date: '2024-01-25' },
    { id: 2, type: 'info', message: 'New NFO launched: ABC Growth Fund', date: '2024-01-24' },
    { id: 3, type: 'success', message: 'Goal "Child Education" reached 75% completion', date: '2024-01-23' }
  ]
};

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'investorDashboard/fetchDashboardData',
  async ({ timeRange = '1y', forceRefresh = false }, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would be an API call:
      // const response = await investorService.getDashboardData(timeRange);
      // return response.data;
      
      // For now, return mock data with some randomization for realism
      const mockData = { ...MOCK_DASHBOARD_DATA };
      
      // Add some realistic variation based on timeRange
      const variation = {
        '1m': { min: -5, max: 5 },
        '3m': { min: -8, max: 10 },
        '6m': { min: -10, max: 15 },
        '1y': { min: -15, max: 25 },
        '3y': { min: -20, max: 40 },
        '5y': { min: -25, max: 60 }
      }[timeRange] || { min: -5, max: 5 };
      
      const randomChange = (Math.random() * (variation.max - variation.min) + variation.min) / 100;
      mockData.portfolioOverview.totalValue *= (1 + randomChange);
      mockData.portfolioOverview.totalReturns = mockData.portfolioOverview.totalValue - mockData.portfolioOverview.totalInvested;
      
      return {
        ...mockData,
        timeRange,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchPortfolioOverview = createAsyncThunk(
  'investorDashboard/fetchPortfolioOverview',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_DASHBOARD_DATA.portfolioOverview;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch portfolio overview');
    }
  }
);

export const fetchAssetAllocation = createAsyncThunk(
  'investorDashboard/fetchAssetAllocation',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      return MOCK_DASHBOARD_DATA.assetAllocation;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch asset allocation');
    }
  }
);

export const fetchRecentInvestments = createAsyncThunk(
  'investorDashboard/fetchRecentInvestments',
  async (limit = 5, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_DASHBOARD_DATA.recentInvestments.slice(0, limit);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch recent investments');
    }
  }
);

export const fetchWatchlist = createAsyncThunk(
  'investorDashboard/fetchWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      return MOCK_DASHBOARD_DATA.watchlist;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch watchlist');
    }
  }
);

export const fetchPerformanceMetrics = createAsyncThunk(
  'investorDashboard/fetchPerformanceMetrics',
  async (timeRange, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      return MOCK_DASHBOARD_DATA.performanceMetrics;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch performance metrics');
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  'investorDashboard/addToWatchlist',
  async (fundData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return {
        ...fundData,
        id: Date.now(),
        addedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add to watchlist');
    }
  }
);

export const removeFromWatchlist = createAsyncThunk(
  'investorDashboard/removeFromWatchlist',
  async (fundId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return fundId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove from watchlist');
    }
  }
);

const initialState = {
  // Data
  portfolioOverview: null,
  assetAllocation: [],
  recentInvestments: [],
  watchlist: [],
  performanceMetrics: null,
  quickActions: [],
  alerts: [],
  
  // UI State
  isLoading: {
    dashboard: false,
    portfolio: false,
    investments: false,
    watchlist: false,
    performance: false
  },
  error: null,
  
  // Metadata
  timeRange: '1y',
  lastUpdated: null,
  isRefreshing: false
};

const investorDashboardSlice = createSlice({
  name: 'investorDashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.portfolioOverview = null;
      state.assetAllocation = [];
      state.recentInvestments = [];
      state.watchlist = [];
      state.performanceMetrics = null;
      state.alerts = [];
      state.error = null;
    },
    
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
    
    updatePortfolioValue: (state, action) => {
      if (state.portfolioOverview) {
        const { amount, type } = action.payload;
        if (type === 'add') {
          state.portfolioOverview.totalValue += amount;
          state.portfolioOverview.totalInvested += amount;
        } else if (type === 'withdraw') {
          state.portfolioOverview.totalValue -= amount;
        }
        state.portfolioOverview.totalReturns = 
          state.portfolioOverview.totalValue - state.portfolioOverview.totalInvested;
      }
    },
    
    markAlertAsRead: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    
    clearAllAlerts: (state) => {
      state.alerts = [];
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    setRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Data
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading.dashboard = true;
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading.dashboard = false;
        state.isRefreshing = false;
        state.portfolioOverview = action.payload.portfolioOverview;
        state.assetAllocation = action.payload.assetAllocation;
        state.recentInvestments = action.payload.recentInvestments;
        state.watchlist = action.payload.watchlist;
        state.performanceMetrics = action.payload.performanceMetrics;
        state.quickActions = action.payload.quickActions;
        state.alerts = action.payload.alerts;
        state.timeRange = action.payload.timeRange;
        state.lastUpdated = action.payload.fetchedAt;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading.dashboard = false;
        state.isRefreshing = false;
        state.error = action.payload;
      })
      
      // Fetch Portfolio Overview
      .addCase(fetchPortfolioOverview.pending, (state) => {
        state.isLoading.portfolio = true;
      })
      .addCase(fetchPortfolioOverview.fulfilled, (state, action) => {
        state.isLoading.portfolio = false;
        state.portfolioOverview = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchPortfolioOverview.rejected, (state, action) => {
        state.isLoading.portfolio = false;
        state.error = action.payload;
      })
      
      // Fetch Asset Allocation
      .addCase(fetchAssetAllocation.pending, (state) => {
        state.isLoading.portfolio = true;
      })
      .addCase(fetchAssetAllocation.fulfilled, (state, action) => {
        state.isLoading.portfolio = false;
        state.assetAllocation = action.payload;
      })
      .addCase(fetchAssetAllocation.rejected, (state, action) => {
        state.isLoading.portfolio = false;
        state.error = action.payload;
      })
      
      // Fetch Recent Investments
      .addCase(fetchRecentInvestments.pending, (state) => {
        state.isLoading.investments = true;
      })
      .addCase(fetchRecentInvestments.fulfilled, (state, action) => {
        state.isLoading.investments = false;
        state.recentInvestments = action.payload;
      })
      .addCase(fetchRecentInvestments.rejected, (state, action) => {
        state.isLoading.investments = false;
        state.error = action.payload;
      })
      
      // Fetch Watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.isLoading.watchlist = true;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.isLoading.watchlist = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.isLoading.watchlist = false;
        state.error = action.payload;
      })
      
      // Fetch Performance Metrics
      .addCase(fetchPerformanceMetrics.pending, (state) => {
        state.isLoading.performance = true;
      })
      .addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
        state.isLoading.performance = false;
        state.performanceMetrics = action.payload;
      })
      .addCase(fetchPerformanceMetrics.rejected, (state, action) => {
        state.isLoading.performance = false;
        state.error = action.payload;
      })
      
      // Add to Watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.isLoading.watchlist = true;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.isLoading.watchlist = false;
        if (!state.watchlist.some(item => item.id === action.payload.id)) {
          state.watchlist.unshift(action.payload);
        }
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.isLoading.watchlist = false;
        state.error = action.payload;
      })
      
      // Remove from Watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.isLoading.watchlist = true;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.isLoading.watchlist = false;
        state.watchlist = state.watchlist.filter(item => item.id !== action.payload);
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.isLoading.watchlist = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectPortfolioOverview = (state) => state.investorDashboard.portfolioOverview;
export const selectAssetAllocation = (state) => state.investorDashboard.assetAllocation;
export const selectRecentInvestments = (state) => state.investorDashboard.recentInvestments;
export const selectWatchlist = (state) => state.investorDashboard.watchlist;
export const selectPerformanceMetrics = (state) => state.investorDashboard.performanceMetrics;
export const selectQuickActions = (state) => state.investorDashboard.quickActions;
export const selectAlerts = (state) => state.investorDashboard.alerts;
export const selectDashboardLoading = (state) => state.investorDashboard.isLoading;
export const selectDashboardError = (state) => state.investorDashboard.error;
export const selectLastUpdated = (state) => state.investorDashboard.lastUpdated;
export const selectTimeRange = (state) => state.investorDashboard.timeRange;
export const selectIsRefreshing = (state) => state.investorDashboard.isRefreshing;

// Helper selectors
export const selectTotalPortfolioValue = (state) => 
  state.investorDashboard.portfolioOverview?.totalValue || 0;

export const selectTotalReturns = (state) => 
  state.investorDashboard.portfolioOverview?.totalReturns || 0;

export const selectReturnsPercentage = (state) => {
  const portfolio = state.investorDashboard.portfolioOverview;
  if (!portfolio) return 0;
  return (portfolio.totalReturns / portfolio.totalInvested) * 100;
};

export const selectFormattedPortfolioData = (state) => {
  const portfolio = state.investorDashboard.portfolioOverview;
  if (!portfolio) return null;
  
  return {
    totalValue: formatCurrency(portfolio.totalValue),
    totalInvested: formatCurrency(portfolio.totalInvested),
    totalReturns: formatCurrency(portfolio.totalReturns),
    todayGain: formatCurrency(portfolio.todayGain),
    annualReturns: formatPercentage(portfolio.annualReturns),
    monthlyReturns: formatPercentage(portfolio.monthlyReturns),
    xirr: formatPercentage(portfolio.xirr),
    riskScore: portfolio.riskScore?.toFixed(1) || '0.0',
    goalProgress: portfolio.goalProgress
  };
};

// Actions
export const { 
  clearDashboardData, 
  setTimeRange, 
  updatePortfolioValue,
  markAlertAsRead,
  clearAllAlerts,
  clearError,
  setRefreshing
} = investorDashboardSlice.actions;

// Reducer
export default investorDashboardSlice.reducer;