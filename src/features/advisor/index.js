// Re-export all advisor components
export { default as AdvisorOverview } from './Dashboard/components/AdvisorOverview';
export { default as ClientPerformance } from './Dashboard/components/ClientPerformance';
export { default as RevenueMetrics } from './Dashboard/components/RevenueMetrics';
export { default as ClientList } from './Clients/components/ClientList';
export { default as ClientPortfolio } from './Clients/components/ClientPortfolio';
export { default as ClientMeetings } from './Clients/components/ClientMeetings';
export { default as ClientNotes } from './Clients/components/ClientNotes';
export { default as ClientReports } from './Reports/components/ClientReports';
export { default as PerformanceReports } from './Reports/components/PerformanceReports';
export { default as AnalyticsReports } from './Reports/components/AnalyticsReports';

// Re-export slices
export { default as advisorDashboardSlice } from './Dashboard/advisorDashboardSlice';
export { default as clientsSlice } from './Clients/clientsSlice';
export { default as advisorReportsSlice } from './Reports/advisorReportsSlice';

// Re-export hooks
export { useAdvisorDashboard } from './Dashboard/hooks/useAdvisorDashboard';
export { useClients } from './Clients/hooks/useClients';
export { useAdvisorReports } from './Reports/hooks/useAdvisorReports';