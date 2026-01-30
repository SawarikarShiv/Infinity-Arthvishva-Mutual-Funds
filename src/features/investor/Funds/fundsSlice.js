import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fundService from './services/fundService';

// Async thunks
export const fetchFunds = createAsyncThunk(
  'funds/fetchFunds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fundService.getAllFunds();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFundById = createAsyncThunk(
  'funds/fetchFundById',
  async (fundId, { rejectWithValue }) => {
    try {
      const response = await fundService.getFundById(fundId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchFunds = createAsyncThunk(
  'funds/searchFunds',
  async (query, { rejectWithValue }) => {
    try {
      const response = await fundService.searchFunds(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  funds: [],
  selectedFund: null,
  loading: false,
  error: null,
  searchResults: [],
  filters: {
    category: 'all',
    riskLevel: 'all',
    minReturns: 0,
    maxExpenseRatio: 2,
  },
  sortBy: 'name',
};

// Create slice
const fundsSlice = createSlice({
  name: 'funds',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearSelectedFund: (state) => {
      state.selectedFund = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all funds
      .addCase(fetchFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFunds.fulfilled, (state, action) => {
        state.loading = false;
        state.funds = action.payload;
      })
      .addCase(fetchFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch fund by ID
      .addCase(fetchFundById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFundById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFund = action.payload;
      })
      .addCase(fetchFundById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Search funds
      .addCase(searchFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFunds.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setFilters, setSortBy, clearSelectedFund, clearError } = fundsSlice.actions;

// Export selectors
export const selectFunds = (state) => state.funds.funds;
export const selectSelectedFund = (state) => state.funds.selectedFund;
export const selectLoading = (state) => state.funds.loading;
export const selectError = (state) => state.funds.error;
export const selectFilters = (state) => state.funds.filters;
export const selectSortBy = (state) => state.funds.sortBy;
export const selectSearchResults = (state) => state.funds.searchResults;

// Export reducer
export default fundsSlice.reducer;