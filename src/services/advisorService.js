import axiosInstance from './api/axiosInstance.js';
import axios from './api/axiosInstance.js';

class AdvisorService {
  // Get advisor dashboard overview
  static async getAdvisorOverview() {
    try {
      const response = await axiosInstance.get('/advisor/dashboard/overview');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get client performance metrics
  static async getClientPerformance(clientId = null) {
    try {
      const response = await axiosInstance.get('/advisor/clients/performance', {
        params: { clientId }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get revenue metrics
  static async getRevenueMetrics(params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/revenue/metrics', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get clients list
  static async getClients(params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/clients', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get client details
  static async getClientDetails(clientId) {
    try {
      const response = await axiosInstance.get(`/advisor/clients/${clientId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get client portfolio
  static async getClientPortfolio(clientId) {
    try {
      const response = await axiosInstance.get(`/advisor/clients/${clientId}/portfolio`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get client meetings
  static async getClientMeetings(clientId = null, params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/meetings', {
        params: { clientId, ...params }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Schedule meeting
  static async scheduleMeeting(meetingData) {
    try {
      const response = await axiosInstance.post('/advisor/meetings', meetingData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update meeting
  static async updateMeeting(meetingId, meetingData) {
    try {
      const response = await axiosInstance.put(`/advisor/meetings/${meetingId}`, meetingData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Cancel meeting
  static async cancelMeeting(meetingId, reason) {
    try {
      const response = await axiosInstance.delete(`/advisor/meetings/${meetingId}`, {
        data: { reason }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get client notes
  static async getClientNotes(clientId, params = {}) {
    try {
      const response = await axiosInstance.get(`/advisor/clients/${clientId}/notes`, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add client note
  static async addClientNote(clientId, noteData) {
    try {
      const response = await axiosInstance.post(`/advisor/clients/${clientId}/notes`, noteData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update client note
  static async updateClientNote(noteId, noteData) {
    try {
      const response = await axiosInstance.put(`/advisor/notes/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete client note
  static async deleteClientNote(noteId) {
    try {
      const response = await axiosInstance.delete(`/advisor/notes/${noteId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate client report
  static async generateClientReport(clientId, reportType, params = {}) {
    try {
      const response = await axiosInstance.post(`/advisor/clients/${clientId}/reports`, {
        reportType,
        ...params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get advisor reports
  static async getAdvisorReports(params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/reports', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get performance reports
  static async getPerformanceReports(params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/reports/performance', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get analytics reports
  static async getAnalyticsReports(params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/reports/analytics', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get investment recommendations
  static async getInvestmentRecommendations(clientId, riskProfile) {
    try {
      const response = await axiosInstance.get('/advisor/recommendations', {
        params: { clientId, riskProfile }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Send recommendation to client
  static async sendRecommendation(clientId, recommendationData) {
    try {
      const response = await axiosInstance.post(
        `/advisor/clients/${clientId}/recommendations`,
        recommendationData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get commission details
  static async getCommissionDetails(params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/commissions', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get payout history
  static async getPayoutHistory(params = {}) {
    try {
      const response = await axiosInstance.get('/advisor/payouts', { params });
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

export default AdvisorService;