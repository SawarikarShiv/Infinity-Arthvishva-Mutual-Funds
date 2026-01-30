import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReports, selectReports, selectLoading, selectError } from '../reportsSlice';

export const useReports = () => {
  const dispatch = useDispatch();
  const reports = useSelector(selectReports);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [filters, setFilters] = useState({
    type: 'all',
    period: 'month',
    year: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const filteredReports = reports.filter(report => {
    const matchesType = filters.type === 'all' || report.type === filters.type;
    const matchesYear = report.year === filters.year;
    
    return matchesType && matchesYear;
  });

  const getReportById = (id) => {
    return reports.find(report => report.id === id);
  };

  const generateTaxReport = (financialYear) => {
    // This would call an API to generate tax report
    console.log(`Generating tax report for FY ${financialYear}`);
    return {
      id: `TAX-${financialYear}`,
      type: 'tax',
      year: financialYear,
      generatedAt: new Date().toISOString(),
      status: 'generated',
    };
  };

  const generatePortfolioReport = (period) => {
    // This would call an API to generate portfolio report
    console.log(`Generating portfolio report for ${period}`);
    return {
      id: `PORT-${Date.now()}`,
      type: 'portfolio',
      period,
      generatedAt: new Date().toISOString(),
      status: 'generated',
    };
  };

  const getReportTypes = () => {
    const types = new Set(reports.map(report => report.type));
    return Array.from(types);
  };

  const getAvailableYears = () => {
    const years = new Set(reports.map(report => report.year));
    return Array.from(years).sort((a, b) => b - a);
  };

  return {
    reports: filteredReports,
    allReports: reports,
    loading,
    error,
    filters,
    setFilters,
    getReportById,
    generateTaxReport,
    generatePortfolioReport,
    getReportTypes,
    getAvailableYears,
  };
};