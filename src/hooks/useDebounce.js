/**
 * Debounce and throttle hooks
 * For optimizing performance by limiting the rate of function execution
 */
import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================================
// Debounce Hook
// ============================================================================

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    if (value === debouncedValue) {
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
      setIsDebouncing(false);
    };
  }, [value, delay, debouncedValue]);

  return {
    value: debouncedValue,
    isDebouncing,
    immediateValue: value,
  };
};

// Debounce callback function
export const useDebouncedCallback = (callback, delay = 300, options = {}) => {
  const {
    maxWait,
    leading = false,
    trailing = true,
  } = options;

  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);
  const maxWaitTimeoutRef = useRef(null);
  const lastCallTimeRef = useRef(0);
  const lastInvokeTimeRef = useRef(0);
  const leadingCallRef = useRef(false);
  const pendingArgsRef = useRef(null);

  // Update callback ref if callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(maxWaitTimeoutRef.current);
    };
  }, []);

  const debouncedFunction = useCallback((...args) => {
    const currentTime = Date.now();
    const isLeading = leading && !timeoutRef.current;
    const shouldInvoke = isLeading || (maxWait && currentTime - lastCallTimeRef.current >= maxWait);

    lastCallTimeRef.current = currentTime;
    pendingArgsRef.current = args;

    const invokeFunction = () => {
      const argsToInvoke = pendingArgsRef.current;
      pendingArgsRef.current = null;
      lastInvokeTimeRef.current = Date.now();
      callbackRef.current(...argsToInvoke);
    };

    if (isLeading && !leadingCallRef.current) {
      invokeFunction();
      leadingCallRef.current = true;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (shouldInvoke) {
      if (maxWait) {
        clearTimeout(maxWaitTimeoutRef.current);
        maxWaitTimeoutRef.current = setTimeout(invokeFunction, maxWait);
      } else {
        invokeFunction();
      }
    } else if (trailing) {
      timeoutRef.current = setTimeout(() => {
        const shouldInvokeTrailing = !leading || (maxWait && Date.now() - lastCallTimeRef.current >= maxWait);
        
        if (shouldInvokeTrailing) {
          invokeFunction();
        }
        
        timeoutRef.current = null;
        leadingCallRef.current = false;
      }, delay);
    }
  }, [delay, leading, trailing, maxWait]);

  // Cancel pending execution
  const cancel = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearTimeout(maxWaitTimeoutRef.current);
    timeoutRef.current = null;
    maxWaitTimeoutRef.current = null;
    lastCallTimeRef.current = 0;
    lastInvokeTimeRef.current = 0;
    leadingCallRef.current = false;
    pendingArgsRef.current = null;
  }, []);

  // Flush pending execution
  const flush = useCallback(() => {
    if (timeoutRef.current || maxWaitTimeoutRef.current) {
      const argsToInvoke = pendingArgsRef.current;
      cancel();
      if (argsToInvoke) {
        callbackRef.current(...argsToInvoke);
      }
    }
  }, [cancel]);

  // Check if there's a pending execution
  const isPending = useCallback(() => {
    return !!(timeoutRef.current || maxWaitTimeoutRef.current);
  }, []);

  return {
    debouncedFunction,
    cancel,
    flush,
    isPending: isPending(),
  };
};

// ============================================================================
// Throttle Hook
// ============================================================================

export const useThrottle = (value, limit = 300) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const [isThrottling, setIsThrottling] = useState(false);
  const lastRanRef = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRanRef.current >= limit) {
        setThrottledValue(value);
        lastRanRef.current = Date.now();
        setIsThrottling(false);
      }
    }, limit - (Date.now() - lastRanRef.current));

    setIsThrottling(true);

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return {
    value: throttledValue,
    isThrottling,
    immediateValue: value,
  };
};

// Throttle callback function
export const useThrottledCallback = (callback, limit = 300, options = {}) => {
  const {
    leading = true,
    trailing = true,
  } = options;

  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);
  const lastCallTimeRef = useRef(0);
  const lastInvokeTimeRef = useRef(0);
  const pendingArgsRef = useRef(null);

  // Update callback ref if callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const throttledFunction = useCallback((...args) => {
    const currentTime = Date.now();
    const timeSinceLastCall = currentTime - lastCallTimeRef.current;
    const timeSinceLastInvoke = currentTime - lastInvokeTimeRef.current;

    pendingArgsRef.current = args;
    lastCallTimeRef.current = currentTime;

    const invokeFunction = () => {
      const argsToInvoke = pendingArgsRef.current;
      pendingArgsRef.current = null;
      lastInvokeTimeRef.current = Date.now();
      callbackRef.current(...argsToInvoke);
    };

    if (leading && timeSinceLastInvoke >= limit) {
      invokeFunction();
    } else if (trailing && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        invokeFunction();
        timeoutRef.current = null;
      }, limit - timeSinceLastInvoke);
    }
  }, [limit, leading, trailing]);

  // Cancel pending execution
  const cancel = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    lastCallTimeRef.current = 0;
    lastInvokeTimeRef.current = 0;
    pendingArgsRef.current = null;
  }, []);

  // Flush pending execution
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      const argsToInvoke = pendingArgsRef.current;
      cancel();
      if (argsToInvoke) {
        callbackRef.current(...argsToInvoke);
      }
    }
  }, [cancel]);

  // Check if there's a pending execution
  const isPending = useCallback(() => {
    return !!timeoutRef.current;
  }, []);

  return {
    throttledFunction,
    cancel,
    flush,
    isPending: isPending(),
  };
};

// ============================================================================
// Combined Debounce & Throttle Hook
// ============================================================================

export const useRateLimit = (callback, options = {}) => {
  const {
    mode = 'debounce', // 'debounce' or 'throttle'
    delay = 300,
    maxWait,
    leading = false,
    trailing = true,
  } = options;

  const debounced = useDebouncedCallback(callback, delay, { maxWait, leading, trailing });
  const throttled = useThrottledCallback(callback, delay, { leading, trailing });

  return mode === 'debounce' ? debounced : throttled;
};

// ============================================================================
// Search Debounce Hook (Common use case)
// ============================================================================

export const useSearchDebounce = (initialValue = '', options = {}) => {
  const {
    delay = 300,
    minLength = 0,
    maxLength = 100,
    trim = true,
    validate = null,
  } = options;

  const [searchValue, setSearchValue] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState('');

  const { value: debouncedValue, isDebouncing } = useDebounce(searchValue, delay);

  // Validate search value
  const validateSearch = useCallback((value) => {
    if (trim) {
      value = value.trim();
    }

    // Check length constraints
    if (value.length < minLength) {
      setIsValid(false);
      setValidationError(`Minimum ${minLength} characters required`);
      return false;
    }

    if (value.length > maxLength) {
      setIsValid(false);
      setValidationError(`Maximum ${maxLength} characters allowed`);
      return false;
    }

    // Custom validation
    if (validate && typeof validate === 'function') {
      const customValidation = validate(value);
      if (customValidation !== true) {
        setIsValid(false);
        setValidationError(customValidation || 'Invalid search term');
        return false;
      }
    }

    setIsValid(true);
    setValidationError('');
    return true;
  }, [minLength, maxLength, trim, validate]);

  // Handle search input change
  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    validateSearch(value);
  }, [validateSearch]);

  // Update debounced search when debounced value changes and is valid
  useEffect(() => {
    if (isValid && debouncedValue !== debouncedSearch) {
      setDebouncedSearch(debouncedValue);
    }
  }, [debouncedValue, debouncedSearch, isValid]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchValue('');
    setDebouncedSearch('');
    setIsValid(true);
    setValidationError('');
  }, []);

  // Reset to initial value
  const resetSearch = useCallback(() => {
    setSearchValue(initialValue);
    setDebouncedSearch(initialValue);
    setIsValid(true);
    setValidationError('');
  }, [initialValue]);

  return {
    // Values
    searchValue,
    debouncedSearch,
    immediateValue: searchValue,
    
    // State
    isDebouncing,
    isValid,
    validationError,
    
    // Actions
    handleSearchChange,
    clearSearch,
    resetSearch,
    setSearchValue,
    
    // Validation
    validate: () => validateSearch(searchValue),
  };
};

// ============================================================================
// Form Input Debounce Hook
// ============================================================================

export const useDebouncedInput = (initialValue = '', options = {}) => {
  const {
    delay = 300,
    validate = null,
    onChange = null,
    onDebouncedChange = null,
  } = options;

  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  const { value: intermediateValue, isDebouncing } = useDebounce(value, delay);

  // Validate value
  const validateValue = useCallback((val) => {
    if (validate && typeof validate === 'function') {
      const validationResult = validate(val);
      
      if (validationResult === true) {
        setIsValid(true);
        setError('');
        return true;
      } else {
        setIsValid(false);
        setError(validationResult || 'Invalid value');
        return false;
      }
    }
    
    setIsValid(true);
    setError('');
    return true;
  }, [validate]);

  // Handle input change
  const handleChange = useCallback((newValue) => {
    setValue(newValue);
    validateValue(newValue);
    
    if (onChange && typeof onChange === 'function') {
      onChange(newValue);
    }
  }, [validateValue, onChange]);

  // Update debounced value when intermediate value changes
  useEffect(() => {
    if (intermediateValue !== debouncedValue && validateValue(intermediateValue)) {
      setDebouncedValue(intermediateValue);
      
      if (onDebouncedChange && typeof onDebouncedChange === 'function') {
        onDebouncedChange(intermediateValue);
      }
    }
  }, [intermediateValue, debouncedValue, validateValue, onDebouncedChange]);

  // Reset to initial value
  const reset = useCallback(() => {
    setValue(initialValue);
    setDebouncedValue(initialValue);
    setIsValid(true);
    setError('');
  }, [initialValue]);

  // Clear value
  const clear = useCallback(() => {
    setValue('');
    setDebouncedValue('');
    setIsValid(true);
    setError('');
  }, []);

  return {
    // Values
    value,
    debouncedValue,
    immediateValue: value,
    
    // State
    isDebouncing,
    isValid,
    error,
    
    // Actions
    handleChange,
    setValue,
    reset,
    clear,
    
    // Validation
    validate: () => validateValue(value),
  };
};

// ============================================================================
// API Call Debounce Hook
// ============================================================================

export const useDebouncedApiCall = (apiFunction, options = {}) => {
  const {
    delay = 300,
    immediate = false,
    onSuccess = null,
    onError = null,
    onFinally = null,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastCallArgs, setLastCallArgs] = useState(null);

  const { debouncedFunction, cancel, flush, isPending } = useDebouncedCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      setLastCallArgs(args);
      
      try {
        const result = await apiFunction(...args);
        setData(result);
        
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(result, ...args);
        }
        
        return result;
      } catch (err) {
        setError(err);
        
        if (onError && typeof onError === 'function') {
          onError(err, ...args);
        }
        
        throw err;
      } finally {
        setIsLoading(false);
        
        if (onFinally && typeof onFinally === 'function') {
          onFinally(...args);
        }
      }
    },
    delay,
    { leading: immediate }
  );

  // Manual call without debounce
  const callImmediately = useCallback(async (...args) => {
    cancel(); // Cancel any pending debounced call
    
    setIsLoading(true);
    setError(null);
    setLastCallArgs(args);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result, ...args);
      }
      
      return result;
    } catch (err) {
      setError(err);
      
      if (onError && typeof onError === 'function') {
        onError(err, ...args);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
      
      if (onFinally && typeof onFinally === 'function') {
        onFinally(...args);
      }
    }
  }, [apiFunction, cancel, onSuccess, onError, onFinally]);

  // Retry last call
  const retry = useCallback(async () => {
    if (lastCallArgs) {
      return callImmediately(...lastCallArgs);
    }
  }, [lastCallArgs, callImmediately]);

  // Clear state
  const clear = useCallback(() => {
    cancel();
    setData(null);
    setError(null);
    setLastCallArgs(null);
    setIsLoading(false);
  }, [cancel]);

  return {
    // State
    isLoading,
    data,
    error,
    lastCallArgs,
    
    // Actions
    call: debouncedFunction,
    callImmediately,
    cancel,
    flush,
    retry,
    clear,
    
    // Status
    isPending,
    hasData: data !== null,
    hasError: error !== null,
  };
};

// ============================================================================
// Window Resize Debounce Hook
// ============================================================================

export const useDebouncedResize = (callback, delay = 150) => {
  const debouncedCallback = useDebouncedCallback(callback, delay);
  
  useEffect(() => {
    window.addEventListener('resize', debouncedCallback);
    
    return () => {
      window.removeEventListener('resize', debouncedCallback);
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);
  
  return {
    cancel: debouncedCallback.cancel,
    flush: debouncedCallback.flush,
  };
};