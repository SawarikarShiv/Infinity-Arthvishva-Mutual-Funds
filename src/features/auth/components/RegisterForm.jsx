import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../authSlice';
import PrimaryButton from '@components/common/Button/PrimaryButton';
import TextInput from '@components/common/Inputs/TextInput';
import SelectInput from '@components/common/Inputs/SelectInput';
import Checkbox from '@components/common/Inputs/Checkbox';

const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
  userType: yup.string().oneOf(['investor', 'advisor'], 'Invalid user type').required('User type is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  termsAccepted: yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      userType: 'investor',
      password: '',
      confirmPassword: '',
      termsAccepted: false
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate('/verification');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    { value: 'investor', label: 'Investor' },
    { value: 'advisor', label: 'Financial Advisor' }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="First Name"
            placeholder="Enter your first name"
            {...register('firstName')}
            error={errors.firstName?.message}
            required
          />

          <TextInput
            label="Last Name"
            placeholder="Enter your last name"
            {...register('lastName')}
            error={errors.lastName?.message}
            required
          />
        </div>

        <TextInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          {...register('phone')}
          error={errors.phone?.message}
          required
        />

        <SelectInput
          label="I want to join as"
          options={userTypes}
          {...register('userType')}
          error={errors.userType?.message}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Password"
            type="password"
            placeholder="Create a password"
            {...register('password')}
            error={errors.password?.message}
            required
          />

          <TextInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
          />
        </div>

        <div className="space-y-2">
          <Checkbox
            label={
              <span>
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            }
            {...register('termsAccepted')}
            error={errors.termsAccepted?.message}
          />
        </div>

        <PrimaryButton
          type="submit"
          className="w-full py-3"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
EOF
