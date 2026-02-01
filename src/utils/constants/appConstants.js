/**
 * Application-wide constants
 */
export const APP_NAME = 'Infinity ArthVishva Mutual Funds';
export const APP_VERSION = '1.0.0';
export const COMPANY_NAME = 'Infinity ArthVishva Financial Services Pvt. Ltd.';

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.infinity-arthvishva.com';
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;

// Session Configuration
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
export const SESSION_CHECK_INTERVAL = 60 * 1000; // 1 minute
export const SESSION_WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout
  
// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
export const MAX_PAGE_SIZE = 1000;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  FINANCIAL_YEAR: 'YYYY-YY',
};

// File Upload Limits (in MB)
export const FILE_UPLOAD_LIMITS = {
  PROFILE_IMAGE: 2,
  DOCUMENT: 5,
  BULK_UPLOAD: 10,
  STATEMENT: 10,
};

// Cache Configuration
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Notification Settings
export const NOTIFICATION_TIMEOUT = 5000; // 5 seconds
export const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes

// Validation Rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_AGE: 18,
  MAX_AGE: 100,
  MIN_INVESTMENT_AMOUNT: 100,
  MAX_INVESTMENT_AMOUNT: 100000000,
  MIN_SIP_AMOUNT: 500,
  MAX_SIP_AMOUNT: 100000,
};

// Currency Configuration
export const CURRENCY_CONFIG = {
  DEFAULT: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN',
  DECIMAL_PLACES: 2,
};

// Investment Limits
export const INVESTMENT_LIMITS = {
  MIN_LUMPSUM: 1000,
  MIN_SIP: 500,
  MAX_SIP_FREQUENCY: 12, // months
  MIN_INVESTMENT_PERIOD: 1, // year
  MAX_INVESTMENT_PERIOD: 30, // years
};

// Session Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  SESSION_EXPIRY: 'session_expiry',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Requested resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  REGISTRATION_SUCCESS: 'Registration successful!',
  PASSWORD_RESET_SUCCESS: 'Password reset successful!',
  INVESTMENT_SUCCESS: 'Investment completed successfully!',
  SIP_SETUP_SUCCESS: 'SIP setup successful!',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  DOCUMENT_UPLOAD_SUCCESS: 'Document uploaded successfully!',
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_2FA: true,
  ENABLE_BIOMETRIC: false,
  ENABLE_DARK_MODE: true,
  ENABLE_MULTI_LANGUAGE: true,
  ENABLE_ADVISOR_CHAT: true,
  ENABLE_MARKET_ALERTS: true,
  ENABLE_PAPERLESS_INVESTING: true,
};