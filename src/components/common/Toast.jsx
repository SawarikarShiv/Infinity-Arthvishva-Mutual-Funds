import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store/slices/notificationSlice';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Toast = () => {
  const dispatch = useDispatch();
  const showToast = useSelector(state => state.notification.showToast);
  const toastMessage = useSelector(state => state.notification.toastMessage);
  const toastType = useSelector(state => state.notification.toastType);
  const toastDuration = useSelector(state => state.notification.toastDuration);

  useEffect(() => {
    if (showToast && toastDuration > 0) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, toastDuration);

      return () => clearTimeout(timer);
    }
  }, [showToast, toastDuration, dispatch]);

  if (!showToast) return null;

  // Define toast styles based on type
  const getToastStyles = () => {
    switch (toastType) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: <XCircleIcon className="w-5 h-5 text-red-500" />
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
        };
      default: // info
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: <InformationCircleIcon className="w-5 h-5 text-blue-500" />
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div 
        className={`${styles.bg} ${styles.border} ${styles.text} border rounded-lg shadow-lg p-4 flex items-start space-x-3`}
        role="alert"
        aria-live="assertive"
      >
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
        <button
          onClick={() => dispatch(hideToast())}
          className="flex-shrink-0 ml-4 -mr-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Toast;