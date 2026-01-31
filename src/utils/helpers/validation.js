/**
 * General validation utilities
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const isValidPAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const isValidAadhaar = (aadhaar) => {
  const aadhaarRegex = /^\d{12}$/;
  return aadhaarRegex.test(aadhaar.replace(/\s/g, ''));
};

export const isValidIFSC = (ifsc) => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
};

export const isValidAccountNumber = (accountNumber) => {
  const accountRegex = /^\d{9,18}$/;
  return accountRegex.test(accountNumber.replace(/\s/g, ''));
};

export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidDate = (date) => {
  if (!date) return false;
  
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const isValidAge = (date, minAge = 18, maxAge = 100) => {
  if (!isValidDate(date)) return false;
  
  const birthDate = new Date(date);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= minAge && age <= maxAge;
};

export const isValidAmount = (amount, min = 0, max = 100000000) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= min && num <= max;
};

export const isValidPercentage = (percentage) => {
  const num = parseFloat(percentage);
  return !isNaN(num) && num >= 0 && num <= 100;
};

export const isPositiveNumber = (num) => {
  const number = parseFloat(num);
  return !isNaN(number) && number > 0;
};

export const isNonNegativeNumber = (num) => {
  const number = parseFloat(num);
  return !isNaN(number) && number >= 0;
};

export const isInteger = (num) => {
  const number = parseFloat(num);
  return !isNaN(number) && Number.isInteger(number);
};

export const hasValue = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (typeof value === 'number') return !isNaN(value);
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

export const validateRequired = (value, fieldName) => {
  if (!hasValue(value)) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!hasValue(email)) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone) => {
  if (!hasValue(phone)) return 'Phone number is required';
  if (!isValidPhone(phone)) return 'Please enter a valid 10-digit phone number';
  return null;
};

export const validatePAN = (pan) => {
  if (!hasValue(pan)) return 'PAN is required';
  if (!isValidPAN(pan)) return 'Please enter a valid PAN number (e.g., ABCDE1234F)';
  return null;
};