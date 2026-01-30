import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import advisorService from '../../../services/advisorService';

// Async thunks
export const fetchReports = createAsyncThunk(
  'advisorReports/fetchReports',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await advisorService.getReports(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateReport = createAsyncThunk(
  'advisorReports/generate',
  async (reportConfig, { rejectWithValue }) => {
    try {
      const response = await advisorService.generateReport(reportConfig);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const downloadReport = createAsyncThunk(
  'advisorReports/download',
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await advisorService.downloadReport(reportId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  'advisorReports/fetchAnalytics',
  async (timeRange = 'month', { rejectWithValue }) => {
    try {
      const response = await advisorService.getAnalytics(timeRange);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  reports: [],
  analytics: null,
  loading: false,
  error: null,
  generating: false,
  downloadProgress: 0,
};

const advisorReportsSlice = createSlice({
  name: 'advisorReports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setDownloadProgress: (state, action) => {
      state.downloadProgress = action.payload;
    },
    clearReports: (state) => {
      state.reports = [];
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
        state.error = action.payload || 'Failed to fetch reports';
      })
      
      // Generate report
      .addCase(generateReport.pending, (state) => {
        state.generating = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.generating = false;
        state.reports.unshift(action.payload);
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload || 'Failed to generate report';
      })
      
      // Download report
      .addCase(downloadReport.pending, (state) => {
        state.downloadProgress = 0;
        state.error = null;
      })
      .addCase(downloadReport.fulfilled, (state) => {
        state.downloadProgress = 100;
      })
      .addCase(downloadReport.rejected, (state, action) => {
        state.downloadProgress = 0;
        state.error = action.payload || 'Failed to download report';
      })
      
      // Fetch analytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch analytics';
      });
  },
});

export const { clearError, setDownloadProgress, clearReports } = advisorReportsSlice.actions;
export default advisorReportsSlice.reducer;