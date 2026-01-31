/**
 * Theme management hook
 * Handles light/dark mode switching with system preference detection
 */
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.current);
  
  const [systemTheme, setSystemTheme] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Get saved theme from localStorage or detect system preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      dispatch(setTheme(initialTheme));
    }
  }, [dispatch]);

  // Watch for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    // Set initial value
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    localStorage.setItem('theme', newTheme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { detail: newTheme }));
  }, [theme, dispatch]);

  // Set specific theme
  const setLightTheme = useCallback(() => {
    dispatch(setTheme('light'));
    localStorage.setItem('theme', 'light');
    window.dispatchEvent(new CustomEvent('themechange', { detail: 'light' }));
  }, [dispatch]);

  const setDarkTheme = useCallback(() => {
    dispatch(setTheme('dark'));
    localStorage.setItem('theme', 'dark');
    window.dispatchEvent(new CustomEvent('themechange', { detail: 'dark' }));
  }, [dispatch]);

  // Reset to system theme
  const resetToSystemTheme = useCallback(() => {
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    dispatch(setTheme(systemTheme));
    window.dispatchEvent(new CustomEvent('themechange', { detail: systemTheme }));
  }, [dispatch]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light-theme', 'dark-theme');
    
    // Add current theme class
    root.classList.add(`${theme}-theme`);
    
    // Set data-theme attribute for CSS variables
    root.setAttribute('data-theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const themeColor = theme === 'dark' ? '#0f172a' : '#ffffff';
      metaThemeColor.setAttribute('content', themeColor);
    }
  }, [theme, mounted]);

  return {
    theme,
    systemTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    resetToSystemTheme,
    mounted,
  };
};

// Hook to listen for theme changes
export const useThemeListener = (callback) => {
  useEffect(() => {
    const handleThemeChange = (event) => {
      callback(event.detail);
    };
    
    window.addEventListener('themechange', handleThemeChange);
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, [callback]);
};

// Hook to get theme-aware styles
export const useThemeStyles = () => {
  const { theme } = useTheme();
  
  return {
    colors: {
      background: theme === 'dark' ? '#0f172a' : '#ffffff',
      cardBackground: theme === 'dark' ? '#1e293b' : '#ffffff',
      text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      textSecondary: theme === 'dark' ? '#cbd5e1' : '#475569', // Fixed: Added colon
      border: theme === 'dark' ? '#334155' : '#e2e8f0',
      primary: theme === 'dark' ? '#60a5fa' : '#3b82f6',
      success: theme === 'dark' ? '#4ade80' : '#22c55e',
      warning: theme === 'dark' ? '#fbbf24' : '#f59e0b',
      danger: theme === 'dark' ? '#f87171' : '#ef4444',
    },
    shadows: {
      sm: theme === 'dark' 
        ? '0 1px 3px 0 rgba(0, 0, 0, 0.5)'
        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      md: theme === 'dark'
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: theme === 'dark'
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  };
};