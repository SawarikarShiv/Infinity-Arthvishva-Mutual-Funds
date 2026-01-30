import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrimaryButton from '@components/common/Button/PrimaryButton';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef([]);

  // Get email from location state or use default
  const email = location.state?.email || 'user@example.com';

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    
    return () => clearInterval(interval);
  }, [timer, canResend]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      // If pasting OTP
      const pastedOtp = value.split('').slice(0, 6);
      const newOtp = [...otp];
      pastedOtp.forEach((char, idx) => {
        if (idx < 6) {
          newOtp[idx] = char;
        }
      });
      setOtp(newOtp);
      
      // Focus on last filled input
      const lastFilledIndex = pastedOtp.length < 6 ? pastedOtp.length : 5;
      if (inputRefs.current[lastFilledIndex]) {
        inputRefs.current[lastFilledIndex].focus();
      }
      return;
    }

    // Single digit input
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      // Move to next input if value entered
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedDigits = pastedData.replace(/\D/g, '').split('').slice(0, 6);
    
    const newOtp = [...otp];
    pastedDigits.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);
    
    // Focus on last input
    const lastIndex = Math.min(pastedDigits.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits of the OTP');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      console.log('OTP verified:', otpString);
      navigate('/dashboard');
      
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Simulate resend API call
    console.log('Resending OTP to:', email);
    // Add your resend OTP logic here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Verify Your Email</h2>
      
      <p className="text-gray-600 mb-6 text-center">
        We've sent a 6-digit verification code to{' '}
        <span className="font-medium text-blue-600">{email}</span>
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Verification Code
          </label>
          
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </div>
        </div>

        <PrimaryButton
          type="submit"
          className="w-full py-3"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center space-y-4">
        <div className="text-sm text-gray-600">
          {canResend ? (
            <button
              onClick={handleResendOTP}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Resend verification code
            </button>
          ) : (
            <p>
              Resend code in{' '}
              <span className="font-medium text-blue-600">00:{timer.toString().padStart(2, '0')}</span>
            </p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Didn't receive the code? Check your spam folder or{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              use a different email
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <button
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
EOF