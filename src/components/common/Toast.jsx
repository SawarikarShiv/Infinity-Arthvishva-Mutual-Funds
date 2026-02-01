import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../store/slices/notificationSlice';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

  const typeClasses = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconClasses = {
    success: 'text-green-400 bg-green-100',
    error: 'text-red-400 bg-red-100',
    warning: 'text-yellow-400 bg-yellow-100',
    info: 'text-blue-400 bg-blue-100',
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div className={`${typeClasses[toastType]} border rounded-lg shadow-lg p-4 flex items-start space-x-3`}>
        <div className={`${iconClasses[toastType]} flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center`}>
          {icons[toastType]}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
        <button
          onClick={() => dispatch(hideToast())}
          className="flex-shrink-0 ml-4 -mr-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <XMarkIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Toast;