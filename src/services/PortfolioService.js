import axiosInstance from './api/axiosInstance.js';
import PORTFOLIO_ENDPOINTS from './endpoints/portfolioEndpoints.js';

class PortfolioService {
  // Get portfolio overview
  static async getPortfolioOverview() {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_PORTFOLIO_OVERVIEW);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get portfolio holdings
  static async getPortfolioHoldings(params = {}) {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_PORTFOLIO_HOLDINGS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get portfolio performance
  static async getPortfolioPerformance(period = '1y') {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_PORTFOLIO_PERFORMANCE, {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get asset allocation
  static async getAssetAllocation() {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_ASSET_ALLOCATION);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get sector allocation
  static async getSectorAllocation() {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_SECTOR_ALLOCATION);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get portfolio transactions
  static async getPortfolioTransactions(params = {}) {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_PORTFOLIO_TRANSACTIONS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get recent investments
  static async getRecentInvestments(limit = 10) {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_RECENT_INVESTMENTS, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get portfolio analysis
  static async getPortfolioAnalysis() {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_PORTFOLIO_ANALYSIS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get risk analysis
  static async getRiskAnalysis() {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_RISK_ANALYSIS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Rebalance portfolio
  static async rebalancePortfolio(rebalanceData) {
    try {
      const response = await axiosInstance.post(PORTFOLIO_ENDPOINTS.REBALANCE_PORTFOLIO, rebalanceData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate portfolio report
  static async generatePortfolioReport(reportType, params = {}) {
    try {
      const response = await axiosInstance.post(PORTFOLIO_ENDPOINTS.GENERATE_PORTFOLIO_REPORT, {
        reportType,
        ...params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get tax implications
  static async getTaxImplications() {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_TAX_IMPLICATIONS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get client portfolios (for advisors)
  static async getClientPortfolios(params = {}) {
    try {
      const response = await axiosInstance.get(PORTFOLIO_ENDPOINTS.GET_CLIENT_PORTFOLIOS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get client portfolio details
  static async getClientPortfolioDetails(clientId) {
    try {
      const response = await axiosInstance.get(
        PORTFOLIO_ENDPOINTS.GET_CLIENT_PORTFOLIO_DETAILS.replace(':clientId', clientId)
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

export default PortfolioService;