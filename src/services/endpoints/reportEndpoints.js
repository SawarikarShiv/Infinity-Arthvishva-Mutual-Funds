// Report generation endpoints
const REPORT_ENDPOINTS = {
  // Portfolio reports
  GENERATE_PORTFOLIO_SUMMARY: '/reports/portfolio/summary',
  GENERATE_PORTFOLIO_DETAILED: '/reports/portfolio/detailed',
  GENERATE_PORTFOLIO_PERFORMANCE: '/reports/portfolio/performance',
  
  // Transaction reports
  GENERATE_TRANSACTION_STATEMENT: '/reports/transactions/statement',
  GENERATE_TAX_STATEMENT: '/reports/transactions/tax',
  GENERATE_CAPITAL_GAINS_REPORT: '/reports/transactions/capital-gains',
  
  // Goal reports
  GENERATE_GOAL_PROGRESS_REPORT: '/reports/goals/progress',
  GENERATE_GOAL_FORECAST_REPORT: '/reports/goals/forecast',
  
  // Consolidated reports
  GENERATE_CONSOLIDATED_REPORT: '/reports/consolidated',
  GENERATE_ANNUAL_REPORT: '/reports/annual',
  
  // Admin reports
  GENERATE_USER_ACTIVITY_REPORT: '/reports/admin/user-activity',
  GENERATE_PLATFORM_PERFORMANCE_REPORT: '/reports/admin/platform-performance',
  GENERATE_REVENUE_REPORT: '/reports/admin/revenue',
  GENERATE_FUND_PERFORMANCE_REPORT: '/reports/admin/fund-performance',
  
  // Download reports
  DOWNLOAD_REPORT: '/reports/download/:reportId',
  GET_REPORT_HISTORY: '/reports/history',
  DELETE_REPORT: '/reports/:reportId'
};

export default REPORT_ENDPOINTS;