import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error = '',
  required = false,
  disabled = false,
  inline = false,
  className = '',
  containerClassName = '',
}) => {
  return (
    <div className={clsx('space-y-3', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={clsx(
        'space-y-2',
        inline && 'flex flex-wrap gap-4 space-y-0'
      )}>
        {options.map((option) => (
          <div
            key={option.value}
            className={clsx(
              'flex items-center',
              inline && 'inline-flex'
            )}
          >
            <input
              id={`${name}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled || option.disabled}
              className={clsx(
                'h-4 w-4 border-gray-300',
                'text-blue-600 focus:ring-blue-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                error && 'border-red-300'
              )}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            
            <label
              htmlFor={`${name}-${option.value}`}
              className={clsx(
                'ml-3 text-sm font-medium',
                disabled || option.disabled ? 'text-gray-500' : 'text-gray-700'
              )}
            >
              {option.label}
              {option.description && (
                <span className="block text-xs text-gray-500 mt-0.5">
                  {option.description}
                </span>
              )}
            </label>
          </div>
        ))}
      </div>
      
      {error && (
        <p
          id={`${name}-error`}
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default RadioGroup;
EOF
