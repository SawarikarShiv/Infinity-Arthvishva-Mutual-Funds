import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import portfolioService from '../../../services/PortfolioService';

// Async thunks
export const fetchPortfolio = createAsyncThunk(
  'portfolio/fetchPortfolio',
  async (_, { rejectWithValue }) => {
    try {
      const response = await portfolioService.getPortfolio();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchHoldings = createAsyncThunk(
  'portfolio/fetchHoldings',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await portfolioService.getHoldings(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTransactionHistory = createAsyncThunk(
  'portfolio/fetchTransactionHistory',
  async (params, { rejectWithValue }) => {
    try {
      const response = await portfolioService.getTransactionHistory(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAssetAllocation = createAsyncThunk(
  'portfolio/fetchAssetAllocation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await portfolioService.getAssetAllocation();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPortfolioPerformance = createAsyncThunk(
  'portfolio/fetchPortfolioPerformance',
  async (period, { rejectWithValue }) => {
    try {
      const response = await portfolioService.getPortfolioPerformance(period);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  portfolio: null,
  holdings: [],
  transactions: [],
  assetAllocation: [],
  performance: {},
  summary: null,
  isLoading: false,
  error: null,
  filters: {
    category: 'all',
    sortBy: 'value',
    sortOrder: 'desc',
  },
};

// Portfolio slice
const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearPortfolio: (state) => {
      return initialState;
    },
    updateHolding: (state, action) => {
      const index = state.holdings.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.holdings[index] = { ...state.holdings[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Portfolio
      .addCase(fetchPortfolio.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.portfolio = action.payload;
        state.summary = action.payload.summary;
      })
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Holdings
      .addCase(fetchHoldings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHoldings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.holdings = action.payload;
      })
      .addCase(fetchHoldings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Transactions
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Asset Allocation
      .addCase(fetchAssetAllocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAssetAllocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assetAllocation = action.payload;
      })
      .addCase(fetchAssetAllocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Performance
      .addCase(fetchPortfolioPerformance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPortfolioPerformance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.performance = action.payload;
      })
      .addCase(fetchPortfolioPerformance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearPortfolio, updateHolding } = portfolioSlice.actions;
export default portfolioSlice.reducer;

// Selectors
export const selectPortfolio = (state) => state.portfolio.portfolio;
export const selectHoldings = (state) => state.portfolio.holdings;
export const selectTransactions = (state) => state.portfolio.transactions;
export const selectAssetAllocation = (state) => state.portfolio.assetAllocation;
export const selectPerformance = (state) => state.portfolio.performance;
export const selectSummary = (state) => state.portfolio.summary;
export const selectIsLoading = (state) => state.portfolio.isLoading;
export const selectError = (state) => state.portfolio.error;
export const selectFilters = (state) => state.portfolio.filters;