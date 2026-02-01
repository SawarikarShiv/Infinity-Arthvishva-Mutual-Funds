// src/store/index.js - Pure JavaScript version
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';

// Create the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as you create them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/login/fulfilled', 'auth/register/fulfilled'],
        ignoredPaths: ['auth.user', 'auth.token'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Setup listeners for RTK Query if you use it
setupListeners(store.dispatch);

// If you don't need TypeScript types, you can remove these lines:
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// For JavaScript projects, you can create custom hooks instead:
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;