import axiosInstance from './api/axiosInstance.js';
import USER_ENDPOINTS from './endpoints/userEndpoints.js';

class UserService {
  // Get users (admin)
  static async getUsers(params = {}) {
    try {
      const response = await axiosInstance.get(USER_ENDPOINTS.GET_USERS, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user by ID
  static async getUserById(userId) {
    try {
      const response = await axiosInstance.get(
        USER_ENDPOINTS.GET_USER_BY_ID.replace(':id', userId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create user (admin)
  static async createUser(userData) {
    try {
      const response = await axiosInstance.post(USER_ENDPOINTS.CREATE_USER, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user
  static async updateUser(userId, userData) {
    try {
      const response = await axiosInstance.put(
        USER_ENDPOINTS.UPDATE_USER.replace(':id', userId),
        userData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete user (admin)
  static async deleteUser(userId) {
    try {
      const response = await axiosInstance.delete(
        USER_ENDPOINTS.DELETE_USER.replace(':id', userId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get KYC status
  static async getKYCStatus() {
    try {
      const response = await axiosInstance.get(USER_ENDPOINTS.GET_KYC_STATUS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Upload KYC documents
  static async uploadKYCDocuments(documents) {
    try {
      const formData = new FormData();
      documents.forEach((doc, index) => {
        formData.append(`document${index}`, doc.file);
        formData.append(`type${index}`, doc.type);
      });

      const response = await axiosInstance.post(
        USER_ENDPOINTS.UPLOAD_KYC_DOCUMENTS,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify KYC (admin)
  static async verifyKYC(userId, status, remarks = '') {
    try {
      const response = await axiosInstance.post(USER_ENDPOINTS.VERIFY_KYC, {
        userId,
        status,
        remarks
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get KYC documents
  static async getKYCDocuments() {
    try {
      const response = await axiosInstance.get(USER_ENDPOINTS.GET_KYC_DOCUMENTS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get bank details
  static async getBankDetails() {
    try {
      const response = await axiosInstance.get(USER_ENDPOINTS.GET_BANK_DETAILS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add bank detail
  static async addBankDetail(bankData) {
    try {
      const response = await axiosInstance.post(USER_ENDPOINTS.ADD_BANK_DETAIL, bankData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update bank detail
  static async updateBankDetail(bankId, bankData) {
    try {
      const response = await axiosInstance.put(
        USER_ENDPOINTS.UPDATE_BANK_DETAIL.replace(':id', bankId),
        bankData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete bank detail
  static async deleteBankDetail(bankId) {
    try {
      const response = await axiosInstance.delete(
        USER_ENDPOINTS.DELETE_BANK_DETAIL.replace(':id', bankId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get nominees
  static async getNominees() {
    try {
      const response = await axiosInstance.get(USER_ENDPOINTS.GET_NOMINEES);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add nominee
  static async addNominee(nomineeData) {
    try {
      const response = await axiosInstance.post(USER_ENDPOINTS.ADD_NOMINEE, nomineeData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update nominee
  static async updateNominee(nomineeId, nomineeData) {
    try {
      const response = await axiosInstance.put(
        USER_ENDPOINTS.UPDATE_NOMINEE.replace(':id', nomineeId),
        nomineeData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete nominee
  static async deleteNominee(nomineeId) {
    try {
      const response = await axiosInstance.delete(
        USER_ENDPOINTS.DELETE_NOMINEE.replace(':id', nomineeId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get preferences
  static async getPreferences() {
    try {
      const response = await axiosInstance.get(USER_ENDPOINTS.GET_PREFERENCES);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update preferences
  static async updatePreferences(preferences) {
    try {
      const response = await axiosInstance.put(USER_ENDPOINTS.UPDATE_PREFERENCES, preferences);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user activity
  static async getUserActivity(userId, params = {}) {
    try {
      const response = await axiosInstance.get(
        USER_ENDPOINTS.GET_USER_ACTIVITY.replace(':id', userId),
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get login history
  static async getLoginHistory(userId, params = {}) {
    try {
      const response = await axiosInstance.get(
        USER_ENDPOINTS.GET_LOGIN_HISTORY.replace(':id', userId),
        { params }
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

export default UserService;