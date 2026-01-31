/**
 * Authentication validators
 */
import { isValidEmail, isValidPhone, isValidPassword, isValidPAN, isValidAadhaar } from '../helpers/validation';

export const validateLoginForm = (data) => {
  const errors = {};
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegistrationForm = (data) => {
  const errors = {};
  
  // Personal Information
  if (!data.firstName) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters long';
  }
  
  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.length < 1) {
    errors.lastName = 'Last name is required';
  }
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.phone) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }
  
  // Password
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(data.password)) {
    errors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character';
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  // Terms and Conditions
  if (!data.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateForgotPasswordForm = (data) => {
  const errors = {};
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateResetPasswordForm = (data) => {
  const errors = {};
  
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(data.password)) {
    errors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character';
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!data.token) {
    errors.token = 'Reset token is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateProfileForm = (data) => {
  const errors = {};
  
  // Basic Information
  if (!data.firstName) {
    errors.firstName = 'First name is required';
  }
  
  if (!data.lastName) {
    errors.lastName = 'Last name is required';
  }
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.phone) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }
  
  // Date of Birth
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    
    if (age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    }
  }
  
  // PAN Number
  if (!data.panNumber) {
    errors.panNumber = 'PAN number is required';
  } else if (!isValidPAN(data.panNumber)) {
    errors.panNumber = 'Please enter a valid PAN number';
  }
  
  // Address
  if (!data.address) {
    errors.address = 'Address is required';
  }
  
  if (!data.city) {
    errors.city = 'City is required';
  }
  
  if (!data.state) {
    errors.state = 'State is required';
  }
  
  if (!data.pincode) {
    errors.pincode = 'Pincode is required';
  } else if (!/^\d{6}$/.test(data.pincode)) {
    errors.pincode = 'Please enter a valid 6-digit pincode';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateKYCForm = (data) => {
  const errors = {};
  
  // PAN Details
  if (!data.panNumber) {
    errors.panNumber = 'PAN number is required';
  } else if (!isValidPAN(data.panNumber)) {
    errors.panNumber = 'Please enter a valid PAN number';
  }
  
  // Aadhaar Details
  if (data.hasAadhaar && !data.aadhaarNumber) {
    errors.aadhaarNumber = 'Aadhaar number is required';
  } else if (data.hasAadhaar && data.aadhaarNumber && !isValidAadhaar(data.aadhaarNumber)) {
    errors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
  }
  
  // Occupation Details
  if (!data.occupation) {
    errors.occupation = 'Occupation is required';
  }
  
  if (!data.annualIncome) {
    errors.annualIncome = 'Annual income is required';
  }
  
  // Bank Details
  if (!data.bankAccountNumber) {
    errors.bankAccountNumber = 'Bank account number is required';
  }
  
  if (!data.bankName) {
    errors.bankName = 'Bank name is required';
  }
  
  if (!data.branchName) {
    errors.branchName = 'Branch name is required';
  }
  
  if (!data.ifscCode) {
    errors.ifscCode = 'IFSC code is required';
  }
  
  // Nominee Details (if applicable)
  if (data.hasNominee && !data.nomineeName) {
    errors.nomineeName = 'Nominee name is required';
  }
  
  if (data.hasNominee && !data.nomineeRelationship) {
    errors.nomineeRelationship = 'Nominee relationship is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateChangePasswordForm = (data) => {
  const errors = {};
  
  if (!data.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }
  
  if (!data.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (!isValidPassword(data.newPassword)) {
    errors.newPassword = 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character';
  }
  
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (data.currentPassword === data.newPassword) {
    errors.newPassword = 'New password must be different from current password';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateOTPForm = (data) => {
  const errors = {};
  
  if (!data.otp) {
    errors.otp = 'OTP is required';
  } else if (!/^\d{6}$/.test(data.otp)) {
    errors.otp = 'Please enter a valid 6-digit OTP';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTwoFactorSetupForm = (data) => {
  const errors = {};
  
  if (!data.method) {
    errors.method = 'Please select a 2FA method';
  }
  
  if (data.method === 'authenticator' && !data.verificationCode) {
    errors.verificationCode = 'Verification code is required';
  }
  
  if (data.method === 'sms' && !data.phone) {
    errors.phone = 'Phone number is required';
  } else if (data.method === 'sms' && data.phone && !isValidPhone(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};