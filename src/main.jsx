import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

// Import Redux store
import { store } from './store/store';

// Import theme
import { theme } from './styles/theme';

// Import i18n configuration
import i18n from './config/i18n';

// Import main App component
import App from './App';

// Import global styles
import './styles/global.scss';

// Create root element
const rootElement = document.getElementById('root');

// Import and initialize error tracking (optional)
if (import.meta.env.VITE_SENTRY_DSN) {
  import('./config/sentry').then(({ initSentry }) => initSentry());
}

// Check if root element exists
if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a <div id="root"></div> in your index.html');
}

// Create React root
const root = ReactDOM.createRoot(rootElement);

// Function to render the app
const renderApp = () => {
  root.render(
    <React.StrictMode>
      {/* Error Boundary for catching React errors */}
      <React.ErrorBoundary
        fallback={
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif'
          }}>
            <h1>Something went wrong</h1>
            <p>Please refresh the page or contact support if the problem persists.</p>
          </div>
        }
      >
        {/* Helmet Provider for managing document head */}
        <HelmetProvider>
          {/* Redux Provider */}
          <Provider store={store}>
            {/* Theme Provider */}
            <ThemeProvider theme={theme}>
              {/* CssBaseline for consistent baseline styles */}
              <CssBaseline />
              
              {/* Localization Provider for date pickers */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {/* Internationalization Provider */}
                <I18nextProvider i18n={i18n}>
                  {/* Snackbar Provider for notifications */}
                  <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    autoHideDuration={5000}
                    preventDuplicate
                  >
                    {/* Router Provider */}
                    <BrowserRouter>
                      {/* Main App Component */}
                      <App />
                    </BrowserRouter>
                  </SnackbarProvider>
                </I18nextProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </Provider>
        </HelmetProvider>
      </React.ErrorBoundary>
    </React.StrictMode>
  );
};

// Render the app
renderApp();

// Performance monitoring (optional)
if (import.meta.env.MODE === 'production') {
  // Report web vitals
  const reportWebVitals = (metric) => {
    // You can send metrics to your analytics service
    console.log(metric);
  };

  // Measure performance
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
}

// Hot Module Replacement (HMR) for development
if (import.meta.hot) {
  import.meta.hot.accept('./App', () => {
    // Force re-render when App component changes
    renderApp();
  });
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // You can send this to your error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You can send this to your error tracking service
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      (err) => {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}