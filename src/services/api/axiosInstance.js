import axios from 'axios';
import API_CONFIG from './config.js';
import setupInterceptors from './interceptors.js';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
});

// Setup interceptors
setupInterceptors(axiosInstance);

export default axiosInstance;