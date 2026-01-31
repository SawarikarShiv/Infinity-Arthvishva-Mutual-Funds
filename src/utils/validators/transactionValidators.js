/**
 * Transaction validators
 */
import { isValidAmount, isValidDate, isPositiveNumber, isNonNegativeNumber } from '../helpers/validation';

export const validateTransactionFilterForm = (data) => {
  const errors = {};
  
  // Date Range Validation
  if (data.startDate && !isValidDate(data.startDate)) {
    errors.startDate = 'Invalid start date';
  }
  
  if (data.endDate && !isValidDate(data.endDate)) {
    errors.endDate = 'Invalid end date';
  }
  
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    
    if (start > end) {
      errors.startDate = 'Start date cannot be after end date';
    }
    
    // Validate date range is not too large (max 1 year)
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 365) {
      errors.endDate = 'Date range cannot exceed 1 year';
    }
  }
  
  // Amount Range Validation
  if (data.minAmount && !isNonNegativeNumber(data.minAmount)) {
    errors.minAmount = 'Minimum amount must be a non-negative number';
  }
  
  if (data.maxAmount && !isNonNegativeNumber(data.maxAmount)) {
    errors.maxAmount = 'Maximum amount must be a non-negative number';
  }
  
  if (data.minAmount && data.maxAmount && parseFloat(data.minAmount) > parseFloat(data.maxAmount)) {
    errors.minAmount = 'Minimum amount cannot be greater than maximum amount';
  }
  
  // Status Validation
  if (data.status && !Array.isArray(data.status)) {
    errors.status = 'Invalid status selection';
  }
  
  // Type Validation
  if (data.type && !Array.isArray(data.type)) {
    errors.type = 'Invalid type selection';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateManualTransactionForm = (data) => {
  const errors = {};
  
  // Transaction Type
  if (!data.type) {
    errors.type = 'Transaction type is required';
  }
  
  // Fund Selection
  if (!data.fundId) {
    errors.fundId = 'Please select a fund';
  }
  
  // Date
  if (!data.date) {
    errors.date = 'Transaction date is required';
  } else if (!isValidDate(data.date)) {
    errors.date = 'Invalid date';
  } else {
    const transactionDate = new Date(data.date);
    const today = new Date();
    
    if (transactionDate > today) {
      errors.date = 'Transaction date cannot be in the future';
    }
  }
  
  // Amount
  if (!data.amount) {
    errors.amount = 'Amount is required';
  } else if (!isPositiveNumber(data.amount)) {
    errors.amount = 'Amount must be a positive number';
  }
  
  // Units (for certain transaction types)
  const requiresUnits = ['redemption', 'swp', 'stp_out', 'dividend_reinvest', 'bonus', 'split', 'merger'];
  if (requiresUnits.includes(data.type) && !data.units) {
    errors.units = 'Number of units is required';
  } else if (requiresUnits.includes(data.type) && data.units && !isPositiveNumber(data.units)) {
    errors.units = 'Units must be a positive number';
  }
  
  // NAV (if applicable)
  if (data.nav && !isPositiveNumber(data.nav)) {
    errors.nav = 'NAV must be a positive number';
  }
  
  // Payment Method (for investment transactions)
  const requiresPayment = ['purchase', 'sip'];
  if (requiresPayment.includes(data.type) && !data.paymentMethod) {
    errors.paymentMethod = 'Payment method is required';
  }
  
  // Bank Account (for redemption/SWP)
  const requiresBankAccount = ['redemption', 'swp'];
  if (requiresBankAccount.includes(data.type) && !data.bankAccountId) {
    errors.bankAccountId = 'Bank account is required';
  }
  
  // Description
  if (!data.description) {
    errors.description = 'Description is required';
  } else if (data.description.length < 5) {
    errors.description = 'Description must be at least 5 characters';
  }
  
  // Reference Number (if provided)
  if (data.referenceNumber && data.referenceNumber.length > 50) {
    errors.referenceNumber = 'Reference number is too long (max 50 characters)';
  }
  
  // Remarks (if provided)
  if (data.remarks && data.remarks.length > 500) {
    errors.remarks = 'Remarks are too long (max 500 characters)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBulkTransactionUploadForm = (data) => {
  const errors = {};
  
  if (!data.file) {
    errors.file = 'Please select a file to upload';
  }
  
  if (!data.transactionType) {
    errors.transactionType = 'Please select transaction type';
  }
  
  if (!data.fileFormat) {
    errors.fileFormat = 'Please select file format';
  }
  
  if (!data.confirmFormat) {
    errors.confirmFormat = 'Please confirm the file format is correct';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTransactionImportSettings = (data) => {
  const errors = {};
  
  if (!data.source) {
    errors.source = 'Import source is required';
  }
  
  if (data.source === 'cams' && !data.camsFile) {
    errors.camsFile = 'CAMS statement file is required';
  }
  
  if (data.source === 'karvy' && !data.karvyFile) {
    errors.karvyFile = 'Karvy statement file is required';
  }
  
  if (data.source === 'manual' && (!data.file || !data.fileFormat)) {
    errors.file = 'File and format are required for manual import';
  }
  
  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  } else if (!isValidDate(data.startDate)) {
    errors.startDate = 'Invalid start date';
  }
  
  if (!data.endDate) {
    errors.endDate = 'End date is required';
  } else if (!isValidDate(data.endDate)) {
    errors.endDate = 'Invalid end date';
  }
  
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    
    if (start > end) {
      errors.startDate = 'Start date cannot be after end date';
    }
  }
  
  if (!data.confirmImport) {
    errors.confirmImport = 'Please confirm the import settings';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTransactionReversalForm = (data) => {
  const errors = {};
  
  if (!data.transactionId) {
    errors.transactionId = 'Transaction ID is required';
  }
  
  if (!data.reason) {
    errors.reason = 'Reversal reason is required';
  } else if (data.reason.length < 10) {
    errors.reason = 'Please provide a detailed reason (minimum 10 characters)';
  }
  
  if (!data.effectiveDate) {
    errors.effectiveDate = 'Effective date is required';
  } else if (!isValidDate(data.effectiveDate)) {
    errors.effectiveDate = 'Invalid effective date';
  }
  
  if (!data.confirmReversal) {
    errors.confirmReversal = 'Please confirm the reversal';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTransactionCorrectionForm = (data) => {
  const errors = {};
  
  if (!data.transactionId) {
    errors.transactionId = 'Transaction ID is required';
  }
  
  if (!data.correctionType) {
    errors.correctionType = 'Correction type is required';
  }
  
  // Validate correction values based on type
  if (data.correctionType === 'amount' && !data.correctedAmount) {
    errors.correctedAmount = 'Corrected amount is required';
  } else if (data.correctionType === 'amount' && data.correctedAmount && !isPositiveNumber(data.correctedAmount)) {
    errors.correctedAmount = 'Corrected amount must be a positive number';
  }
  
  if (data.correctionType === 'date' && !data.correctedDate) {
    errors.correctedDate = 'Corrected date is required';
  } else if (data.correctionType === 'date' && data.correctedDate && !isValidDate(data.correctedDate)) {
    errors.correctedDate = 'Invalid corrected date';
  }
  
  if (data.correctionType === 'units' && !data.correctedUnits) {
    errors.correctedUnits = 'Corrected units are required';
  } else if (data.correctionType === 'units' && data.correctedUnits && !isPositiveNumber(data.correctedUnits)) {
    errors.correctedUnits = 'Corrected units must be a positive number';
  }
  
  if (!data.reason) {
    errors.reason = 'Correction reason is required';
  } else if (data.reason.length < 10) {
    errors.reason = 'Please provide a detailed reason (minimum 10 characters)';
  }
  
  if (!data.confirmCorrection) {
    errors.confirmCorrection = 'Please confirm the correction';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTransactionExportForm = (data) => {
  const errors = {};
  
  if (!data.format) {
    errors.format = 'Export format is required';
  }
  
  if (!data.includeHeaders) {
    errors.includeHeaders = 'Please specify if headers should be included';
  }
  
  if (data.dateRange === 'custom' && (!data.startDate || !data.endDate)) {
    errors.startDate = 'Custom date range requires both start and end dates';
  }
  
  if (data.dateRange === 'custom' && data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    
    if (start > end) {
      errors.startDate = 'Start date cannot be after end date';
    }
  }
  
  if (!data.columns || !Array.isArray(data.columns) || data.columns.length === 0) {
    errors.columns = 'Please select at least one column to export';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTransactionNoteForm = (data) => {
  const errors = {};
  
  if (!data.note) {
    errors.note = 'Note is required';
  } else if (data.note.length < 5) {
    errors.note = 'Note must be at least 5 characters';
  } else if (data.note.length > 1000) {
    errors.note = 'Note is too long (maximum 1000 characters)';
  }
  
  if (data.category && data.category.length > 50) {
    errors.category = 'Category is too long (maximum 50 characters)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};