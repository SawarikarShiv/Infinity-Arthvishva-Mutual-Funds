/**
 * Main export file for hooks
 */

// Theme management
export { useTheme, useThemeListener, useThemeStyles } from './useTheme';

// Scroll management
export { useScroll, useElementScroll } from './useScroll';

// Window size and viewport
export { useWindowSize, useElementSize } from './useWindowSize';

// LocalStorage management
export {
  useLocalStorage,
  useLocalStorageMulti,
  useLocalStorageTTL,
  useEncryptedStorage,
} from './useLocalStorage';

// Authentication and authorization
export {
  useAuthCheck,
  useRouteAuth,
  usePermission,
  useModuleAccess,
  useKYCStatus,
  useSessionTimeout,
} from './useAuthCheck';

// Permission management
export {
  usePermissions,
  usePermissionGuard,
  useRouteGuard,
  useFeatureFlag,
  useConditionalRender,
} from './usePermissions';

// Debounce and throttle
export {
  useDebounce,
  useDebouncedCallback,
  useThrottle,
  useThrottledCallback,
  useRateLimit,
  useSearchDebounce,
  useDebouncedInput,
  useDebouncedApiCall,
  useDebouncedResize,
} from './useDebounce';

// Utility function to combine multiple hooks
export const useCombinedHooks = (hooks) => {
  const results = {};
  
  hooks.forEach((hook) => {
    const hookResult = hook();
    Object.assign(results, hookResult);
  });
  
  return results;
};

// Custom hook for common patterns
export const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  
  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const reset = useCallback(() => setState(initialState), [initialState]);
  
  return {
    state,
    toggle,
    setTrue,
    setFalse,
    reset,
    setState,
  };
};

export const usePrevious = (value) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useUnmount = (callback) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useUpdateEffect = (effect, deps) => {
  const isFirstMount = useRef(true);
  
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    
    return effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;