// Goal management endpoints
const GOAL_ENDPOINTS = {
  // Goals
  GET_GOALS: '/goals',
  GET_GOAL_BY_ID: '/goals/:id',
  CREATE_GOAL: '/goals',
  UPDATE_GOAL: '/goals/:id',
  DELETE_GOAL: '/goals/:id',
  
  // Goal tracking
  GET_GOAL_PROGRESS: '/goals/:id/progress',
  UPDATE_GOAL_PROGRESS: '/goals/:id/progress',
  GET_GOAL_MILESTONES: '/goals/:id/milestones',
  ADD_GOAL_MILESTONE: '/goals/:id/milestones',
  
  // Goal recommendations
  GET_GOAL_RECOMMENDATIONS: '/goals/recommendations',
  CALCULATE_GOAL_INVESTMENT: '/goals/calculate-investment',
  
  // Goal linking
  LINK_FUND_TO_GOAL: '/goals/:goalId/link-fund/:fundId',
  UNLINK_FUND_FROM_GOAL: '/goals/:goalId/unlink-fund/:fundId',
  GET_GOAL_LINKED_FUNDS: '/goals/:id/linked-funds'
};

export default GOAL_ENDPOINTS;