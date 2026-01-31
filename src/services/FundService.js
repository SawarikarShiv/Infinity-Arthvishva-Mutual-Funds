import axiosInstance from './api/axiosInstance.js';
import FUND_ENDPOINTS from './endpoints/fundEndpoints.js';

class FundService {
  // Get all funds
  static async getAllFunds(params = {}) {
    try {
      const response = await axiosInstance.get(FUND_ENDPOINTS.GET_ALL_FUNDS, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get fund by ID
  static async getFundById(fundId) {
    try {
      const response = await axiosInstance.get(
        FUND_ENDPOINTS.GET_FUND_BY_ID.replace(':id', fundId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get fund NAV history
  static async getFundNAV(fundId, period = '1y') {
    try {
      const response = await axiosInstance.get(
        FUND_ENDPOINTS.GET_FUND_NAV.replace(':id', fundId),
        { params: { period } }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get fund performance
  static async getFundPerformance(fundId) {
    try {
      const response = await axiosInstance.get(
        FUND_ENDPOINTS.GET_FUND_PERFORMANCE.replace(':id', fundId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search funds
  static async searchFunds(query, filters = {}) {
    try {
      const response = await axiosInstance.get(FUND_ENDPOINTS.SEARCH_FUNDS, {
        params: { query, ...filters }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Filter funds
  static async filterFunds(filters) {
    try {
      const response = await axiosInstance.post(FUND_ENDPOINTS.FILTER_FUNDS, filters);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Compare funds
  static async compareFunds(fundIds) {
    try {
      const response = await axiosInstance.post(FUND_ENDPOINTS.COMPARE_FUNDS, { fundIds });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Calculate SIP
  static async calculateSIP(sipData) {
    try {
      const response = await axiosInstance.post(FUND_ENDPOINTS.CALCULATE_SIP, sipData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get SIP recommendations
  static async getSIPRecommendations(riskProfile, investmentAmount) {
    try {
      const response = await axiosInstance.get(FUND_ENDPOINTS.GET_SIP_RECOMMENDATIONS, {
        params: { riskProfile, investmentAmount }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add to watchlist
  static async addToWatchlist(fundId) {
    try {
      const response = await axiosInstance.post(FUND_ENDPOINTS.ADD_TO_WATCHLIST, { fundId });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Remove from watchlist
  static async removeFromWatchlist(fundId) {
    try {
      const response = await axiosInstance.post(FUND_ENDPOINTS.REMOVE_FROM_WATCHLIST, { fundId });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get watchlist
  static async getWatchlist() {
    try {
      const response = await axiosInstance.get(FUND_ENDPOINTS.GET_WATCHLIST);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get fund categories
  static async getFundCategories() {
    try {
      const response = await axiosInstance.get(FUND_ENDPOINTS.GET_FUND_CATEGORIES);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get funds by category
  static async getFundsByCategory(categoryId) {
    try {
      const response = await axiosInstance.get(
        FUND_ENDPOINTS.GET_FUNDS_BY_CATEGORY.replace(':categoryId', categoryId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get fund holdings
  static async getFundHoldings(fundId) {
    try {
      const response = await axiosInstance.get(
        FUND_ENDPOINTS.GET_FUND_HOLDINGS.replace(':id', fundId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get fund ratings
  static async getFundRatings(fundId) {
    try {
      const response = await axiosInstance.get(
        FUND_ENDPOINTS.GET_FUND_RATINGS.replace(':id', fundId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add fund rating
  static async addFundRating(fundId, ratingData) {
    try {
      const response = await axiosInstance.post(
        FUND_ENDPOINTS.ADD_FUND_RATING.replace(':id', fundId),
        ratingData
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

export default FundService;