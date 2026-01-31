// Portfolio management endpoints
const PORTFOLIO_ENDPOINTS = {
  // Portfolio overview
  GET_PORTFOLIO_OVERVIEW: '/portfolio/overview',
  GET_PORTFOLIO_HOLDINGS: '/portfolio/holdings',
  GET_PORTFOLIO_PERFORMANCE: '/portfolio/performance',
  
  // Asset allocation
  GET_ASSET_ALLOCATION: '/portfolio/asset-allocation',
  GET_SECTOR_ALLOCATION: '/portfolio/sector-allocation',
  
  // Transactions
  GET_PORTFOLIO_TRANSACTIONS: '/portfolio/transactions',
  GET_RECENT_INVESTMENTS: '/portfolio/recent-investments',
  
  // Analysis
  GET_PORTFOLIO_ANALYSIS: '/portfolio/analysis',
  GET_RISK_ANALYSIS: '/portfolio/risk-analysis',
  GET_TAX_IMPLICATIONS: '/portfolio/tax-implications',
  
  // Actions
  REBALANCE_PORTFOLIO: '/portfolio/rebalance',
  GENERATE_PORTFOLIO_REPORT: '/portfolio/report',
  
  // Advisor portfolio
  GET_CLIENT_PORTFOLIOS: '/portfolio/clients',
  GET_CLIENT_PORTFOLIO_DETAILS: '/portfolio/clients/:clientId'
};

export default PORTFOLIO_ENDPOINTS;