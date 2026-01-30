import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@components/layouts/AuthLayout';
import { ForgotPasswordForm } from '@features/auth';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <span className="text-2xl text-blue-600">🔑</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
            <p className="mt-2 text-gray-600">
              Enter your email to receive password reset instructions
            </p>
          </div>

          {/* Forgot Password Form */}
          <ForgotPasswordForm />

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start">
              <span className="text-gray-500 mr-3 mt-1">💁</span>
              <div>
                <div className="font-medium text-gray-800">Need help?</div>
                <p className="text-sm text-gray-600 mt-1">
                  Contact our support team at{' '}
                  <a href="mailto:support@infinityarthvishva.com" className="text-blue-600 hover:text-blue-800">
                    support@infinityarthvishva.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
EOF