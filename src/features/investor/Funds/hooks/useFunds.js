import { useState, useEffect } from 'react';
import fundService from '../services/fundService';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFunds, selectFunds, selectLoading, selectError } from '../fundsSlice';

export const useFunds = () => {
  const dispatch = useDispatch();
  const funds = useSelector(selectFunds);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all',
    minReturns: 0,
    maxExpenseRatio: 2,
  });

  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchFunds());
  }, [dispatch]);

  const filteredFunds = funds.filter(fund => {
    const matchesCategory = filters.category === 'all' || fund.category === filters.category;
    const matchesRisk = filters.riskLevel === 'all' || fund.riskLevel === filters.riskLevel;
    const matchesReturns = fund.returns.oneYear >= filters.minReturns;
    const matchesExpenseRatio = fund.expenseRatio <= filters.maxExpenseRatio;

    return matchesCategory && matchesRisk && matchesReturns && matchesExpenseRatio;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'returns':
        return b.returns.oneYear - a.returns.oneYear;
      case 'aum':
        return b.aum - a.aum;
      case 'risk':
        const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      case 'expense':
        return a.expenseRatio - b.expenseRatio;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getFundById = (id) => {
    return funds.find(fund => fund.id === id);
  };

  const getFundCategories = () => {
    const categories = new Set(funds.map(fund => fund.category));
    return Array.from(categories);
  };

  const getTopPerformingFunds = (limit = 5) => {
    return [...funds]
      .sort((a, b) => b.returns.oneYear - a.returns.oneYear)
      .slice(0, limit);
  };

  return {
    funds: filteredFunds,
    allFunds: funds,
    loading,
    error,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    getFundById,
    getFundCategories,
    getTopPerformingFunds,
  };
};