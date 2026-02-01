// Additional exports for missing functions
export const updateWatchlist = addToWatchlist; // Alias for backward compatibility
export const updatePortfolioData = updatePortfolioValue; // Alias for backward compatibility
export const setLastUpdated = (date) => ({
  type: 'investorDashboard/setLastUpdated',
  payload: date
});

// Add this selector if it doesn't exist
export const selectPortfolioData = (state) => ({
  overview: state.investorDashboard.portfolioOverview,
  allocation: state.investorDashboard.assetAllocation,
  investments: state.investorDashboard.recentInvestments,
  watchlist: state.investorDashboard.watchlist,
  performance: state.investorDashboard.performanceMetrics
});