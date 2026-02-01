import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Define the Async Thunks (Missing Exports)
export const fetchDashboardData = createAsyncThunk('dashboard/fetchAll', async () => {
  // Your API logic here
});

export const fetchPortfolioOverview = createAsyncThunk('dashboard/fetchOverview', async () => {
  // Your API logic here
});

export const fetchRecentInvestments = createAsyncThunk('dashboard/fetchRecent', async () => {
  // Your API logic here
});

export const fetchPerformanceMetrics = createAsyncThunk('dashboard/fetchMetrics', async () => {
  // Your API logic here
});

export const fetchWatchlist = createAsyncThunk('dashboard/fetchWatchlist', async () => {
  // Your API logic here
});

const initialState = {
  portfolioData: null,
  recentInvestments: [],
  performanceMetrics: null,
  watchlist: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // 2. Define the Actions (Missing Exports)
    updateWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    updatePortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => { state.loading = true; })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolioData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// 3. Export Actions
export const { 
  updateWatchlist, 
  updatePortfolioData, 
  setLastUpdated, 
  clearError 
} = dashboardSlice.actions;

// 4. Export Selectors (Missing Exports)
export const selectPortfolioData = (state) => state.dashboard.portfolioData;
export const selectRecentInvestments = (state) => state.dashboard.recentInvestments;
export const selectPerformanceMetrics = (state) => state.dashboard.performanceMetrics;
export const selectWatchlist = (state) => state.dashboard.watchlist;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectLastUpdated = (state) => state.dashboard.lastUpdated;

// 5. Export the Reducer (The "Default" Export)
export default dashboardSlice.reducer;