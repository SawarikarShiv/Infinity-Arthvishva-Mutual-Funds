    /**
     * Mutual Fund Categories
     */
    export const FUND_CATEGORIES = {
    EQUITY: {
        id: 'equity',
        name: 'Equity Funds',
        description: 'Invests primarily in stocks/shares of companies',
        subCategories: [
        { id: 'large_cap', name: 'Large Cap Funds', description: 'Invests in large-capitalization companies' },
        { id: 'mid_cap', name: 'Mid Cap Funds', description: 'Invests in mid-capitalization companies' },
        { id: 'small_cap', name: 'Small Cap Funds', description: 'Invests in small-capitalization companies' },
        { id: 'multi_cap', name: 'Multi Cap Funds', description: 'Invests across market capitalizations' },
        { id: 'sectoral', name: 'Sectoral/Thematic Funds', description: 'Focuses on specific sectors/themes' },
        { id: 'dividend_yield', name: 'Dividend Yield Funds', description: 'Focuses on dividend-paying companies' },
        { id: 'value', name: 'Value Funds', description: 'Invests in undervalued companies' },
        { id: 'focused', name: 'Focused Funds', description: 'Invests in limited number of stocks' },
        { id: 'equity_linked_savings', name: 'ELSS Funds', description: 'Tax-saving equity funds with lock-in period' },
        ],
    },
    
    DEBT: {
        id: 'debt',
        name: 'Debt Funds',
        description: 'Invests primarily in fixed-income securities',
        subCategories: [
        { id: 'liquid', name: 'Liquid Funds', description: 'Invests in money market instruments' },
        { id: 'overnight', name: 'Overnight Funds', description: 'Invests in overnight securities' },
        { id: 'ultra_short', name: 'Ultra Short Duration Funds', description: 'Investment duration: 3-6 months' },
        { id: 'low_duration', name: 'Low Duration Funds', description: 'Investment duration: 6-12 months' },
        { id: 'short_duration', name: 'Short Duration Funds', description: 'Investment duration: 1-3 years' },
        { id: 'medium_duration', name: 'Medium Duration Funds', description: 'Investment duration: 3-4 years' },
        { id: 'long_duration', name: 'Long Duration Funds', description: 'Investment duration: 4-7 years' },
        { id: 'corporate_bond', name: 'Corporate Bond Funds', description: 'Invests in corporate bonds' },
        { id: 'credit_risk', name: 'Credit Risk Funds', description: 'Invests in lower-rated bonds for higher returns' },
        { id: 'gilt', name: 'Gilt Funds', description: 'Invests in government securities' },
        { id: 'floating_rate', name: 'Floating Rate Funds', description: 'Invests in floating rate instruments' },
        ],
    },
    
    HYBRID: {
        id: 'hybrid',
        name: 'Hybrid Funds',
        description: 'Invests in mix of equity and debt instruments',
        subCategories: [
        { id: 'conservative', name: 'Conservative Hybrid Funds', description: 'Equity: 10-25%, Debt: 75-90%' },
        { id: 'balanced', name: 'Balanced Hybrid Funds', description: 'Equity: 40-60%, Debt: 40-60%' },
        { id: 'aggressive', name: 'Aggressive Hybrid Funds', description: 'Equity: 65-80%, Debt: 20-35%' },
        { id: 'dynamic_asset', name: 'Dynamic Asset Allocation Funds', description: 'Varies asset allocation dynamically' },
        { id: 'multi_asset', name: 'Multi Asset Allocation Funds', description: 'Invests in at least 3 asset classes' },
        { id: 'arbitrage', name: 'Arbitrage Funds', description: 'Profits from price differences in markets' },
        ],
    },
    
    SOLUTION_ORIENTED: {
        id: 'solution_oriented',
        name: 'Solution Oriented Funds',
        description: 'Designed for specific financial goals',
        subCategories: [
        { id: 'retirement', name: 'Retirement Funds', description: 'For retirement planning' },
        { id: 'children', name: 'Children\'s Funds', description: 'For children\'s future needs' },
        ],
    },
    
    OTHER: {
        id: 'other',
        name: 'Other Funds',
        description: 'Other types of mutual funds',
        subCategories: [
        { id: 'index', name: 'Index Funds', description: 'Tracks a specific market index' },
        { id: 'exchange_traded', name: 'ETF Funds', description: 'Traded on stock exchanges like stocks' },
        { id: 'fund_of_funds', name: 'Fund of Funds', description: 'Invests in other mutual funds' },
        ],
    },
    };

    // Fund Categories Array for dropdowns
    export const FUND_CATEGORIES_ARRAY = Object.values(FUND_CATEGORIES).map(category => ({
    value: category.id,
    label: category.name,
    description: category.description,
    }));

    // Fund Sub-Categories Array
    export const FUND_SUB_CATEGORIES_ARRAY = Object.values(FUND_CATEGORIES).flatMap(category => 
    category.subCategories.map(subCategory => ({
        value: subCategory.id,
        label: subCategory.name,
        category: category.id,
        description: subCategory.description,
    }))
    );

    // Get category by ID
    export const getFundCategoryById = (categoryId) => {
    return FUND_CATEGORIES[categoryId] || null;
    };

    // Get sub-category by ID
    export const getFundSubCategoryById = (subCategoryId) => {
    for (const category of Object.values(FUND_CATEGORIES)) {
        const subCategory = category.subCategories.find(sc => sc.id === subCategoryId);
        if (subCategory) {
        return { ...subCategory, category: category.id };
        }
    }
    return null;
    };

    // Get all sub-categories for a category
    export const getSubCategoriesByCategory = (categoryId) => {
    const category = FUND_CATEGORIES[categoryId];
    return category ? category.subCategories : [];
    };