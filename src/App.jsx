import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store/store';
import { theme } from './styles/theme';
import './styles/global.scss';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import InvestorLayout from './components/layouts/InvestorLayout';
import AdvisorLayout from './components/layouts/AdvisorLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Protected Routes
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            </Route>

            {/* Investor routes */}
            <Route element={<ProtectedRoute allowedRoles={['investor']} />}>
              <Route element={<InvestorLayout />}>
                <Route path="/investor/dashboard" element={<InvestorDashboardPage />} />
                <Route path="/investor/portfolio" element={<PortfolioPage />} />
                <Route path="/investor/funds" element={<FundsPage />} />
                <Route path="/investor/goals" element={<GoalsPage />} />
                <Route path="/investor/transactions" element={<TransactionsPage />} />
                <Route path="/investor/reports" element={<ReportsPage />} />
              </Route>
            </Route>

            {/* Advisor routes */}
            <Route element={<ProtectedRoute allowedRoles={['advisor']} />}>
              <Route element={<AdvisorLayout />}>
                <Route path="/advisor/dashboard" element={<AdvisorDashboardPage />} />
                <Route path="/advisor/clients" element={<ClientsPage />} />
                <Route path="/advisor/reports" element={<AdvisorReportsPage />} />
              </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/config" element={<SystemConfigPage />} />
                <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;