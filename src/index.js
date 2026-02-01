// src/index.js - Updated with safety check for the external package

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { store } from './store';
import './styles/global.scss';

// Disable React DevTools in production with safety check
if (process.env.NODE_ENV === 'production') {
  // Try to disable React DevTools if package is available
  // This will be handled externally if the package is installed
  // If not, it will silently fail
  try {
    // Dynamic import with error handling
    import('@fvilers/disable-react-devtools')
      .then(({ disableReactDevTools }) => {
        if (typeof disableReactDevTools === 'function') {
          disableReactDevTools();
          console.log('React DevTools disabled in production');
        }
      })
      .catch((error) => {
        // Silently fail - package might not be installed or bundled externally
        console.debug('Could not disable React DevTools:', error.message);
      });
  } catch (error) {
    // Fallback: Manual disabling if package is not available
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
      // Override all functions to no-op
      Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__).forEach(key => {
        if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] === 'function') {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = () => {};
        } else if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] === 'object') {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = null;
        }
      });
    }
  }
}

// Create root
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// Render app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Error boundary for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

// Log build info in development
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode active');
  console.log('App version:', process.env.VITE_APP_VERSION || '1.0.0');
}

// Optional: Add service worker registration
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}