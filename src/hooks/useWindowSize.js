/**
 * Window size and viewport detection hook
 * Tracks window dimensions, orientation, and viewport changes
 */
import { useState, useEffect, useCallback } from 'react';

export const useWindowSize = (options = {}) => {
  const {
    debounceDelay = 150,
    includeScrollbar = true,
    watchOrientation = true,
    watchBreakpoints = true,
  } = options;

  // Window dimensions
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Document dimensions
  const [documentSize, setDocumentSize] = useState({
    width: typeof document !== 'undefined' ? document.documentElement.clientWidth : 0,
    height: typeof document !== 'undefined' ? document.documentElement.clientHeight : 0,
  });

  // Viewport information
  const [viewport, setViewport] = useState({
    vw: typeof window !== 'undefined' ? window.innerWidth * 0.01 : 0,
    vh: typeof window !== 'undefined' ? window.innerHeight * 0.01 : 0,
    vmin: 0,
    vmax: 0,
  });

  // Orientation
  const [orientation, setOrientation] = useState(
    typeof window !== 'undefined' 
      ? window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      : 'landscape'
  );

  // Breakpoints (TailwindCSS compatible)
  const [breakpoints, setBreakpoints] = useState({
    isXs: false,     // < 640px
    isSm: false,     // >= 640px
    isMd: false,     // >= 768px
    isLg: false,     // >= 1024px
    isXl: false,     // >= 1280px
    is2Xl: false,    // >= 1536px
    current: 'xs',
  });

  // Device type detection
  const [deviceType, setDeviceType] = useState('desktop');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Update window size with debouncing
  const updateSize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setWindowSize({ width, height });
    
    // Calculate document size (excluding scrollbar if needed)
    const docWidth = includeScrollbar 
      ? document.documentElement.clientWidth
      : Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    
    const docHeight = includeScrollbar
      ? document.documentElement.clientHeight
      : Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    
    setDocumentSize({ width: docWidth, height: docHeight });
    
    // Update viewport units
    const vw = width * 0.01;
    const vh = height * 0.01;
    const vmin = Math.min(vw, vh);
    const vmax = Math.max(vw, vh);
    
    setViewport({ vw, vh, vmin, vmax });
    
    // Update orientation
    if (watchOrientation) {
      const newOrientation = width > height ? 'landscape' : 'portrait';
      setOrientation(newOrientation);
    }
    
    // Update breakpoints
    if (watchBreakpoints) {
      const isXs = width < 640;
      const isSm = width >= 640 && width < 768;
      const isMd = width >= 768 && width < 1024;
      const isLg = width >= 1024 && width < 1280;
      const isXl = width >= 1280 && width < 1536;
      const is2Xl = width >= 1536;
      
      let current = 'xs';
      if (is2Xl) current = '2xl';
      else if (isXl) current = 'xl';
      else if (isLg) current = 'lg';
      else if (isMd) current = 'md';
      else if (isSm) current = 'sm';
      
      setBreakpoints({
        isXs,
        isSm,
        isMd,
        isLg,
        isXl,
        is2Xl,
        current,
      });
      
      // Update device type
      const newIsMobile = width < 768;
      const newIsTablet = width >= 768 && width < 1024;
      const newIsDesktop = width >= 1024;
      
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
      setIsDesktop(newIsDesktop);
      
      // Determine device type
      let newDeviceType = 'desktop';
      if (newIsMobile) newDeviceType = 'mobile';
      else if (newIsTablet) newDeviceType = 'tablet';
      
      setDeviceType(newDeviceType);
    }
  }, [includeScrollbar, watchOrientation, watchBreakpoints]);

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const isTouch = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        navigator.msMaxTouchPoints > 0;
      
      setIsTouchDevice(isTouch);
    };
    
    checkTouchDevice();
  }, []);

  // Handle window resize with debounce
  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, debounceDelay);
    };
    
    // Initial update
    updateSize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.addEventListener('load', updateSize);
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('load', updateSize);
    };
  }, [debounceDelay, updateSize]);

  // Get CSS value for calculations
  const getCSSValue = useCallback((value, unit = 'px') => {
    if (typeof value === 'number') {
      return `${value}${unit}`;
    }
    
    // Handle viewport units
    if (value.endsWith('vw')) {
      const num = parseFloat(value);
      return `${(num * windowSize.width) / 100}px`;
    }
    
    if (value.endsWith('vh')) {
      const num = parseFloat(value);
      return `${(num * windowSize.height) / 100}px`;
    }
    
    if (value.endsWith('vmin')) {
      const num = parseFloat(value);
      return `${(num * viewport.vmin)}px`;
    }
    
    if (value.endsWith('vmax')) {
      const num = parseFloat(value);
      return `${(num * viewport.vmax)}px`;
    }
    
    return value;
  }, [windowSize, viewport]);

  // Check if width is within range
  const isWidthWithin = useCallback((min, max) => {
    return windowSize.width >= min && windowSize.width <= max;
  }, [windowSize.width]);

  // Check if height is within range
  const isHeightWithin = useCallback((min, max) => {
    return windowSize.height >= min && windowSize.height <= max;
  }, [windowSize.height]);

  // Get responsive value based on breakpoints
  const getResponsiveValue = useCallback((values) => {
    const { current } = breakpoints;
    
    // Return value for current breakpoint or fallback to default
    return values[current] || values.default || values;
  }, [breakpoints]);

  // Lock body scroll
  const lockBodyScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  }, []);

  // Unlock body scroll
  const unlockBodyScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  return {
    // Window dimensions
    windowSize,
    width: windowSize.width,
    height: windowSize.height,
    aspectRatio: windowSize.width / windowSize.height,
    
    // Document dimensions
    documentSize,
    docWidth: documentSize.width,
    docHeight: documentSize.height,
    
    // Viewport units
    viewport,
    vw: viewport.vw,
    vh: viewport.vh,
    vmin: viewport.vmin,
    vmax: viewport.vmax,
    
    // Orientation
    orientation,
    isLandscape: orientation === 'landscape',
    isPortrait: orientation === 'portrait',
    
    // Breakpoints
    breakpoints,
    ...breakpoints,
    
    // Device type
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    
    // Utility functions
    getCSSValue,
    isWidthWithin,
    isHeightWithin,
    getResponsiveValue,
    lockBodyScroll,
    unlockBodyScroll,
    
    // Media query checkers
    isAbove: (breakpoint) => {
      const breakpointsMap = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      };
      
      return windowSize.width >= (breakpointsMap[breakpoint] || 0);
    },
    
    isBelow: (breakpoint) => {
      const breakpointsMap = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
      };
      
      return windowSize.width < (breakpointsMap[breakpoint] || Infinity);
    },
  };
};

// Hook for element dimensions tracking
export const useElementSize = (ref, options = {}) => {
  const {
    debounceDelay = 150,
    trackWidth = true,
    trackHeight = true,
    trackPosition = false,
  } = options;

  const [size, setSize] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  const updateSize = useCallback(() => {
    if (!ref.current) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    
    const newSize = {
      width: trackWidth ? rect.width : size.width,
      height: trackHeight ? rect.height : size.height,
      x: trackPosition ? rect.x : size.x,
      y: trackPosition ? rect.y : size.y,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
    };
    
    setSize(newSize);
    setIsVisible(
      rect.top <= window.innerHeight &&
      rect.bottom >= 0 &&
      rect.left <= window.innerWidth &&
      rect.right >= 0
    );
  }, [ref, size, trackWidth, trackHeight, trackPosition]);

  useEffect(() => {
    if (!ref.current) return;

    let timeoutId;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, debounceDelay);
    });

    const mutationObserver = new MutationObserver(updateSize);
    
    // Initial update
    updateSize();
    
    // Observe element
    resizeObserver.observe(ref.current);
    mutationObserver.observe(ref.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    
    // Observe window resize
    const handleWindowResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, debounceDelay);
    };
    
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', updateSize, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', updateSize);
    };
  }, [ref, debounceDelay, updateSize]);

  return {
    ...size,
    isVisible,
    aspectRatio: size.width / size.height,
    updateSize,
  };
};