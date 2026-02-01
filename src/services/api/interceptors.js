import store from '../../store/store.js';
import { logout, refreshToken } from '../../features/auth/authSlice.js';
import { showToast } from '../../store/slices/notificationSlice.js';

const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.token || state.auth.accessToken;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add timestamp to prevent caching
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now()
        };
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Handle 401 Unauthorized errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh token
          // Note: You might need to adjust this based on your API structure
          const response = await axiosInstance.post('/auth/refresh', {
            refreshToken: store.getState().auth.token // Adjust based on your token structure
          });
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Update store with new tokens
          store.dispatch(refreshToken({
            token: accessToken,
            refreshToken: newRefreshToken
          }));
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          store.dispatch(logout());
          store.dispatch(showToast({
            message: 'Session expired. Please login again.',
            type: 'error',
            duration: 5000
          }));
          return Promise.reject(refreshError);
        }
      }
      
      // Handle 403 Forbidden errors
      if (error.response?.status === 403) {
        store.dispatch(showToast({
          message: 'You do not have permission to perform this action.',
          type: 'error',
          duration: 5000
        }));
      }
      
      // Handle 500 Server errors
      if (error.response?.status >= 500) {
        store.dispatch(showToast({
          message: 'Server error. Please try again later.',
          type: 'error',
          duration: 5000
        }));
      }
      
      // Handle network errors
      if (!error.response) {
        store.dispatch(showToast({
          message: 'Network error. Please check your connection.',
          type: 'error',
          duration: 5000
        }));
      }
      
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;