/**
 * Scroll management hook
 * Handles scroll detection, smooth scrolling, and scroll-based animations
 */
import { useState, useEffect, useCallback, useRef } from 'react';

export const useScroll = (options = {}) => {
  const {
    throttleDelay = 100,
    detectDirection = true,
    detectAtEnd = true,
    offset = 0,
  } = options;

  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Calculate scroll progress
  const calculateScrollProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const total = documentHeight - windowHeight;
    const progress = total > 0 ? (scrollTop / total) * 100 : 0;
    
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  }, []);

  // Check if at top or bottom
  const checkScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    setIsAtTop(scrollTop <= offset);
    setIsAtBottom(scrollTop + windowHeight >= documentHeight - offset);
  }, [offset]);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      
      setTimeout(() => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update scroll position
        setScrollPosition(currentScrollY);
        
        // Update scroll direction
        if (detectDirection) {
          const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
          setScrollDirection(direction);
          lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
        }
        
        // Check if at top/bottom
        if (detectAtEnd) {
          checkScrollPosition();
        }
        
        // Calculate scroll progress
        calculateScrollProgress();
        
        ticking.current = false;
      }, throttleDelay);
    }
  }, [throttleDelay, detectDirection, detectAtEnd, checkScrollPosition, calculateScrollProgress]);

  // Scroll to specific position
  const scrollTo = useCallback((position, behavior = 'smooth') => {
    window.scrollTo({
      top: position,
      behavior,
    });
  }, []);

  // Scroll to top
  const scrollToTop = useCallback((behavior = 'smooth') => {
    scrollTo(0, behavior);
  }, [scrollTo]);

  // Scroll to bottom
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    scrollTo(documentHeight - windowHeight, behavior);
  }, [scrollTo]);

  // Scroll to element
  const scrollToElement = useCallback((elementId, offset = 0, behavior = 'smooth') => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      scrollTo(offsetPosition, behavior);
    }
  }, [scrollTo]);

  // Scroll to section
  const scrollToSection = useCallback((sectionId, behavior = 'smooth') => {
    scrollToElement(sectionId, 80, behavior); // 80px offset for header
  }, [scrollToElement]);

  // Scroll with offset
  const scrollWithOffset = useCallback((position, offset = 0, behavior = 'smooth') => {
    scrollTo(position + offset, behavior);
  }, [scrollTo]);

  // Add scroll event listener
  useEffect(() => {
    // Initialize values
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Handle resize for scroll calculations
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
      calculateScrollProgress();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkScrollPosition, calculateScrollProgress]);

  return {
    scrollPosition,
    scrollDirection,
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
    isAtTop,
    isAtBottom,
    scrollProgress,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    scrollToSection,
    scrollWithOffset,
  };
};

// Hook for element scroll tracking
export const useElementScroll = (elementRef, options = {}) => {
  const {
    throttleDelay = 100,
    detectDirection = true,
    detectAtEnd = true,
  } = options;

  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState({ x: 'right', y: 'down' });
  const [isAtStart, setIsAtStart] = useState({ x: true, y: true });
  const [isAtEnd, setIsAtEnd] = useState({ x: false, y: false });
  
  const lastScroll = useRef({ x: 0, y: 0 });
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current && elementRef.current) {
      ticking.current = true;
      
      setTimeout(() => {
        const element = elementRef.current;
        const scrollLeft = element.scrollLeft;
        const scrollTop = element.scrollTop;
        
        // Update scroll position
        setScrollPosition({ x: scrollLeft, y: scrollTop });
        
        // Update scroll direction
        if (detectDirection) {
          const xDirection = scrollLeft > lastScroll.current.x ? 'right' : 'left';
          const yDirection = scrollTop > lastScroll.current.y ? 'down' : 'up';
          setScrollDirection({ x: xDirection, y: yDirection });
          lastScroll.current = { x: scrollLeft, y: scrollTop };
        }
        
        // Check if at start/end
        if (detectAtEnd) {
          const maxScrollLeft = element.scrollWidth - element.clientWidth;
          const maxScrollTop = element.scrollHeight - element.clientHeight;
          
          setIsAtStart({
            x: scrollLeft <= 0,
            y: scrollTop <= 0,
          });
          
          setIsAtEnd({
            x: scrollLeft >= maxScrollLeft,
            y: scrollTop >= maxScrollTop,
          });
        }
        
        ticking.current = false;
      }, throttleDelay);
    }
  }, [elementRef, throttleDelay, detectDirection, detectAtEnd]);

  // Scroll element horizontally
  const scrollElementX = useCallback((position, behavior = 'smooth') => {
    if (elementRef.current) {
      elementRef.current.scrollTo({
        left: position,
        behavior,
      });
    }
  }, [elementRef]);

  // Scroll element vertically
  const scrollElementY = useCallback((position, behavior = 'smooth') => {
    if (elementRef.current) {
      elementRef.current.scrollTo({
        top: position,
        behavior,
      });
    }
  }, [elementRef]);

  // Scroll element to start
  const scrollToStart = useCallback((behavior = 'smooth') => {
    if (elementRef.current) {
      elementRef.current.scrollTo({
        left: 0,
        top: 0,
        behavior,
      });
    }
  }, [elementRef]);

  // Scroll element to end
  const scrollToEnd = useCallback((behavior = 'smooth') => {
    if (elementRef.current) {
      const element = elementRef.current;
      element.scrollTo({
        left: element.scrollWidth,
        top: element.scrollHeight,
        behavior,
      });
    }
  }, [elementRef]);

  // Add scroll event listener to element
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    element.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef, handleScroll]);

  return {
    scrollPosition,
    scrollDirection,
    isAtStart,
    isAtEnd,
    scrollElementX,
    scrollElementY,
    scrollToStart,
    scrollToEnd,
  };
};