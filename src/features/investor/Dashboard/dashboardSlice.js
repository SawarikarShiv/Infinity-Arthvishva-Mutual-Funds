import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import investorService from '../../services/investorService';

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'investorDashboard/fetchDashboardData',
  async ({ filter = 'all', timeRange = '1m' }, { rejectWithValue }) => {
    try {
      const data = await investorService.getDashboardData(filter, timeRange);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPortfolioOverview = createAsyncThunk(
  'investorDashboard/fetchPortfolioOverview',
  async (_, { rejectWithValue }) => {
    try {
      const data = await investorService.getPortfolioOverview();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecentInvestments = createAsyncThunk(
  'investorDashboard/fetchRecentInvestments',
  async (limit = 10, { rejectWithValue }) => {
    try {
      const data = await investorService.getRecentInvestments(limit);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPerformanceMetrics = createAsyncThunk(
  'investorDashboard/fetchPerformanceMetrics',
  async (_, { rejectWithValue }) => {
    try {
      const data = await investorService.getPerformanceMetrics();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWatchlist = createAsyncThunk(
  'investorDashboard/fetchWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      const data = await investorService.getWatchlist();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  portfolioData: null,
  recentInvestments: [],
  performanceMetrics: {},
  watchlist: [],
  isLoading: false,
  error: null,
  lastUpdated: null
};

const investorDashboardSlice = createSlice({
  name: 'investorDashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    updatePortfolioData: (state, action) => {
      state.portfolioData = { ...state.portfolioData, ...action.payload };
    },
    setLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Data
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolioData = action.payload.portfolioData || state.portfolioData;
        state.recentInvestments = action.payload.recentInvestments || state.recentInvestments;
        state.performanceMetrics = action.payload.performanceMetrics || state.performanceMetrics;
        state.watchlist = action.payload.watchlist || state.watchlist;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Portfolio Overview
      .addCase(fetchPortfolioOverview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPortfolioOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolioData = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchPortfolioOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Recent Investments
      .addCase(fetchRecentInvestments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecentInvestments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentInvestments = action.payload;
      })
      .addCase(fetchRecentInvestments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Performance Metrics
      .addCase(fetchPerformanceMetrics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPerformanceMetrics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.performanceMetrics = action.payload;
      })
      .addCase(fetchPerformanceMetrics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectPortfolioData = (state) => state.investorDashboard.portfolioData;
export const selectRecentInvestments = (state) => state.investorDashboard.recentInvestments;
export const selectPerformanceMetrics = (state) => state.investorDashboard.performanceMetrics;
export const selectWatchlist = (state) => state.investorDashboard.watchlist;
export const selectDashboardLoading = (state) => state.investorDashboard.isLoading;
export const selectDashboardError = (state) => state.investorDashboard.error;
export const selectLastUpdated = (state) => state.investorDashboard.lastUpdated;

// Actions
export const { 
  clearError, 
  updateWatchlist, 
  updatePortfolioData,
  setLastUpdated 
} = investorDashboardSlice.actions;

// Reducer
export default investorDashboardSlice.reducer;
EOF
