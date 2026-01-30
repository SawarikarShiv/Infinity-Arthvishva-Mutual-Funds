import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for development
const mockTransactions = [
  {
    id: 1,
    date: '2024-01-15',
    fundName: 'ICICI Bluechip Fund',
    type: 'Purchase',
    amount: 50000,
    units: 1092.45,
    nav: 45.78,
    category: 'Equity',
    paymentMethod: 'UPI',
    status: 'Completed',
    transactionId: 'TXN001234',
  },
  {
    id: 2,
    date: '2024-01-10',
    fundName: 'SBI Debt Fund',
    type: 'SIP',
    amount: 10000,
    units: 392.16,
    nav: 25.50,
    category: 'Debt',
    paymentMethod: 'Auto Debit',
    status: 'Completed',
    transactionId: 'TXN001235',
  },
  {
    id: 3,
    date: '2024-01-05',
    fundName: 'HDFC Hybrid Fund',
    type: 'Redemption',
    amount: 25000,
    units: -625.00,
    nav: 40.00,
    category: 'Hybrid',
    paymentMethod: 'Bank Transfer',
    status: 'Processing',
    transactionId: 'TXN001236',
  },
];

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockTransactions);
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          const newTransaction = {
            id: Date.now(),
            ...transactionData,
            status: 'Processing',
            transactionId: `TXN${Date.now().toString().slice(-6)}`,
          };
          resolve(newTransaction);
        }, 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  transactions: [],
  loading: false,
  error: null,
  filters: {
    type: 'all',
    status: 'all',
    dateRange: 'month',
    category: 'all',
  },
};

// Create slice
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateTransactionStatus: (state, action) => {
      const { id, status } = action.payload;
      const transaction = state.transactions.find(t => t.id === id);
      if (transaction) {
        transaction.status = status;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setFilters, updateTransactionStatus, clearError } = transactionsSlice.actions;

// Export selectors
export const selectTransactions = (state) => state.transactions.transactions;
export const selectLoading = (state) => state.transactions.loading;
export const selectError = (state) => state.transactions.error;
export const selectFilters = (state) => state.transactions.filters;

// Export reducer
export default transactionsSlice.reducer;