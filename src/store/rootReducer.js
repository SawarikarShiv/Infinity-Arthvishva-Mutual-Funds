import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice.js'
import themeReducer from './slices/themeSlice.js'

const rootReducer = combineReducers({
  app: appReducer,
  theme: themeReducer,
  // Add more reducers here as you create them
})

export default rootReducer