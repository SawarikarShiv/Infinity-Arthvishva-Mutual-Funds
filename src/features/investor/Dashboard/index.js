export { default as PortfolioOverview } from './components/PortfolioOverview';
export { default as RecentInvestments } from './components/RecentInvestments';
export { default as PerformanceMetrics } from './components/PerformanceMetrics';
export { default as QuickActions } from './components/QuickActions';
export { default as Watchlist } from './components/Watchlist';

export { useDashboard } from './hooks/useDashboard';

export { default as investorDashboardReducer } from './dashboardSlice';
export {
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
} from './dashboardSlice';
EOF
