/**
 * Application Configuration
 * Centralized configuration file for environment variables, API endpoints, 
 * feature flags, and other settings
 */

// ============================================================================
// Environment Configuration
// ============================================================================

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const IS_DEVELOPMENT = ENVIRONMENT === 'development';
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_STAGING = ENVIRONMENT === 'staging';

// ============================================================================
// API Configuration
// ============================================================================

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    PROFILE: '/auth/profile',
  },
  
  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile/update',
    CHANGE_PASSWORD: '/users/change-password',
    UPLOAD_AVATAR: '/users/upload-avatar',
    VERIFICATION: '/users/verification',
  },
  
  // Admin
  ADMIN: {
    USERS: '/admin/users',
    AUDIT_LOGS: '/admin/audit-logs',
    SYSTEM_CONFIG: '/admin/system-config',
    DASHBOARD_STATS: '/admin/dashboard/stats',
    USER_ACTIVITY: '/admin/user-activity',
  },
  
  // Investor
  INVESTOR: {
    DASHBOARD: '/investor/dashboard',
    PORTFOLIO: '/investor/portfolio',
    PORTFOLIO_SUMMARY: '/investor/portfolio/summary',
    PORTFOLIO_PERFORMANCE: '/investor/portfolio/performance',
    PORTFOLIO_ALLOCATION: '/investor/portfolio/allocation',
    
    FUNDS: '/investor/funds',
    FUND_DETAILS: (fundId) => `/investor/funds/${fundId}`,
    FUND_PERFORMANCE: (fundId) => `/investor/funds/${fundId}/performance`,
    FUND_HOLDINGS: (fundId) => `/investor/funds/${fundId}/holdings`,
    FUND_DOCUMENTS: (fundId) => `/investor/funds/${fundId}/documents`,
    
    GOALS: '/investor/goals',
    GOAL_DETAILS: (goalId) => `/investor/goals/${goalId}`,
    GOAL_PROGRESS: (goalId) => `/investor/goals/${goalId}/progress`,
    GOAL_RECOMMENDATIONS: (goalId) => `/investor/goals/${goalId}/recommendations`,
    
    TRANSACTIONS: '/investor/transactions',
    TRANSACTION_HISTORY: '/investor/transactions/history',
    PENDING_TRANSACTIONS: '/investor/transactions/pending',
    CREATE_TRANSACTION: '/investor/transactions/create',
    
    REPORTS: '/investor/reports',
    GENERATE_REPORT: '/investor/reports/generate',
    DOWNLOAD_REPORT: (reportId) => `/investor/reports/${reportId}/download`,
    
    DOCUMENTS: '/investor/documents',
    NOTIFICATIONS: '/investor/notifications',
    ALERTS: '/investor/alerts',
  },
  
  // Advisor
  ADVISOR: {
    DASHBOARD: '/advisor/dashboard',
    
    CLIENTS: '/advisor/clients',
    CLIENT_DETAILS: (clientId) => `/advisor/clients/${clientId}`,
    CLIENT_PORTFOLIO: (clientId) => `/advisor/clients/${clientId}/portfolio`,
    CLIENT_PERFORMANCE: (clientId) => `/advisor/clients/${clientId}/performance`,
    CLIENT_GOALS: (clientId) => `/advisor/clients/${clientId}/goals`,
    
    REPORTS: '/advisor/reports',
    GENERATE_CLIENT_REPORT: (clientId) => `/advisor/clients/${clientId}/reports/generate`,
    
    RECOMMENDATIONS: '/advisor/recommendations',
    CREATE_RECOMMENDATION: '/advisor/recommendations/create',
    
    APPOINTMENTS: '/advisor/appointments',
    SCHEDULE_APPOINTMENT: '/advisor/appointments/schedule',
  },
  
  // Public
  PUBLIC: {
    FUNDS: '/public/funds',
    FUND_CATEGORIES: '/public/funds/categories',
    FUND_PERFORMANCE: '/public/funds/performance',
    
    ARTICLES: '/public/articles',
    ARTICLE_DETAILS: (articleId) => `/public/articles/${articleId}`,
    
    FAQS: '/public/faqs',
    CONTACT_SUBMIT: '/public/contact/submit',
    SUBSCRIBE_NEWSLETTER: '/public/subscribe/newsletter',
  },
  
  // Uploads
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    AVATAR: '/upload/avatar',
  },
  
  // Analytics
  ANALYTICS: {
    TRACK_EVENT: '/analytics/track',
    PAGE_VIEW: '/analytics/pageview',
    USER_BEHAVIOR: '/analytics/user-behavior',
  },
};

// ============================================================================
// Application Settings
// ============================================================================

export const APP_CONFIG = {
  NAME: 'WealthForge',
  VERSION: process.env.VITE_APP_VERSION || '1.0.0',
  DESCRIPTION: 'Investment and Portfolio Management Platform',
  
  // Company Information
  COMPANY: {
    NAME: 'WealthForge Technologies',
    ADDRESS: '123 Financial District, Mumbai, Maharashtra 400001',
    EMAIL: 'support@wealthforge.com',
    PHONE: '+91 22 1234 5678',
    WEBSITE: 'https://wealthforge.com',
  },
  
  // Contact Information
  CONTACT: {
    SUPPORT_EMAIL: 'support@wealthforge.com',
    SALES_EMAIL: 'sales@wealthforge.com',
    PRIVACY_EMAIL: 'privacy@wealthforge.com',
    GENERAL_INQUIRY: 'info@wealthforge.com',
  },
  
  // Social Media
  SOCIAL_MEDIA: {
    LINKEDIN: 'https://linkedin.com/company/wealthforge',
    TWITTER: 'https://twitter.com/wealthforge',
    FACEBOOK: 'https://facebook.com/wealthforge',
    INSTAGRAM: 'https://instagram.com/wealthforge',
  },
  
  // Feature Flags
  FEATURES: {
    ENABLE_REGISTRATION: true,
    ENABLE_SOCIAL_LOGIN: false,
    ENABLE_TWO_FACTOR_AUTH: true,
    ENABLE_DEMO_MODE: IS_DEVELOPMENT,
    ENABLE_ANALYTICS: IS_PRODUCTION,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_EMAIL_VERIFICATION: true,
    ENABLE_KYC_VERIFICATION: true,
  },
  
  // Theme Configuration
  THEME: {
    PRIMARY_COLOR: '#2563eb', // blue-600
    SECONDARY_COLOR: '#64748b', // slate-500
    SUCCESS_COLOR: '#10b981', // emerald-500
    DANGER_COLOR: '#ef4444', // red-500
    WARNING_COLOR: '#f59e0b', // amber-500
    INFO_COLOR: '#06b6d4', // cyan-500
    
    DARK_MODE: true,
    THEME_STORAGE_KEY: 'wealthforge_theme',
  },
  
  // Local Storage Keys
  STORAGE_KEYS: {
    TOKEN: 'wealthforge_token',
    USER: 'wealthforge_user',
    THEME: 'wealthforge_theme',
    LANGUAGE: 'wealthforge_language',
    RECENT_SEARCHES: 'wealthforge_recent_searches',
    CART: 'wealthforge_cart',
    SESSION: 'wealthforge_session',
  },
  
  // Cookies Configuration
  COOKIES: {
    SESSION_DURATION: 7, // days
    TOKEN_NAME: 'wealthforge_auth_token',
    REFRESH_TOKEN_NAME: 'wealthforge_refresh_token',
    USER_ID_NAME: 'wealthforge_user_id',
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZES: [10, 25, 50, 100],
    MAX_PAGE_SIZE: 100,
  },
  
  // Date & Time
  DATE_FORMAT: 'DD/MM/YYYY',
  TIME_FORMAT: 'HH:mm',
  DATE_TIME_FORMAT: 'DD/MM/YYYY HH:mm',
  TIMEZONE: 'Asia/Kolkata',
  
  // Currency
  CURRENCY: {
    DEFAULT: 'INR',
    SYMBOL: '₹',
    DECIMALS: 2,
    LOCALE: 'en-IN',
    AVAILABLE_CURRENCIES: ['INR', 'USD', 'EUR', 'GBP'],
  },
  
  // Investment Settings
  INVESTMENT: {
    MIN_INVESTMENT_AMOUNT: 500,
    MAX_INVESTMENT_AMOUNT: 10000000,
    DEFAULT_INVESTMENT_AMOUNT: 10000,
    
    SIP_MIN_AMOUNT: 500,
    SIP_MAX_AMOUNT: 100000,
    
    WITHDRAWAL_MIN_AMOUNT: 1000,
    WITHDRAWAL_MAX_AMOUNT: 500000,
    
    TRANSACTION_FEE_PERCENTAGE: 0.5,
    GST_PERCENTAGE: 18,
    
    CUTOFF_TIME: '15:00', // 3:00 PM
    SETTLEMENT_DAYS: 2,
  },
  
  // Notification Settings
  NOTIFICATIONS: {
    DEFAULT_CHANNELS: ['email', 'in_app'],
    EMAIL_NOTIFICATION_HOURS: [9, 18], // Send emails at 9 AM and 6 PM
    PUSH_NOTIFICATION_ENABLED: false,
    SMS_NOTIFICATION_ENABLED: false,
  },
  
  // Security Settings
  SECURITY: {
    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_REQUIREMENTS: {
      UPPERCASE: true,
      LOWERCASE: true,
      NUMBERS: true,
      SPECIAL_CHARS: true,
    },
    
    SESSION_TIMEOUT: 30, // minutes
    INACTIVITY_TIMEOUT: 15, // minutes
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15, // minutes
    
    ALLOWED_FILE_TYPES: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  },
  
  // Performance Settings
  PERFORMANCE: {
    DEBOUNCE_DELAY: 300, // milliseconds
    THROTTLE_DELAY: 1000, // milliseconds
    API_CACHE_DURATION: 5 * 60 * 1000, // 5 minutes in milliseconds
    IMAGE_LAZY_LOADING: true,
    COMPONENT_LAZY_LOADING: true,
  },
};

// ============================================================================
// Third-Party Services Configuration
// ============================================================================

export const THIRD_PARTY_CONFIG = {
  // Google Analytics
  GOOGLE_ANALYTICS: {
    MEASUREMENT_ID: process.env.VITE_GA_MEASUREMENT_ID || '',
    ENABLED: IS_PRODUCTION,
  },
  
  // Google Maps
  GOOGLE_MAPS: {
    API_KEY: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
    ENABLED: true,
  },
  
  // Sentry (Error Tracking)
  SENTRY: {
    DSN: process.env.VITE_SENTRY_DSN || '',
    ENABLED: IS_PRODUCTION,
    ENVIRONMENT: ENVIRONMENT,
  },
  
  // Stripe (Payment Processing)
  STRIPE: {
    PUBLISHABLE_KEY: process.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
    SECRET_KEY: process.env.VITE_STRIPE_SECRET_KEY || '',
    ENABLED: false, // Enable when payment integration is ready
  },
  
  // Email Service
  EMAIL_SERVICE: {
    PROVIDER: 'sendgrid', // or 'mailgun', 'aws_ses'
    API_KEY: process.env.VITE_EMAIL_API_KEY || '',
    FROM_EMAIL: 'noreply@wealthforge.com',
    FROM_NAME: 'WealthForge',
  },
  
  // SMS Service
  SMS_SERVICE: {
    PROVIDER: 'twilio', // or 'msg91'
    ACCOUNT_SID: process.env.VITE_SMS_ACCOUNT_SID || '',
    AUTH_TOKEN: process.env.VITE_SMS_AUTH_TOKEN || '',
    FROM_NUMBER: process.env.VITE_SMS_FROM_NUMBER || '',
  },
  
  // File Storage
  STORAGE: {
    PROVIDER: 'aws_s3', // or 'cloudinary', 'digitalocean'
    BUCKET_NAME: process.env.VITE_STORAGE_BUCKET_NAME || '',
    REGION: process.env.VITE_STORAGE_REGION || '',
    ACCESS_KEY: process.env.VITE_STORAGE_ACCESS_KEY || '',
    SECRET_KEY: process.env.VITE_STORAGE_SECRET_KEY || '',
  },
};

// ============================================================================
// Routing Configuration
// ============================================================================

export const ROUTES = {
  // Public Routes
  PUBLIC: {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    FAQ: '/faq',
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_CONDITIONS: '/terms-conditions',
    
    // Authentication
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    VERIFY_EMAIL: '/verify-email',
  },
  
  // Investor Routes
  INVESTOR: {
    DASHBOARD: '/investor/dashboard',
    PORTFOLIO: '/investor/portfolio',
    FUNDS: '/investor/funds',
    FUND_DETAILS: (fundId) => `/investor/funds/${fundId}`,
    GOALS: '/investor/goals',
    GOAL_DETAILS: (goalId) => `/investor/goals/${goalId}`,
    TRANSACTIONS: '/investor/transactions',
    REPORTS: '/investor/reports',
    DOCUMENTS: '/investor/documents',
    PROFILE: '/investor/profile',
    SETTINGS: '/investor/settings',
    NOTIFICATIONS: '/investor/notifications',
  },
  
  // Advisor Routes
  ADVISOR: {
    DASHBOARD: '/advisor/dashboard',
    CLIENTS: '/advisor/clients',
    CLIENT_DETAILS: (clientId) => `/advisor/clients/${clientId}`,
    REPORTS: '/advisor/reports',
    APPOINTMENTS: '/advisor/appointments',
    RECOMMENDATIONS: '/advisor/recommendations',
    PROFILE: '/advisor/profile',
    SETTINGS: '/advisor/settings',
  },
  
  // Admin Routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    USER_DETAILS: (userId) => `/admin/users/${userId}`,
    AUDIT_LOGS: '/admin/audit-logs',
    SYSTEM_CONFIG: '/admin/system-config',
    REPORTS: '/admin/reports',
  },
  
  // Error Pages
  ERRORS: {
    NOT_FOUND: '/404',
    UNAUTHORIZED: '/401',
    FORBIDDEN: '/403',
    SERVER_ERROR: '/500',
    MAINTENANCE: '/maintenance',
  },
};

// ============================================================================
// User Roles & Permissions
// ============================================================================

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ADVISOR: 'advisor',
  INVESTOR: 'investor',
  GUEST: 'guest',
};

export const PERMISSIONS = {
  // Dashboard Access
  VIEW_DASHBOARD: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: true,
    [USER_ROLES.INVESTOR]: true,
    [USER_ROLES.GUEST]: false,
  },
  
  // User Management
  MANAGE_USERS: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: false,
    [USER_ROLES.INVESTOR]: false,
    [USER_ROLES.GUEST]: false,
  },
  
  // Fund Management
  MANAGE_FUNDS: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: false,
    [USER_ROLES.INVESTOR]: false,
    [USER_ROLES.GUEST]: false,
  },
  
  // View Investments
  VIEW_INVESTMENTS: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: true,
    [USER_ROLES.INVESTOR]: true,
    [USER_ROLES.GUEST]: false,
  },
  
  // Create Investments
  CREATE_INVESTMENTS: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: false,
    [USER_ROLES.INVESTOR]: true,
    [USER_ROLES.GUEST]: false,
  },
  
  // View Reports
  VIEW_REPORTS: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: true,
    [USER_ROLES.INVESTOR]: true,
    [USER_ROLES.GUEST]: false,
  },
  
  // Generate Reports
  GENERATE_REPORTS: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: true,
    [USER_ROLES.INVESTOR]: false,
    [USER_ROLES.GUEST]: false,
  },
  
  // System Configuration
  MANAGE_SYSTEM_CONFIG: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: false,
    [USER_ROLES.INVESTOR]: false,
    [USER_ROLES.GUEST]: false,
  },
  
  // Audit Logs
  VIEW_AUDIT_LOGS: {
    [USER_ROLES.SUPER_ADMIN]: true,
    [USER_ROLES.ADMIN]: true,
    [USER_ROLES.ADVISOR]: false,
    [USER_ROLES.INVESTOR]: false,
    [USER_ROLES.GUEST]: false,
  },
};

// ============================================================================
// Validation Rules
// ============================================================================

export const VALIDATION_RULES = {
  EMAIL: {
    REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    MESSAGE: 'Please enter a valid email address',
  },
  
  PHONE: {
    REGEX: /^[6-9]\d{9}$/,
    MESSAGE: 'Please enter a valid 10-digit Indian mobile number',
  },
  
  PAN: {
    REGEX: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    MESSAGE: 'Please enter a valid PAN number (e.g., ABCDE1234F)',
  },
  
  AADHAAR: {
    REGEX: /^\d{12}$/,
    MESSAGE: 'Please enter a valid 12-digit Aadhaar number',
  },
  
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    MESSAGE: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  },
  
  AMOUNT: {
    MIN: 500,
    MAX: 10000000,
    MESSAGE: 'Amount must be between ₹500 and ₹1,00,00,000',
  },
};

// ============================================================================
// Cache Keys
// ============================================================================

export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  PORTFOLIO_SUMMARY: 'portfolio_summary',
  FUND_LIST: 'fund_list',
  MARKET_DATA: 'market_data',
  NOTIFICATIONS: 'notifications',
  RECENT_TRANSACTIONS: 'recent_transactions',
  GOAL_LIST: 'goal_list',
};

// ============================================================================
// Default Values
// ============================================================================

export const DEFAULTS = {
  USER_AVATAR: '/assets/images/default-avatar.png',
  FUND_IMAGE: '/assets/images/fund-placeholder.png',
  COMPANY_LOGO: '/assets/logos/wealthforge-logo.svg',
  FAVICON: '/favicon.ico',
  
  // Chart Colors
  CHART_COLORS: [
    '#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1',
  ],
  
  // Risk Levels
  RISK_LEVELS: {
    LOW: { color: '#10b981', label: 'Low Risk' },
    MODERATE: { color: '#f59e0b', label: 'Moderate Risk' },
    HIGH: { color: '#ef4444', label: 'High Risk' },
  },
  
  // Investment Categories
  INVESTMENT_CATEGORIES: [
    { id: 'equity', name: 'Equity', color: '#2563eb' },
    { id: 'debt', name: 'Debt', color: '#10b981' },
    { id: 'hybrid', name: 'Hybrid', color: '#f59e0b' },
    { id: 'liquid', name: 'Liquid', color: '#8b5cf6' },
    { id: 'others', name: 'Others', color: '#64748b' },
  ],
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if a user has a specific permission
 * @param {string} role - User role
 * @param {string} permission - Permission key
 * @returns {boolean} - Whether user has permission
 */
export const hasPermission = (role, permission) => {
  return PERMISSIONS[permission]?.[role] || false;
};

/**
 * Get full API URL for an endpoint
 * @param {string} endpoint - API endpoint
 * @returns {string} - Full API URL
 */
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Get route based on user role
 * @param {string} role - User role
 * @returns {string} - Dashboard route
 */
export const getDashboardRoute = (role) => {
  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
    case USER_ROLES.ADMIN:
      return ROUTES.ADMIN.DASHBOARD;
    case USER_ROLES.ADVISOR:
      return ROUTES.ADVISOR.DASHBOARD;
    case USER_ROLES.INVESTOR:
      return ROUTES.INVESTOR.DASHBOARD;
    default:
      return ROUTES.PUBLIC.HOME;
  }
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount, options = {}) => {
  const { currency = APP_CONFIG.CURRENCY.DEFAULT } = options;
  return new Intl.NumberFormat(APP_CONFIG.CURRENCY.LOCALE, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: APP_CONFIG.CURRENCY.DECIMALS,
    maximumFractionDigits: APP_CONFIG.CURRENCY.DECIMALS,
  }).format(amount);
};

/**
 * Check if feature is enabled
 * @param {string} feature - Feature key
 * @returns {boolean} - Whether feature is enabled
 */
export const isFeatureEnabled = (feature) => {
  return APP_CONFIG.FEATURES[feature] || false;
};

// ============================================================================
// Export Configuration
// ============================================================================

export default {
  ENVIRONMENT,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  IS_STAGING,
  
  API_CONFIG,
  API_ENDPOINTS,
  
  APP_CONFIG,
  THIRD_PARTY_CONFIG,
  
  ROUTES,
  USER_ROLES,
  PERMISSIONS,
  
  VALIDATION_RULES,
  CACHE_KEYS,
  DEFAULTS,
  
  // Helper functions
  hasPermission,
  getApiUrl,
  getDashboardRoute,
  formatCurrency,
  isFeatureEnabled,
};