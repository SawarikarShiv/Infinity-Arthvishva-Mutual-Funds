import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoals, selectGoals, selectLoading, selectError } from '../goalsSlice';

export const useGoals = () => {
  const dispatch = useDispatch();
  const goals = useSelector(selectGoals);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    status: 'all',
  });

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const filteredGoals = goals.filter(goal => {
    const matchesCategory = filters.category === 'all' || goal.category === filters.category;
    const matchesPriority = filters.priority === 'all' || goal.priority === filters.priority;
    const matchesStatus = filters.status === 'all' || goal.status === filters.status;
    
    return matchesCategory && matchesPriority && matchesStatus;
  });

  const getGoalById = (id) => {
    return goals.find(goal => goal.id === id);
  };

  const getGoalsByCategory = () => {
    const categories = {};
    goals.forEach(goal => {
      if (!categories[goal.category]) {
        categories[goal.category] = [];
      }
      categories[goal.category].push(goal);
    });
    return categories;
  };

  const calculateOverallProgress = () => {
    if (goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0);
    return totalProgress / goals.length;
  };

  const getUpcomingGoals = (limit = 3) => {
    const now = new Date();
    return goals
      .filter(goal => new Date(goal.targetDate) > now)
      .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
      .slice(0, limit);
  };

  return {
    goals: filteredGoals,
    allGoals: goals,
    loading,
    error,
    filters,
    setFilters,
    getGoalById,
    getGoalsByCategory,
    calculateOverallProgress,
    getUpcomingGoals,
  };
};