import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

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
      iconColor: 'text-green-400',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
    },
    error: {
      icon: XCircleIcon,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
    },
    warning: {
      icon: ExclamationCircleIcon,
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
    },
    info: {
      icon: InformationCircleIcon,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
    },
  };

  const { icon: Icon, iconColor, bgColor, borderColor, textColor } = typeConfig[type];

  return (
    <div
      className={clsx(
        'relative flex items-start p-4 rounded-lg border shadow-sm',
        'animate-slide-in-right',
        bgColor,
        borderColor,
        className
      )}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex-shrink-0">
        <Icon className={clsx('h-5 w-5', iconColor)} />
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
          'ml-4 flex-shrink-0 p-1 rounded-md',
          'hover:bg-black hover:bg-opacity-10',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          `focus:ring-${type}-500`
        )}
        aria-label="Close"
      >
        <XMarkIcon className="h-4 w-4" />
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
EOF