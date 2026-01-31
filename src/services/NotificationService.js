import axiosInstance from './api/axiosInstance.js';

class NotificationService {
  // Get notifications
  static async getNotifications(params = {}) {
    try {
      const response = await axiosInstance.get('/notifications', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get unread notification count
  static async getUnreadCount() {
    try {
      const response = await axiosInstance.get('/notifications/unread-count');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark notification as read
  static async markAsRead(notificationId) {
    try {
      const response = await axiosInstance.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Mark all notifications as read
  static async markAllAsRead() {
    try {
      const response = await axiosInstance.put('/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete notification
  static async deleteNotification(notificationId) {
    try {
      const response = await axiosInstance.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete all notifications
  static async deleteAllNotifications() {
    try {
      const response = await axiosInstance.delete('/notifications');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get notification preferences
  static async getNotificationPreferences() {
    try {
      const response = await axiosInstance.get('/notifications/preferences');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update notification preferences
  static async updateNotificationPreferences(preferences) {
    try {
      const response = await axiosInstance.put('/notifications/preferences', preferences);
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

export default NotificationService;