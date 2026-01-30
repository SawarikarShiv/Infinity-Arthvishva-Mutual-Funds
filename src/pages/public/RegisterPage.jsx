import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthLayout from '@components/layouts/AuthLayout';
import { RegisterForm } from '@features/auth';
import { selectIsAuthenticated } from '@features/auth/authSlice';

const RegisterPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/investor/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <span className="text-2xl text-blue-600">🚀</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Start Your Investment Journey</h1>
            <p className="mt-2 text-gray-600">
              Create your account and begin building wealth with expert guidance
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="w-24 h-1 bg-blue-600"></div>
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                2
              </div>
              <div className="w-24 h-1 bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold">
                3
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Step 1: Create Account
            </span>
          </div>

          {/* Register Form */}
          <RegisterForm />

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <span className="text-green-600 mr-3">✅</span>
              <div>
                <div className="font-medium text-gray-800">Zero Commission</div>
                <div className="text-sm text-gray-600">No hidden fees</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-blue-600 mr-3">🔒</span>
              <div>
                <div className="font-medium text-gray-800">100% Secure</div>
                <div className="text-sm text-gray-600">Bank-level security</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-purple-600 mr-3">📱</span>
              <div>
                <div className="font-medium text-gray-800">Easy Onboarding</div>
                <div className="text-sm text-gray-600">5-minute KYC</div>
              </div>
            </div>
          </div>

          {/* Already have account */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-800">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
EOF