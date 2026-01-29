import React, { forwardRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Checkbox = forwardRef(({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  error = '',
  required = false,
  indeterminate = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  ...props
}, forwardedRef) => {
  // Use a local ref that we can combine with forwardedRef
  const localRef = useRef(null);
  
  // Combine local ref with forwarded ref
  const setRef = (element) => {
    localRef.current = element;
    
    // Handle forwarded ref
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else if (forwardedRef) {
      forwardedRef.current = element;
    }
  };
  
  // Handle indeterminate state
  useEffect(() => {
    if (localRef.current) {
      localRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={clsx('flex items-start', containerClassName)}>
      <div className="flex items-center h-5">
        <input
          ref={setRef}
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={clsx(
            'h-4 w-4 rounded border-gray-300',
            'text-blue-600 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-300',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
      </div>
      
      {label && (
        <div className="ml-3 text-sm">
          <label
            htmlFor={name}
            className={clsx(
              'font-medium text-gray-700',
              disabled && 'text-gray-500',
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      )}
      
      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;