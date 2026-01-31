/**
 * User Roles and Permissions
 */
export const USER_ROLES = {
  SUPER_ADMIN: {
    id: 'super_admin',
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    level: 100,
    permissions: [
      '*'
    ],
    accessibleModules: [
      'dashboard',
      'user_management',
      'fund_management',
      'transaction_management',
      'reporting',
      'system_config',
      'audit_logs',
      'admin_settings'
    ]
  },
  
  ADMIN: {
    id: 'admin',
    name: 'Administrator',
    description: 'Administrative access with most permissions',
    level: 90,
    permissions: [
      'view_all_users',
      'manage_users',
      'view_all_funds',
      'manage_funds',
      'view_all_transactions',
      'manage_transactions',
      'generate_reports',
      'view_audit_logs'
    ],
    accessibleModules: [
      'dashboard',
      'user_management',
      'fund_management',
      'transaction_management',
      'reporting',
      'audit_logs'
    ]
  },
  
  ADVISOR: {
    id: 'advisor',
    name: 'Financial Advisor',
    description: 'Financial advisor with client management access',
    level: 80,
    permissions: [
      'manage_clients',
      'view_client_portfolios',
      'create_investment_plans',
      'recommend_funds',
      'view_advisor_reports',
      'communicate_with_clients'
    ],
    accessibleModules: [
      'advisor_dashboard',
      'client_management',
      'portfolio_review',
      'investment_planning',
      'advisor_reports',
      'client_communication'
    ]
  },
  
  INVESTOR: {
    id: 'investor',
    name: 'Investor',
    description: 'Individual investor with personal account access',
    level: 50,
    permissions: [
      'view_own_portfolio',
      'make_investments',
      'view_transaction_history',
      'set_financial_goals',
      'view_performance_reports',
      'update_profile',
      'contact_advisor'
    ],
    accessibleModules: [
      'investor_dashboard',
      'portfolio',
      'fund_explorer',
      'transactions',
      'goals',
      'reports',
      'profile'
    ]
  },
  
  GUEST: {
    id: 'guest',
    name: 'Guest User',
    description: 'Limited access for browsing funds and information',
    level: 10,
    permissions: [
      'browse_funds',
      'use_calculators',
      'view_public_content',
      'register_account'
    ],
    accessibleModules: [
      'home',
      'fund_explorer',
      'calculators',
      'about',
      'contact'
    ]
  }
};

// User Roles Array for dropdowns
export const USER_ROLES_ARRAY = Object.values(USER_ROLES).map(role => ({
  value: role.id,
  label: role.name,
  description: role.description,
  level: role.level
}));

// User Status
export const USER_STATUS = {
  ACTIVE: {
    id: 'active',
    name: 'Active',
    description: 'User account is active and can access the system',
    color: '#10B981', // Green
    icon: '✅'
  },
  
  INACTIVE: {
    id: 'inactive',
    name: 'Inactive',
    description: 'User account is temporarily inactive',
    color: '#F59E0B', // Amber
    icon: '⏸️'
  },
  
  SUSPENDED: {
    id: 'suspended',
    name: 'Suspended',
    description: 'User account is suspended due to policy violation',
    color: '#EF4444', // Red
    icon: '🚫'
  },
  
  PENDING_VERIFICATION: {
    id: 'pending_verification',
    name: 'Pending Verification',
    description: 'User account is awaiting verification',
    color: '#3B82F6', // Blue
    icon: '⏳'
  },
  
  LOCKED: {
    id: 'locked',
    name: 'Locked',
    description: 'User account is locked due to security reasons',
    color: '#6B7280', // Gray
    icon: '🔒'
  },
  
  DELETED: {
    id: 'deleted',
    name: 'Deleted',
    description: 'User account has been deleted',
    color: '#000000', // Black
    icon: '🗑️'
  }
};

// User Status Array
export const USER_STATUS_ARRAY = Object.values(USER_STATUS).map(status => ({
  value: status.id,
  label: status.name,
  description: status.description,
  color: status.color,
  icon: status.icon
}));

// KYC Status
export const KYC_STATUS = {
  NOT_STARTED: {
    id: 'not_started',
    name: 'Not Started',
    description: 'KYC process has not been started',
    color: '#6B7280', // Gray
    icon: '📝'
  },
  
  IN_PROGRESS: {
    id: 'in_progress',
    name: 'In Progress',
    description: 'KYC process is in progress',
    color: '#3B82F6', // Blue
    icon: '🔄'
  },
  
  PENDING: {
    id: 'pending',
    name: 'Pending Verification',
    description: 'KYC documents submitted, awaiting verification',
    color: '#F59E0B', // Amber
    icon: '⏳'
  },
  
  VERIFIED: {
    id: 'verified',
    name: 'Verified',
    description: 'KYC verification completed successfully',
    color: '#10B981', // Green
    icon: '✅'
  },
  
  REJECTED: {
    id: 'rejected',
    name: 'Rejected',
    description: 'KYC verification rejected',
    color: '#EF4444', // Red
    icon: '❌'
  },
  
  EXPIRED: {
    id: 'expired',
    name: 'Expired',
    description: 'KYC verification has expired',
    color: '#8B5CF6', // Purple
    icon: '📅'
  }
};

// KYC Status Array
export const KYC_STATUS_ARRAY = Object.values(KYC_STATUS).map(status => ({
  value: status.id,
  label: status.name,
  description: status.description,
  color: status.color,
  icon: status.icon
}));

// User Titles
export const USER_TITLES = [
  { value: 'mr', label: 'Mr.' },
  { value: 'mrs', label: 'Mrs.' },
  { value: 'ms', label: 'Ms.' },
  { value: 'dr', label: 'Dr.' },
  { value: 'prof', label: 'Prof.' }
];

// Marital Status
export const MARITAL_STATUS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'separated', label: 'Separated' }
];

// Employment Types
export const EMPLOYMENT_TYPES = [
  { value: 'salaried', label: 'Salaried' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'business', label: 'Business' },
  { value: 'professional', label: 'Professional' },
  { value: 'retired', label: 'Retired' },
  { value: 'student', label: 'Student' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'homemaker', label: 'Homemaker' }
];

// Income Ranges (Annual in INR)
export const INCOME_RANGES = [
  { value: '0-500000', label: 'Below ₹5 Lakhs' },
  { value: '500000-1000000', label: '₹5-10 Lakhs' },
  { value: '1000000-2500000', label: '₹10-25 Lakhs' },
  { value: '2500000-5000000', label: '₹25-50 Lakhs' },
  { value: '5000000-10000000', label: '₹50 Lakhs - ₹1 Crore' },
  { value: '10000000+', label: 'Above ₹1 Crore' }
];

// Educational Qualifications
export const EDUCATIONAL_QUALIFICATIONS = [
  { value: 'below_10th', label: 'Below 10th' },
  { value: '10th', label: '10th Pass' },
  { value: '12th', label: '12th Pass' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'post_graduate', label: 'Post Graduate' },
  { value: 'professional', label: 'Professional Degree' },
  { value: 'doctorate', label: 'Doctorate' }
];

// Check if user has permission
export const hasPermission = (userRole, permission) => {
  const role = USER_ROLES[userRole];
  if (!role) return false;
  
  // Super admin has all permissions
  if (role.id === 'super_admin') return true;
  
  return role.permissions.includes('*') || role.permissions.includes(permission);
};

// Check if user can access module
export const canAccessModule = (userRole, moduleName) => {
  const role = USER_ROLES[userRole];
  if (!role) return false;
  
  return role.accessibleModules.includes(moduleName);
};

// Get user role by ID
export const getUserRoleById = (roleId) => {
  return USER_ROLES[roleId] || USER_ROLES.GUEST;
};

// Get user status by ID
export const getUserStatusById = (statusId) => {
  return USER_STATUS[statusId] || USER_STATUS.INACTIVE;
};

// Get KYC status by ID
export const getKYCStatusById = (statusId) => {
  return KYC_STATUS[statusId] || KYC_STATUS.NOT_STARTED;
};

// Get next KYC status
export const getNextKYCStatus = (currentStatus) => {
  const statusFlow = {
    'not_started': 'in_progress',
    'in_progress': 'pending',
    'pending': 'verified',
    'verified': 'expired',
    'rejected': 'in_progress',
    'expired': 'in_progress'
  };
  
  return statusFlow[currentStatus] || currentStatus;
};