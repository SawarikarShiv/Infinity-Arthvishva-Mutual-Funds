export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  
  // Investor routes
  INVESTOR_DASHBOARD: '/investor/dashboard',
  INVESTOR_PORTFOLIO: '/investor/portfolio',
  INVESTOR_FUNDS: '/investor/funds',
  INVESTOR_GOALS: '/investor/goals',
  INVESTOR_TRANSACTIONS: '/investor/transactions',
  INVESTOR_REPORTS: '/investor/reports',
  
  // Advisor routes
  ADVISOR_DASHBOARD: '/advisor/dashboard',
  ADVISOR_CLIENTS: '/advisor/clients',
  ADVISOR_REPORTS: '/advisor/reports',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_CONFIG: '/admin/config',
  ADMIN_AUDIT_LOGS: '/admin/audit-logs',
};

export const PROTECTED_ROUTES = {
  INVESTOR: [
    ROUTES.INVESTOR_DASHBOARD,
    ROUTES.INVESTOR_PORTFOLIO,
    ROUTES.INVESTOR_FUNDS,
    ROUTES.INVESTOR_GOALS,
    ROUTES.INVESTOR_TRANSACTIONS,
    ROUTES.INVESTOR_REPORTS,
  ],
  ADVISOR: [
    ROUTES.ADVISOR_DASHBOARD,
    ROUTES.ADVISOR_CLIENTS,
    ROUTES.ADVISOR_REPORTS,
  ],
  ADMIN: [
    ROUTES.ADMIN_DASHBOARD,
    ROUTES.ADMIN_USERS,
    ROUTES.ADMIN_CONFIG,
    ROUTES.ADMIN_AUDIT_LOGS,
  ],
};