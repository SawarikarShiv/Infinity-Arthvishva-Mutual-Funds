import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPortfolio,
  fetchHoldings,
  fetchTransactionHistory,
  fetchAssetAllocation,
  fetchPortfolioPerformance,
  setFilters,
  selectPortfolio,
  selectHoldings,
  selectTransactions,
  selectAssetAllocation,
  selectPerformance,
  selectSummary,
  selectIsLoading,
  selectError,
  selectFilters,
} from '../portfolioSlice';

export const usePortfolio = () => {
  const dispatch = useDispatch();
  
  const portfolio = useSelector(selectPortfolio);
  const holdings = useSelector(selectHoldings);
  const transactions = useSelector(selectTransactions);
  const assetAllocation = useSelector(selectAssetAllocation);
  const performance = useSelector(selectPerformance);
  const summary = useSelector(selectSummary);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filters = useSelector(selectFilters);
  
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [transactionFilters, setTransactionFilters] = useState({
    startDate: null,
    endDate: new Date(),
    type: 'all',
  });

  // Load portfolio data on mount
  useEffect(() => {
    dispatch(fetchPortfolio());
    dispatch(fetchHoldings(filters));
    dispatch(fetchAssetAllocation());
    dispatch(fetchPortfolioPerformance('1y'));
  }, [dispatch]);

  // Fetch holdings when filters change
  useEffect(() => {
    dispatch(fetchHoldings(filters));
  }, [dispatch, filters]);

  // Fetch transactions when filters change
  useEffect(() => {
    dispatch(fetchTransactionHistory(transactionFilters));
  }, [dispatch, transactionFilters]);

  const updateFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  const loadPerformanceData = useCallback((period) => {
    dispatch(fetchPortfolioPerformance(period));
  }, [dispatch]);

  const refreshPortfolio = useCallback(() => {
    dispatch(fetchPortfolio());
    dispatch(fetchHoldings(filters));
    dispatch(fetchAssetAllocation());
  }, [dispatch, filters]);

  // Calculate derived data
  const calculateTotalValue = useCallback(() => {
    return holdings.reduce((total, holding) => total + holding.currentValue, 0);
  }, [holdings]);

  const calculateTotalInvestment = useCallback(() => {
    return holdings.reduce((total, holding) => total + holding.investedAmount, 0);
  }, [holdings]);

  const calculateTotalReturns = useCallback(() => {
    return calculateTotalValue() - calculateTotalInvestment();
  }, [calculateTotalValue, calculateTotalInvestment]);

  const calculateReturnsPercentage = useCallback(() => {
    const investment = calculateTotalInvestment();
    if (investment === 0) return 0;
    return (calculateTotalReturns() / investment) * 100;
  }, [calculateTotalInvestment, calculateTotalReturns]);

  // Get top performing holdings
  const getTopPerformers = useCallback((limit = 5) => {
    return [...holdings]
      .sort((a, b) => b.returnsPercentage - a.returnsPercentage)
      .slice(0, limit);
  }, [holdings]);

  // Get underperforming holdings
  const getUnderperformers = useCallback((limit = 5) => {
    return [...holdings]
      .sort((a, b) => a.returnsPercentage - b.returnsPercentage)
      .slice(0, limit);
  }, [holdings]);

  return {
    // State
    portfolio,
    holdings,
    transactions,
    assetAllocation,
    performance,
    summary,
    isLoading,
    error,
    filters,
    selectedHolding,
    transactionFilters,
    
    // Setters
    setSelectedHolding,
    setTransactionFilters,
    
    // Actions
    updateFilters,
    loadPerformanceData,
    refreshPortfolio,
    
    // Derived data
    totalValue: calculateTotalValue(),
    totalInvestment: calculateTotalInvestment(),
    totalReturns: calculateTotalReturns(),
    returnsPercentage: calculateReturnsPercentage(),
    topPerformers: getTopPerformers(),
    underperformers: getUnderperformers(),
    
    // Helper functions
    getTopPerformers,
    getUnderperformers,
  };
};

export default usePortfolio;

// Hook for portfolio data only
export const usePortfolioData = () => {
  return useSelector((state) => ({
    portfolio: selectPortfolio(state),
    holdings: selectHoldings(state),
    assetAllocation: selectAssetAllocation(state),
    performance: selectPerformance(state),
    summary: selectSummary(state),
  }));
};

// Hook for portfolio actions
export const usePortfolioActions = () => {
  const dispatch = useDispatch();
  
  return {
    fetchPortfolio: () => dispatch(fetchPortfolio()),
    fetchHoldings: (filters) => dispatch(fetchHoldings(filters)),
    fetchAssetAllocation: () => dispatch(fetchAssetAllocation()),
    fetchPerformance: (period) => dispatch(fetchPortfolioPerformance(period)),
    updateFilters: (filters) => dispatch(setFilters(filters)),
  };
};