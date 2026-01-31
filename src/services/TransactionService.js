import axiosInstance from './api/axiosInstance.js';
import TRANSACTION_ENDPOINTS from './endpoints/transactionEndpoints.js';

class TransactionService {
  // Get transactions
  static async getTransactions(params = {}) {
    try {
      const response = await axiosInstance.get(TRANSACTION_ENDPOINTS.GET_TRANSACTIONS, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get transaction by ID
  static async getTransactionById(transactionId) {
    try {
      const response = await axiosInstance.get(
        TRANSACTION_ENDPOINTS.GET_TRANSACTION_BY_ID.replace(':id', transactionId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create transaction
  static async createTransaction(transactionData) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.CREATE_TRANSACTION,
        transactionData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cancel transaction
  static async cancelTransaction(transactionId, reason) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.CANCEL_TRANSACTION.replace(':id', transactionId),
        { reason }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Download transaction receipt
  static async downloadTransactionReceipt(transactionId) {
    try {
      const response = await axiosInstance.get(
        TRANSACTION_ENDPOINTS.DOWNLOAD_TRANSACTION_RECEIPT.replace(':id', transactionId),
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get SIP transactions
  static async getSIPTransactions(params = {}) {
    try {
      const response = await axiosInstance.get(TRANSACTION_ENDPOINTS.GET_SIP_TRANSACTIONS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create SIP
  static async createSIP(sipData) {
    try {
      const response = await axiosInstance.post(TRANSACTION_ENDPOINTS.CREATE_SIP, sipData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update SIP
  static async updateSIP(sipId, sipData) {
    try {
      const response = await axiosInstance.put(
        TRANSACTION_ENDPOINTS.UPDATE_SIP.replace(':id', sipId),
        sipData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Pause SIP
  static async pauseSIP(sipId) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.PAUSE_SIP.replace(':id', sipId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Resume SIP
  static async resumeSIP(sipId) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.RESUME_SIP.replace(':id', sipId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cancel SIP
  static async cancelSIP(sipId, reason) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.CANCEL_SIP.replace(':id', sipId),
        { reason }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get transaction statement
  static async getTransactionStatement(startDate, endDate) {
    try {
      const response = await axiosInstance.get(TRANSACTION_ENDPOINTS.GET_TRANSACTION_STATEMENT, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate transaction report
  static async generateTransactionReport(reportData) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.GENERATE_TRANSACTION_REPORT,
        reportData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all transactions (admin)
  static async getAllTransactions(params = {}) {
    try {
      const response = await axiosInstance.get(TRANSACTION_ENDPOINTS.GET_ALL_TRANSACTIONS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify transaction (admin)
  static async verifyTransaction(transactionId) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.VERIFY_TRANSACTION.replace(':id', transactionId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reject transaction (admin)
  static async rejectTransaction(transactionId, reason) {
    try {
      const response = await axiosInstance.post(
        TRANSACTION_ENDPOINTS.REJECT_TRANSACTION.replace(':id', transactionId),
        { reason }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  static handleError(error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        message: data.message || 'An error occurred',
        status,
        data: data.errors || null
      };
    } else if (error.request) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0
      };
    } else {
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1
      };
    }
  }
}

export default TransactionService;