import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clsx } from 'clsx';
import { LogoMain } from '@/assets';

const AuthLayout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    const userRole = useSelector((state) => state.auth.user?.role);
    let redirectPath = '/';
    
    switch (userRole) {
      case 'investor':
        redirectPath = '/investor/dashboard';
        break;
      case 'advisor':
        redirectPath = '/advisor/dashboard';
        break;
      case 'admin':
        redirectPath = '/admin/dashboard';
        break;
      default:
        redirectPath = '/';
    }
    
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <LogoMain className="h-8 w-auto" />
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <span className="text-gray-500 text-sm">
                    Infinity Arthvishva Mutual Funds
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="/"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <LogoMain className="h-12 w-auto mx-auto" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Welcome to Infinity Arthvishva
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Smart Investment Platform for Mutual Funds
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10 border border-gray-100">
            {children || <Outlet />}
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <a href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Support Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-sm text-gray-500">
              <svg
                className="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Need help? Call us at{' '}
              <a href="tel:18001234567" className="font-medium text-blue-600 ml-1">
                1800-123-4567
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Infinity Arthvishva Mutual Funds. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <a href="/about" className="text-sm text-gray-500 hover:text-gray-900">
                  About
                </a>
                <a href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                  Contact
                </a>
                <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">
                  Privacy
                </a>
                <a href="/terms" className="text-sm text-gray-500 hover:text-gray-900">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;
EOF