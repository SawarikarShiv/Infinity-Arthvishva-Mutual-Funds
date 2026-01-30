import api from './api/axiosInstance';

const advisorService = {
  // Dashboard
  getDashboardData: async (timeRange = 'month') => {
    const response = await api.get(`/advisor/dashboard?range=${timeRange}`);
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/advisor/profile', profileData);
    return response.data;
  },

  // Clients
  getClients: async () => {
    const response = await api.get('/advisor/clients');
    return response.data;
  },

  getClientDetails: async (clientId) => {
    const response = await api.get(`/advisor/clients/${clientId}`);
    return response.data;
  },

  addClient: async (clientData) => {
    const response = await api.post('/advisor/clients', clientData);
    return response.data;
  },

  updateClient: async (clientId, updates) => {
    const response = await api.put(`/advisor/clients/${clientId}`, updates);
    return response.data;
  },

  deleteClient: async (clientId) => {
    const response = await api.delete(`/advisor/clients/${clientId}`);
    return response.data;
  },

  // Reports
  getReports: async (filters) => {
    const response = await api.get('/advisor/reports', { params: filters });
    return response.data;
  },

  generateReport: async (reportConfig) => {
    const response = await api.post('/advisor/reports/generate', reportConfig);
    return response.data;
  },

  downloadReport: async (reportId) => {
    const response = await api.get(`/advisor/reports/${reportId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getAnalytics: async (timeRange) => {
    const response = await api.get(`/advisor/analytics?range=${timeRange}`);
    return response.data;
  },

  // Meetings
  getMeetings: async (filters) => {
    const response = await api.get('/advisor/meetings', { params: filters });
    return response.data;
  },

  scheduleMeeting: async (meetingData) => {
    const response = await api.post('/advisor/meetings', meetingData);
    return response.data;
  },

  updateMeeting: async (meetingId, updates) => {
    const response = await api.put(`/advisor/meetings/${meetingId}`, updates);
    return response.data;
  },

  cancelMeeting: async (meetingId) => {
    const response = await api.delete(`/advisor/meetings/${meetingId}`);
    return response.data;
  },
};

export default advisorService;