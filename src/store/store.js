import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notificationReducer from './slices/notificationSlice'; // Add this line
// ... import other reducers

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer, // Add this line
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;