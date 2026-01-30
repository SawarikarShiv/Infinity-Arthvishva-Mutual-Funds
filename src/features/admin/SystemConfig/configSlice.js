import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../../services/adminService';

// Async thunks
export const fetchConfig = createAsyncThunk(
    'config/fetchConfig',
    async (_, { rejectWithValue }) => {
        try {
            const response = await adminService.getConfig();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateConfig = createAsyncThunk(
    'config/updateConfig',
    async (configData, { rejectWithValue }) => {
        try {
            const response = await adminService.updateConfig(configData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleMaintenanceMode = createAsyncThunk(
    'config/toggleMaintenanceMode',
    async ({ enabled, message = '', estimatedTime = '' }, { rejectWithValue }) => {
        try {
            const response = await adminService.toggleMaintenanceMode(enabled, message, estimatedTime);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createBackup = createAsyncThunk(
    'config/createBackup',
    async (backupData, { rejectWithValue }) => {
        try {
            const response = await adminService.createBackup(backupData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const restoreBackup = createAsyncThunk(
    'config/restoreBackup',
    async (backupId, { rejectWithValue }) => {
        try {
            const response = await adminService.restoreBackup(backupId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    config: null,
    backups: [],
    loading: false,
    error: null,
    backupLoading: false
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearBackups: (state) => {
            state.backups = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Config
            .addCase(fetchConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.config = action.payload;
            })
            .addCase(fetchConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Config
            .addCase(updateConfig.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.config = { ...state.config, ...action.payload };
            })
            .addCase(updateConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Toggle Maintenance Mode
            .addCase(toggleMaintenanceMode.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleMaintenanceMode.fulfilled, (state, action) => {
                state.loading = false;
                state.config = { ...state.config, ...action.payload };
            })
            .addCase(toggleMaintenanceMode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Backup
            .addCase(createBackup.pending, (state) => {
                state.backupLoading = true;
                state.error = null;
            })
            .addCase(createBackup.fulfilled, (state, action) => {
                state.backupLoading = false;
                state.backups.unshift(action.payload);
            })
            .addCase(createBackup.rejected, (state, action) => {
                state.backupLoading = false;
                state.error = action.payload;
            })

            // Restore Backup
            .addCase(restoreBackup.pending, (state) => {
                state.backupLoading = true;
            })
            .addCase(restoreBackup.fulfilled, (state) => {
                state.backupLoading = false;
            })
            .addCase(restoreBackup.rejected, (state, action) => {
                state.backupLoading = false;
                state.error = action.payload;
            });
    }
});

// Selectors
export const selectConfig = (state) => state.config.config;
export const selectBackups = (state) => state.config.backups;
export const selectConfigLoading = (state) => state.config.loading;
export const selectBackupLoading = (state) => state.config.backupLoading;
export const selectConfigError = (state) => state.config.error;
export const selectMaintenanceMode = (state) => state.config.config?.maintenanceMode;

// Actions
export const { clearError, clearBackups } = configSlice.actions;

// Reducer
export default configSlice.reducer;
EOF