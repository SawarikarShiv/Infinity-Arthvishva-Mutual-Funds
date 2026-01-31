/**
 * LocalStorage management hook
 * Provides type-safe localStorage operations with serialization and events
 */
import { useState, useEffect, useCallback, useRef } from 'react';

export const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    sync = true,
    listen = true,
    compression = false,
    encrypt = false,
    ttl = null, // Time to live in milliseconds
  } = options;

  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return getStoredValue(key, initialValue, deserializer, compression, encrypt, ttl);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const prevKeyRef = useRef(key);

  // Get stored value with all options
  const getStoredValue = useCallback((storageKey, defaultValue, deserializerFn, useCompression, useEncryption, timeToLive) => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const item = window.localStorage.getItem(storageKey);
    if (!item) return defaultValue;

    let parsedItem;
    
    try {
      // Handle encryption
      let decryptedItem = item;
      if (useEncryption) {
        decryptedItem = decrypt(item, storageKey);
      }
      
      // Handle compression
      let decompressedItem = decryptedItem;
      if (useCompression) {
        decompressedItem = decompress(decryptedItem);
      }
      
      parsedItem = deserializerFn(decompressedItem);
    } catch (error) {
      console.error(`Error parsing localStorage key "${storageKey}":`, error);
      return defaultValue;
    }

    // Check TTL if set
    if (timeToLive && parsedItem && parsedItem._expiry) {
      if (Date.now() > parsedItem._expiry) {
        window.localStorage.removeItem(storageKey);
        return defaultValue;
      }
      
      // Return the actual value, not the wrapper
      return parsedItem._value !== undefined ? parsedItem._value : parsedItem;
    }

    return parsedItem;
  }, []);

  // Set value in localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        let itemToStore = valueToStore;
        
        // Add TTL wrapper if needed
        if (ttl) {
          itemToStore = {
            _value: valueToStore,
            _expiry: Date.now() + ttl,
          };
        }
        
        let processedItem = serializer(itemToStore);
        
        // Handle compression
        if (compression) {
          processedItem = compress(processedItem);
        }
        
        // Handle encryption
        if (encrypt) {
          processedItem = encryptData(processedItem, key);
        }
        
        window.localStorage.setItem(key, processedItem);
        
        // Dispatch custom event for cross-tab synchronization
        if (sync) {
          window.dispatchEvent(
            new StorageEvent('local-storage', {
              key,
              newValue: processedItem,
              storageArea: window.localStorage,
            })
          );
        }
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, serializer, compression, encrypt, ttl, sync]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        setStoredValue(undefined);
        
        // Dispatch removal event
        if (sync) {
          window.dispatchEvent(
            new StorageEvent('local-storage', {
              key,
              newValue: null,
              storageArea: window.localStorage,
            })
          );
        }
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, sync]);

  // Clear all localStorage items with optional prefix
  const clearStorage = useCallback((prefix = '') => {
    try {
      if (typeof window !== 'undefined') {
        if (prefix) {
          // Remove only items with prefix
          Object.keys(window.localStorage).forEach((storageKey) => {
            if (storageKey.startsWith(prefix)) {
              window.localStorage.removeItem(storageKey);
            }
          });
        } else {
          window.localStorage.clear();
        }
        
        // Reset state if this key is affected
        if (!prefix || key.startsWith(prefix)) {
          setStoredValue(initialValue);
        }
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, [key, initialValue]);

  // Get all localStorage items with optional prefix
  const getAllItems = useCallback((itemPrefix = '', includeValue = true) => {
    if (typeof window === 'undefined') return {};
    
    const items = {};
    Object.keys(window.localStorage).forEach((storageKey) => {
      if (!itemPrefix || storageKey.startsWith(itemPrefix)) {
        if (includeValue) {
          try {
            items[storageKey] = getStoredValue(
              storageKey,
              null,
              deserializer,
              compression,
              encrypt,
              ttl
            );
          } catch (error) {
            items[storageKey] = null;
          }
        } else {
          items[storageKey] = null;
        }
      }
    });
    
    return items;
  }, [deserializer, compression, encrypt, ttl, getStoredValue]);

  // Check if key exists
  const hasKey = useCallback((checkKey = key) => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(checkKey) !== null;
  }, [key]);

  // Get storage statistics
  const getStorageStats = useCallback(() => {
    if (typeof window === 'undefined') {
      return { total: 0, used: 0, remaining: 0, percentage: 0 };
    }
    
    let total = 0;
    let used = 0;
    
    // Calculate used storage (approximate)
    for (let i = 0; i < window.localStorage.length; i++) {
      const storageKey = window.localStorage.key(i);
      const value = window.localStorage.getItem(storageKey);
      used += (storageKey.length + value.length) * 2; // Approximate bytes (UTF-16)
    }
    
    // Most browsers have 5MB limit
    total = 5 * 1024 * 1024; // 5MB in bytes
    const remaining = Math.max(0, total - used);
    const percentage = (used / total) * 100;
    
    return {
      total,
      used,
      remaining,
      percentage,
      items: window.localStorage.length,
    };
  }, []);

  // Subscribe to storage changes
  useEffect(() => {
    if (!listen || typeof window === 'undefined') return;

    const handleStorageChange = (event) => {
      // Handle native storage events (cross-tab)
      if (event.key === key && event.storageArea === window.localStorage) {
        try {
          const newValue = getStoredValue(
            key,
            initialValue,
            deserializer,
            compression,
            encrypt,
            ttl
          );
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error handling storage change for key "${key}":`, error);
        }
      }
      
      // Handle custom events (same tab)
      if (event.type === 'local-storage' && event.key === key) {
        try {
          const newValue = getStoredValue(
            key,
            initialValue,
            deserializer,
            compression,
            encrypt,
            ttl
          );
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error handling local-storage event for key "${key}":`, error);
        }
      }
    };

    // Listen to both native storage events and custom events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, initialValue, deserializer, compression, encrypt, ttl, listen, getStoredValue]);

  // Handle key change
  useEffect(() => {
    if (prevKeyRef.current !== key) {
      try {
        const newValue = getStoredValue(
          key,
          initialValue,
          deserializer,
          compression,
          encrypt,
          ttl
        );
        setStoredValue(newValue);
        prevKeyRef.current = key;
      } catch (error) {
        console.error(`Error updating localStorage key from "${prevKeyRef.current}" to "${key}":`, error);
      }
    }
  }, [key, initialValue, deserializer, compression, encrypt, ttl, getStoredValue]);

  // Helper functions for compression and encryption (basic implementations)
  const compress = (str) => {
    // Simple Base64 compression (for demo purposes)
    // In production, use a proper compression library like lz-string
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode('0x' + p1);
    }));
  };

  const decompress = (str) => {
    try {
      return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (error) {
      return str;
    }
  };

  const encryptData = (str, secret) => {
    // Simple XOR encryption (for demo purposes)
    // In production, use a proper encryption library like crypto-js
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i) ^ secret.charCodeAt(i % secret.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result);
  };

  const decrypt = (str, secret) => {
    try {
      const decoded = atob(str);
      let result = '';
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i) ^ secret.charCodeAt(i % secret.length);
        result += String.fromCharCode(charCode);
      }
      return result;
    } catch (error) {
      return str;
    }
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
    clearStorage,
    getAllItems,
    hasKey,
    getStorageStats,
    isSet: storedValue !== undefined && storedValue !== null,
    isEmpty: () => {
      if (typeof storedValue === 'object' && storedValue !== null) {
        return Object.keys(storedValue).length === 0;
      }
      return !storedValue;
    },
  };
};

// Hook for managing multiple localStorage items
export const useLocalStorageMulti = (keys, initialValues = {}, options = {}) => {
  const [values, setValues] = useState(() => {
    const initial = {};
    keys.forEach((key) => {
      initial[key] = initialValues[key] !== undefined ? initialValues[key] : null;
    });
    return initial;
  });

  const { sync = true, listen = true } = options;

  // Get all values
  const getAllValues = useCallback(() => {
    const allValues = {};
    keys.forEach((key) => {
      const hook = useLocalStorage(key, initialValues[key], { ...options, listen: false });
      allValues[key] = hook.value;
    });
    return allValues;
  }, [keys, initialValues, options]);

  // Set multiple values
  const setMultipleValues = useCallback((newValues) => {
    const updates = {};
    Object.keys(newValues).forEach((key) => {
      if (keys.includes(key)) {
        const hook = useLocalStorage(key, initialValues[key], { ...options, listen: false });
        hook.setValue(newValues[key]);
        updates[key] = newValues[key];
      }
    });
    
    setValues((prev) => ({ ...prev, ...updates }));
    
    // Dispatch batch update event
    if (sync && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('local-storage-batch', {
          detail: { updates },
        })
      );
    }
  }, [keys, initialValues, options, sync]);

  // Remove multiple keys
  const removeMultipleKeys = useCallback((keysToRemove) => {
    keysToRemove.forEach((key) => {
      if (keys.includes(key)) {
        const hook = useLocalStorage(key, initialValues[key], { ...options, listen: false });
        hook.removeValue();
      }
    });
    
    setValues((prev) => {
      const newValues = { ...prev };
      keysToRemove.forEach((key) => {
        delete newValues[key];
      });
      return newValues;
    });
  }, [keys, initialValues, options]);

  // Listen for batch updates
  useEffect(() => {
    if (!listen || typeof window === 'undefined') return;

    const handleBatchUpdate = (event) => {
      if (event.type === 'local-storage-batch') {
        const { updates } = event.detail;
        setValues((prev) => ({ ...prev, ...updates }));
      }
    };

    window.addEventListener('local-storage-batch', handleBatchUpdate);

    return () => {
      window.removeEventListener('local-storage-batch', handleBatchUpdate);
    };
  }, [listen]);

  return {
    values,
    setMultipleValues,
    removeMultipleKeys,
    getAllValues,
    getValue: (key) => values[key],
    setValue: (key, value) => setMultipleValues({ [key]: value }),
    removeValue: (key) => removeMultipleKeys([key]),
  };
};

// Hook for localStorage with TTL (Time To Live)
export const useLocalStorageTTL = (key, initialValue, ttl, options = {}) => {
  return useLocalStorage(key, initialValue, { ...options, ttl });
};

// Hook for encrypted localStorage
export const useEncryptedStorage = (key, initialValue, secret, options = {}) => {
  return useLocalStorage(key, initialValue, { ...options, encrypt: true });
};