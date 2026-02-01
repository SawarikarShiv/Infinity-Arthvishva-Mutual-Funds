// src/index.js - UPDATED VERSION WITHOUT MISSING PACKAGES

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import react-toastify (make sure it's installed: npm install react-toastify)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import store from './store/store'; // REMOVE the { }
import './styles/global.scss';

// Disable React DevTools in production (without external package)
if (process.env.NODE_ENV === 'production') {
  // Simple method to disable React DevTools in production
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    // Override all functions to no-op
    for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      if (prop === 'renderers') {
        // This gives React DevTools the ability to work with the renderers.
        // By overriding this array, we prevent it from seeing any renderers.
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
      } else if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === 'function') {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = () => {};
      }
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
  console.log('App version:', import.meta.env.VITE_APP_VERSION || '1.0.0');
}

// Optional: Add service worker registration
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}