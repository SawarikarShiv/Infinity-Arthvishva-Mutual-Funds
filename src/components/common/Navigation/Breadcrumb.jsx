import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, homeLabel = 'Dashboard', homePath = '/', className = '' }) => {
  return (
    <nav className={clsx('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              to={homePath}
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">{homeLabel}</span>
            </Link>
          </div>
        </li>
        
        {items.map((item, index) => (
          <li key={item.label}>
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
              {item.href ? (
                <Link
                  to={item.href}
                  className={clsx(
                    'ml-4 text-sm font-medium',
                    index === items.length - 1
                      ? 'text-gray-500 cursor-default'
                      : 'text-gray-700 hover:text-gray-900 transition-colors duration-200'
                  )}
                  aria-current={index === items.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    'ml-4 text-sm font-medium',
                    index === items.length - 1
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  )}
                  aria-current={index === items.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ).isRequired,
  homeLabel: PropTypes.string,
  homePath: PropTypes.string,
  className: PropTypes.string,
};

export default Breadcrumb;
EOF