import axiosInstance from './api/axiosInstance.js';
import AUTH_ENDPOINTS from './endpoints/authEndpoints.js';

class AuthService {
  // Login user
  static async login(credentials) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Register user
  static async register(userData) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Logout user
  static async logout() {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Refresh token
  static async refreshToken(refreshToken) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user profile
  static async getProfile() {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINTS.GET_PROFILE);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update user profile
  static async updateProfile(profileData) {
    try {
      const response = await axiosInstance.put(AUTH_ENDPOINTS.UPDATE_PROFILE, profileData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Forgot password
  static async forgotPassword(email) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset password
  static async resetPassword(resetData) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.RESET_PASSWORD, resetData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Change password
  static async changePassword(passwordData) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify email
  static async verifyEmail(token) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify OTP
  static async verifyOTP(otpData) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.VERIFY_OTP, otpData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Resend OTP
  static async resendOTP(email) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.RESEND_OTP, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  static handleError(error) {
    if (error.response) {
      // Server responded with error
      const { data, status } = error.response;
      return {
        message: data.message || 'An error occurred',
        status,
        data: data.errors || null
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: 'Network error. Please check your connection.',
        status: 0
      };
    } else {
      // Error in request setup
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1
      };
    }
  }
}

export default AuthService;