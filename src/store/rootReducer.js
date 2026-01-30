import { combineReducers } from '@reduxjs/toolkit';
import portfolioReducer from '../features/investor/Portfolio/portfolioSlice';
// ... other reducers

const rootReducer = combineReducers({
  portfolio: portfolioReducer,
  // ... other reducers
}); 