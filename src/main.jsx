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

// Import store
import { store } from './store/store';

// Import theme (Material-UI)
import { theme } from './config/theme';

// Import i18n configuration
import i18n from './utils/i18n';

// Import main App component
import App from './App';

// Import global styles (CSS instead of SCSS)
import './styles/global.scss';

// Import initialization actions
import { initializeTheme } from './store/slices/themeSlice';
import { initializeAppState } from './store/slices/appSlice';

// Get root element
const rootElement = document.getElementById('root');

// Validate root element
if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a <div id="root"></div> in your index.html');
}

// Initialize app state
store.dispatch(initializeTheme());
store.dispatch(initializeAppState());

// Optional: Error tracking initialization (if using Sentry)
// if (import.meta.env.VITE_SENTRY_DSN) {
//   import('./config/sentry').then(({ initSentry }) => initSentry());
// }

// Create React root
const root = ReactDOM.createRoot(rootElement);

// Custom Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
    // You can log to error tracking service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          fontFamily: 'Inter, sans-serif',
          padding: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h1 style={{
              color: '#dc2626',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              ⚠️ Something went wrong
            </h1>
            <p style={{
              color: '#64748b',
              marginBottom: '1.5rem',
              fontSize: '1.125rem'
            }}>
              We apologize for the inconvenience. The application has encountered an error.
            </p>
            <div style={{
              backgroundColor: '#fef2f2',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              textAlign: 'left',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              color: '#b91c1c',
              maxHeight: '150px',
              overflow: 'auto'
            }}>
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Refresh Page
            </button>
            <p style={{
              marginTop: '1.5rem',
              color: '#94a3b8',
              fontSize: '0.875rem'
            }}>
              If the problem persists, please contact our support team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main render function
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <I18nextProvider i18n={i18n}>
                  <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    autoHideDuration={4000}
                    preventDuplicate
                    style={{
                      // Custom snackbar styles
                      borderRadius: '8px',
                      fontWeight: '500',
                    }}
                    Components={{
                      success: {
                        style: {
                          backgroundColor: '#10b981',
                          color: 'white',
                        },
                      },
                      error: {
                        style: {
                          backgroundColor: '#ef4444',
                          color: 'white',
                        },
                      },
                      warning: {
                        style: {
                          backgroundColor: '#f59e0b',
                          color: 'white',
                        },
                      },
                      info: {
                        style: {
                          backgroundColor: '#3b82f6',
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                  </SnackbarProvider>
                </I18nextProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// Initial render
renderApp();

// Optional: Performance monitoring
if (import.meta.env.MODE === 'production') {
  // Report web vitals
  const reportWebVitals = (metric) => {
    // Send to analytics service
    console.log('Web Vitals:', metric);
    
    // Example: Send to your backend
    // fetch('/api/analytics/web-vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metric),
    // });
  };

  // Measure Core Web Vitals
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
    console.log('App updated, re-rendering...');
    renderApp();
  });
  
  import.meta.hot.accept('./utils/i18n', () => {
    console.log('i18n updated, re-rendering...');
    renderApp();
  });
}

// Global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // Send to error tracking service
  // if (window.Sentry) {
  //   window.Sentry.captureException(event.error);
  // }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Send to error tracking service
  // if (window.Sentry) {
  //   window.Sentry.captureException(event.reason);
  // }
});

// Optional: Service Worker registration for PWA
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New update available
              console.log('New content is available; please refresh.');
            }
          });
        });
      },
      (error) => {
        console.log('ServiceWorker registration failed:', error);
      }
    );
  });
}

// Optional: Network status monitoring
window.addEventListener('online', () => {
  console.log('Application is online');
  // You can dispatch an action to update network status in Redux
  // store.dispatch(setNetworkStatus(true));
});

window.addEventListener('offline', () => {
  console.warn('Application is offline');
  // You can dispatch an action to update network status in Redux
  // store.dispatch(setNetworkStatus(false));
});

// Export for testing purposes
export { renderApp };