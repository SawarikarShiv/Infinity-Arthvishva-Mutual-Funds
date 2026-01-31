/**
 * Mutual Fund validators
 */
import { isValidAmount, isValidPercentage, isPositiveNumber, isNonNegativeNumber } from '../helpers/validation';

export const validateFundInvestmentForm = (data) => {
  const errors = {};
  
  // Fund Selection
  if (!data.fundId) {
    errors.fundId = 'Please select a fund';
  }
  
  // Investment Type
  if (!data.investmentType) {
    errors.investmentType = 'Please select investment type';
  }
  
  // Amount
  if (!data.amount) {
    errors.amount = 'Investment amount is required';
  } else if (!isValidAmount(data.amount, 100, 100000000)) {
    errors.amount = 'Amount must be between ₹100 and ₹10 crore';
  }
  
  // For SIP
  if (data.investmentType === 'sip') {
    if (!data.sipFrequency) {
      errors.sipFrequency = 'SIP frequency is required';
    }
    
    if (!data.sipStartDate) {
      errors.sipStartDate = 'SIP start date is required';
    }
    
    if (!data.sipDuration) {
      errors.sipDuration = 'SIP duration is required';
    } else if (!isPositiveNumber(data.sipDuration)) {
      errors.sipDuration = 'Duration must be a positive number';
    } else if (data.sipDuration < 6) {
      errors.sipDuration = 'Minimum SIP duration is 6 months';
    }
  }
  
  // Payment Method
  if (!data.paymentMethod) {
    errors.paymentMethod = 'Please select payment method';
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

export const validateFundRedemptionForm = (data) => {
  const errors = {};
  
  // Fund Selection
  if (!data.fundId) {
    errors.fundId = 'Please select a fund';
  }
  
  // Redemption Type
  if (!data.redemptionType) {
    errors.redemptionType = 'Please select redemption type';
  }
  
  // For Partial Redemption
  if (data.redemptionType === 'partial') {
    if (!data.units) {
      errors.units = 'Number of units is required';
    } else if (!isPositiveNumber(data.units)) {
      errors.units = 'Units must be a positive number';
    }
    
    if (!data.amount && !data.units) {
      errors.amount = 'Either amount or units must be specified';
    }
  }
  
  // For Full Redemption
  if (data.redemptionType === 'full') {
    if (!data.confirmFullRedemption) {
      errors.confirmFullRedemption = 'Please confirm full redemption';
    }
  }
  
  // Bank Account
  if (!data.bankAccountId) {
    errors.bankAccountId = 'Please select bank account for redemption';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSIPSetupForm = (data) => {
  const errors = {};
  
  // Fund Selection
  if (!data.fundId) {
    errors.fundId = 'Please select a fund';
  }
  
  // SIP Amount
  if (!data.amount) {
    errors.amount = 'SIP amount is required';
  } else if (!isValidAmount(data.amount, 500, 100000)) {
    errors.amount = 'SIP amount must be between ₹500 and ₹1 lakh';
  }
  
  // SIP Date
  if (!data.sipDate) {
    errors.sipDate = 'SIP date is required';
  } else {
    const selectedDate = new Date(data.sipDate);
    const today = new Date();
    
    if (selectedDate < today) {
      errors.sipDate = 'SIP date cannot be in the past';
    }
  }
  
  // SIP Frequency
  if (!data.frequency) {
    errors.frequency = 'SIP frequency is required';
  }
  
  // SIP Duration
  if (!data.duration) {
    errors.duration = 'SIP duration is required';
  } else if (!isPositiveNumber(data.duration)) {
    errors.duration = 'Duration must be a positive number';
  } else if (data.duration < 6) {
    errors.duration = 'Minimum SIP duration is 6 months';
  }
  
  // Payment Method
  if (!data.paymentMethod) {
    errors.paymentMethod = 'Please select payment method';
  }
  
  // Mandate Details (for NACH)
  if (data.paymentMethod === 'nach') {
    if (!data.mandateId) {
      errors.mandateId = 'NACH mandate ID is required';
    }
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

export const validateSWPSetupForm = (data) => {
  const errors = {};
  
  // Fund Selection
  if (!data.fundId) {
    errors.fundId = 'Please select a fund';
  }
  
  // SWP Amount
  if (!data.amount) {
    errors.amount = 'SWP amount is required';
  } else if (!isValidAmount(data.amount, 1000, 1000000)) {
    errors.amount = 'SWP amount must be between ₹1,000 and ₹10 lakh';
  }
  
  // SWP Frequency
  if (!data.frequency) {
    errors.frequency = 'SWP frequency is required';
  }
  
  // SWP Start Date
  if (!data.startDate) {
    errors.startDate = 'SWP start date is required';
  }
  
  // SWP Duration
  if (!data.duration) {
    errors.duration = 'SWP duration is required';
  } else if (!isPositiveNumber(data.duration)) {
    errors.duration = 'Duration must be a positive number';
  }
  
  // Bank Account
  if (!data.bankAccountId) {
    errors.bankAccountId = 'Please select bank account for withdrawal';
  }
  
  // Tax Implications Acknowledgement
  if (!data.acknowledgeTax) {
    errors.acknowledgeTax = 'Please acknowledge the tax implications';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSTPSetupForm = (data) => {
  const errors = {};
  
  // Source Fund
  if (!data.sourceFundId) {
    errors.sourceFundId = 'Please select source fund';
  }
  
  // Target Fund
  if (!data.targetFundId) {
    errors.targetFundId = 'Please select target fund';
  }
  
  if (data.sourceFundId === data.targetFundId) {
    errors.targetFundId = 'Source and target funds cannot be the same';
  }
  
  // STP Amount
  if (!data.amount) {
    errors.amount = 'STP amount is required';
  } else if (!isValidAmount(data.amount, 1000, 1000000)) {
    errors.amount = 'STP amount must be between ₹1,000 and ₹10 lakh';
  }
  
  // STP Frequency
  if (!data.frequency) {
    errors.frequency = 'STP frequency is required';
  }
  
  // STP Start Date
  if (!data.startDate) {
    errors.startDate = 'STP start date is required';
  }
  
  // STP Duration
  if (!data.duration) {
    errors.duration = 'STP duration is required';
  } else if (!isPositiveNumber(data.duration)) {
    errors.duration = 'Duration must be a positive number';
  }
  
  // Tax Implications Acknowledgement
  if (!data.acknowledgeTax) {
    errors.acknowledgeTax = 'Please acknowledge the tax implications';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateFundFilterForm = (data) => {
  const errors = {};
  
  // Validate numeric ranges
  if (data.minReturns && !isNonNegativeNumber(data.minReturns)) {
    errors.minReturns = 'Minimum returns must be a non-negative number';
  }
  
  if (data.maxReturns && !isNonNegativeNumber(data.maxReturns)) {
    errors.maxReturns = 'Maximum returns must be a non-negative number';
  }
  
  if (data.minRisk && !isNonNegativeNumber(data.minRisk)) {
    errors.minRisk = 'Minimum risk must be a non-negative number';
  }
  
  if (data.maxRisk && !isNonNegativeNumber(data.maxRisk)) {
    errors.maxRisk = 'Maximum risk must be a non-negative number';
  }
  
  if (data.minAUM && !isPositiveNumber(data.minAUM)) {
    errors.minAUM = 'Minimum AUM must be a positive number';
  }
  
  if (data.maxAUM && !isPositiveNumber(data.maxAUM)) {
    errors.maxAUM = 'Maximum AUM must be a positive number';
  }
  
  // Validate that min <= max
  if (data.minReturns && data.maxReturns && parseFloat(data.minReturns) > parseFloat(data.maxReturns)) {
    errors.minReturns = 'Minimum returns cannot be greater than maximum returns';
  }
  
  if (data.minRisk && data.maxRisk && parseFloat(data.minRisk) > parseFloat(data.maxRisk)) {
    errors.minRisk = 'Minimum risk cannot be greater than maximum risk';
  }
  
  if (data.minAUM && data.maxAUM && parseFloat(data.minAUM) > parseFloat(data.maxAUM)) {
    errors.minAUM = 'Minimum AUM cannot be greater than maximum AUM';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateFundComparisonForm = (data) => {
  const errors = {};
  
  if (!data.funds || !Array.isArray(data.funds) || data.funds.length < 2) {
    errors.funds = 'Please select at least 2 funds to compare';
  } else if (data.funds.length > 5) {
    errors.funds = 'Maximum 5 funds can be compared at once';
  }
  
  if (!data.comparisonPeriod) {
    errors.comparisonPeriod = 'Please select comparison period';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateFundGoalAllocationForm = (data) => {
  const errors = {};
  
  if (!data.goalId) {
    errors.goalId = 'Please select a goal';
  }
  
  if (!data.funds || !Array.isArray(data.funds) || data.funds.length === 0) {
    errors.funds = 'Please select at least one fund';
  }
  
  // Validate allocation percentages sum to 100
  if (data.funds && data.funds.length > 0) {
    const totalAllocation = data.funds.reduce((sum, fund) => sum + (parseFloat(fund.allocation) || 0), 0);
    
    if (Math.abs(totalAllocation - 100) > 0.01) {
      errors.allocation = 'Total allocation must be 100%';
    }
    
    // Validate individual allocations
    data.funds.forEach((fund, index) => {
      const allocation = parseFloat(fund.allocation);
      if (isNaN(allocation) || allocation < 0 || allocation > 100) {
        errors[`funds[${index}].allocation`] = 'Allocation must be between 0% and 100%';
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};