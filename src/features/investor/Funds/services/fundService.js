import api from '../../../../services/api/axiosInstance';

const fundService = {
  // Get all funds
  getAllFunds: async () => {
    try {
      const response = await api.get('/api/funds');
      return response.data;
    } catch (error) {
      console.error('Error fetching funds:', error);
      throw error;
    }
  },

  // Get fund by ID
  getFundById: async (id) => {
    try {
      const response = await api.get(`/api/funds/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching fund ${id}:`, error);
      throw error;
    }
  },

  // Search funds
  searchFunds: async (query) => {
    try {
      const response = await api.get('/api/funds/search', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching funds:', error);
      throw error;
    }
  },

  // Get fund performance history
  getFundPerformance: async (fundId, period = '1y') => {
    try {
      const response = await api.get(`/api/funds/${fundId}/performance`, {
        params: { period }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching fund performance:', error);
      throw error;
    }
  },

  // Compare funds
  compareFunds: async (fundIds) => {
    try {
      const response = await api.post('/api/funds/compare', { fundIds });
      return response.data;
    } catch (error) {
      console.error('Error comparing funds:', error);
      throw error;
    }
  },

  // Get recommended funds
  getRecommendedFunds: async (riskProfile, investmentHorizon) => {
    try {
      const response = await api.get('/api/funds/recommended', {
        params: { riskProfile, investmentHorizon }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended funds:', error);
      throw error;
    }
  },

  // Calculate SIP returns
  calculateSIP: async (data) => {
    try {
      const response = await api.post('/api/calculators/sip', data);
      return response.data;
    } catch (error) {
      console.error('Error calculating SIP:', error);
      throw error;
    }
  },

  // Get fund categories
  getFundCategories: async () => {
    try {
      const response = await api.get('/api/funds/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching fund categories:', error);
      throw error;
    }
  },

  // Get fund house list
  getFundHouses: async () => {
    try {
      const response = await api.get('/api/funds/houses');
      return response.data;
    } catch (error) {
      console.error('Error fetching fund houses:', error);
      throw error;
    }
  },
};

export default fundService;