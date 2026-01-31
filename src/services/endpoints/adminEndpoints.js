// Admin management endpoints
const ADMIN_ENDPOINTS = {
  // User management
  GET_ALL_USERS: '/admin/users',
  UPDATE_USER_STATUS: '/admin/users/:id/status',
  BULK_USER_ACTIONS: '/admin/users/bulk-actions',
  
  // Fund management
  CREATE_FUND: '/admin/funds',
  UPDATE_FUND: '/admin/funds/:id',
  DELETE_FUND: '/admin/funds/:id',
  UPDATE_FUND_NAV: '/admin/funds/:id/nav',
  BULK_UPDATE_FUNDS: '/admin/funds/bulk-update',
  
  // Transaction management
  GET_ALL_TRANSACTIONS_ADMIN: '/admin/transactions',
  PROCESS_TRANSACTION: '/admin/transactions/:id/process',
  REVERSE_TRANSACTION: '/admin/transactions/:id/reverse',
  
  // System configuration
  GET_SYSTEM_SETTINGS: '/admin/settings',
  UPDATE_SYSTEM_SETTINGS: '/admin/settings',
  GET_MAINTENANCE_STATUS: '/admin/maintenance',
  SET_MAINTENANCE_MODE: '/admin/maintenance',
  
  // Audit logs
  GET_AUDIT_LOGS: '/admin/audit-logs',
  GET_AUDIT_LOG_DETAILS: '/admin/audit-logs/:id',
  EXPORT_AUDIT_LOGS: '/admin/audit-logs/export',
  
  // Backups
  CREATE_BACKUP: '/admin/backup',
  GET_BACKUPS: '/admin/backups',
  RESTORE_BACKUP: '/admin/backup/:id/restore',
  DELETE_BACKUP: '/admin/backup/:id',
  
  // Analytics
  GET_PLATFORM_ANALYTICS: '/admin/analytics',
  GET_USER_ANALYTICS: '/admin/analytics/users',
  GET_TRANSACTION_ANALYTICS: '/admin/analytics/transactions',
  GET_REVENUE_ANALYTICS: '/admin/analytics/revenue',
  
  // Notifications
  SEND_BULK_NOTIFICATIONS: '/admin/notifications/send',
  GET_NOTIFICATION_HISTORY: '/admin/notifications/history'
};

export default ADMIN_ENDPOINTS;