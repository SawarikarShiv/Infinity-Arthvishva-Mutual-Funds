import store from '../../store/store.js';
import { logout, refreshToken } from '../../features/auth/authSlice.js';
import { showToast } from '../../store/slices/notificationSlice.js';

const setupInterceptors = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.accessToken;
      
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
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshTokenValue = store.getState().auth.refreshToken;
          if (refreshTokenValue) {
            const response = await axiosInstance.post('/auth/refresh', {
              refreshToken: refreshTokenValue
            });
            
            const { accessToken, refreshToken: newRefreshToken } = response.data;
            
            // Update store with new tokens
            store.dispatch(refreshToken({
              accessToken,
              refreshToken: newRefreshToken
            }));
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, logout user
          store.dispatch(logout());
          store.dispatch(showToast({
            message: 'Session expired. Please login again.',
            type: 'error'
          }));
          return Promise.reject(refreshError);
        }
      }
      
      // Handle other errors
      if (error.response?.status === 403) {
        store.dispatch(showToast({
          message: 'You do not have permission to perform this action.',
          type: 'error'
        }));
      }
      
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;