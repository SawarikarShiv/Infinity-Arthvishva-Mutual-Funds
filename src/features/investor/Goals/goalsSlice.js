import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for development
const mockGoals = [
  {
    id: 1,
    name: 'Child Education',
    targetAmount: 2500000,
    currentAmount: 850000,
    targetDate: '2030-06-15',
    priority: 'High',
    category: 'Education',
    progress: 34,
    monthlyContribution: 15000,
    expectedReturn: 12,
    status: 'active',
  },
  {
    id: 2,
    name: 'Retirement',
    targetAmount: 5000000,
    currentAmount: 1250000,
    targetDate: '2045-12-31',
    priority: 'High',
    category: 'Retirement',
    progress: 25,
    monthlyContribution: 20000,
    expectedReturn: 10,
    status: 'active',
  },
  {
    id: 3,
    name: 'House Down Payment',
    targetAmount: 1000000,
    currentAmount: 350000,
    targetDate: '2026-03-01',
    priority: 'Medium',
    category: 'Housing',
    progress: 35,
    monthlyContribution: 25000,
    expectedReturn: 8,
    status: 'active',
  },
];

// Async thunks
export const fetchGoals = createAsyncThunk(
  'goals/fetchGoals',
  async (_, { rejectWithValue }) => {
    try {
      // In real app, this would be an API call
      // const response = await goalService.getAllGoals();
      // return response;
      
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockGoals);
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async (goalData, { rejectWithValue }) => {
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const newGoal = {
            id: Date.now(),
            ...goalData,
            progress: 0,
            status: 'active',
          };
          resolve(newGoal);
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGoal = createAsyncThunk(
  'goals/updateGoal',
  async ({ id, ...updates }, { rejectWithValue }) => {
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id, ...updates });
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (id, { rejectWithValue }) => {
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(id);
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  goals: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priority: 'all',
    status: 'all',
  },
};

// Create slice
const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateGoalProgress: (state, action) => {
      const { id, amount } = action.payload;
      const goal = state.goals.find(g => g.id === id);
      if (goal) {
        goal.currentAmount += amount;
        goal.progress = (goal.currentAmount / goal.targetAmount) * 100;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch goals
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create goal
      .addCase(createGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update goal
      .addCase(updateGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.goals.findIndex(goal => goal.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = { ...state.goals[index], ...action.payload };
        }
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete goal
      .addCase(deleteGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = state.goals.filter(goal => goal.id !== action.payload);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setFilters, updateGoalProgress, clearError } = goalsSlice.actions;

// Export selectors
export const selectGoals = (state) => state.goals.goals;
export const selectLoading = (state) => state.goals.loading;
export const selectError = (state) => state.goals.error;
export const selectFilters = (state) => state.goals.filters;

// Export reducer
export default goalsSlice.reducer;