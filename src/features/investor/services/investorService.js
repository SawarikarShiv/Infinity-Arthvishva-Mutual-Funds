// Mock service for investor features
// In production, replace with actual API calls

const investorService = {
  // Dashboard data
  async getDashboardData(filter = 'all', timeRange = '1m') {
    // Mock data - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          portfolioData: {
            totalInvestment: 1250000,
            currentValue: 1450000,
            todayChange: 12500,
            xirr: 18.5,
            growthData: this.generateGrowthData(timeRange)
          },
          recentInvestments: this.generateRecentInvestments(5),
          performanceMetrics: this.generatePerformanceMetrics(),
          watchlist: this.generateWatchlist()
        });
      }, 500);
    });
  },

  // Portfolio overview
  async getPortfolioOverview() {
    return {
      totalInvestment: 1250000,
      currentValue: 1450000,
      todayChange: 12500,
      xirr: 18.5,
      assetAllocation: [
        { name: 'Equity', value: 65, color: '#3b82f6' },
        { name: 'Debt', value: 25, color: '#10b981' },
        { name: 'Gold', value: 5, color: '#f59e0b' },
        { name: 'Cash', value: 5, color: '#8b5cf6' }
      ]
    };
  },

  // Recent investments
  async getRecentInvestments(limit = 10) {
    return this.generateRecentInvestments(limit);
  },

  // Performance metrics
  async getPerformanceMetrics() {
    return this.generatePerformanceMetrics();
  },

  // Watchlist
  async getWatchlist() {
    return this.generateWatchlist();
  },

  // Helper methods for mock data
  generateGrowthData(timeRange) {
    const data = [];
    const baseDate = new Date();
    let days = 30;

    switch (timeRange) {
      case '1w':
        days = 7;
        break;
      case '1m':
        days = 30;
        break;
      case '3m':
        days = 90;
        break;
      case '6m':
        days = 180;
        break;
      case '1y':
        days = 365;
        break;
    }

    let value = 1300000;
    for (let i = days; i >= 0; i--) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() - i);
      
      // Random growth
      const change = (Math.random() - 0.45) * 0.02;
      value = value * (1 + change);
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(value)
      });
    }

    return data;
  },

  generateRecentInvestments(count) {
    const investments = [];
    const types = ['SIP', 'Lumpsum', 'Redemption', 'Switch'];
    const statuses = ['Completed', 'Pending', 'Processing', 'Failed'];
    const fundHouses = ['SBI Mutual Fund', 'HDFC Mutual Fund', 'ICICI Prudential', 'Axis Mutual Fund', 'Kotak Mutual Fund'];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const fundHouse = fundHouses[Math.floor(Math.random() * fundHouses.length)];
      
      investments.push({
        id: `INV${1000 + i}`,
        fundName: `${fundHouse.split(' ')[0]} Equity Fund`,
        fundHouse: fundHouse,
        type: type,
        amount: Math.round(5000 + Math.random() * 45000),
        units: parseFloat((Math.random() * 100 + 10).toFixed(3)),
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:30 AM',
        status: status,
        nav: parseFloat((100 + Math.random() * 50).toFixed(2))
      });
    }

    return investments;
  },

  generatePerformanceMetrics() {
    return {
      assetAllocation: [
        { name: 'Equity', percentage: 65, color: '#3b82f6' },
        { name: 'Debt', percentage: 25, color: '#10b981' },
        { name: 'Gold', percentage: 5, color: '#f59e0b' },
        { name: 'Cash', percentage: 5, color: '#8b5cf6' }
      ],
      categoryAllocation: [
        { name: 'Large Cap', value: 40 },
        { name: 'Mid Cap', value: 20 },
        { name: 'Small Cap', value: 5 },
        { name: 'Debt', value: 25 },
        { name: 'Others', value: 10 }
      ],
      riskMetrics: {
        overall: 'Moderate',
        low: 25,
        moderate: 60,
        high: 15
      },
      performanceMetrics: {
        alpha: 2.5,
        beta: 0.85,
        sharpeRatio: 1.8,
        sortinoRatio: 2.1
      }
    };
  },

  generateWatchlist() {
    const funds = [
      {
        id: 'F001',
        name: 'SBI Bluechip Fund',
        fundHouse: 'SBI Mutual Fund',
        nav: 125.45,
        change: 1.25,
        risk: 'Medium',
        category: 'Equity'
      },
      {
        id: 'F002',
        name: 'HDFC Balanced Advantage',
        fundHouse: 'HDFC Mutual Fund',
        nav: 234.12,
        change: -0.45,
        risk: 'Low',
        category: 'Hybrid'
      },
      {
        id: 'F003',
        name: 'ICICI Prudential Bluechip',
        fundHouse: 'ICICI Prudential',
        nav: 189.67,
        change: 2.15,
        risk: 'Medium',
        category: 'Equity'
      },
      {
        id: 'F004',
        name: 'Axis Long Term Equity',
        fundHouse: 'Axis Mutual Fund',
        nav: 456.78,
        change: 0.85,
        risk: 'High',
        category: 'Equity'
      },
      {
        id: 'F005',
        name: 'Kotak Standard Multicap',
        fundHouse: 'Kotak Mutual Fund',
        nav: 345.23,
        change: -1.25,
        risk: 'Medium',
        category: 'Equity'
      }
    ];

    return funds;
  }
};

export default investorService;
EOF