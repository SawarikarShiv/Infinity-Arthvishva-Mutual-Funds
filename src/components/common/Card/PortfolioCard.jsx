import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { TrendingUpIcon, TrendingDownIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

const PortfolioCard = ({
  title,
  currentValue,
  totalInvestment,
  returns,
  returnPercentage,
  allocation = {},
  onClick,
  className = '',
}) => {
  const isPositive = returns >= 0;
  const totalAllocation = Object.values(allocation).reduce((sum, val) => sum + val, 0);

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200',
        onClick && 'cursor-pointer hover:border-blue-300',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <CurrencyRupeeIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Portfolio</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUpIcon className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDownIcon className="h-5 w-5 text-red-500" />
          )}
          <span className={clsx('text-lg font-bold', isPositive ? 'text-green-600' : 'text-red-600')}>
            {isPositive ? '+' : ''}{returnPercentage}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500">Current Value</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{currentValue?.toLocaleString('en-IN')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Invested</p>
          <p className="text-xl font-semibold text-gray-900">
            ₹{totalInvestment?.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Absolute Returns</p>
        <p className={clsx('text-2xl font-bold', isPositive ? 'text-green-600' : 'text-red-600')}>
          {isPositive ? '+' : ''}₹{Math.abs(returns)?.toLocaleString('en-IN')}
        </p>
      </div>

      {totalAllocation > 0 && (
        <div className="pt-6 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-700 mb-3">Asset Allocation</p>
          <div className="space-y-2">
            {Object.entries(allocation).map(([asset, percentage]) => (
              <div key={asset} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{asset}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-10 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

PortfolioCard.propTypes = {
  title: PropTypes.string.isRequired,
  currentValue: PropTypes.number.isRequired,
  totalInvestment: PropTypes.number.isRequired,
  returns: PropTypes.number.isRequired,
  returnPercentage: PropTypes.number.isRequired,
  allocation: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default PortfolioCard;
EOF
