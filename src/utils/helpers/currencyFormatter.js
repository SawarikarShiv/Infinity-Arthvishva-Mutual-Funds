/**
 * Currency formatting utilities
 */
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  if (amount === null || amount === undefined) return '-';
  
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    
    return formatter.format(amount);
  } catch (error) {
    // Fallback formatting
    const formattedAmount = parseFloat(amount).toFixed(2);
    const symbol = getCurrencySymbol(currency);
    return `${symbol} ${formattedAmount}`;
  }
};

export const formatCurrencyCompact = (amount, currency = 'INR', locale = 'en-IN') => {
  if (amount === null || amount === undefined) return '-';
  
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

export const formatCurrencyWithoutSymbol = (amount, locale = 'en-IN') => {
  if (amount === null || amount === undefined) return '-';
  
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

export const getCurrencySymbol = (currency = 'INR') => {
  const symbols = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CAD': 'C$',
    'AUD': 'A$',
  };
  
  return symbols[currency] || currency;
};

export const parseCurrency = (value) => {
  if (!value) return 0;
  
  // Remove currency symbols, commas, and spaces
  const cleaned = value
    .toString()
    .replace(/[^0-9.-]/g, '');
  
  const number = parseFloat(cleaned);
  return isNaN(number) ? 0 : number;
};

export const calculatePercentageChange = (oldValue, newValue) => {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  
  const change = ((newValue - oldValue) / Math.abs(oldValue)) * 100;
  return parseFloat(change.toFixed(2));
};

export const calculateSIPReturns = (monthlyInvestment, years, expectedReturn) => {
  const monthlyRate = expectedReturn / 12 / 100;
  const months = years * 12;
  
  const futureValue = monthlyInvestment * 
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
    (1 + monthlyRate);
  
  const totalInvestment = monthlyInvestment * months;
  const estimatedReturns = futureValue - totalInvestment;
  
  return {
    futureValue: Math.round(futureValue),
    totalInvestment,
    estimatedReturns: Math.round(estimatedReturns),
    absoluteReturn: (estimatedReturns / totalInvestment) * 100,
  };
};

export const calculateLumpsumReturns = (investment, years, expectedReturn) => {
  const futureValue = investment * Math.pow(1 + expectedReturn / 100, years);
  const returns = futureValue - investment;
  
  return {
    futureValue: Math.round(futureValue),
    totalInvestment: investment,
    estimatedReturns: Math.round(returns),
    absoluteReturn: (returns / investment) * 100,
  };
};

export const calculateCAGR = (beginningValue, endingValue, years) => {
  if (beginningValue <= 0 || years <= 0) return 0;
  
  const cagr = Math.pow(endingValue / beginningValue, 1 / years) - 1;
  return parseFloat((cagr * 100).toFixed(2));
};