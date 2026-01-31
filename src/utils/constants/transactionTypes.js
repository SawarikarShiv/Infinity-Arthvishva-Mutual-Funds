/**
 * Transaction Types for Mutual Funds
 */
export const TRANSACTION_TYPES = {
  // Investment Transactions
  PURCHASE: {
    id: 'purchase',
    name: 'Purchase',
    description: 'Buying mutual fund units',
    category: 'investment',
    flow: 'outflow',
    requiresAmount: true,
    requiresUnits: false,
    taxImplications: true,
    icon: '💰'
  },
  
  REDEMPTION: {
    id: 'redemption',
    name: 'Redemption',
    description: 'Selling mutual fund units',
    category: 'investment',
    flow: 'inflow',
    requiresAmount: true,
    requiresUnits: true,
    taxImplications: true,
    icon: '💸'
  },
  
  SIP: {
    id: 'sip',
    name: 'SIP Investment',
    description: 'Systematic Investment Plan installment',
    category: 'investment',
    flow: 'outflow',
    requiresAmount: true,
    requiresUnits: false,
    taxImplications: true,
    icon: '📅'
  },
  
  SWP: {
    id: 'swp',
    name: 'SWP Withdrawal',
    description: 'Systematic Withdrawal Plan installment',
    category: 'investment',
    flow: 'inflow',
    requiresAmount: true,
    requiresUnits: true,
    taxImplications: true,
    icon: '💳'
  },
  
  STP_IN: {
    id: 'stp_in',
    name: 'STP In',
    description: 'Systematic Transfer Plan - Transfer In',
    category: 'transfer',
    flow: 'inflow',
    requiresAmount: true,
    requiresUnits: false,
    taxImplications: false,
    icon: '🔄'
  },
  
  STP_OUT: {
    id: 'stp_out',
    name: 'STP Out',
    description: 'Systematic Transfer Plan - Transfer Out',
    category: 'transfer',
    flow: 'outflow',
    requiresAmount: true,
    requiresUnits: true,
    taxImplications: true,
    icon: '🔄'
  },
  
  // Dividend Transactions
  DIVIDEND_PAYOUT: {
    id: 'dividend_payout',
    name: 'Dividend Payout',
    description: 'Dividend payment from mutual fund',
    category: 'dividend',
    flow: 'inflow',
    requiresAmount: true,
    requiresUnits: false,
    taxImplications: true,
    icon: '📊'
  },
  
  DIVIDEND_REINVEST: {
    id: 'dividend_reinvest',
    name: 'Dividend Reinvest',
    description: 'Dividend reinvested to purchase more units',
    category: 'dividend',
    flow: 'neutral',
    requiresAmount: true,
    requiresUnits: true,
    taxImplications: false,
    icon: '📈'
  },
  
  // Account Transactions
  ACCOUNT_OPENING: {
    id: 'account_opening',
    name: 'Account Opening',
    description: 'New mutual fund account opened',
    category: 'account',
    flow: 'neutral',
    requiresAmount: false,
    requiresUnits: false,
    taxImplications: false,
    icon: '📂'
  },
  
  ACCOUNT_CLOSURE: {
    id: 'account_closure',
    name: 'Account Closure',
    description: 'Mutual fund account closed',
    category: 'account',
    flow: 'neutral',
    requiresAmount: false,
    requiresUnits: false,
    taxImplications: false,
    icon: '📂'
  },
  
  // Corporate Actions
  BONUS: {
    id: 'bonus',
    name: 'Bonus Units',
    description: 'Bonus units allotted by mutual fund',
    category: 'corporate_action',
    flow: 'neutral',
    requiresAmount: false,
    requiresUnits: true,
    taxImplications: false,
    icon: '🎁'
  },
  
  SPLIT: {
    id: 'split',
    name: 'Unit Split',
    description: 'Unit split/consolidation',
    category: 'corporate_action',
    flow: 'neutral',
    requiresAmount: false,
    requiresUnits: true,
    taxImplications: false,
    icon: '✂️'
  },
  
  MERGER: {
    id: 'merger',
    name: 'Scheme Merger',
    description: 'Scheme merger with another scheme',
    category: 'corporate_action',
    flow: 'neutral',
    requiresAmount: false,
    requiresUnits: true,
    taxImplications: false,
    icon: '🤝'
  },
  
  // Fees and Charges
  EXIT_LOAD: {
    id: 'exit_load',
    name: 'Exit Load',
    description: 'Exit load charged on redemption',
    category: 'charge',
    flow: 'outflow',
    requiresAmount: true,
    requiresUnits: false,
    taxImplications: false,
    icon: '📉'
  },
  
  MANAGEMENT_FEE: {
    id: 'management_fee',
    name: 'Management Fee',
    description: 'Fund management fee',
    category: 'charge',
    flow: 'outflow',
    requiresAmount: true,
    requiresUnits: false,
    taxImplications: false,
    icon: '💼'
  },
  
  // Other
  ADJUSTMENT: {
    id: 'adjustment',
    name: 'Adjustment',
    description: 'Transaction adjustment/correction',
    category: 'adjustment',
    flow: 'neutral',
    requiresAmount: true,
    requiresUnits: false,
    taxImplications: false,
    icon: '⚙️'
  }
};

// Transaction Types Array for dropdowns
export const TRANSACTION_TYPES_ARRAY = Object.values(TRANSACTION_TYPES).map(type => ({
  value: type.id,
  label: type.name,
  description: type.description,
  category: type.category,
  flow: type.flow,
  icon: type.icon
}));

// Transaction Categories
export const TRANSACTION_CATEGORIES = {
  INVESTMENT: 'investment',
  TRANSFER: 'transfer',
  DIVIDEND: 'dividend',
  ACCOUNT: 'account',
  CORPORATE_ACTION: 'corporate_action',
  CHARGE: 'charge',
  ADJUSTMENT: 'adjustment'
};

// Transaction Status
export const TRANSACTION_STATUS = {
  PENDING: {
    id: 'pending',
    name: 'Pending',
    description: 'Transaction is pending processing',
    color: '#F59E0B', // Amber
    icon: '⏳'
  },
  
  PROCESSING: {
    id: 'processing',
    name: 'Processing',
    description: 'Transaction is being processed',
    color: '#3B82F6', // Blue
    icon: '🔄'
  },
  
  COMPLETED: {
    id: 'completed',
    name: 'Completed',
    description: 'Transaction completed successfully',
    color: '#10B981', // Green
    icon: '✅'
  },
  
  FAILED: {
    id: 'failed',
    name: 'Failed',
    description: 'Transaction failed',
    color: '#EF4444', // Red
    icon: '❌'
  },
  
  CANCELLED: {
    id: 'cancelled',
    name: 'Cancelled',
    description: 'Transaction was cancelled',
    color: '#6B7280', // Gray
    icon: '🚫'
  },
  
  REVERSED: {
    id: 'reversed',
    name: 'Reversed',
    description: 'Transaction was reversed',
    color: '#8B5CF6', // Purple
    icon: '↩️'
  }
};

// Transaction Status Array
export const TRANSACTION_STATUS_ARRAY = Object.values(TRANSACTION_STATUS).map(status => ({
  value: status.id,
  label: status.name,
  description: status.description,
  color: status.color,
  icon: status.icon
}));

// Payment Methods
export const PAYMENT_METHODS = {
  NET_BANKING: {
    id: 'net_banking',
    name: 'Net Banking',
    description: 'Internet banking payment',
    icon: '🏦'
  },
  
  UPI: {
    id: 'upi',
    name: 'UPI',
    description: 'Unified Payments Interface',
    icon: '📱'
  },
  
  DEBIT_CARD: {
    id: 'debit_card',
    name: 'Debit Card',
    description: 'Debit card payment',
    icon: '💳'
  },
  
  NACH: {
    id: 'nach',
    name: 'NACH',
    description: 'National Automated Clearing House',
    icon: '🏛️'
  },
  
  CHEQUE: {
    id: 'cheque',
    name: 'Cheque',
    description: 'Cheque payment',
    icon: '📝'
  },
  
  DEMAT: {
    id: 'demat',
    name: 'Demat Account',
    description: 'Demat account linked payment',
    icon: '📊'
  }
};

// Get transaction type by ID
export const getTransactionTypeById = (typeId) => {
  return TRANSACTION_TYPES[typeId] || null;
};

// Get transaction status by ID
export const getTransactionStatusById = (statusId) => {
  return TRANSACTION_STATUS[statusId] || TRANSACTION_STATUS.PENDING;
};

// Get payment method by ID
export const getPaymentMethodById = (methodId) => {
  return PAYMENT_METHODS[methodId] || null;
};

// Check if transaction is an inflow
export const isInflowTransaction = (transactionType) => {
  const type = TRANSACTION_TYPES[transactionType];
  return type && type.flow === 'inflow';
};

// Check if transaction is an outflow
export const isOutflowTransaction = (transactionType) => {
  const type = TRANSACTION_TYPES[transactionType];
  return type && type.flow === 'outflow';
};

// Get transaction category
export const getTransactionCategory = (transactionType) => {
  const type = TRANSACTION_TYPES[transactionType];
  return type ? type.category : null;
};