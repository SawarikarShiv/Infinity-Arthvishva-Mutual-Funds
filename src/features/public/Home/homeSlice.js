// src/features/public/Home/homeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import homeService from '../services/homeService';

// Async thunks for fetching homepage data
export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getHomeData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOffersData = createAsyncThunk(
  'home/fetchOffersData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getOffersData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLeadershipData = createAsyncThunk(
  'home/fetchLeadershipData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getLeadershipData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPartnerStats = createAsyncThunk(
  'home/fetchPartnerStats',
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getPartnerStats();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitContactForm = createAsyncThunk(
  'home/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await homeService.submitContact(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBranchNetwork = createAsyncThunk(
  'home/fetchBranchNetwork',
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getBranches();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  // Hero Section
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
  
  // Offers Section (from Infinity Arthvishva website)
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
  
  // About Section
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
  
  // Leadership Team
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
  
  // Partner Network
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
  
  // Branch Network (from their website)
  branches: [
    'Pune (Main Branch)', 'Mumbai', 'Kolhapur & Sangli',
    'Nashik', 'Chiplun', 'Ratnagiri', 'Satara', 'Raipur',
    'Baramati', 'Assam', 'West Bengal', 'Chhatrapati Sambhajinagar',
    'Nagpur', 'Yavatmal', 'Gurgaon', 'Ahilyanagar', 'Hyderabad',
    'Indore', 'Surat', 'Lucknow'
  ],
  
  // Contact Form State
  contactForm: {
    name: '',
    email: '',
    phone: '',
    message: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null
  },
  
  // UI State
  isLoading: false,
  error: null,
  lastUpdated: null
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // Contact form updates
    updateContactForm: (state, action) => {
      state.contactForm = {
        ...state.contactForm,
        ...action.payload
      };
    },
    
    clearContactForm: (state) => {
      state.contactForm = {
        name: '',
        email: '',
        phone: '',
        message: '',
        isSubmitting: false,
        isSubmitted: false,
        error: null
      };
    },
    
    // Error handling
    clearError: (state) => {
      state.error = null;
    },
    
    // Update specific sections
    updateHeroData: (state, action) => {
      state.heroData = { ...state.heroData, ...action.payload };
    },
    
    updateOffers: (state, action) => {
      state.offers = { ...state.offers, ...action.payload };
    },
    
    updateLeadership: (state, action) => {
      state.leadership = action.payload;
    },
    
    setLastUpdated: (state) => {
      state.lastUpdated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Home Data
      .addCase(fetchHomeData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.heroData) state.heroData = action.payload.heroData;
        if (action.payload.offers) state.offers = action.payload.offers;
        if (action.payload.aboutData) state.aboutData = action.payload.aboutData;
        if (action.payload.leadership) state.leadership = action.payload.leadership;
        if (action.payload.partnerStats) state.partnerStats = action.payload.partnerStats;
        if (action.payload.branches) state.branches = action.payload.branches;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Offers Data
      .addCase(fetchOffersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchOffersData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Leadership Data
      .addCase(fetchLeadershipData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLeadershipData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leadership = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchLeadershipData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Partner Stats
      .addCase(fetchPartnerStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPartnerStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partnerStats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchPartnerStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Submit Contact Form
      .addCase(submitContactForm.pending, (state) => {
        state.contactForm.isSubmitting = true;
        state.contactForm.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.contactForm.isSubmitting = false;
        state.contactForm.isSubmitted = true;
        state.contactForm.name = '';
        state.contactForm.email = '';
        state.contactForm.phone = '';
        state.contactForm.message = '';
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.contactForm.isSubmitting = false;
        state.contactForm.error = action.payload;
      })
      
      // Fetch Branch Network
      .addCase(fetchBranchNetwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBranchNetwork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.branches = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchBranchNetwork.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

// Selectors
export const selectHeroData = (state) => state.home.heroData;
export const selectOffers = (state) => state.home.offers;
export const selectAboutData = (state) => state.home.aboutData;
export const selectLeadership = (state) => state.home.leadership;
export const selectPartnerStats = (state) => state.home.partnerStats;
export const selectBranches = (state) => state.home.branches;
export const selectContactForm = (state) => state.home.contactForm;
export const selectHomeLoading = (state) => state.home.isLoading;
export const selectHomeError = (state) => state.home.error;
export const selectLastUpdated = (state) => state.home.lastUpdated;

// Actions
export const {
  updateContactForm,
  clearContactForm,
  clearError,
  updateHeroData,
  updateOffers,
  updateLeadership,
  setLastUpdated
} = homeSlice.actions;

// Reducer
export default homeSlice.reducer;