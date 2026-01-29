import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import BaseModal from './BaseModal';
import { PrimaryButton, SecondaryButton } from '../Button';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
  ...props
}) => {
  const variantConfig = {
    danger: {
      icon: ExclamationTriangleIcon,
      iconColor: 'text-red-600',
      iconBgColor: 'bg-red-100',
      confirmButtonVariant: 'danger',
    },
    warning: {
      icon: ExclamationTriangleIcon,
      iconColor: 'text-yellow-600',
      iconBgColor: 'bg-yellow-100',
      confirmButtonVariant: 'warning',
    },
    success: {
      icon: ExclamationTriangleIcon,
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-100',
      confirmButtonVariant: 'success',
    },
    info: {
      icon: ExclamationTriangleIcon,
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      confirmButtonVariant: 'primary',
    },
  };

  const { icon: Icon, iconColor, iconBgColor, confirmButtonVariant } = variantConfig[variant];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      {...props}
    >
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className={clsx('p-3 rounded-full', iconBgColor)}>
            <Icon className={clsx('h-6 w-6', iconColor)} />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        {message && (
          <p className="text-gray-600 mb-6">
            {message}
          </p>
        )}
        
        <div className="flex gap-3 justify-center">
          <SecondaryButton
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="min-w-[100px]"
          >
            {cancelText}
          </SecondaryButton>
          
          <PrimaryButton
            onClick={onConfirm}
            loading={isLoading}
            className={clsx(
              'min-w-[100px]',
              variant === 'danger' && 'bg-red-600 hover:bg-red-700',
              variant === 'warning' && 'bg-yellow-600 hover:bg-yellow-700',
              variant === 'success' && 'bg-green-600 hover:bg-green-700'
            )}
          >
            {confirmText}
          </PrimaryButton>
        </div>
      </div>
    </BaseModal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.oneOf(['danger', 'warning', 'success', 'info']),
  isLoading: PropTypes.bool,
};

export default ConfirmModal;
EOF
