// Transaction management endpoints
const TRANSACTION_ENDPOINTS = {
  // Transactions
  GET_TRANSACTIONS: '/transactions',
  GET_TRANSACTION_BY_ID: '/transactions/:id',
  CREATE_TRANSACTION: '/transactions',
  CANCEL_TRANSACTION: '/transactions/:id/cancel',
  DOWNLOAD_TRANSACTION_RECEIPT: '/transactions/:id/receipt',
  
  // SIP
  GET_SIP_TRANSACTIONS: '/transactions/sip',
  CREATE_SIP: '/transactions/sip',
  UPDATE_SIP: '/transactions/sip/:id',
  PAUSE_SIP: '/transactions/sip/:id/pause',
  RESUME_SIP: '/transactions/sip/:id/resume',
  CANCEL_SIP: '/transactions/sip/:id/cancel',
  
  // SWP
  GET_SWP_TRANSACTIONS: '/transactions/swp',
  CREATE_SWP: '/transactions/swp',
  
  // STP
  GET_STP_TRANSACTIONS: '/transactions/stp',
  CREATE_STP: '/transactions/stp',
  
  // Reports
  GET_TRANSACTION_STATEMENT: '/transactions/statement',
  GENERATE_TRANSACTION_REPORT: '/transactions/report',
  
  // Admin transactions
  GET_ALL_TRANSACTIONS: '/transactions/all',
  VERIFY_TRANSACTION: '/transactions/:id/verify',
  REJECT_TRANSACTION: '/transactions/:id/reject'
};

export default TRANSACTION_ENDPOINTS;