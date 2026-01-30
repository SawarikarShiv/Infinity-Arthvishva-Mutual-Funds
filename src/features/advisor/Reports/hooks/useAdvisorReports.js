import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchReports, 
  generateReport, 
  downloadReport,
  fetchAnalytics 
} from '../advisorReportsSlice';

export const useAdvisorReports = () => {
  const dispatch = useDispatch();
  const {
    reports,
    analytics,
    loading,
    error,
    generating,
    downloadProgress
  } = useSelector((state) => state.advisorReports);

  const [filters, setFilters] = useState({
    reportType: 'all',
    dateRange: 'month',
    clientId: null,
  });

  useEffect(() => {
    dispatch(fetchReports(filters));
    dispatch(fetchAnalytics(filters.dateRange));
  }, [dispatch, filters.dateRange]);

  const handleGenerateReport = async (reportConfig) => {
    try {
      const result = await dispatch(generateReport(reportConfig)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleDownloadReport = async (reportId) => {
    try {
      const result = await dispatch(downloadReport(reportId)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getReportStats = () => {
    const totalReports = reports.length;
    const generated = reports.filter(r => r.status === 'Generated').length;
    const pending = reports.filter(r => r.status === 'Pending').length;
    const failed = reports.filter(r => r.status === 'Failed').length;

    return { totalReports, generated, pending, failed };
  };

  return {
    // Data
    reports,
    analytics,
    
    // State
    loading,
    error,
    generating,
    downloadProgress,
    filters,
    
    // Stats
    reportStats: getReportStats(),
    
    // Actions
    handleGenerateReport,
    handleDownloadReport,
    handleUpdateFilters,
    refreshReports: () => dispatch(fetchReports(filters)),
    refreshAnalytics: () => dispatch(fetchAnalytics(filters.dateRange)),
  };
};