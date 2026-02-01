import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LinearProgress, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Import layouts (check if these exist in your structure)
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import InvestorLayout from './components/layouts/InvestorLayout';
import AdvisorLayout from './components/layouts/AdvisorLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Import components (check if these exist)
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import Toast from './components/common/UI/Toast';

// Import custom hooks
import { useAuthCheck } from './hooks/useAuthCheck';
import { usePermissions } from './hooks/usePermissions';

// Lazy load pages - UPDATED to match your exact structure
const HomePage = React.lazy(() => import('./pages/public/HomePage'));
const AboutPage = React.lazy(() => import('./pages/public/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/public/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/public/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/public/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/public/ResetPasswordPage'));

// Investor pages
const InvestorDashboardPage = React.lazy(() => import('./pages/investor/DashboardPage'));
const InvestorPortfolioPage = React.lazy(() => import('./pages/investor/PortfolioPage'));
const InvestorFundsPage = React.lazy(() => import('./pages/investor/FundsPage'));
const InvestorGoalsPage = React.lazy(() => import('./pages/investor/GoalsPage'));
const InvestorTransactionsPage = React.lazy(() => import('./pages/investor/TransactionsPage'));
const InvestorReportsPage = React.lazy(() => import('./pages/investor/ReportsPage'));

// Advisor pages
const AdvisorDashboardPage = React.lazy(() => import('./pages/advisor/DashboardPage'));
const AdvisorClientsPage = React.lazy(() => import('./pages/advisor/ClientsPage'));
const AdvisorReportsPage = React.lazy(() => import('./pages/advisor/ReportsPage'));

// Admin pages
const AdminDashboardPage = React.lazy(() => import('./pages/admin/DashboardPage'));
const AdminUsersPage = React.lazy(() => import('./pages/admin/UsersPage'));
const AdminSystemConfigPage = React.lazy(() => import('./pages/admin/SystemConfigPage'));
const AdminAuditLogsPage = React.lazy(() => import('./pages/admin/AuditLogsPage'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('App Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            textAlign: 'center',
            bgcolor: 'background.default',
          }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#dc2626', mb: 2 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'text.secondary', mb: 4, maxWidth: '600px' }}>
            We're sorry, but the application encountered an unexpected error. 
            Please try refreshing the page or contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Refresh Page
          </button>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: 'background.default',
    }}
  >
    <Box sx={{ width: '100%', maxWidth: 400, p: 3, textAlign: 'center' }}>
      <CircularProgress size={60} thickness={4} sx={{ mb: 3, color: 'primary.main' }} />
      <LinearProgress />
      <Box sx={{ mt: 2, color: 'text.secondary' }}>
        Loading Infinity Arthvishva Mutual Funds...
      </Box>
    </Box>
  </Box>
);

// Global loading overlay
const GlobalLoader = () => {
  const isLoading = useSelector((state) => state.loader?.isLoading || false);
  const loadingText = useSelector((state) => state.loader?.loadingText || 'Loading...');
  const blocking = useSelector((state) => state.loader?.blocking || false);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: blocking ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: blocking ? 'blur(4px)' : 'none',
      }}
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 3, color: 'primary.main' }} />
      <Box sx={{ color: blocking ? 'white' : 'text.primary', fontSize: '1.1rem', fontWeight: 500 }}>
        {loadingText}
      </Box>
      {blocking && (
        <Box sx={{ mt: 2, color: blocking ? 'rgba(255,255,255,0.8)' : 'text.secondary', fontSize: '0.9rem' }}>
          Please wait...
        </Box>
      )}
    </Box>
  );
};

// Maintenance mode component
const MaintenanceMode = () => {
  const { t } = useTranslation();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: 600 }}>
        <Box
          component="div"
          sx={{
            width: 200,
            height: 200,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            borderRadius: '50%',
            fontSize: '4rem',
          }}
        >
          🔧
        </Box>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, mb: 2, color: 'text.primary' }}>
          {t('maintenance.title', 'Under Maintenance')}
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'text.secondary', mb: 4 }}>
          {t('maintenance.message', 'We are currently performing scheduled maintenance. Please check back soon.')}
        </p>
        <Box sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
          {t('maintenance.contact', 'For urgent inquiries, contact support@infinityarthvishva.com')}
        </Box>
      </Box>
    </Box>
  );
};

// 404 Not Found component
const NotFoundPage = () => {
  const { t } = useTranslation();
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        textAlign: 'center',
        bgcolor: 'background.default',
      }}
    >
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: '#e5e7eb', mb: 2 }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, mb: 2, color: 'text.primary' }}>
        {t('errors.pageNotFound', 'Page Not Found')}
      </h2>
      <p style={{ color: '#6b7280', mb: 4, maxWidth: '500px' }}>
        {t('errors.pageNotFoundDescription', 'The page you are looking for does not exist or has been moved.')}
      </p>
      <a 
        href="/"
        style={{
          padding: '12px 24px',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          transition: 'background-color 0.2s',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
      >
        {t('navigation.backToHome', 'Back to Home')}
      </a>
    </Box>
  );
};

// Main App Component
function App() {
  const { t } = useTranslation();
  const maintenanceMode = useSelector((state) => state.app?.maintenanceMode || false);
  
  // Initialize auth check
  useAuthCheck();
  
  // Handle maintenance mode
  if (maintenanceMode) {
    return <MaintenanceMode />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <GlobalLoader />
        
        <ScrollToTop />
        
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes with Main Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth Routes with Auth Layout */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            </Route>

            {/* Investor Routes - Protected */}
            <Route
              path="/investor"
              element={
                <ProtectedRoute 
                  allowedRoles={['investor']}
                  fallbackPath="/login"
                >
                  <InvestorLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<InvestorDashboardPage />} />
              <Route path="portfolio" element={<InvestorPortfolioPage />} />
              <Route path="funds" element={<InvestorFundsPage />} />
              <Route path="goals" element={<InvestorGoalsPage />} />
              <Route path="transactions" element={<InvestorTransactionsPage />} />
              <Route path="reports" element={<InvestorReportsPage />} />
            </Route>

            {/* Advisor Routes - Protected */}
            <Route
              path="/advisor"
              element={
                <ProtectedRoute 
                  allowedRoles={['advisor']}
                  fallbackPath="/login"
                >
                  <AdvisorLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdvisorDashboardPage />} />
              <Route path="clients" element={<AdvisorClientsPage />} />
              <Route path="reports" element={<AdvisorReportsPage />} />
            </Route>

            {/* Admin Routes - Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute 
                  allowedRoles={['admin', 'super_admin']}
                  fallbackPath="/"
                  requiredPermissions={['manage_users', 'view_audit_logs']}
                >
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="system-config" element={<AdminSystemConfigPage />} />
              <Route path="audit-logs" element={<AdminAuditLogsPage />} />
            </Route>

            {/* Unauthorized Access Page */}
            <Route
              path="/unauthorized"
              element={
                <Box
                  sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    textAlign: 'center',
                  }}
                >
                  <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#dc2626', mb: 2 }}>
                    ⚠️
                  </h1>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, mb: 2 }}>
                    {t('errors.unauthorized', 'Unauthorized Access')}
                  </h2>
                  <p style={{ color: '#6b7280', mb: 4, maxWidth: '500px' }}>
                    {t('errors.unauthorizedDescription', 'You do not have permission to access this page.')}
                  </p>
                  <a 
                    href="/"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  >
                    {t('navigation.backToHome', 'Back to Home')}
                  </a>
                </Box>
              }
            />

            {/* 404 - Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        
        {/* Toast notifications */}
        <Toast />
      </div>
    </ErrorBoundary>
  );
}

export default App;