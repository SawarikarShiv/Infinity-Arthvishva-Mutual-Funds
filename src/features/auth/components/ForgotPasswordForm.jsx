import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import TextInput from '@components/common/Inputs/TextInput';

const forgotPasswordSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required')
});

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reset password requested for:', data.email);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent password reset instructions to your email address.
          Please check your inbox and follow the link to reset your password.
        </p>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Try another email address
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <Link
            to="/login"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Your Password</h2>
      
      <p className="text-gray-600 mb-6 text-center">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <PrimaryButton
          type="submit"
          className="w-full py-3"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Instructions'}
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
EOF
