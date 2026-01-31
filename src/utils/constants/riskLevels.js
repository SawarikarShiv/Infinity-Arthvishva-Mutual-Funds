/**
 * Risk Levels for Mutual Funds
 */
export const RISK_LEVELS = {
  VERY_LOW: {
    id: 'very_low',
    name: 'Very Low Risk',
    description: 'Lowest risk, suitable for conservative investors',
    color: '#10B981', // Green
    icon: '🛡️',
    recommendedFor: [
      'First-time investors',
      'Conservative investors',
      'Short-term goals (1-2 years)',
      'Emergency funds'
    ],
    typicalInstruments: ['Treasury bills', 'Overnight funds', 'Liquid funds'],
    suggestedAssetAllocation: {
      equity: '0-10%',
      debt: '90-100%',
      others: '0%'
    },
    volatility: 'Very Low',
    expectedReturns: '5-7% p.a.'
  },
  
  LOW: {
    id: 'low',
    name: 'Low Risk',
    description: 'Low risk, stable returns',
    color: '#34D399', // Light Green
    icon: '📈',
    recommendedFor: [
      'Risk-averse investors',
      'Short to medium term goals',
      'Retirement planning (near term)'
    ],
    typicalInstruments: ['Short-term debt funds', 'Ultra short duration funds'],
    suggestedAssetAllocation: {
      equity: '10-20%',
      debt: '80-90%',
      others: '0%'
    },
    volatility: 'Low',
    expectedReturns: '6-8% p.a.'
  },
  
  MODERATE: {
    id: 'moderate',
    name: 'Moderate Risk',
    description: 'Balanced risk and returns',
    color: '#F59E0B', // Amber
    icon: '⚖️',
    recommendedFor: [
      'Balanced investors',
      'Medium-term goals (3-5 years)',
      'Retirement planning'
    ],
    typicalInstruments: ['Hybrid funds', 'Dynamic asset allocation funds'],
    suggestedAssetAllocation: {
      equity: '40-60%',
      debt: '40-60%',
      others: '0-10%'
    },
    volatility: 'Moderate',
    expectedReturns: '8-12% p.a.'
  },
  
  HIGH: {
    id: 'high',
    name: 'High Risk',
    description: 'Higher risk for potentially higher returns',
    color: '#EF4444', // Red
    icon: '🚀',
    recommendedFor: [
      'Aggressive investors',
      'Long-term goals (5+ years)',
      'Wealth creation'
    ],
    typicalInstruments: ['Equity funds', 'Sectoral funds'],
    suggestedAssetAllocation: {
      equity: '70-90%',
      debt: '10-30%',
      others: '0-10%'
    },
    volatility: 'High',
    expectedReturns: '12-15% p.a.'
  },
  
  VERY_HIGH: {
    id: 'very_high',
    name: 'Very High Risk',
    description: 'Highest risk, suitable for experienced investors',
    color: '#DC2626', // Dark Red
    icon: '🔥',
    recommendedFor: [
      'Experienced investors',
      'Very long-term goals (10+ years)',
      'High-risk appetite investors'
    ],
    typicalInstruments: ['Small cap funds', 'Sectoral/thematic funds', 'International funds'],
    suggestedAssetAllocation: {
      equity: '90-100%',
      debt: '0-10%',
      others: '0-10%'
    },
    volatility: 'Very High',
    expectedReturns: '15%+ p.a.'
  }
};

// Risk Levels Array for dropdowns
export const RISK_LEVELS_ARRAY = Object.values(RISK_LEVELS).map(level => ({
  value: level.id,
  label: level.name,
  description: level.description,
  color: level.color,
  icon: level.icon
}));

// Risk Assessment Questions
export const RISK_ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: 'What is your investment time horizon?',
    options: [
      { id: 'a', text: 'Less than 1 year', score: 1 },
      { id: 'b', text: '1-3 years', score: 2 },
      { id: 'c', text: '3-5 years', score: 3 },
      { id: 'd', text: '5-10 years', score: 4 },
      { id: 'e', text: 'More than 10 years', score: 5 }
    ]
  },
  {
    id: 2,
    question: 'What is your primary investment objective?',
    options: [
      { id: 'a', text: 'Capital preservation', score: 1 },
      { id: 'b', text: 'Regular income', score: 2 },
      { id: 'c', text: 'Balanced growth and income', score: 3 },
      { id: 'd', text: 'Long-term wealth creation', score: 4 },
      { id: 'e', text: 'Aggressive wealth creation', score: 5 }
    ]
  },
  {
    id: 3,
    question: 'How would you react if your investment lost 20% of its value in a short period?',
    options: [
      { id: 'a', text: 'Sell all investments immediately', score: 1 },
      { id: 'b', text: 'Sell some investments', score: 2 },
      { id: 'c', text: 'Hold and wait for recovery', score: 3 },
      { id: 'd', text: 'Buy more to average down', score: 4 },
      { id: 'e', text: 'See it as a buying opportunity', score: 5 }
    ]
  },
  {
    id: 4,
    question: 'What percentage of your monthly income do you plan to invest?',
    options: [
      { id: 'a', text: 'Less than 10%', score: 1 },
      { id: 'b', text: '10-20%', score: 2 },
      { id: 'c', text: '20-30%', score: 3 },
      { id: 'd', text: '30-40%', score: 4 },
      { id: 'e', text: 'More than 40%', score: 5 }
    ]
  },
  {
    id: 5,
    question: 'What is your experience with equity investments?',
    options: [
      { id: 'a', text: 'No experience', score: 1 },
      { id: 'b', text: 'Limited experience (less than 2 years)', score: 2 },
      { id: 'c', text: 'Moderate experience (2-5 years)', score: 3 },
      { id: 'd', text: 'Good experience (5-10 years)', score: 4 },
      { id: 'e', text: 'Extensive experience (10+ years)', score: 5 }
    ]
  }
];

// Risk Score to Level Mapping
export const RISK_SCORE_MAPPING = {
  5: 'very_low',
  6: 'very_low',
  7: 'low',
  8: 'low',
  9: 'moderate',
  10: 'moderate',
  11: 'moderate',
  12: 'high',
  13: 'high',
  14: 'high',
  15: 'very_high',
  16: 'very_high',
  17: 'very_high',
  18: 'very_high',
  19: 'very_high',
  20: 'very_high',
  21: 'very_high',
  22: 'very_high',
  23: 'very_high',
  24: 'very_high',
  25: 'very_high'
};

// Calculate risk profile based on score
export const calculateRiskProfile = (score) => {
  const levelId = RISK_SCORE_MAPPING[score] || 'moderate';
  return RISK_LEVELS[levelId];
};

// Get recommended funds based on risk level
export const getRecommendedFundTypes = (riskLevelId) => {
  const recommendations = {
    very_low: ['Liquid Funds', 'Overnight Funds', 'Ultra Short Duration Funds'],
    low: ['Short Duration Funds', 'Low Duration Funds', 'Corporate Bond Funds'],
    moderate: ['Hybrid Funds', 'Balanced Funds', 'Multi Cap Funds'],
    high: ['Large Cap Funds', 'Flexi Cap Funds', 'Value Funds'],
    very_high: ['Mid Cap Funds', 'Small Cap Funds', 'Sectoral Funds']
  };
  
  return recommendations[riskLevelId] || recommendations.moderate;
};