import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvisorDashboardData } from '../advisorDashboardSlice';

export const useAdvisorDashboard = () => {
  const dispatch = useDispatch();
  const {
    data,
    loading,
    error,
    stats,
    performance,
    recentActivities
  } = useSelector((state) => state.advisorDashboard);

  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    dispatch(fetchAdvisorDashboardData(timeRange));
  }, [dispatch, timeRange]);

  const refreshData = () => {
    dispatch(fetchAdvisorDashboardData(timeRange));
  };

  const updateTimeRange = (range) => {
    setTimeRange(range);
  };

  return {
    // Data
    dashboardData: data,
    stats,
    performance,
    recentActivities,
    
    // State
    loading,
    error,
    timeRange,
    
    // Actions
    refreshData,
    updateTimeRange,
  };
};