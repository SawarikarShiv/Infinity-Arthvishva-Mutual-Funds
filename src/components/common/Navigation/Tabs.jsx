import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  fullWidth = false,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
}) => {
  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: 'space-x-2',
  };

  const tabVariantClasses = {
    default: {
      base: 'border-b-2 border-transparent',
      active: 'border-blue-500 text-blue-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300',
    },
    pills: {
      base: 'rounded-lg',
      active: 'bg-blue-100 text-blue-700',
      inactive: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
    },
  };

  const currentVariant = tabVariantClasses[variant];

  return (
    <nav className={clsx(variantClasses[variant], className)} aria-label="Tabs">
      <div className={clsx('flex', fullWidth && 'flex-1')}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-4 py-3 text-sm font-medium transition-colors duration-200',
              currentVariant.base,
              activeTab === tab.id
                ? [currentVariant.active, activeTabClassName]
                : [currentVariant.inactive, tabClassName],
              fullWidth && 'flex-1 text-center',
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
            disabled={tab.disabled}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <div className="flex items-center gap-2">
              {tab.icon && <tab.icon className="h-4 w-4" />}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={clsx(
                    'ml-2 py-0.5 px-2 text-xs font-medium rounded-full',
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
      count: PropTypes.number,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'pills']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  tabClassName: PropTypes.string,
  activeTabClassName: PropTypes.string,
};

export default Tabs;
EOF