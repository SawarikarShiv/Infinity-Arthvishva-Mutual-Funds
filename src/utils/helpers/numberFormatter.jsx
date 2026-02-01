import React from 'react';

/**
 * Number formatting utilities
 */

export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN', options = {}) => {
  if (amount === null || amount === undefined) return '-';
  
  const {
    decimals = 2,
    compact = false,
    minimumFractionDigits,
    maximumFractionDigits,
    showSymbol = true,
  } = options;
  
  const formatterOptions = {
    style: showSymbol ? 'currency' : 'decimal',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits !== undefined ? minimumFractionDigits : decimals,
    maximumFractionDigits: maximumFractionDigits !== undefined ? maximumFractionDigits : decimals,
  };
  
  if (compact) {
    formatterOptions.notation = 'compact';
    formatterOptions.compactDisplay = 'short';
  }
  
  try {
    const formatter = new Intl.NumberFormat(locale, formatterOptions);
    return formatter.format(amount);
  } catch (error) {
    // Fallback formatting
    const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : '';
    return `${symbol}${formatNumber(amount, { decimals, compact, locale })}`;
  }
};

export const formatNumber = (num, options = {}) => {
  if (num === null || num === undefined) return '-';
  
  const {
    decimals = 2,
    compact = false,
    locale = 'en-IN',
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;
  
  const formatterOptions = {
    minimumFractionDigits: minimumFractionDigits !== undefined ? minimumFractionDigits : decimals,
    maximumFractionDigits: maximumFractionDigits !== undefined ? maximumFractionDigits : decimals,
  };
  
  if (compact) {
    formatterOptions.notation = 'compact';
    formatterOptions.compactDisplay = 'short';
  }
  
  try {
    const formatter = new Intl.NumberFormat(locale, formatterOptions);
    return formatter.format(num);
  } catch (error) {
    // Fallback formatting
    return num.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
};

export const formatPercentage = (value, decimals = 2, showSymbol = true) => {
  if (value === null || value === undefined) return '-';
  
  const formatted = parseFloat(value).toFixed(decimals);
  return showSymbol ? `${formatted}%` : formatted;
};

export const formatPercentageChange = (value) => {
  if (value === null || value === undefined) return '-';
  
  const formatted = parseFloat(value).toFixed(2);
  const sign = value > 0 ? '+' : '';
  
  return (
    <span className={value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600'}>
      {sign}{formatted}%
    </span>
  );
};

export const formatLargeNumber = (num) => {
  if (num === null || num === undefined) return '-';
  
  const absNum = Math.abs(num);
  
  if (absNum >= 10000000) { // 1 Crore
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (absNum >= 100000) { // 1 Lakh
    return `${(num / 100000).toFixed(2)} L`;
  } else if (absNum >= 1000) { // 1 Thousand
    return `${(num / 1000).toFixed(2)} K`;
  }
  
  return formatNumber(num, { decimals: 2 });
};

export const roundToNearest = (num, nearest = 0.05) => {
  return Math.round(num / nearest) * nearest;
};

export const calculateAverage = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

export const calculateMedian = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};

export const calculateStandardDeviation = (numbers) => {
  if (!Array.isArray(numbers) || numbers.length < 2) return 0;
  
  const avg = calculateAverage(numbers);
  const squareDiffs = numbers.map(num => Math.pow(num - avg, 2));
  const avgSquareDiff = calculateAverage(squareDiffs);
  
  return Math.sqrt(avgSquareDiff);
};

export const normalizeValue = (value, min, max) => {
  if (min === max) return 1;
  return (value - min) / (max - min);
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};