import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import advisorService from '../../../services/advisorService';

// Async thunks
export const fetchAdvisorDashboardData = createAsyncThunk(
  'advisorDashboard/fetchData',
  async (timeRange = 'month', { rejectWithValue }) => {
    try {
      const response = await advisorService.getDashboardData(timeRange);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAdvisorProfile = createAsyncThunk(
  'advisorDashboard/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await advisorService.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  data: null,
  stats: null,
  performance: null,
  recentActivities: [],
  loading: false,
  error: null,
  timeRange: 'month',
};

const advisorDashboardSlice = createSlice({
  name: 'advisorDashboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTimeRange: (state, action) => {
      state.timeRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard data
      .addCase(fetchAdvisorDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvisorDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.stats = action.payload.stats;
        state.performance = action.payload.performance;
        state.recentActivities = action.payload.recentActivities || [];
      })
      .addCase(fetchAdvisorDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dashboard data';
      })
      
      // Update profile
      .addCase(updateAdvisorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdvisorProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.data) {
          state.data = { ...state.data, ...action.payload };
        }
      })
      .addCase(updateAdvisorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update profile';
      });
  },
});

export const { clearError, setTimeRange } = advisorDashboardSlice.actions;
export default advisorDashboardSlice.reducer;