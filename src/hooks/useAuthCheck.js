/**
 * Authentication and authorization check hook
 * Verifies user authentication status, permissions, and session validity
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, refreshToken } from '../features/auth/authSlice';
import { hasPermission, canAccessModule, getUserRoleById } from '../utils/constants/userRoles';
import { STORAGE_KEYS } from '../utils/constants/appConstants';

export const useAuthCheck = (options = {}) => {
  const {
    requireAuth = false,
    requiredPermissions = [],
    requiredRole = null,
    redirectTo = '/login',
    redirectIfAuthenticated = false,
    checkSession = true,
    autoRefresh = true,
  } = options;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth state from Redux
  const authState = useSelector((state) => state.auth);
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    refreshToken: refreshTokenState,
  } = authState;

  // Local state
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Get user role and permissions
  const userRole = useMemo(() => {
    return user?.role ? getUserRoleById(user.role) : null;
  }, [user]);

  const userPermissions = useMemo(() => {
    return userRole?.permissions || [];
  }, [userRole]);

  // Check if user has required permissions
  const hasRequiredPermissions = useMemo(() => {
    if (requiredPermissions.length === 0) return true;
    
    return requiredPermissions.every((permission) =>
      hasPermission(user?.role, permission)
    );
  }, [user?.role, requiredPermissions]);

  // Check if user has required role
  const hasRequiredRole = useMemo(() => {
    if (!requiredRole) return true;
    
    const currentRole = getUserRoleById(user?.role);
    const requiredRoleObj = getUserRoleById(requiredRole);
    
    return currentRole?.level >= requiredRoleObj?.level;
  }, [user?.role, requiredRole]);

  // Check if user can access current module based on route
  const canAccessCurrentModule = useMemo(() => {
    const path = location.pathname;
    
    // Extract module from path
    let module = 'public';
    if (path.startsWith('/investor')) module = 'investor';
    else if (path.startsWith('/advisor')) module = 'advisor';
    else if (path.startsWith('/admin')) module = 'admin';
    
    return canAccessModule(user?.role, module);
  }, [user?.role, location.pathname]);

  // Check session expiry
  const checkSessionExpiry = useCallback(() => {
    if (!checkSession || !token) return true;
    
    const expiryTime = sessionStorage.getItem(STORAGE_KEYS.SESSION_EXPIRY);
    if (!expiryTime) return true;
    
    const now = Date.now();
    const expiry = parseInt(expiryTime, 10);
    
    setSessionExpiry(expiry);
    
    return now < expiry;
  }, [checkSession, token]);

  // Refresh token if needed
  const refreshAuthToken = useCallback(async () => {
    if (!autoRefresh || !refreshTokenState) return;
    
    try {
      // Check if token needs refresh (within 5 minutes of expiry)
      const expiryTime = sessionStorage.getItem(STORAGE_KEYS.SESSION_EXPIRY);
      if (!expiryTime) return;
      
      const now = Date.now();
      const expiry = parseInt(expiryTime, 10);
      const timeUntilExpiry = expiry - now;
      
      // Refresh if token expires in less than 5 minutes
      if (timeUntilExpiry < 5 * 60 * 1000) {
        await dispatch(refreshToken()).unwrap();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  }, [autoRefresh, refreshTokenState, dispatch]);

  // Update last activity
  const updateLastActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Auto-logout on inactivity
  useEffect(() => {
    if (!checkSession || !isAuthenticated) return;

    const inactivityTimeout = 30 * 60 * 1000; // 30 minutes
    
    const checkInactivity = () => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      
      if (inactiveTime > inactivityTimeout) {
        dispatch(logout());
        navigate('/login', {
          state: { from: location.pathname, reason: 'inactivity' },
        });
      }
    };

    const activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'touchstart',
      'scroll',
      'click',
    ];

    const handleActivity = () => {
      updateLastActivity();
    };

    // Add event listeners for user activity
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Check inactivity every minute
    const inactivityInterval = setInterval(checkInactivity, 60 * 1000);

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(inactivityInterval);
    };
  }, [checkSession, isAuthenticated, lastActivity, updateLastActivity, dispatch, navigate, location.pathname]);

  // Check authentication and access on mount and when dependencies change
  useEffect(() => {
    const checkAccess = async () => {
      setIsChecking(true);

      try {
        // Check if session is valid
        const isSessionValid = checkSessionExpiry();
        
        if (!isSessionValid) {
          dispatch(logout());
          setHasAccess(false);
          setIsChecking(false);
          return;
        }

        // Check authentication
        if (requireAuth && !isAuthenticated) {
          navigate(redirectTo, {
            state: { from: location.pathname },
            replace: true,
          });
          setHasAccess(false);
          setIsChecking(false);
          return;
        }

        // Redirect if already authenticated and shouldn't be here
        if (redirectIfAuthenticated && isAuthenticated) {
          navigate(redirectTo, { replace: true });
          setHasAccess(false);
          setIsChecking(false);
          return;
        }

        // Check role-based access
        if (requiredRole && !hasRequiredRole) {
          navigate('/unauthorized', { replace: true });
          setHasAccess(false);
          setIsChecking(false);
          return;
        }

        // Check permission-based access
        if (requiredPermissions.length > 0 && !hasRequiredPermissions) {
          navigate('/unauthorized', { replace: true });
          setHasAccess(false);
          setIsChecking(false);
          return;
        }

        // Check module access
        if (!canAccessCurrentModule) {
          navigate('/unauthorized', { replace: true });
          setHasAccess(false);
          setIsChecking(false);
          return;
        }

        // All checks passed
        setHasAccess(true);
      } catch (error) {
        console.error('Auth check error:', error);
        setHasAccess(false);
        
        if (requireAuth) {
          navigate('/login', {
            state: { from: location.pathname, error: 'auth_check_failed' },
            replace: true,
          });
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAccess();
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
  ]);

  // Auto-refresh token
  useEffect(() => {
    if (isAuthenticated && autoRefresh) {
      const refreshInterval = setInterval(refreshAuthToken, 5 * 60 * 1000); // Check every 5 minutes
      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated, autoRefresh, refreshAuthToken]);

  // Check KYC status
  const isKYCVerified = useMemo(() => {
    return user?.kycStatus === 'verified';
  }, [user?.kycStatus]);

  const isKYCRequired = useMemo(() => {
    return user?.role === 'investor' && !isKYCVerified;
  }, [user?.role, isKYCVerified]);

  // Check if user is onboarded
  const isOnboarded = useMemo(() => {
    if (!user) return false;
    
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'panNumber'];
    const hasRequiredFields = requiredFields.every((field) => user[field]);
    
    return hasRequiredFields && isKYCVerified;
  }, [user, isKYCVerified]);

  // Force logout
  const forceLogout = useCallback((reason = 'manual') => {
    dispatch(logout());
    navigate('/login', {
      state: { reason, timestamp: Date.now() },
      replace: true,
    });
  }, [dispatch, navigate]);

  // Update user profile
  const updateProfile = useCallback((updates) => {
    // This would typically dispatch an action to update the user profile
    console.log('Profile updates:', updates);
    // dispatch(updateUserProfile(updates));
  }, []);

  return {
    // Auth state
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || isChecking,
    error,
    
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
    
    // Session management
    sessionExpiry,
    lastActivity,
    checkSessionExpiry,
    refreshAuthToken,
    updateLastActivity,
    
    // Actions
    forceLogout,
    updateProfile,
    
    // Utility functions
    can: (permission) => hasPermission(user?.role, permission),
    canAccess: (module) => canAccessModule(user?.role, module),
    hasAnyPermission: (permissions) => 
      permissions.some((permission) => hasPermission(user?.role, permission)),
    
    // Check specific conditions
    isInvestor: user?.role === 'investor',
    isAdvisor: user?.role === 'advisor',
    isAdmin: user?.role === 'admin' || user?.role === 'super_admin',
    isSuperAdmin: user?.role === 'super_admin',
  };
};

// Hook for route-based permission checking
export const useRouteAuth = (routeConfig) => {
  const {
    path,
    requireAuth = false,
    requiredPermissions = [],
    requiredRole = null,
    redirectTo = '/login',
  } = routeConfig;

  const authCheck = useAuthCheck({
    requireAuth,
    requiredPermissions,
    requiredRole,
    redirectTo,
  });

  return authCheck;
};

// Hook for component-level permission checking
export const usePermission = (permission, options = {}) => {
  const { requireAll = false } = options;
  
  const { user, can, hasAnyPermission } = useAuthCheck();
  
  const hasPermission = useMemo(() => {
    if (!user) return false;
    
    if (Array.isArray(permission)) {
      if (requireAll) {
        return permission.every((p) => can(p));
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

// Hook for checking if a module is accessible
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

// Hook for KYC status checking
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
    };
  }, [user, isKYCVerified, isKYCRequired]);

  return kycStatus;
};

// Hook for session timeout warning
export const useSessionTimeout = (warningTime = 5 * 60 * 1000) => { // 5 minutes warning
  const { sessionExpiry, forceLogout } = useAuthCheck();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!sessionExpiry) return;

    const calculateTimeRemaining = () => {
      const now = Date.now();
      const remaining = sessionExpiry - now;
      
      setTimeRemaining(remaining);
      setShowWarning(remaining > 0 && remaining < warningTime);
      
      if (remaining <= 0) {
        forceLogout('session_expired');
      }
    };

    calculateTimeRemaining();
    
    const interval = setInterval(calculateTimeRemaining, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, [sessionExpiry, warningTime, forceLogout]);

  const extendSession = useCallback(() => {
    // This would typically call an API to extend the session
    console.log('Extending session...');
    // dispatch(extendSession());
  }, []);

  const formatTimeRemaining = useCallback(() => {
    if (!timeRemaining || timeRemaining <= 0) return '00:00';
    
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  return {
    timeRemaining,
    showWarning,
    formatTimeRemaining,
    extendSession,
    minutesRemaining: timeRemaining ? Math.ceil(timeRemaining / 60000) : 0,
  };
};