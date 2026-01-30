import api from '@services/api/axiosInstance';
import { store } from '@store/store';

class AuthService {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set default authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { user, token };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Remove authorization header
      delete api.defaults.headers.common['Authorization'];
    }
  }

  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  }

  async verifyOTP(email, otp) {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Invalid OTP');
    }
  }

  async resendOTP(email) {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Check if token is expired
  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh-token');
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return token;
    } catch (error) {
      this.logout();
      throw new Error('Session expired. Please login again.');
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      const updatedUser = response.data;
      
      // Update local storage
      const currentUser = this.getCurrentUser();
      const newUser = { ...currentUser, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to change password');
    }
  }
}

export default new AuthService();
EOF
