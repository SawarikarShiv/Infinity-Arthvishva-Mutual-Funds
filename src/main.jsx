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
import { store } from './store/store';
import { theme } from './styles/theme';
import i18n from './config/i18n';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import './styles/global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found.');
}

const root = ReactDOM.createRoot(rootElement);

// Note: Removed React.ErrorBoundary as it is not a built-in React component
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <I18nextProvider i18n={i18n}>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
  </React.StrictMode>
);