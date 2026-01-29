import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const StatsCard = ({
  title,
  value,
  change,
  changePercentage,
  icon: Icon,
  trend = 'neutral',
  format = 'number',
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const isPositive = trend === 'positive';
  const isNegative = trend === 'negative';
  
  const formatValue = (val) => {
    if (format === 'currency') {
      if (val >= 10000000) {
        return `₹${(val / 10000000).toFixed(1)} Cr`;
      } else if (val >= 100000) {
        return `₹${(val / 100000).toFixed(1)} L`;
      } else if (val >= 1000) {
        return `₹${(val / 1000).toFixed(1)}K`;
      }
      return `₹${val}`;
    } else if (format === 'percentage') {
      return `${val}%`;
    }
    return val;
  };

  return (
    <div className={clsx(
      'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {prefix}{formatValue(value)}{suffix}
          </p>
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        )}
      </div>

      {(change !== undefined || changePercentage !== undefined) && (
        <div className="flex items-center gap-2 mt-4">
          {isPositive ? (
            <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : isNegative ? (
            <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : null}
          
          <span className={clsx(
            'text-sm font-medium',
            isPositive && 'text-green-600',
            isNegative && 'text-red-600',
            !isPositive && !isNegative && 'text-gray-600'
          )}>
            {change !== undefined && `${change >= 0 ? '+' : ''}${format === 'currency' ? '₹' : ''}${Math.abs(change).toLocaleString('en-IN')}`}
            {change !== undefined && changePercentage !== undefined && ' · '}
            {changePercentage !== undefined && `${changePercentage >= 0 ? '+' : ''}${Math.abs(changePercentage)}%`}
          </span>
          
          <span className="text-sm text-gray-500 ml-2">from last period</span>
        </div>
      )}
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  change: PropTypes.number,
  changePercentage: PropTypes.number,
  icon: PropTypes.elementType,
  trend: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  format: PropTypes.oneOf(['number', 'currency', 'percentage']),
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  className: PropTypes.string,
};

StatsCard.defaultProps = {
  trend: 'neutral',
  format: 'number',
};

export default StatsCard;
EOF
