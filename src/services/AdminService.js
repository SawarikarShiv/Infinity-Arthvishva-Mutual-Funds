import axiosInstance from './api/axiosInstance.js';
import ADMIN_ENDPOINTS from './endpoints/adminEndpoints.js';

class AdminService {
  // Get all users (admin)
  static async getAllUsers(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_ALL_USERS, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user status
  static async updateUserStatus(userId, status) {
    try {
      const response = await axiosInstance.post(
        ADMIN_ENDPOINTS.UPDATE_USER_STATUS.replace(':id', userId),
        { status }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Bulk user actions
  static async bulkUserActions(action, userIds) {
    try {
      const response = await axiosInstance.post(ADMIN_ENDPOINTS.BULK_USER_ACTIONS, {
        action,
        userIds
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create fund
  static async createFund(fundData) {
    try {
      const response = await axiosInstance.post(ADMIN_ENDPOINTS.CREATE_FUND, fundData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update fund
  static async updateFund(fundId, fundData) {
    try {
      const response = await axiosInstance.put(
        ADMIN_ENDPOINTS.UPDATE_FUND.replace(':id', fundId),
        fundData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete fund
  static async deleteFund(fundId) {
    try {
      const response = await axiosInstance.delete(
        ADMIN_ENDPOINTS.DELETE_FUND.replace(':id', fundId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update fund NAV
  static async updateFundNAV(fundId, navData) {
    try {
      const response = await axiosInstance.post(
        ADMIN_ENDPOINTS.UPDATE_FUND_NAV.replace(':id', fundId),
        navData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Bulk update funds
  static async bulkUpdateFunds(updateData) {
    try {
      const response = await axiosInstance.post(ADMIN_ENDPOINTS.BULK_UPDATE_FUNDS, updateData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get all transactions (admin)
  static async getAllTransactionsAdmin(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_ALL_TRANSACTIONS_ADMIN, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Process transaction
  static async processTransaction(transactionId) {
    try {
      const response = await axiosInstance.post(
        ADMIN_ENDPOINTS.PROCESS_TRANSACTION.replace(':id', transactionId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reverse transaction
  static async reverseTransaction(transactionId, reason) {
    try {
      const response = await axiosInstance.post(
        ADMIN_ENDPOINTS.REVERSE_TRANSACTION.replace(':id', transactionId),
        { reason }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get system settings
  static async getSystemSettings() {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_SYSTEM_SETTINGS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update system settings
  static async updateSystemSettings(settings) {
    try {
      const response = await axiosInstance.put(ADMIN_ENDPOINTS.UPDATE_SYSTEM_SETTINGS, settings);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get maintenance status
  static async getMaintenanceStatus() {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_MAINTENANCE_STATUS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Set maintenance mode
  static async setMaintenanceMode(enabled, message = '') {
    try {
      const response = await axiosInstance.post(ADMIN_ENDPOINTS.SET_MAINTENANCE_MODE, {
        enabled,
        message
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get audit logs
  static async getAuditLogs(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_AUDIT_LOGS, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get audit log details
  static async getAuditLogDetails(logId) {
    try {
      const response = await axiosInstance.get(
        ADMIN_ENDPOINTS.GET_AUDIT_LOG_DETAILS.replace(':id', logId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Export audit logs
  static async exportAuditLogs(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.EXPORT_AUDIT_LOGS, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create backup
  static async createBackup(backupData) {
    try {
      const response = await axiosInstance.post(ADMIN_ENDPOINTS.CREATE_BACKUP, backupData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get backups
  static async getBackups() {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_BACKUPS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Restore backup
  static async restoreBackup(backupId) {
    try {
      const response = await axiosInstance.post(
        ADMIN_ENDPOINTS.RESTORE_BACKUP.replace(':id', backupId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete backup
  static async deleteBackup(backupId) {
    try {
      const response = await axiosInstance.delete(
        ADMIN_ENDPOINTS.DELETE_BACKUP.replace(':id', backupId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get platform analytics
  static async getPlatformAnalytics(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_PLATFORM_ANALYTICS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user analytics
  static async getUserAnalytics(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_USER_ANALYTICS, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get transaction analytics
  static async getTransactionAnalytics(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_TRANSACTION_ANALYTICS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get revenue analytics
  static async getRevenueAnalytics(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_REVENUE_ANALYTICS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Send bulk notifications
  static async sendBulkNotifications(notificationData) {
    try {
      const response = await axiosInstance.post(
        ADMIN_ENDPOINTS.SEND_BULK_NOTIFICATIONS,
        notificationData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get notification history
  static async getNotificationHistory(params = {}) {
    try {
      const response = await axiosInstance.get(ADMIN_ENDPOINTS.GET_NOTIFICATION_HISTORY, {
        params
      });
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

export default AdminService;