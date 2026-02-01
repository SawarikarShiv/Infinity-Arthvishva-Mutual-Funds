import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

// Try different import paths with fallbacks
let CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon;

try {
  // Try 24/solid first
  ({ 
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon
  } = require('@heroicons/react/24/solid'));
} catch (error) {
  // Fallback to outline if solid doesn't exist
  console.warn('Solid icons not found, using outline icons as fallback');
  ({ 
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon
  } = require('@heroicons/react/24/outline'));
}

const Toast = ({
  id,
  message,
  type = 'info',
  duration = 5000,
  onClose,
  className = '',
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const typeConfig = {
    success: {
      icon: CheckCircleIcon,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      ringColor: 'focus:ring-green-500',
    },
    error: {
      icon: XCircleIcon,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      ringColor: 'focus:ring-red-500',
    },
    warning: {
      icon: ExclamationCircleIcon,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      ringColor: 'focus:ring-yellow-500',
    },
    info: {
      icon: InformationCircleIcon,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      ringColor: 'focus:ring-blue-500',
    },
  };

  const { icon: Icon, iconColor, bgColor, borderColor, textColor, ringColor } = typeConfig[type];

  return (
    <div
      className={clsx(
        'relative flex items-start p-4 rounded-lg border shadow-sm w-full max-w-sm',
        'animate-fade-in',
        bgColor,
        borderColor,
        className
      )}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex-shrink-0 pt-0.5">
        <Icon className={clsx('h-5 w-5', iconColor)} aria-hidden="true" />
      </div>
      
      <div className="ml-3 flex-1">
        <p className={clsx('text-sm font-medium', textColor)}>
          {message}
        </p>
      </div>
      
      <button
        type="button"
        onClick={() => onClose(id)}
        className={clsx(
          'ml-4 flex-shrink-0 p-1 rounded-md transition-colors',
          'hover:bg-gray-200 dark:hover:bg-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          ringColor
        )}
        aria-label="Close notification"
      >
        <XMarkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Toast;