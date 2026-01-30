import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions, selectTransactions, selectLoading, selectError } from '../transactionsSlice';

export const useTransactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    dateRange: 'month',
    category: 'all',
  });

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filters.type === 'all' || transaction.type === filters.type;
    const matchesStatus = filters.status === 'all' || transaction.status === filters.status;
    const matchesCategory = filters.category === 'all' || transaction.category === filters.category;
    
    // Filter by date range
    const transactionDate = new Date(transaction.date);
    const today = new Date();
    let startDate = new Date();
    
    switch (filters.dateRange) {
      case 'week':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0);
    }
    
    const matchesDate = transactionDate >= startDate && transactionDate <= today;
    
    return matchesType && matchesStatus && matchesCategory && matchesDate;
  });

  const getTransactionById = (id) => {
    return transactions.find(transaction => transaction.id === id);
  };

  const getTransactionSummary = () => {
    const summary = {
      totalPurchases: 0,
      totalRedemptions: 0,
      totalSIP: 0,
      totalTransactions: transactions.length,
    };
    
    transactions.forEach(transaction => {
      if (transaction.type === 'Purchase') {
        summary.totalPurchases += transaction.amount;
      } else if (transaction.type === 'Redemption') {
        summary.totalRedemptions += transaction.amount;
      } else if (transaction.type === 'SIP') {
        summary.totalSIP += transaction.amount;
      }
    });
    
    summary.netFlow = summary.totalPurchases + summary.totalSIP - summary.totalRedemptions;
    
    return summary;
  };

  const getMonthlySummary = () => {
    const monthlySummary = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlySummary[monthYear]) {
        monthlySummary[monthYear] = {
          purchases: 0,
          redemptions: 0,
          sip: 0,
          transactions: 0,
        };
      }
      
      monthlySummary[monthYear].transactions++;
      
      if (transaction.type === 'Purchase') {
        monthlySummary[monthYear].purchases += transaction.amount;
      } else if (transaction.type === 'Redemption') {
        monthlySummary[monthYear].redemptions += transaction.amount;
      } else if (transaction.type === 'SIP') {
        monthlySummary[monthYear].sip += transaction.amount;
      }
    });
    
    return Object.entries(monthlySummary)
      .map(([month, data]) => ({
        month,
        ...data,
        netFlow: data.purchases + data.sip - data.redemptions,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  };

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    loading,
    error,
    filters,
    setFilters,
    getTransactionById,
    getTransactionSummary,
    getMonthlySummary,
  };
};