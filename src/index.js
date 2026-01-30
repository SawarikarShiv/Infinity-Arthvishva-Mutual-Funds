import React from 'react';
import ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';

// Import i18n configuration
import './i18n';

// Import store configuration
import { store } from './store';
import { initApp } from './store/slices/appSlice';

// Initialize app
store.dispatch(initApp());

// Disable React DevTools in production
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

// Create root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  // Report web vitals
  const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };

  // Enable performance monitoring in development
  reportWebVitals(console.log);
}

// Service worker registration for PWA
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Error handling
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Send error to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Implement error logging service here
    // Example: Sentry.captureException(event.error);
  }
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Send error to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Implement error logging service here
  }
});