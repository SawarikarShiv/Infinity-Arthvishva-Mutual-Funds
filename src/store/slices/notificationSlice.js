import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  notifications: [],
  showToast: false,
  toastMessage: '',
  toastType: 'info', // 'success', 'error', 'warning', 'info'
  toastDuration: 3000,
  isLoading: false
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // Add a notification
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        duration: action.payload.duration || 3000,
        createdAt: new Date().toISOString()
      };
      state.notifications.push(notification);
    },
    
    // Remove a notification
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    
    // Clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Show toast
    showToast: (state, action) => {
      state.showToast = true;
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type || 'info';
      state.toastDuration = action.payload.duration || 3000;
    },
    
    // Hide toast
    hideToast: (state) => {
      state.showToast = false;
      state.toastMessage = '';
      state.toastType = 'info';
    },
    
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Clear toast
    clearToast: (state) => {
      state.showToast = false;
      state.toastMessage = '';
      state.toastType = 'info';
    }
  }
});

// Export actions
export const {
  addNotification,
  removeNotification,
  clearNotifications,
  showToast,
  hideToast,
  setLoading,
  clearToast
} = notificationSlice.actions;

// Selectors
export const selectNotifications = (state) => state.notification.notifications;
export const selectShowToast = (state) => state.notification.showToast;
export const selectToastMessage = (state) => state.notification.toastMessage;
export const selectToastType = (state) => state.notification.toastType;
export const selectToastDuration = (state) => state.notification.toastDuration;
export const selectNotificationLoading = (state) => state.notification.isLoading;

// Reducer
export default notificationSlice.reducer;