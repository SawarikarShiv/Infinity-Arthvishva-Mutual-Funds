import React from 'react';
import { useParams } from 'react-router-dom';
import AuthLayout from '@components/layouts/AuthLayout';
import { ResetPasswordForm } from '@features/auth';

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <span className="text-2xl text-blue-600">🔄</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Set New Password</h1>
            <p className="mt-2 text-gray-600">
              Create a strong new password for your account
            </p>
          </div>

          {/* Reset Password Form */}
          <ResetPasswordForm token={token} />

          {/* Password Tips */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Password Tips:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Use at least 8 characters
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Mix uppercase and lowercase letters
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Include numbers and special characters
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Avoid using personal information
              </li>
            </ul>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <span className="text-yellow-500 mr-3">⚠️</span>
              <div>
                <div className="font-medium text-yellow-800">Security Notice</div>
                <p className="text-sm text-yellow-700 mt-1">
                  This link is valid for 24 hours only. For security reasons, please reset your password immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
EOF