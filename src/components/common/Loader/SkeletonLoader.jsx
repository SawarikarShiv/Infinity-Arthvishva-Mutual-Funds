import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const SkeletonLoader = ({
  type = 'text',
  count = 1,
  width,
  height,
  rounded = true,
  className = '',
}) => {
  const baseClasses = 'animate-pulse bg-gray-200';
  const roundedClass = rounded ? 'rounded' : '';

  const getSkeletonElement = (index) => {
    switch (type) {
      case 'text':
        return (
          <div
            key={index}
            className={clsx(
              baseClasses,
              roundedClass,
              'h-4',
              className
            )}
            style={{ width: width || '100%' }}
          />
        );
      
      case 'heading':
        return (
          <div
            key={index}
            className={clsx(
              baseClasses,
              roundedClass,
              'h-6',
              className
            )}
            style={{ width: width || '50%' }}
          />
        );
      
      case 'circle':
        return (
          <div
            key={index}
            className={clsx(
              baseClasses,
              'rounded-full',
              className
            )}
            style={{
              width: width || '40px',
              height: height || '40px',
            }}
          />
        );
      
      case 'rectangle':
        return (
          <div
            key={index}
            className={clsx(
              baseClasses,
              roundedClass,
              className
            )}
            style={{
              width: width || '100%',
              height: height || '100px',
            }}
          />
        );
      
      case 'card':
        return (
          <div
            key={index}
            className={clsx(
              baseClasses,
              'rounded-xl',
              'p-6',
              className
            )}
            style={{ width: width || '100%' }}
          >
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (count === 1) {
    return getSkeletonElement(0);
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        getSkeletonElement(index)
      ))}
    </div>
  );
};

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(['text', 'heading', 'circle', 'rectangle', 'card']),
  count: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  rounded: PropTypes.bool,
  className: PropTypes.string,
};

export default SkeletonLoader;
EOF