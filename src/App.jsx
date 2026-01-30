import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, LinearProgress, Box } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

// Import store and theme
import { store } from './store';
import i18n from './i18n';
import { useTheme } from './hooks/useTheme';

// Import layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import InvestorLayout from './components/layouts/InvestorLayout';
import AdvisorLayout from './components/layouts/AdvisorLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Import components
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';
import ToastContainer from './components/common/UI/Toast';

// Import lazy-loaded pages for code splitting
const HomePage = React.lazy(() => import('./pages/public/HomePage'));
const AboutPage = React.lazy(() => import('./pages/public/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/public/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/public/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/public/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/public/ResetPasswordPage'));

const InvestorDashboardPage = React.lazy(() => import('./pages/investor/DashboardPage'));
const InvestorPortfolioPage = React.lazy(() => import('./pages/investor/PortfolioPage'));
const InvestorFundsPage = React.lazy(() => import('./pages/investor/FundsPage'));
const InvestorGoalsPage = React.lazy(() => import('./pages/investor/GoalsPage'));
const InvestorTransactionsPage = React.lazy(() => import('./pages/investor/TransactionsPage'));
const InvestorReportsPage = React.lazy(() => import('./pages/investor/ReportsPage'));

const AdvisorDashboardPage = React.lazy(() => import('./pages/advisor/DashboardPage'));
const AdvisorClientsPage = React.lazy(() => import('./pages/advisor/ClientsPage'));
const AdvisorReportsPage = React.lazy(() => import('./pages/advisor/ReportsPage'));

const AdminDashboardPage = React.lazy(() => import('./pages/admin/DashboardPage'));
const AdminUsersPage = React.lazy(() => import('./pages/admin/UsersPage'));
const AdminSystemConfigPage = React.lazy(() => import('./pages/admin/SystemConfigPage'));
const AdminAuditLogsPage = React.lazy(() => import('./pages/admin/AuditLogsPage'));

// Import styles
import './styles/index.scss';

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
    <Box sx={{ width: '100%', maxWidth: 400, p: 3 }}>
      <LinearProgress />
    </Box>
  </Box>
);

// Theme component
const AppTheme = ({ children }) => {
  const { theme: themeMode } = useTheme();
  
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'light' ? '#1976d2' : '#90caf9',
        light: themeMode === 'light' ? '#42a5f5' : '#bbdefb',
        dark: themeMode === 'light' ? '#1565c0' : '#42a5f5',
      },
      secondary: {
        main: themeMode === 'light' ? '#9c27b0' : '#ce93d8',
        light: themeMode === 'light' ? '#ba68c8' : '#f3e5f5',
        dark: themeMode === 'light' ? '#7b1fa2' : '#ab47bc',
      },
      success: {
        main: themeMode === 'light' ? '#4caf50' : '#81c784',
        light: themeMode === 'light' ? '#81c784' : '#a5d6a7',
        dark: themeMode === 'light' ? '#388e3c' : '#66bb6a',
      },
      error: {
        main: themeMode === 'light' ? '#f44336' : '#e57373',
        light: themeMode === 'light' ? '#e57373' : '#ef9a9a',
        dark: themeMode === 'light' ? '#d32f2f' : '#f44336',
      },
      warning: {
        main: themeMode === 'light' ? '#ff9800' : '#ffb74d',
        light: themeMode === 'light' ? '#ffb74d' : '#ffcc80',
        dark: themeMode === 'light' ? '#f57c00' : '#ff9800',
      },
      background: {
        default: themeMode === 'light' ? '#f5f5f5' : '#121212',
        paper: themeMode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: themeMode === 'light' ? '#212121' : '#ffffff',
        secondary: themeMode === 'light' ? '#757575' : '#b0b0b0',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: '3.5rem',
        lineHeight: 1.2,
        '@media (max-width:960px)': {
          fontSize: '2.5rem',
        },
        '@media (max-width:600px)': {
          fontSize: '2rem',
        },
      },
      h2: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.3,
        '@media (max-width:960px)': {
          fontSize: '2.25rem',
        },
        '@media (max-width:600px)': {
          fontSize: '1.75rem',
        },
      },
      h3: {
        fontWeight: 600,
        fontSize: '2.5rem',
        lineHeight: 1.4,
        '@media (max-width:960px)': {
          fontSize: '2rem',
        },
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
      },
      h4: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.4,
        '@media (max-width:960px)': {
          fontSize: '1.75rem',
        },
        '@media (max-width:600px)': {
          fontSize: '1.25rem',
        },
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.6,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.75,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.7,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
            textTransform: 'none',
            padding: '10px 24px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: themeMode === 'light' 
                ? '0px 4px 12px rgba(0, 0, 0, 0.1)'
                : '0px 4px 12px rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: themeMode === 'light'
              ? '0px 4px 20px rgba(0, 0, 0, 0.08)'
              : '0px 4px 20px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              boxShadow: themeMode === 'light'
                ? '0px 8px 32px rgba(0, 0, 0, 0.12)'
                : '0px 8px 32px rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${themeMode === 'light' ? '#e0e0e0' : '#333'}`,
          },
          head: {
            fontWeight: 600,
            backgroundColor: themeMode === 'light' ? '#f5f5f5' : '#1e1e1e',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: themeMode === 'light'
              ? '0px 4px 12px rgba(0, 0, 0, 0.08)'
              : '0px 4px 12px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            borderRight: `1px solid ${themeMode === 'light' ? '#e0e0e0' : '#333'}`,
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// Main App Component
const App = () => {
  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Initialize i18n language
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, []);

  return (
    <HelmetProvider>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <AppTheme>
            <CssBaseline />
            <Router>
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
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                  </Route>

                  {/* Investor Routes with Protected Access */}
                  <Route
                    path="/investor"
                    element={
                      <ProtectedRoute allowedRoles={['investor']}>
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

                  {/* Advisor Routes with Protected Access */}
                  <Route
                    path="/advisor"
                    element={
                      <ProtectedRoute allowedRoles={['advisor']}>
                        <AdvisorLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdvisorDashboardPage />} />
                    <Route path="clients" element={<AdvisorClientsPage />} />
                    <Route path="reports" element={<AdvisorReportsPage />} />
                  </Route>

                  {/* Admin Routes with Protected Access */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
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

                  {/* Catch all route - 404 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
              <ToastContainer />
            </Router>
          </AppTheme>
        </I18nextProvider>
      </Provider>
    </HelmetProvider>
  );
};

export default App;