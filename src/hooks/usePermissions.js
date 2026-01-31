/**
 * Permission management hook
 * Provides granular permission checking and role-based access control
 */
import { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  hasPermission as checkPermission,
  canAccessModule as checkModuleAccess,
  getUserRoleById,
  USER_ROLES,
} from '../utils/constants/userRoles';

export const usePermissions = (options = {}) => {
  const {
    checkOnMount = true,
    cacheResults = true,
    debug = false,
  } = options;

  // Get user from Redux store
  const user = useSelector((state) => state.auth.user);
  
  // Cache for permission checks
  const permissionCache = useMemo(() => ({}), []);

  // Get user role with fallback
  const userRole = useMemo(() => {
    if (!user?.role) return USER_ROLES.GUEST;
    return getUserRoleById(user.role);
  }, [user?.role]);

  // Check if user has specific permission
  const hasPermission = useCallback((permission) => {
    if (!user?.role) return false;
    
    // Check cache if enabled
    const cacheKey = `permission:${user.role}:${permission}`;
    if (cacheResults && permissionCache[cacheKey] !== undefined) {
      if (debug) console.log(`Cache hit for permission: ${permission}`);
      return permissionCache[cacheKey];
    }
    
    const hasPerm = checkPermission(user.role, permission);
    
    // Cache result if enabled
    if (cacheResults) {
      permissionCache[cacheKey] = hasPerm;
    }
    
    if (debug) {
      console.log(`Permission check: ${permission} = ${hasPerm}`, {
        userRole: user.role,
        permission,
      });
    }
    
    return hasPerm;
  }, [user?.role, cacheResults, permissionCache, debug]);

  // Check if user has any of the given permissions
  const hasAnyPermission = useCallback((permissions) => {
    if (!user?.role) return false;
    
    const cacheKey = `anyPermission:${user.role}:${JSON.stringify(permissions)}`;
    if (cacheResults && permissionCache[cacheKey] !== undefined) {
      if (debug) console.log(`Cache hit for anyPermission check`);
      return permissionCache[cacheKey];
    }
    
    const hasAny = permissions.some((permission) => 
      checkPermission(user.role, permission)
    );
    
    if (cacheResults) {
      permissionCache[cacheKey] = hasAny;
    }
    
    return hasAny;
  }, [user?.role, cacheResults, permissionCache, debug]);

  // Check if user has all of the given permissions
  const hasAllPermissions = useCallback((permissions) => {
    if (!user?.role) return false;
    
    const cacheKey = `allPermissions:${user.role}:${JSON.stringify(permissions)}`;
    if (cacheResults && permissionCache[cacheKey] !== undefined) {
      if (debug) console.log(`Cache hit for allPermissions check`);
      return permissionCache[cacheKey];
    }
    
    const hasAll = permissions.every((permission) => 
      checkPermission(user.role, permission)
    );
    
    if (cacheResults) {
      permissionCache[cacheKey] = hasAll;
    }
    
    return hasAll;
  }, [user?.role, cacheResults, permissionCache, debug]);

  // Check if user can access a specific module
  const canAccessModule = useCallback((moduleName) => {
    if (!user?.role) return checkModuleAccess('guest', moduleName);
    
    const cacheKey = `module:${user.role}:${moduleName}`;
    if (cacheResults && permissionCache[cacheKey] !== undefined) {
      if (debug) console.log(`Cache hit for module access: ${moduleName}`);
      return permissionCache[cacheKey];
    }
    
    const canAccess = checkModuleAccess(user.role, moduleName);
    
    if (cacheResults) {
      permissionCache[cacheKey] = canAccess;
    }
    
    if (debug) {
      console.log(`Module access check: ${moduleName} = ${canAccess}`, {
        userRole: user.role,
        moduleName,
      });
    }
    
    return canAccess;
  }, [user?.role, cacheResults, permissionCache, debug]);

  // Check if user has a specific role or higher
  const hasRole = useCallback((requiredRole) => {
    if (!user?.role) return false;
    
    const currentRole = getUserRoleById(user.role);
    const requiredRoleObj = getUserRoleById(requiredRole);
    
    if (!currentRole || !requiredRoleObj) return false;
    
    return currentRole.level >= requiredRoleObj.level;
  }, [user?.role]);

  // Check if user has exactly the specified role
  const hasExactRole = useCallback((requiredRole) => {
    if (!user?.role) return false;
    
    return user.role === requiredRole;
  }, [user?.role]);

  // Get user's accessible modules
  const accessibleModules = useMemo(() => {
    if (!userRole) return USER_ROLES.GUEST.accessibleModules;
    
    return userRole.accessibleModules || [];
  }, [userRole]);

  // Get user's permissions list
  const userPermissions = useMemo(() => {
    if (!userRole) return USER_ROLES.GUEST.permissions;
    
    return userRole.permissions || [];
  }, [userRole]);

  // Check if user can perform an action on a resource
  const can = useCallback((action, resource, context = {}) => {
    if (!user?.role) return false;
    
    // Build permission string (e.g., 'create:user', 'read:fund', 'update:portfolio')
    const permission = `${action}:${resource}`;
    
    // Check if user has the permission
    if (hasPermission(permission)) {
      return true;
    }
    
    // Check for wildcard permissions
    if (hasPermission(`${action}:*`) || hasPermission(`*:${resource}`) || hasPermission('*')) {
      return true;
    }
    
    // Check context-specific permissions
    if (context.ownerId && context.ownerId === user.id) {
      // User is the owner, check for owner-specific permission
      const ownerPermission = `${action}:own_${resource}`;
      if (hasPermission(ownerPermission)) {
        return true;
      }
    }
    
    return false;
  }, [user, hasPermission]);

  // Check CRUD permissions for a resource
  const canCRUD = useCallback((resource, context = {}) => {
    return {
      canCreate: can('create', resource, context),
      canRead: can('read', resource, context),
      canUpdate: can('update', resource, context),
      canDelete: can('delete', resource, context),
      canList: can('list', resource, context),
      canExport: can('export', resource, context),
      canImport: can('import', resource, context),
    };
  }, [can]);

  // Check feature flag permissions
  const hasFeature = useCallback((feature) => {
    if (!user?.role) return false;
    
    // Check if feature is enabled for user's role
    const featurePermission = `feature:${feature}`;
    return hasPermission(featurePermission);
  }, [user?.role, hasPermission]);

  // Get all features user has access to
  const userFeatures = useMemo(() => {
    const allFeatures = [
      'dashboard',
      'portfolio',
      'fund_explorer',
      'sip_calculator',
      'goal_planning',
      'reports',
      'tax_calculator',
      'advisor_chat',
      'market_alerts',
      'paperless_investing',
      'bulk_upload',
      'api_access',
      'advanced_charts',
      'custom_reports',
      'client_management',
      'user_management',
      'system_config',
    ];
    
    return allFeatures.filter((feature) => hasFeature(feature));
  }, [hasFeature]);

  // Check if user can view sensitive data
  const canViewSensitiveData = useCallback((dataType, context = {}) => {
    if (!user?.role) return false;
    
    const sensitiveDataTypes = [
      'personal_info',
      'contact_details',
      'financial_info',
      'bank_details',
      'tax_info',
      'kyc_documents',
    ];
    
    if (!sensitiveDataTypes.includes(dataType)) {
      return true; // Not a sensitive data type
    }
    
    // Check specific permission
    const permission = `view:sensitive_${dataType}`;
    
    if (hasPermission(permission)) {
      return true;
    }
    
    // Check if user is viewing their own data
    if (context.ownerId && context.ownerId === user.id) {
      return hasPermission(`view:own_sensitive_${dataType}`);
    }
    
    return false;
  }, [user, hasPermission]);

  // Clear permission cache
  const clearCache = useCallback(() => {
    Object.keys(permissionCache).forEach((key) => {
      delete permissionCache[key];
    });
    
    if (debug) {
      console.log('Permission cache cleared');
    }
  }, [permissionCache, debug]);

  // Log all permissions for debugging
  const debugPermissions = useCallback(() => {
    if (!debug) return;
    
    console.group('Permission Debug');
    console.log('User Role:', userRole);
    console.log('User Permissions:', userPermissions);
    console.log('Accessible Modules:', accessibleModules);
    console.log('User Features:', userFeatures);
    console.groupEnd();
  }, [debug, userRole, userPermissions, accessibleModules, userFeatures]);

  // Initialize on mount if needed
  useMemo(() => {
    if (checkOnMount && debug) {
      debugPermissions();
    }
  }, [checkOnMount, debug, debugPermissions]);

  return {
    // User info
    user,
    userRole,
    userPermissions,
    accessibleModules,
    userFeatures,
    
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessModule,
    hasRole,
    hasExactRole,
    
    // Action-based checks
    can,
    canCRUD,
    hasFeature,
    canViewSensitiveData,
    
    // Utility functions
    clearCache,
    debugPermissions,
    
    // Shortcuts for common checks
    isAuthenticated: !!user,
    isGuest: !user || user.role === 'guest',
    isInvestor: hasExactRole('investor'),
    isAdvisor: hasExactRole('advisor'),
    isAdmin: hasRole('admin'),
    isSuperAdmin: hasExactRole('super_admin'),
    
    // Role level comparison
    isAtLeast: (role) => hasRole(role),
    isAtMost: (role) => {
      if (!user?.role) return role === 'guest';
      
      const currentRole = getUserRoleById(user.role);
      const requiredRole = getUserRoleById(role);
      
      if (!currentRole || !requiredRole) return false;
      
      return currentRole.level <= requiredRole.level;
    },
    
    // Check if user can manage other users
    canManageUsers: hasPermission('manage_users'),
    
    // Check if user can manage funds
    canManageFunds: hasPermission('manage_funds'),
    
    // Check if user can view reports
    canViewReports: hasPermission('view_reports') || hasPermission('generate_reports'),
    
    // Check if user can perform transactions
    canTransact: hasPermission('make_investments') || hasPermission('process_transactions'),
  };
};

// Hook for component-level permission guard
export const usePermissionGuard = (requiredPermission, options = {}) => {
  const {
    fallback: FallbackComponent = null,
    redirectTo = null,
    showLoader = true,
    onDenied = null,
  } = options;

  const { hasPermission, isLoading, user } = usePermissions();
  
  const hasAccess = useMemo(() => {
    if (isLoading && showLoader) return 'loading';
    return hasPermission(requiredPermission);
  }, [hasPermission, requiredPermission, isLoading, showLoader]);

  // Handle redirection or callback
  useMemo(() => {
    if (hasAccess === false) {
      if (redirectTo && typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
      
      if (onDenied && typeof onDenied === 'function') {
        onDenied(user);
      }
    }
  }, [hasAccess, redirectTo, onDenied, user]);

  return {
    hasAccess,
    isLoading: hasAccess === 'loading',
    isAllowed: hasAccess === true,
    isDenied: hasAccess === false,
    user,
  };
};

// Hook for route-level permission guard
export const useRouteGuard = (routePermissions, options = {}) => {
  const {
    fallbackRoute = '/unauthorized',
    requireAll = false,
  } = options;

  const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermissions();
  
  const hasRouteAccess = useMemo(() => {
    if (!routePermissions || routePermissions.length === 0) {
      return true;
    }
    
    if (requireAll) {
      return hasAllPermissions(routePermissions);
    }
    
    return hasAnyPermission(routePermissions);
  }, [routePermissions, requireAll, hasAllPermissions, hasAnyPermission]);

  return {
    hasRouteAccess,
    fallbackRoute,
  };
};

// Hook for feature flag checking
export const useFeatureFlag = (feature, options = {}) => {
  const {
    defaultValue = false,
    checkEnv = true,
  } = options;

  const { hasFeature, isLoading } = usePermissions();
  
  const isEnabled = useMemo(() => {
    // Check environment variable first if enabled
    if (checkEnv) {
      const envKey = `REACT_APP_FEATURE_${feature.toUpperCase()}`;
      const envValue = process.env[envKey];
      
      if (envValue !== undefined) {
        return envValue === 'true' || envValue === '1';
      }
    }
    
    // Check user permission
    if (isLoading) return defaultValue;
    
    return hasFeature(feature);
  }, [feature, hasFeature, isLoading, defaultValue, checkEnv]);

  return {
    isEnabled,
    isLoading,
  };
};

// Hook for conditional rendering based on permissions
export const useConditionalRender = (condition, options = {}) => {
  const {
    showIfTrue = true,
    showLoader = false,
    loaderComponent = null,
  } = options;

  const { hasPermission, hasAnyPermission, hasAllPermissions, hasRole, isLoading } = usePermissions();
  
  const shouldRender = useMemo(() => {
    if (isLoading && showLoader) return 'loading';
    
    if (typeof condition === 'string') {
      return hasPermission(condition);
    }
    
    if (Array.isArray(condition)) {
      // Check if it's a permission array or role array
      const isPermissionArray = condition.every((item) => 
        typeof item === 'string' && item.includes(':')
      );
      
      if (isPermissionArray) {
        return hasAnyPermission(condition);
      }
      
      // Assume it's a role array
      return condition.some((role) => hasRole(role));
    }
    
    if (typeof condition === 'object' && condition !== null) {
      // Complex condition object
      const { permissions, roles, all = false } = condition;
      
      if (permissions) {
        if (all) {
          return hasAllPermissions(permissions);
        }
        return hasAnyPermission(permissions);
      }
      
      if (roles) {
        if (Array.isArray(roles)) {
          return roles.some((role) => hasRole(role));
        }
        return hasRole(roles);
      }
    }
    
    return false;
  }, [condition, hasPermission, hasAnyPermission, hasAllPermissions, hasRole, isLoading, showLoader]);

  return {
    shouldRender: showIfTrue ? shouldRender : !shouldRender,
    isLoading: shouldRender === 'loading',
    loaderComponent,
  };
};