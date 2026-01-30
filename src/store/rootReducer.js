import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import slices
import appReducer from './slices/appSlice';
import themeReducer from './slices/themeSlice';
import notificationReducer from './slices/notificationSlice';
import loaderReducer from './slices/loaderSlice';
import authReducer from '../features/auth/authSlice';

// Import feature reducers
import portfolioReducer from '../features/investor/Portfolio/portfolioSlice';
import fundsReducer from '../features/investor/Funds/fundsSlice';
// Add other feature reducers as needed

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'], // Only persist auth and theme
  blacklist: ['notification', 'loader'], // Don't persist these
};

// Combine reducers
const rootReducer = combineReducers({
  // Core slices
  app: appReducer,
  theme: themeReducer,
  notification: notificationReducer,
  loader: loaderReducer,
  
  // Auth
  auth: authReducer,
  
  // Investor features
  portfolio: portfolioReducer,
  funds: fundsReducer,
  
  // Add other reducers here
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;