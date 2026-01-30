import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../../services/adminService';

// Async thunks
export const fetchAuditLogs = createAsyncThunk(
    'audit/fetchAuditLogs',
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await adminService.getAuditLogs(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAuditLogById = createAsyncThunk(
    'audit/fetchAuditLogById',
    async (logId, { rejectWithValue }) => {
        try {
            const response = await adminService.getAuditLogById(logId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const clearAuditLogs = createAsyncThunk(
    'audit/clearAuditLogs',
    async (params, { rejectWithValue }) => {
        try {
            const response = await adminService.clearAuditLogs(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const exportAuditLogs = createAsyncThunk(
    'audit/exportAuditLogs',
    async (params, { rejectWithValue }) => {
        try {
            const response = await adminService.exportAuditLogs(params);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    logs: [],
    currentLog: null,
    loading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 20,
        total: 0,
        pages: 0
    },
    filters: {
        actionType: 'all',
        userId: '',
        dateRange: {
            start: '',
            end: ''
        },
        search: ''
    }
};

const auditSlice = createSlice({
    name: 'audit',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentLog: (state) => {
            state.currentLog = null;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Audit Logs
            .addCase(fetchAuditLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.logs = action.payload.data || [];
                state.pagination = action.payload.pagination || state.pagination;
            })
            .addCase(fetchAuditLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch Audit Log By ID
            .addCase(fetchAuditLogById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuditLogById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentLog = action.payload;
            })
            .addCase(fetchAuditLogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Clear Audit Logs
            .addCase(clearAuditLogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearAuditLogs.fulfilled, (state) => {
                state.loading = false;
                state.logs = [];
                state.pagination.total = 0;
            })
            .addCase(clearAuditLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Export Audit Logs
            .addCase(exportAuditLogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(exportAuditLogs.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(exportAuditLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Selectors
export const selectAuditLogs = (state) => state.audit.logs;
export const selectCurrentLog = (state) => state.audit.currentLog;
export const selectAuditLogsLoading = (state) => state.audit.loading;
export const selectAuditLogsError = (state) => state.audit.error;
export const selectAuditPagination = (state) => state.audit.pagination;
export const selectAuditFilters = (state) => state.audit.filters;

// Actions
export const { 
    clearError, 
    clearCurrentLog, 
    setFilters, 
    setPagination 
} = auditSlice.actions;

// Reducer
export default auditSlice.reducer;
EOF