// Fund management endpoints
const FUND_ENDPOINTS = {
  // Fund data
  GET_ALL_FUNDS: '/funds',
  GET_FUND_BY_ID: '/funds/:id',
  GET_FUND_NAV: '/funds/:id/nav',
  GET_FUND_PERFORMANCE: '/funds/:id/performance',
  GET_FUND_HOLDINGS: '/funds/:id/holdings',
  
  // Fund categories
  GET_FUND_CATEGORIES: '/funds/categories',
  GET_FUNDS_BY_CATEGORY: '/funds/category/:categoryId',
  
  // Search and filter
  SEARCH_FUNDS: '/funds/search',
  FILTER_FUNDS: '/funds/filter',
  
  // Fund comparison
  COMPARE_FUNDS: '/funds/compare',
  
  // SIP
  CALCULATE_SIP: '/funds/sip/calculate',
  GET_SIP_RECOMMENDATIONS: '/funds/sip/recommendations',
  
  // Watchlist
  ADD_TO_WATCHLIST: '/funds/watchlist/add',
  REMOVE_FROM_WATCHLIST: '/funds/watchlist/remove',
  GET_WATCHLIST: '/funds/watchlist',
  
  // Ratings and reviews
  GET_FUND_RATINGS: '/funds/:id/ratings',
  ADD_FUND_RATING: '/funds/:id/ratings',
  GET_FUND_REVIEWS: '/funds/:id/reviews'
};

export default FUND_ENDPOINTS;