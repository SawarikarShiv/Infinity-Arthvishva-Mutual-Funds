// src/services/investorService.js
import axios from './api/axiosInstance';

const investorService = {
  // Dashboard data
  getDashboardData: async (userId) => {
    const response = await axios.get(`/api/investor/${userId}/dashboard`);
    return response.data;
  },

  getPortfolioOverview: async (userId) => {
    const response = await axios.get(`/api/investor/${userId}/portfolio/overview`);
    return response.data;
  },

  getPerformanceMetrics: async (userId, period = 'monthly') => {
    const response = await axios.get(`/api/investor/${userId}/performance`, {
      params: { period }
    });
    return response.data;
  },

  getRecentInvestments: async (userId, limit = 5) => {
    const response = await axios.get(`/api/investor/${userId}/investments/recent`, {
      params: { limit }
    });
    return response.data;
  },

  getWatchlist: async (userId) => {
    const response = await axios.get(`/api/investor/${userId}/watchlist`);
    return response.data;
  },

  // Portfolio management
  getHoldings: async (userId) => {
    const response = await axios.get(`/api/investor/${userId}/portfolio/holdings`);
    return response.data;
  },

  getAssetAllocation: async (userId) => {
    const response = await axios.get(`/api/investor/${userId}/portfolio/allocation`);
    return response.data;
  },

  getTransactionHistory: async (userId, filters = {}) => {
    const response = await axios.get(`/api/investor/${userId}/transactions`, {
      params: filters
    });
    return response.data;
  },

  // Goals
  getGoals: async (userId) => {
    const response = await axios.get(`/api/investor/${userId}/goals`);
    return response.data;
  },

  createGoal: async (userId, goalData) => {
    const response = await axios.post(`/api/investor/${userId}/goals`, goalData);
    return response.data;
  },

  updateGoal: async (userId, goalId, goalData) => {
    const response = await axios.put(`/api/investor/${userId}/goals/${goalId}`, goalData);
    return response.data;
  },

  deleteGoal: async (userId, goalId) => {
    const response = await axios.delete(`/api/investor/${userId}/goals/${goalId}`);
    return response.data;
  },

  // Reports
  generatePortfolioReport: async (userId, reportType) => {
    const response = await axios.get(`/api/investor/${userId}/reports/portfolio`, {
      params: { type: reportType }
    });
    return response.data;
  },

  generateTaxReport: async (userId, year) => {
    const response = await axios.get(`/api/investor/${userId}/reports/tax`, {
      params: { year }
    });
    return response.data;
  },

  // Quick actions
  addToWatchlist: async (userId, fundId) => {
    const response = await axios.post(`/api/investor/${userId}/watchlist`, { fundId });
    return response.data;
  },

  removeFromWatchlist: async (userId, fundId) => {
    const response = await axios.delete(`/api/investor/${userId}/watchlist/${fundId}`);
    return response.data;
  },

  // Notifications
  getNotifications: async (userId) => {
    const response = await axios.get(`/api/investor/${userId}/notifications`);
    return response.data;
  },

  markNotificationAsRead: async (userId, notificationId) => {
    const response = await axios.put(`/api/investor/${userId}/notifications/${notificationId}/read`);
    return response.data;
  },
};

export default investorService;