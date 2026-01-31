import axiosInstance from './api/axiosInstance.js';
import REPORT_ENDPOINTS from './endpoints/reportEndpoints.js';

class ReportService {
  // Generate portfolio summary report
  static async generatePortfolioSummaryReport(params = {}) {
    try {
      const response = await axiosInstance.post(
        REPORT_ENDPOINTS.GENERATE_PORTFOLIO_SUMMARY,
        params
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate portfolio detailed report
  static async generatePortfolioDetailedReport(params = {}) {
    try {
      const response = await axiosInstance.post(
        REPORT_ENDPOINTS.GENERATE_PORTFOLIO_DETAILED,
        params
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate portfolio performance report
  static async generatePortfolioPerformanceReport(params = {}) {
    try {
      const response = await axiosInstance.post(
        REPORT_ENDPOINTS.GENERATE_PORTFOLIO_PERFORMANCE,
        params
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate transaction statement
  static async generateTransactionStatement(startDate, endDate) {
    try {
      const response = await axiosInstance.post(REPORT_ENDPOINTS.GENERATE_TRANSACTION_STATEMENT, {
        startDate,
        endDate
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate tax statement
  static async generateTaxStatement(financialYear) {
    try {
      const response = await axiosInstance.post(REPORT_ENDPOINTS.GENERATE_TAX_STATEMENT, {
        financialYear
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate capital gains report
  static async generateCapitalGainsReport(params = {}) {
    try {
      const response = await axiosInstance.post(
        REPORT_ENDPOINTS.GENERATE_CAPITAL_GAINS_REPORT,
        params
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate goal progress report
  static async generateGoalProgressReport(goalId = null) {
    try {
      const response = await axiosInstance.post(REPORT_ENDPOINTS.GENERATE_GOAL_PROGRESS_REPORT, {
        goalId
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate goal forecast report
  static async generateGoalForecastReport(goalId) {
    try {
      const response = await axiosInstance.post(REPORT_ENDPOINTS.GENERATE_GOAL_FORECAST_REPORT, {
        goalId
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate consolidated report
  static async generateConsolidatedReport(params = {}) {
    try {
      const response = await axiosInstance.post(
        REPORT_ENDPOINTS.GENERATE_CONSOLIDATED_REPORT,
        params
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generate annual report
  static async generateAnnualReport(year) {
    try {
      const response = await axiosInstance.post(REPORT_ENDPOINTS.GENERATE_ANNUAL_REPORT, {
        year
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Download report
  static async downloadReport(reportId) {
    try {
      const response = await axiosInstance.get(
        REPORT_ENDPOINTS.DOWNLOAD_REPORT.replace(':reportId', reportId),
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get report history
  static async getReportHistory(params = {}) {
    try {
      const response = await axiosInstance.get(REPORT_ENDPOINTS.GET_REPORT_HISTORY, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete report
  static async deleteReport(reportId) {
    try {
      const response = await axiosInstance.delete(
        REPORT_ENDPOINTS.DELETE_REPORT.replace(':reportId', reportId)
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

export default ReportService;