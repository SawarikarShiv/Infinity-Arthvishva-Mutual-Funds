import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';

const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 200,
  maxWidth = 200,
  className = '',
  contentClassName = '',
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tooltipDimensions, setTooltipDimensions] = useState({ width: 0, height: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  let timeoutId = null;

  const showTooltip = () => {
    if (disabled) return;
    
    timeoutId = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
        });
      }
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      setTooltipDimensions({ width, height });
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const getPositionStyles = () => {
    const { width, height } = tooltipDimensions;
    const triggerRect = triggerRef.current?.getBoundingClientRect();
    
    if (!triggerRect) return {};

    const spacing = 8;
    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = coords.y - height - spacing;
        left = coords.x + (triggerRect.width / 2) - (width / 2);
        break;
      case 'bottom':
        top = coords.y + triggerRect.height + spacing;
        left = coords.x + (triggerRect.width / 2) - (width / 2);
        break;
      case 'left':
        top = coords.y + (triggerRect.height / 2) - (height / 2);
        left = coords.x - width - spacing;
        break;
      case 'right':
        top = coords.y + (triggerRect.height / 2) - (height / 2);
        left = coords.x + triggerRect.width + spacing;
        break;
      default:
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = spacing;
    if (left + width > viewportWidth) left = viewportWidth - width - spacing;
    if (top < 0) top = spacing;
    if (top + height > viewportHeight) top = viewportHeight - height - spacing;

    return {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 50,
    };
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-gray-900 border-t-8 border-x-transparent border-x-8 border-b-0',
    bottom: 'top-[-6px] left-1/2 transform -translate-x-1/2 border-b-gray-900 border-b-8 border-x-transparent border-x-8 border-t-0',
    left: 'right-[-6px] top-1/2 transform -translate-y-1/2 border-l-gray-900 border-l-8 border-y-transparent border-y-8 border-r-0',
    right: 'left-[-6px] top-1/2 transform -translate-y-1/2 border-r-gray-900 border-r-8 border-y-transparent border-y-8 border-l-0',
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={clsx(
              'fixed pointer-events-none',
              positionClasses[position],
              className
            )}
            style={getPositionStyles()}
            role="tooltip"
          >
            <div
              className={clsx(
                'relative bg-gray-900 text-white text-sm rounded-lg py-2 px-3 shadow-lg',
                'max-w-xs',
                contentClassName
              )}
              style={{ maxWidth: `${maxWidth}px` }}
            >
              {content}
              <div
                className={clsx('absolute w-0 h-0', arrowClasses[position])}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  delay: PropTypes.number,
  maxWidth: PropTypes.number,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Tooltip;
EOF