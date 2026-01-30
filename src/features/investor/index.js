// Dashboard exports
export { 
  PortfolioOverview,
  RecentInvestments,
  PerformanceMetrics,
  QuickActions,
  Watchlist
} from './Dashboard/components';

export {
  useDashboard
} from './Dashboard/hooks';

export {
  default as investorDashboardReducer,
  fetchDashboardData,
  fetchPortfolioOverview,
  fetchRecentInvestments,
  fetchPerformanceMetrics,
  fetchWatchlist,
  clearError,
  updateWatchlist,
  updatePortfolioData,
  setLastUpdated,
  selectPortfolioData,
  selectRecentInvestments,
  selectPerformanceMetrics,
  selectWatchlist,
  selectDashboardLoading,
  selectDashboardError,
  selectLastUpdated
} from './Dashboard/dashboardSlice';

// Services
export { default as investorService } from './services/investorService';
EOF