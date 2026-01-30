// src/features/public/services/homeService.js
// Mock service for Infinity Arthvishva homepage
// In production, replace with actual API calls

const homeService = {
  // Get complete homepage data (main endpoint)
  async getHomeData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          heroData: {
            title: 'Your Financial Success is Our True Achievement',
            subtitle: 'One-stop financial advisory for loans, investments, insurance, and wealth management',
            stats: [
              { value: '2600+', label: 'Active Partners' },
              { value: '500Cr+', label: 'Assets Managed' },
              { value: '20+', label: 'Branches India' },
              { value: '4.8★', label: 'Customer Rating' }
            ],
            trustIndicators: [
              'SEBI Registered',
              'AMFI Certified', 
              'ET Award 2025',
              'ISO Certified'
            ]
          },
          offers: {
            finance: {
              title: 'Finance',
              description: 'Comprehensive loan solutions for all your financial needs.',
              items: [
                'Home Loan', 'Personal Loan', 'Business Loan', 'SME Loan',
                'Auto Loan', 'Mortgage Loan', 'Education Loan', 'Vehicle Loan',
                'Loan Against Securities'
              ]
            },
            protection: {
              title: 'Protection',
              description: 'Insurance solutions to safeguard your future and assets.',
              items: [
                'Life Insurance', 'Health Insurance', 'Motor Insurance',
                'Property Insurance', 'Travel Insurance', 'Cattle Insurance',
                'Marine Insurance', 'Corporate Insurance'
              ]
            },
            investment: {
              title: 'Investment',
              description: 'Strategic investment options to grow your wealth.',
              items: [
                'Mutual Funds', 'Wealth Management', 'Demat Account',
                'Real Estate Investments', 'Portfolio Management Service',
                'Alternative Investment Fund', 'Fixed Deposit', 'Bonds',
                'Unlisted Shares'
              ]
            }
          },
          aboutData: {
            description: `At Infinity Arthvishva, we believe that your financial success is our true achievement. We are a one-stop financial advisory firm offering end-to-end solutions in loans, investments, insurance, and wealth management. With a strong foundation of trust, expertise, and innovation, we strive to simplify finance and empower individuals and businesses to achieve their goals with confidence.

At Infinity Arthvishva, we don't just manage finances — we build lasting relationships and craft infinite possibilities for your financial future.`,
            gstNumber: '27AAICI0723K1ZJ',
            cinNumber: 'U66190PN2025PTC238981',
            vision: 'At Infinity Arthvishva, our vision is to seamlessly integrate advanced financial intelligence into everyday life — empowering families across India to achieve stability, growth, and prosperity.',
            strategies: [
              {
                number: '1',
                title: 'Strategic Approach',
                description: 'We deliver innovative loan and investment solutions that align with your goals.'
              },
              {
                number: '2',
                title: 'Long-Term Strategy',
                description: 'Our plans focus on sustainable financial growth and lasting security.'
              },
              {
                number: '3',
                title: 'Growth-Oriented Vision',
                description: 'We create tailored strategies that help you expand your financial horizon.'
              }
            ],
            award: 'Winner at ET Business Awards 2025 – Pune'
          },
          leadership: [
            {
              name: 'Mr. Rajesh Parkhi',
              role: 'Executive Director',
              description: 'Over 25 years of extensive experience in the retail finance sector with an MBA in Marketing. Expertise in structuring retail loan portfolios and fostering sustainable business growth.'
            },
            {
              name: 'Mr. Rahul Kangane',
              role: 'Chairman and Managing Director',
              description: '15 years of expertise in broking and wealth management, with a focus on portfolio strategy. His sharp market insights fuel the company\'s growth and success.'
            },
            {
              name: 'Mr. Pravin Marathe',
              role: 'Chief Financial Officer',
              description: 'Mr. Pravin Marathe is a Chief Financial Officer at Infinity Arthvishva with over 18 years of experience in financial markets. Known for his client-focused approach and strategic vision, he drives growth through expertise in mutual funds, PMS, and AIFs.'
            }
          ],
          partnerStats: [
            {
              value: '2600+',
              label: 'Active DSA & Partners',
              description: 'Trusted Partnerships'
            },
            {
              value: '20+',
              label: 'Branches Across India',
              description: 'Pan India Presence'
            },
            {
              value: '500Cr+',
              label: 'in Total Loan Book',
              description: 'Assets Managed'
            }
          ],
          branches: [
            'Pune (Main Branch)', 'Mumbai', 'Kolhapur & Sangli',
            'Nashik', 'Chiplun', 'Ratnagiri', 'Satara', 'Raipur',
            'Baramati', 'Assam', 'West Bengal', 'Chhatrapati Sambhajinagar',
            'Nagpur', 'Yavatmal', 'Gurgaon', 'Ahilyanagar', 'Hyderabad',
            'Indore', 'Surat', 'Lucknow'
          ]
        });
      }, 300);
    });
  },

  // Get specific sections (for modular loading)

  // Get offers data specifically
  async getOffersData() {
    return {
      finance: {
        title: 'Finance',
        description: 'Comprehensive loan solutions for all your financial needs.',
        items: [
          'Home Loan', 'Personal Loan', 'Business Loan', 'SME Loan',
          'Auto Loan', 'Mortgage Loan', 'Education Loan', 'Vehicle Loan',
          'Loan Against Securities'
        ]
      },
      protection: {
        title: 'Protection',
        description: 'Insurance solutions to safeguard your future and assets.',
        items: [
          'Life Insurance', 'Health Insurance', 'Motor Insurance',
          'Property Insurance', 'Travel Insurance', 'Cattle Insurance',
          'Marine Insurance', 'Corporate Insurance'
        ]
      },
      investment: {
        title: 'Investment',
        description: 'Strategic investment options to grow your wealth.',
        items: [
          'Mutual Funds', 'Wealth Management', 'Demat Account',
          'Real Estate Investments', 'Portfolio Management Service',
          'Alternative Investment Fund', 'Fixed Deposit', 'Bonds',
          'Unlisted Shares'
        ]
      }
    };
  },

  // Get leadership data
  async getLeadershipData() {
    return [
      {
        name: 'Mr. Rajesh Parkhi',
        role: 'Executive Director',
        description: 'Over 25 years of extensive experience in the retail finance sector with an MBA in Marketing. Expertise in structuring retail loan portfolios and fostering sustainable business growth.'
      },
      {
        name: 'Mr. Rahul Kangane',
        role: 'Chairman and Managing Director',
        description: '15 years of expertise in broking and wealth management, with a focus on portfolio strategy. His sharp market insights fuel the company\'s growth and success.'
      },
      {
        name: 'Mr. Pravin Marathe',
        role: 'Chief Financial Officer',
        description: 'Mr. Pravin Marathe is a Chief Financial Officer at Infinity Arthvishva with over 18 years of experience in financial markets. Known for his client-focused approach and strategic vision, he drives growth through expertise in mutual funds, PMS, and AIFs.'
      }
    ];
  },

  // Get partner statistics
  async getPartnerStats() {
    return [
      {
        value: '2600+',
        label: 'Active DSA & Partners',
        description: 'Trusted Partnerships'
      },
      {
        value: '20+',
        label: 'Branches Across India',
        description: 'Pan India Presence'
      },
      {
        value: '500Cr+',
        label: 'in Total Loan Book',
        description: 'Assets Managed'
      }
    ];
  },

  // Get branches
  async getBranches() {
    return [
      'Pune (Main Branch)', 'Mumbai', 'Kolhapur & Sangli',
      'Nashik', 'Chiplun', 'Ratnagiri', 'Satara', 'Raipur',
      'Baramati', 'Assam', 'West Bengal', 'Chhatrapati Sambhajinagar',
      'Nagpur', 'Yavatmal', 'Gurgaon', 'Ahilyanagar', 'Hyderabad',
      'Indore', 'Surat', 'Lucknow'
    ];
  },

  // Submit contact form
  async submitContact(formData) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Contact form submitted:', formData);
        resolve({
          success: true,
          message: 'Thank you for contacting us! We will get back to you within 24 hours.',
          timestamp: new Date().toISOString()
        });
      }, 1000);
    });
  },

  // ===== ORIGINAL METHODS (Kept for backward compatibility) =====

  // Get home page statistics (original method)
  async getHomeStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalInvestors: 52500,
          assetsManaged: 5250000000, // 525 crores
          yearsExperience: 15,
          customerRating: 4.8
        });
      }, 300);
    });
  },

  // Get featured funds (original method)
  async getFeaturedFunds(limit = 6) {
    const funds = [
      {
        id: 'F001',
        name: 'SBI Bluechip Fund',
        category: 'Large Cap',
        risk: 'Medium',
        returns: {
          '1y': 18.5,
          '3y': 15.2,
          '5y': 16.8
        },
        nav: 125.45,
        minInvestment: 500,
        rating: 4.5
      },
      {
        id: 'F002',
        name: 'HDFC Balanced Advantage',
        category: 'Hybrid',
        risk: 'Low',
        returns: {
          '1y': 14.2,
          '3y': 12.8,
          '5y': 13.5
        },
        nav: 234.12,
        minInvestment: 1000,
        rating: 4.3
      },
      {
        id: 'F003',
        name: 'ICICI Prudential Bluechip',
        category: 'Large Cap',
        risk: 'Medium',
        returns: {
          '1y': 19.2,
          '3y': 16.5,
          '5y': 17.2
        },
        nav: 189.67,
        minInvestment: 500,
        rating: 4.6
      },
      {
        id: 'F004',
        name: 'Axis Long Term Equity',
        category: 'ELSS',
        risk: 'High',
        returns: {
          '1y': 22.5,
          '3y': 18.8,
          '5y': 19.5
        },
        nav: 456.78,
        minInvestment: 500,
        rating: 4.7
      },
      {
        id: 'F005',
        name: 'Kotak Standard Multicap',
        category: 'Multi Cap',
        risk: 'Medium',
        returns: {
          '1y': 17.8,
          '3y': 15.5,
          '5y': 16.2
        },
        nav: 345.23,
        minInvestment: 500,
        rating: 4.4
      },
      {
        id: 'F006',
        name: 'Aditya Birla Sun Life Tax Relief',
        category: 'ELSS',
        risk: 'High',
        returns: {
          '1y': 21.5,
          '3y': 17.8,
          '5y': 18.5
        },
        nav: 278.45,
        minInvestment: 500,
        rating: 4.5
      }
    ];

    return funds.slice(0, limit);
  },

  // Get testimonials (original method)
  async getTestimonials(limit = 5) {
    const testimonials = [
      {
        id: 1,
        name: 'Rajesh Sharma',
        role: 'Software Engineer',
        location: 'Bangalore',
        content: 'Infinity Arthvishva helped me start my investment journey. Their SIP recommendations have given me 18% returns in the first year itself!',
        rating: 5,
        image: null
      },
      {
        id: 2,
        name: 'Priya Patel',
        role: 'Doctor',
        location: 'Mumbai',
        content: 'As a medical professional with limited time, their automated portfolio management is a lifesaver. My investments have grown steadily.',
        rating: 5,
        image: null
      },
      {
        id: 3,
        name: 'Amit Kumar',
        role: 'Business Owner',
        location: 'Delhi',
        content: 'The personalized advice from their financial advisors helped me optimize my tax savings through ELSS funds. Highly recommended!',
        rating: 4,
        image: null
      },
      {
        id: 4,
        name: 'Sunita Reddy',
        role: 'Teacher',
        location: 'Hyderabad',
        content: 'Started with small SIPs for my children\'s education. The regular updates and transparent reporting give me complete peace of mind.',
        rating: 5,
        image: null
      },
      {
        id: 5,
        name: 'Vikram Singh',
        role: 'CA',
        location: 'Pune',
        content: 'Professional platform with excellent research tools. The fund comparison feature helped me make informed investment decisions.',
        rating: 4,
        image: null
      }
    ];

    return testimonials.slice(0, limit);
  },

  // Get investment calculator results (original method)
  async calculateInvestment(data) {
    const { monthlyInvestment, years, expectedReturns } = data;
    
    // Calculate compound interest
    const monthlyRate = expectedReturns / 12 / 100;
    const months = years * 12;
    
    const futureValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalInvestment = monthlyInvestment * months;
    const wealthGained = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      wealthGained: Math.round(wealthGained),
      percentageGain: ((wealthGained / totalInvestment) * 100).toFixed(1)
    };
  },

  // Analytics: Track homepage visits
  trackPageView() {
    // In production, send to analytics service
    console.log('Homepage viewed:', new Date().toISOString());
    return {
      success: true,
      timestamp: new Date().toISOString()
    };
  },

  // Get service metrics for dashboard
  async getServiceMetrics() {
    return {
      totalServices: 28, // Sum of all offers (9+8+11)
      activeCategories: 3, // Finance, Protection, Investment
      newOffersThisMonth: 2,
      popularService: 'Mutual Funds'
    };
  }
};

export default homeService;