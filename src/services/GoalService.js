import axiosInstance from './api/axiosInstance.js';
import GOAL_ENDPOINTS from './endpoints/goalEndpoints.js';

class GoalService {
  // Get all goals
  static async getGoals(params = {}) {
    try {
      const response = await axiosInstance.get(GOAL_ENDPOINTS.GET_GOALS, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get goal by ID
  static async getGoalById(goalId) {
    try {
      const response = await axiosInstance.get(
        GOAL_ENDPOINTS.GET_GOAL_BY_ID.replace(':id', goalId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Create goal
  static async createGoal(goalData) {
    try {
      const response = await axiosInstance.post(GOAL_ENDPOINTS.CREATE_GOAL, goalData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update goal
  static async updateGoal(goalId, goalData) {
    try {
      const response = await axiosInstance.put(
        GOAL_ENDPOINTS.UPDATE_GOAL.replace(':id', goalId),
        goalData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Delete goal
  static async deleteGoal(goalId) {
    try {
      const response = await axiosInstance.delete(
        GOAL_ENDPOINTS.DELETE_GOAL.replace(':id', goalId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get goal progress
  static async getGoalProgress(goalId) {
    try {
      const response = await axiosInstance.get(
        GOAL_ENDPOINTS.GET_GOAL_PROGRESS.replace(':id', goalId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Update goal progress
  static async updateGoalProgress(goalId, progressData) {
    try {
      const response = await axiosInstance.put(
        GOAL_ENDPOINTS.UPDATE_GOAL_PROGRESS.replace(':id', goalId),
        progressData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get goal milestones
  static async getGoalMilestones(goalId) {
    try {
      const response = await axiosInstance.get(
        GOAL_ENDPOINTS.GET_GOAL_MILESTONES.replace(':id', goalId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Add goal milestone
  static async addGoalMilestone(goalId, milestoneData) {
    try {
      const response = await axiosInstance.post(
        GOAL_ENDPOINTS.ADD_GOAL_MILESTONE.replace(':id', goalId),
        milestoneData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get goal recommendations
  static async getGoalRecommendations(params = {}) {
    try {
      const response = await axiosInstance.get(GOAL_ENDPOINTS.GET_GOAL_RECOMMENDATIONS, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Calculate goal investment
  static async calculateGoalInvestment(goalData) {
    try {
      const response = await axiosInstance.post(
        GOAL_ENDPOINTS.CALCULATE_GOAL_INVESTMENT,
        goalData
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Link fund to goal
  static async linkFundToGoal(goalId, fundId) {
    try {
      const response = await axiosInstance.post(
        GOAL_ENDPOINTS.LINK_FUND_TO_GOAL
          .replace(':goalId', goalId)
          .replace(':fundId', fundId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Unlink fund from goal
  static async unlinkFundFromGoal(goalId, fundId) {
    try {
      const response = await axiosInstance.delete(
        GOAL_ENDPOINTS.UNLINK_FUND_FROM_GOAL
          .replace(':goalId', goalId)
          .replace(':fundId', fundId)
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get goal linked funds
  static async getGoalLinkedFunds(goalId) {
    try {
      const response = await axiosInstance.get(
        GOAL_ENDPOINTS.GET_GOAL_LINKED_FUNDS.replace(':id', goalId)
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

export default GoalService;