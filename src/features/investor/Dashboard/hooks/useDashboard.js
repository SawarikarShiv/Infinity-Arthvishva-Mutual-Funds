import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboardData } from '../dashboardSlice';

export const useDashboard = () => {
  const dispatch = useDispatch();
  const {
    portfolioData,
    recentInvestments,
    performanceMetrics,
    watchlist,
    isLoading,
    error
  } = useSelector(state => state.investorDashboard);

  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('1m');

  useEffect(() => {
    dispatch(fetchDashboardData({ filter, timeRange }));
  }, [dispatch, filter, timeRange]);

  const refreshData = () => {
    dispatch(fetchDashboardData({ filter, timeRange }));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  const addToWatchlist = (fundId) => {
    // Implement add to watchlist logic
    console.log('Add to watchlist:', fundId);
  };

  const removeFromWatchlist = (fundId) => {
    // Implement remove from watchlist logic
    console.log('Remove from watchlist:', fundId);
  };

  const getStatsSummary = () => {
    if (!portfolioData) return null;

    const totalInvestment = portfolioData.totalInvestment || 0;
    const currentValue = portfolioData.currentValue || 0;
    const returns = currentValue - totalInvestment;
    const returnsPercentage = totalInvestment > 0 ? (returns / totalInvestment) * 100 : 0;

    return {
      totalInvestment,
      currentValue,
      returns,
      returnsPercentage,
      xirr: portfolioData.xirr || 0,
      todayChange: portfolioData.todayChange || 0
    };
  };

  return {
    // Data
    portfolioData,
    recentInvestments: recentInvestments || [],
    performanceMetrics: performanceMetrics || {},
    watchlist: watchlist || [],
    
    // State
    isLoading,
    error,
    filter,
    timeRange,
    
    // Actions
    refreshData,
    handleFilterChange,
    handleTimeRangeChange,
    addToWatchlist,
    removeFromWatchlist,
    
    // Computed values
    statsSummary: getStatsSummary(),
    
    // Helper functions
    formatCurrency: (value) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    },
    
    formatPercentage: (value) => {
      return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
    }
  };
};
EOF