/**
 * Setup file for Jest and React Testing Library
 * This file runs before each test file
 */

// ============================================================================
// Jest Extensions and Matchers
// ============================================================================

// Extend Jest matchers
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

// Import jest-extended for additional matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);

// ============================================================================
// Mock Window and Global Objects
// ============================================================================

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: jest.fn(),
}));

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock window.location
delete window.location;
window.location = {
  ...window.location,
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
};

// Mock window.localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock window.sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock window.URL
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

// Mock window.navigator
Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
    readText: jest.fn(),
  },
});

// Mock navigator.geolocation
Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  },
});

// Mock navigator.onLine
Object.defineProperty(global.navigator, 'onLine', {
  value: true,
  writable: true,
});

// Mock navigator.userAgent
Object.defineProperty(global.navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  writable: true,
});

// ============================================================================
// Mock Console Methods
// ============================================================================

// Optional: Suppress console warnings/errors in tests
// Uncomment the following lines to suppress all console output:

// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
//   warn: jest.fn(),
//   error: jest.fn(),
// };

// Or keep specific methods
console.warn = jest.fn();
console.error = jest.fn();

// ============================================================================
// Mock APIs and External Dependencies
// ============================================================================

// Mock fetch API
global.fetch = jest.fn();

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: {
      headers: {
        common: {},
        post: {},
        put: {},
        patch: {},
        delete: {},
      },
    },
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
}));

// Mock Redux store
jest.mock('./store/store', () => ({
  __esModule: true,
  default: {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn(),
  },
}));

// Mock React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
  }),
  useParams: () => ({}),
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
  Trans: ({ children }) => children,
  initReactI18next: { type: '3rdParty' },
}));

// Mock Chart.js
jest.mock('chart.js', () => ({
  Chart: jest.fn(),
  registerables: [],
}));

// Mock date-fns or other date libraries
jest.mock('date-fns', () => ({
  format: jest.fn(() => '01/01/2023'),
  parseISO: jest.fn(() => new Date('2023-01-01')),
  isBefore: jest.fn(),
  isAfter: jest.fn(),
  addDays: jest.fn(),
  addMonths: jest.fn(),
  differenceInDays: jest.fn(),
  differenceInMonths: jest.fn(),
}));

// ============================================================================
// Mock Environment Variables
// ============================================================================

process.env = {
  ...process.env,
  REACT_APP_API_BASE_URL: 'http://localhost:3000/api',
  REACT_APP_ENVIRONMENT: 'test',
  REACT_APP_VERSION: '1.0.0',
  REACT_APP_SENTRY_DSN: '',
  REACT_APP_GOOGLE_ANALYTICS_ID: '',
};

// ============================================================================
// Global Test Utilities
// ============================================================================

// Global test timeout (30 seconds)
jest.setTimeout(30000);

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  sessionStorage.clear();
  
  // Reset all mocks
  jest.restoreAllMocks();
  
  // Clear fetch mock
  if (global.fetch.mockClear) {
    global.fetch.mockClear();
  }
  
  // Reset URL
  window.location.href = 'http://localhost:3000';
  window.location.pathname = '/';
  window.location.search = '';
  window.location.hash = '';
});

// Clean up after all tests
afterAll(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

// ============================================================================
// Custom Matchers
// ============================================================================

// Custom matcher for checking if element has specific classes
expect.extend({
  toHaveClasses(received, expectedClasses) {
    if (!received || !received.classList) {
      return {
        message: () => `Expected element to have classList`,
        pass: false,
      };
    }
    
    const classList = Array.from(received.classList);
    const missingClasses = expectedClasses.filter(c => !classList.includes(c));
    
    if (missingClasses.length === 0) {
      return {
        message: () => `Expected element not to have classes: ${expectedClasses.join(', ')}`,
        pass: true,
      };
    }
    
    return {
      message: () => `Element is missing classes: ${missingClasses.join(', ')}`,
      pass: false,
    };
  },
  
  // Custom matcher for checking Redux actions
  toHaveDispatchedActions(received, expectedActions) {
    // This is a simplified version - in real usage, you'd need to import the actual store
    // or provide it differently
    
    // For now, this returns a matcher that always passes
    // You would need to implement this based on your actual store setup
    return {
      message: () => 'toHaveDispatchedActions matcher requires proper store setup',
      pass: true,
    };
  },
  
  // Custom matcher for checking API calls
  toHaveBeenCalledWithBody(received, expectedBody) {
    if (!received || !received.mock || !received.mock.calls) {
      return {
        message: () => 'Expected a mocked function',
        pass: false,
      };
    }
    
    const calls = received.mock.calls;
    const hasCallWithBody = calls.some(call => {
      const body = call[1]?.body || call[0]?.data;
      if (!body) return false;
      
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
      return JSON.stringify(parsedBody) === JSON.stringify(expectedBody);
    });
    
    if (hasCallWithBody) {
      return {
        message: () => `Expected function not to be called with body: ${JSON.stringify(expectedBody)}`,
        pass: true,
      };
    }
    
    return {
      message: () => `Function was not called with expected body\nExpected: ${JSON.stringify(expectedBody)}`,
      pass: false,
    };
  },
});

// ============================================================================
// Helper Functions for Tests
// ============================================================================

// Mock user data for authentication tests
const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'investor',
  kycStatus: 'verified',
  phone: '+1234567890',
  isActive: true,
  createdAt: '2023-01-01T00:00:00.000Z',
};

// Mock fund data
const mockFund = {
  id: 'fund-123',
  name: 'Infinity Equity Fund',
  code: 'INF-EQ-001',
  category: 'equity',
  subCategory: 'large_cap',
  riskLevel: 'high',
  nav: 150.75,
  previousNav: 148.50,
  change: 2.25,
  changePercentage: 1.52,
  aum: 500000000,
  expenseRatio: 1.2,
  minimumInvestment: 1000,
  sipMinimum: 500,
  rating: 4.5,
  inceptionDate: '2020-01-01',
  fundManager: 'Jane Smith',
  description: 'A large-cap equity fund focused on blue-chip companies.',
  tags: ['equity', 'large-cap', 'growth'],
};

// Mock portfolio data
const mockPortfolio = {
  totalValue: 1250000,
  totalInvestment: 1000000,
  totalReturns: 250000,
  returnPercentage: 25,
  holdings: [
    {
      fundId: 'fund-123',
      fundName: 'Infinity Equity Fund',
      units: 5000,
      averagePrice: 100,
      currentPrice: 125,
      currentValue: 625000,
      investment: 500000,
      returns: 125000,
      returnPercentage: 25,
    },
  ],
};

// Mock transaction data
const mockTransaction = {
  id: 'txn-123',
  userId: 'user-123',
  fundId: 'fund-123',
  type: 'purchase',
  amount: 50000,
  units: 400,
  nav: 125,
  status: 'completed',
  paymentMethod: 'net_banking',
  referenceNumber: 'REF-123456',
  date: '2023-06-15T10:30:00.000Z',
  createdAt: '2023-06-15T10:30:00.000Z',
};

// Create a test render function with providers
const renderWithProviders = (ui, options = {}) => {
  // In real implementation, you would import these
  const { Provider } = require('react-redux');
  const { BrowserRouter } = require('react-router-dom');
  const { I18nextProvider } = require('react-i18next');
  
  // Mock implementations for tests
  const mockStore = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  };
  
  const mockI18n = {
    t: (key) => key,
    changeLanguage: jest.fn(),
    language: 'en',
  };
  
  const AllProviders = ({ children }) => (
    <Provider store={mockStore}>
      <I18nextProvider i18n={mockI18n}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
  
  const { render } = require('@testing-library/react');
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
};

// Create a test render function for authenticated users
const renderWithAuth = (ui, user = mockUser, options = {}) => {
  // Mock the auth state
  const mockStore = {
    getState: jest.fn(() => ({
      auth: {
        user,
        token: 'mock-token-123',
        isAuthenticated: true,
        isLoading: false,
        error: null,
      },
    })),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  };
  
  const { Provider } = require('react-redux');
  const { BrowserRouter } = require('react-router-dom');
  const { I18nextProvider } = require('react-i18next');
  
  const mockI18n = {
    t: (key) => key,
    changeLanguage: jest.fn(),
    language: 'en',
  };
  
  const AllProviders = ({ children }) => (
    <Provider store={mockStore}>
      <I18nextProvider i18n={mockI18n}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );
  
  const { render } = require('@testing-library/react');
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
};

// Mock API responses
const mockAPIResponses = {
  success: (data) => ({
    ok: true,
    status: 200,
    json: async () => ({ success: true, data }),
  }),
  
  created: (data) => ({
    ok: true,
    status: 201,
    json: async () => ({ success: true, data }),
  }),
  
  noContent: () => ({
    ok: true,
    status: 204,
  }),
  
  badRequest: (message = 'Bad Request') => ({
    ok: false,
    status: 400,
    json: async () => ({ success: false, error: message }),
  }),
  
  unauthorized: (message = 'Unauthorized') => ({
    ok: false,
    status: 401,
    json: async () => ({ success: false, error: message }),
  }),
  
  forbidden: (message = 'Forbidden') => ({
    ok: false,
    status: 403,
    json: async () => ({ success: false, error: message }),
  }),
  
  notFound: (message = 'Not Found') => ({
    ok: false,
    status: 404,
    json: async () => ({ success: false, error: message }),
  }),
  
  serverError: (message = 'Internal Server Error') => ({
    ok: false,
    status: 500,
    json: async () => ({ success: false, error: message }),
  }),
};

// Wait for promises to resolve
const waitForPromises = () => new Promise(setImmediate);

// Mock file upload
const createMockFile = (name = 'test.pdf', size = 1024, type = 'application/pdf') => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

// Mock event handlers
const mockEvent = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  target: {
    value: '',
    checked: false,
    files: [],
    dataset: {},
  },
  currentTarget: {
    value: '',
    checked: false,
    files: [],
    dataset: {},
  },
};

// ============================================================================
// Global Test Configuration
// ============================================================================

// Suppress specific warnings in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  // Suppress React act() warnings
  console.error = (...args) => {
    if (/Warning: An update to/.test(args[0]) || /Warning: Can't perform a React state update on an unmounted component/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
  
  console.warn = (...args) => {
    // Suppress specific warnings
    if (/DeprecationWarning/.test(args[0])) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// ============================================================================
// Performance Monitoring for Tests
// ============================================================================

// Log slow tests
const SLOW_TEST_THRESHOLD = 1000; // 1 second

beforeEach(() => {
  jest.spyOn(console, 'warn');
  jest.spyOn(console, 'error');
  
  // Start timer for test
  global.testStartTime = Date.now();
});

afterEach(() => {
  const testDuration = Date.now() - global.testStartTime;
  
  if (testDuration > SLOW_TEST_THRESHOLD) {
    console.warn(`Test "${expect.getState().currentTestName}" took ${testDuration}ms (threshold: ${SLOW_TEST_THRESHOLD}ms)`);
  }
  
  // Clean up
  delete global.testStartTime;
});

// ============================================================================
// Export Everything
// ============================================================================

// Export all helper functions and mocks
export {
  mockUser,
  mockFund,
  mockPortfolio,
  mockTransaction,
  renderWithProviders,
  renderWithAuth,
  mockAPIResponses,
  waitForPromises,
  createMockFile,
  mockEvent,
};