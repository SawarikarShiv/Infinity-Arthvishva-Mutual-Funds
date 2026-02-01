import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, checkAuth, refreshToken } from '../features/auth/authSlice';
import { showToast } from '../store/slices/appSlice';
import { getUserRole, hasPermission, canAccessModule } from '../utils/constants/userRoles';
import { STORAGE_KEYS, SESSION_TIMEOUT } from '../utils/constants/appConstants';

/**
 * Authentication and authorization check hook
 * Provides comprehensive auth checking with session management
 */
export const useAuthCheck = (options = {}) => {
  const {
    requireAuth = false,
    requiredPermissions = [],
    requiredRole = null,
    redirectTo = '/login',
    redirectIfAuthenticated = false,
    checkSession = true,
    autoRefresh = true,
    showNotifications = true,
  } = options || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth state from Redux
  const {
    user,
    token,
    isAuthenticated,
    isLoading: authLoading,
    error: authError,
    refreshToken: refreshTokenValue,
  } = useSelector((state) => state.auth);

  // Get app state
  const { currentLanguage } = useSelector((state) => state.app);

  // Local state
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [inactivityTimer, setInactivityTimer] = useState(null);

  // Memoized values
  const userRole = useMemo(() => {
    return user?.role ? getUserRole(user.role) : null;
  }, [user]);

  const userPermissions = useMemo(() => {
    return userRole?.permissions || [];
  }, [userRole]);

  // Check permissions
  const hasRequiredPermissions = useMemo(() => {
    if (requiredPermissions.length === 0) return true;
    if (!user?.role) return false;

    return requiredPermissions.every(permission =>
      hasPermission(user.role, permission)
    );
  }, [user?.role, requiredPermissions]);

  // Check role
  const hasRequiredRole = useMemo(() => {
    if (!requiredRole) return true;
    if (!user?.role) return false;

    const currentRole = getUserRole(user.role);
    const requiredRoleObj = getUserRole(requiredRole);

    return currentRole?.level >= requiredRoleObj?.level;
  }, [user?.role, requiredRole]);

  // Check module access based on route
  const canAccessCurrentModule = useMemo(() => {
    const path = location.pathname;
    if (!user?.role) return true; // Public routes

    let module = 'public';
    if (path.startsWith('/investor')) module = 'investor';
    else if (path.startsWith('/advisor')) module = 'advisor';
    else if (path.startsWith('/admin')) module = 'admin';

    return canAccessModule(user.role, module);
  }, [user?.role, location.pathname]);

  // Check session expiry
  const checkSessionExpiry = useCallback(() => {
    if (!checkSession || !token) return true;

    try {
      const expiryTime = localStorage.getItem(STORAGE_KEYS.SESSION_EXPIRY);
      if (!expiryTime) return true;

      const now = Date.now();
      const expiry = parseInt(expiryTime, 10);
      
      setSessionExpiry(expiry);
      return now < expiry;
    } catch (error) {
      console.error('Error checking session expiry:', error);
      return false;
    }
  }, [checkSession, token]);

  // Refresh token
  const refreshAuthToken = useCallback(async () => {
    if (!autoRefresh || !refreshTokenValue || !isAuthenticated) return;

    try {
      const expiryTime = localStorage.getItem(STORAGE_KEYS.SESSION_EXPIRY);
      if (!expiryTime) return;

      const now = Date.now();
      const expiry = parseInt(expiryTime, 10);
      const timeUntilExpiry = expiry - now;

      // Refresh if token expires in less than 10 minutes
      if (timeUntilExpiry < 10 * 60 * 1000) {
        await dispatch(refreshToken()).unwrap();
        
        if (showNotifications) {
          dispatch(showToast({
            message: 'Session refreshed',
            type: 'success',
          }));
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      if (showNotifications) {
        dispatch(showToast({
          message: 'Session refresh failed. Please login again.',
          type: 'error',
        }));
      }
    }
  }, [autoRefresh, refreshTokenValue, isAuthenticated, dispatch, showNotifications]);

  // Update last activity
  const updateLastActivity = useCallback(() => {
    setLastActivity(Date.now());
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  }, []);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    if (checkSession && isAuthenticated) {
      const timer = setTimeout(() => {
        if (showNotifications) {
          dispatch(showToast({
            message: 'Session expired due to inactivity',
            type: 'warning',
          }));
        }
        
        dispatch(logout());
        navigate('/login', {
          state: { 
            from: location.pathname, 
            reason: 'inactivity',
            timestamp: Date.now(),
          },
          replace: true,
        });
      }, SESSION_TIMEOUT);

      setInactivityTimer(timer);
    }
  }, [checkSession, isAuthenticated, dispatch, navigate, location.pathname, showNotifications]);

  // Check authentication and access
  const performAuthCheck = useCallback(async () => {
    setIsChecking(true);

    try {
      // Check if session is valid
      const isSessionValid = checkSessionExpiry();
      
      if (!isSessionValid && isAuthenticated) {
        if (showNotifications) {
          dispatch(showToast({
            message: 'Session expired. Please login again.',
            type: 'error',
          }));
        }
        
        dispatch(logout());
        setHasAccess(false);
        return;
      }

      // Check authentication requirement
      if (requireAuth && !isAuthenticated) {
        navigate(redirectTo, {
          state: { from: location.pathname },
          replace: true,
        });
        setHasAccess(false);
        return;
      }

      // Redirect if authenticated but shouldn't be here
      if (redirectIfAuthenticated && isAuthenticated) {
        navigate(redirectTo, { replace: true });
        setHasAccess(false);
        return;
      }

      // Check role-based access
      if (requiredRole && !hasRequiredRole) {
        navigate('/unauthorized', { replace: true });
        setHasAccess(false);
        return;
      }

      // Check permission-based access
      if (requiredPermissions.length > 0 && !hasRequiredPermissions) {
        navigate('/unauthorized', { replace: true });
        setHasAccess(false);
        return;
      }

      // Check module access
      if (!canAccessCurrentModule) {
        navigate('/unauthorized', { replace: true });
        setHasAccess(false);
        return;
      }

      // All checks passed
      setHasAccess(true);
    } catch (error) {
      console.error('Auth check error:', error);
      setHasAccess(false);
      
      if (requireAuth && showNotifications) {
        dispatch(showToast({
          message: 'Authentication check failed',
          type: 'error',
        }));
      }
    } finally {
      setIsChecking(false);
    }
  }, [
    isAuthenticated,
    requireAuth,
    requiredRole,
    requiredPermissions,
    redirectIfAuthenticated,
    redirectTo,
    location.pathname,
    navigate,
    dispatch,
    checkSessionExpiry,
    hasRequiredRole,
    hasRequiredPermissions,
    canAccessCurrentModule,
    showNotifications,
  ]);

  // Initial auth check on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
        await performAuthCheck();
      } catch (error) {
        console.error('Initial auth check failed:', error);
      }
    };

    initializeAuth();
  }, [dispatch, performAuthCheck]);

  // Auto-refresh token
  useEffect(() => {
    if (isAuthenticated && autoRefresh) {
      // Initial refresh check
      refreshAuthToken();
      
      // Set up interval for periodic refresh (every 5 minutes)
      const refreshInterval = setInterval(refreshAuthToken, 5 * 60 * 1000);
      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated, autoRefresh, refreshAuthToken]);

  // Activity tracking for session timeout
  useEffect(() => {
    if (!checkSession || !isAuthenticated) return;

    const activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'touchstart',
      'scroll',
      'click',
      'wheel',
      'touchmove',
    ];

    const handleActivity = () => {
      updateLastActivity();
      resetInactivityTimer();
    };

    // Add event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Initialize inactivity timer
    resetInactivityTimer();

    // Check last activity on mount
    const lastActivityTime = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    if (lastActivityTime) {
      const inactiveTime = Date.now() - parseInt(lastActivityTime, 10);
      if (inactiveTime > SESSION_TIMEOUT / 2 && showNotifications) {
        dispatch(showToast({
          message: 'Your session will expire soon due to inactivity',
          type: 'warning',
        }));
      }
    }

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [checkSession, isAuthenticated, updateLastActivity, resetInactivityTimer, inactivityTimer, dispatch, showNotifications]);

  // User status checks
  const isKYCVerified = useMemo(() => {
    return user?.kycStatus === 'verified';
  }, [user?.kycStatus]);

  const isKYCRequired = useMemo(() => {
    return user?.role === 'investor' && !isKYCVerified;
  }, [user?.role, isKYCVerified]);

  const isOnboarded = useMemo(() => {
    if (!user) return false;
    
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const hasRequiredFields = requiredFields.every(field => user[field]);
    
    return hasRequiredFields && (user.role !== 'investor' || isKYCVerified);
  }, [user, isKYCVerified]);

  // Action functions
  const forceLogout = useCallback((reason = 'manual') => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    
    dispatch(logout());
    
    if (showNotifications) {
      dispatch(showToast({
        message: reason === 'manual' ? 'Logged out successfully' : `Logged out: ${reason}`,
        type: reason === 'manual' ? 'success' : 'info',
      }));
    }
    
    navigate('/login', {
      state: { 
        reason, 
        timestamp: Date.now(),
        from: location.pathname,
      },
      replace: true,
    });
  }, [dispatch, navigate, location.pathname, inactivityTimer, showNotifications]);

  const updateProfile = useCallback((updates) => {
    // This would dispatch an update action
    console.log('Profile update requested:', updates);
    // dispatch(updateUserProfile(updates));
  }, []);

  // Utility functions
  const can = useCallback((permission) => {
    return user?.role ? hasPermission(user.role, permission) : false;
  }, [user?.role]);

  const canAccess = useCallback((module) => {
    return user?.role ? canAccessModule(user.role, module) : false;
  }, [user?.role]);

  const hasAnyPermission = useCallback((permissions) => {
    if (!user?.role) return false;
    return permissions.some(permission => hasPermission(user.role, permission));
  }, [user?.role]);

  return {
    // Auth state
    user,
    token,
    isAuthenticated,
    isLoading: authLoading || isChecking,
    error: authError,
    
    // Access control
    hasAccess,
    hasRequiredPermissions,
    hasRequiredRole,
    canAccessCurrentModule,
    
    // User info
    userRole,
    userPermissions,
    isKYCVerified,
    isKYCRequired,
    isOnboarded,
    
    // User role checks
    isInvestor: user?.role === 'investor',
    isAdvisor: user?.role === 'advisor',
    isAdmin: user?.role === 'admin',
    isSuperAdmin: user?.role === 'super_admin',
    
    // Session management
    sessionExpiry,
    lastActivity,
    checkSessionExpiry,
    refreshAuthToken,
    updateLastActivity,
    
    // Actions
    forceLogout,
    updateProfile,
    performAuthCheck, // Manual trigger for auth check
    
    // Utility functions
    can,
    canAccess,
    hasAnyPermission,
    hasAllPermissions: hasRequiredPermissions,
  };
};

// Simplified version for basic auth checking
export const useSimpleAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const authState = useSelector((state) => state.auth);
  
  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
  };
};

// Hook for checking specific permissions
export const usePermission = (permission, options = {}) => {
  const { requireAll = false } = options;
  
  const { user, can, hasAnyPermission } = useAuthCheck();
  
  const hasPermission = useMemo(() => {
    if (!user) return false;
    
    if (Array.isArray(permission)) {
      if (requireAll) {
        return permission.every(p => can(p));
      } else {
        return hasAnyPermission(permission);
      }
    }
    
    return can(permission);
  }, [user, permission, requireAll, can, hasAnyPermission]);

  return {
    hasPermission,
    isLoading: !user,
  };
};

// Hook for module access checking
export const useModuleAccess = (module) => {
  const { user, canAccess } = useAuthCheck();
  
  const hasAccess = useMemo(() => {
    if (!user) return false;
    return canAccess(module);
  }, [user, module, canAccess]);

  return {
    hasAccess,
    isLoading: !user,
  };
};

// Hook for KYC status
export const useKYCStatus = () => {
  const { user, isKYCVerified, isKYCRequired } = useAuthCheck();
  
  const kycStatus = useMemo(() => {
    if (!user) return null;
    
    return {
      status: user.kycStatus || 'not_started',
      isVerified: isKYCVerified,
      isRequired: isKYCRequired,
      isPending: user.kycStatus === 'pending',
      isRejected: user.kycStatus === 'rejected',
      isExpired: user.kycStatus === 'expired',
      lastUpdated: user.kycUpdatedAt,
      documents: user.kycDocuments || [],
    };
  }, [user, isKYCVerified, isKYCRequired]);

  return kycStatus;
};

// Hook for session timeout warning
export const useSessionTimeout = (warningMinutes = 5) => {
  const { sessionExpiry, forceLogout } = useAuthCheck();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const warningTime = warningMinutes * 60 * 1000;

  useEffect(() => {
    if (!sessionExpiry) return;

    const updateTimeRemaining = () => {
      const now = Date.now();
      const remaining = sessionExpiry - now;
      
      setTimeRemaining(remaining);
      setShowWarning(remaining > 0 && remaining < warningTime);
      
      if (remaining <= 0) {
        forceLogout('session_expired');
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, [sessionExpiry, warningTime, forceLogout]);

  const formatTime = useCallback(() => {
    if (!timeRemaining || timeRemaining <= 0) return '00:00';
    
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  const extendSession = useCallback(() => {
    // This would typically call an API to extend the session
    console.log('Session extension requested');
    // dispatch(extendSession());
  }, []);

  return {
    timeRemaining,
    showWarning,
    formatTime,
    extendSession,
    minutesRemaining: timeRemaining ? Math.ceil(timeRemaining / 60000) : 0,
    secondsRemaining: timeRemaining ? Math.ceil((timeRemaining % 60000) / 1000) : 0,
  };
};

export default useAuthCheck;