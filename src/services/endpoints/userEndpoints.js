// User management endpoints
const USER_ENDPOINTS = {
  // User data
  GET_USERS: '/users',
  GET_USER_BY_ID: '/users/:id',
  CREATE_USER: '/users',
  UPDATE_USER: '/users/:id',
  DELETE_USER: '/users/:id',
  
  // KYC
  GET_KYC_STATUS: '/users/kyc/status',
  UPLOAD_KYC_DOCUMENTS: '/users/kyc/documents',
  VERIFY_KYC: '/users/kyc/verify',
  GET_KYC_DOCUMENTS: '/users/kyc/documents',
  
  // Bank details
  GET_BANK_DETAILS: '/users/bank-details',
  ADD_BANK_DETAIL: '/users/bank-details',
  UPDATE_BANK_DETAIL: '/users/bank-details/:id',
  DELETE_BANK_DETAIL: '/users/bank-details/:id',
  VERIFY_BANK_DETAIL: '/users/bank-details/:id/verify',
  
  // Nominee
  GET_NOMINEES: '/users/nominees',
  ADD_NOMINEE: '/users/nominees',
  UPDATE_NOMINEE: '/users/nominees/:id',
  DELETE_NOMINEE: '/users/nominees/:id',
  
  // Preferences
  GET_PREFERENCES: '/users/preferences',
  UPDATE_PREFERENCES: '/users/preferences',
  
  // Activity
  GET_USER_ACTIVITY: '/users/:id/activity',
  GET_LOGIN_HISTORY: '/users/:id/login-history'
};

export default USER_ENDPOINTS;