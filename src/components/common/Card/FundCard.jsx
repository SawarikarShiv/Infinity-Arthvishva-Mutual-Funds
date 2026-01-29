import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { ArrowUpIcon, ArrowDownIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const FundCard = ({
  name,
  category,
  nav,
  change,
  changePercentage,
  aum,
  riskLevel,
  minInvestment,
  rating,
  onClick,
  className = '',
}) => {
  const isPositive = change >= 0;
  
  const riskColors = {
    low: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    'very high': 'bg-purple-100 text-purple-800',
  };

  const categoryColors = {
    equity: 'bg-blue-100 text-blue-800',
    debt: 'bg-green-100 text-green-800',
    hybrid: 'bg-yellow-100 text-yellow-800',
    'index fund': 'bg-purple-100 text-purple-800',
    sectoral: 'bg-pink-100 text-pink-800',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer',
        'hover:border-blue-300',
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', categoryColors[category?.toLowerCase()] || 'bg-gray-100 text-gray-800')}>
              {category}
            </span>
            <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', riskColors[riskLevel?.toLowerCase()] || 'bg-gray-100 text-gray-800')}>
              {riskLevel} Risk
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ChartBarIcon className="h-5 w-5 text-gray-400" />
          {rating && (
            <span className="text-sm font-medium text-gray-700">
              {rating}/5
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">NAV</p>
          <p className="text-xl font-bold text-gray-900">₹{nav?.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 mt-1">
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
            )}
            <span className={clsx('text-sm font-medium', isPositive ? 'text-green-600' : 'text-red-600')}>
              {isPositive ? '+' : ''}{changePercentage}% (₹{Math.abs(change)?.toLocaleString('en-IN')})
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">AUM</p>
          <p className="text-lg font-semibold text-gray-900">
            ₹{(aum / 10000000)?.toFixed(1)} Cr
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Min. Investment</p>
            <p className="text-sm font-medium text-gray-900">₹{minInvestment?.toLocaleString('en-IN')}</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
};

FundCard.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nav: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  changePercentage: PropTypes.number.isRequired,
  aum: PropTypes.number.isRequired,
  riskLevel: PropTypes.oneOf(['Low', 'Moderate', 'High', 'Very High']),
  minInvestment: PropTypes.number,
  rating: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

FundCard.defaultProps = {
  riskLevel: 'Moderate',
  minInvestment: 1000,
  rating: null,
};

export default FundCard;
EOF