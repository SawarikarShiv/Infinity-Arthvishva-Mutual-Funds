import React from 'react';
import clsx from 'clsx';

const TextInput = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = true,
  className = '',
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  helperClassName = '',
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <div className={clsx('space-y-2', containerClassName)}>
      {label && (
        <label
          className={clsx(
            'block text-sm font-medium text-gray-700 dark:text-gray-300',
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={clsx(
            'block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors duration-200',
            {
              'pl-10': startIcon,
              'pr-10': endIcon,
              'border-red-500 focus:border-red-500 focus:ring-red-500': error,
              'opacity-50 cursor-not-allowed': disabled,
              'w-full': fullWidth,
            },
            className,
            inputClassName
          )}
          placeholder={placeholder}
          {...props}
        />
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p
          className={clsx(
            'text-sm text-red-600 dark:text-red-400',
            errorClassName
          )}
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p
          className={clsx(
            'text-sm text-gray-500 dark:text-gray-400',
            helperClassName
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextInput;