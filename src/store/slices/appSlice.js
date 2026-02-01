import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: null,
  language: 'en',
  currentRoute: '/',
  isMobile: false,
  sidebarOpen: true,
  initialized: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    setLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
    },
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    initializeApp: (state) => {
      // Load language from localStorage
      const savedLanguage = localStorage.getItem('language')
      if (savedLanguage) {
        state.language = savedLanguage
      }
      
      // Check if mobile
      state.isMobile = window.innerWidth < 768
      
      // Mark as initialized
      state.initialized = true
    },
  },
})

export const {
  setLoading,
  setError,
  clearError,
  setLanguage,
  setCurrentRoute,
  setIsMobile,
  toggleSidebar,
  setSidebarOpen,
  initializeApp,
} = appSlice.actions

export default appSlice.reducer