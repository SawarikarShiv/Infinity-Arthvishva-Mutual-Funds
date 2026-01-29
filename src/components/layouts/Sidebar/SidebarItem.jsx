import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active = false,
  badge,
  children,
  isExpanded = false,
  onToggle,
  className = '',
  iconClassName = '',
  badgeClassName = '',
}) => {
  const hasChildren = React.Children.count(children) > 0;

  const baseClasses = 'flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200';
  
  const activeClasses = active
    ? 'bg-blue-50 text-blue-600'
    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900';

  const content = (
    <>
      <div className="flex items-center">
        {Icon && (
          <Icon
            className={clsx(
              'h-5 w-5 flex-shrink-0',
              active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
              iconClassName
            )}
          />
        )}
        <span className={clsx('ml-3', !Icon && 'ml-0')}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center">
        {badge && (
          <span
            className={clsx(
              'ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              active
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800',
              badgeClassName
            )}
          >
            {badge}
          </span>
        )}
        
        {hasChildren && (
          <ChevronDownIcon
            className={clsx(
              'ml-2 h-4 w-4 transition-transform duration-200',
              isExpanded ? 'transform rotate-180' : '',
              active ? 'text-blue-600' : 'text-gray-400'
            )}
          />
        )}
      </div>
    </>
  );

  if (hasChildren) {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={onToggle}
          className={clsx(baseClasses, activeClasses, 'w-full', className)}
        >
          {content}
        </button>
        
        {isExpanded && (
          <div className="mt-1 ml-8 space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }

  if (href) {
    return (
      <NavLink
        to={href}
        className={({ isActive }) =>
          clsx(
            baseClasses,
            isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            className
          )
        }
        end
      >
        {content}
      </NavLink>
    );
  }

  return (
    <div className={clsx(baseClasses, activeClasses, className)}>
      {content}
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  active: PropTypes.bool,
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  isExpanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  badgeClassName: PropTypes.string,
};

export default SidebarItem;
EOF
