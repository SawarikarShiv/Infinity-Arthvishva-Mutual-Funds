import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: null,
  language: 'en',
  currentRoute: '/',
  isMobile: false,
  sidebarOpen: true,
  initialized: false,
  toast: null, // Add toast state
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
    // Missing reducers
    showToast: (state, action) => {
      state.toast = action.payload
    },
    clearToast: (state) => {
      state.toast = null
    },
    initializeAppState: (state) => {
      // Initialize app state from localStorage
      const savedLanguage = localStorage.getItem('language') || 'en'
      const savedTheme = localStorage.getItem('theme') || 'light'
      
      state.language = savedLanguage
      state.isMobile = window.innerWidth < 768
      state.initialized = true
      
      // Apply theme if needed
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      }
    }
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
  showToast, // Export the new action
  clearToast,
  initializeAppState, // Export the new action
} = appSlice.actions

export default appSlice.reducer