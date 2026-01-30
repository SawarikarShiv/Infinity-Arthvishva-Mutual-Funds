import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for development
const mockReports = [
  {
    id: 1,
    name: 'Capital Gains Report',
    type: 'tax',
    year: '2023-24',
    generatedAt: '2024-01-15',
    status: 'generated',
    size: '2.4 MB',
  },
  {
    id: 2,
    name: 'Portfolio Performance Report',
    type: 'portfolio',
    period: 'Q4 2023',
    generatedAt: '2024-01-10',
    status: 'generated',
    size: '1.8 MB',
  },
  {
    id: 3,
    name: 'Transaction Summary',
    type: 'transaction',
    period: 'December 2023',
    generatedAt: '2024-01-05',
    status: 'generated',
    size: '1.2 MB',
  },
];

// Async thunks
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockReports);
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generateReport = createAsyncThunk(
  'reports/generateReport',
  async (reportData, { rejectWithValue }) => {
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const newReport = {
            id: Date.now(),
            ...reportData,
            generatedAt: new Date().toISOString(),
            status: 'generated',
            size: '1.5 MB',
          };
          resolve(newReport);
        }, 1000);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  reports: [],
  loading: false,
  error: null,
  filters: {
    type: 'all',
    period: 'month',
    year: new Date().getFullYear().toString(),
  },
};

// Create slice
const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    deleteReport: (state, action) => {
      state.reports = state.reports.filter(report => report.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reports
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Generate report
      .addCase(generateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.unshift(action.payload);
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setFilters, deleteReport, clearError } = reportsSlice.actions;

// Export selectors
export const selectReports = (state) => state.reports.reports;
export const selectLoading = (state) => state.reports.loading;
export const selectError = (state) => state.reports.error;
export const selectFilters = (state) => state.reports.filters;

// Export reducer
export default reportsSlice.reducer;