import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// English translations
const en = {
  translation: {
    // Common
    welcome: "Welcome",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    search: "Search",
    filter: "Filter",
    clear: "Clear",
    apply: "Apply",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    submit: "Submit",
    reset: "Reset",
    close: "Close",
    
    // Navigation
    home: "Home",
    dashboard: "Dashboard",
    portfolio: "Portfolio",
    funds: "Funds",
    goals: "Goals",
    transactions: "Transactions",
    reports: "Reports",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    login: "Login",
    register: "Register",
    about: "About",
    contact: "Contact",
    
    // Auth
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot Password?",
    rememberMe: "Remember Me",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    resetPassword: "Reset Password",
    
    // Investor
    myPortfolio: "My Portfolio",
    investmentGoals: "Investment Goals",
    sipCalculator: "SIP Calculator",
    watchlist: "Watchlist",
    assetAllocation: "Asset Allocation",
    performance: "Performance",
    
    // Admin
    userManagement: "User Management",
    systemConfig: "System Configuration",
    auditLogs: "Audit Logs",
    platformStats: "Platform Statistics",
    
    // Advisor
    clients: "Clients",
    recommendations: "Recommendations",
    clientMeetings: "Client Meetings",
    revenue: "Revenue",
    
    // Messages
    success: "Success!",
    error: "Error!",
    warning: "Warning!",
    info: "Information",
    savedSuccessfully: "Saved successfully",
    deletedSuccessfully: "Deleted successfully",
    updatedSuccessfully: "Updated successfully",
    areYouSure: "Are you sure?",
    thisActionCannotBeUndone: "This action cannot be undone",
    
    // Validation
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    passwordMinLength: "Password must be at least 8 characters",
    passwordsDontMatch: "Passwords don't match",
    
    // Dashboard
    totalInvestment: "Total Investment",
    currentValue: "Current Value",
    returns: "Returns",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
    allTime: "All Time",
  }
}

// Hindi translations
const hi = {
  translation: {
    welcome: "स्वागत है",
    loading: "लोड हो रहा है...",
    home: "होम",
    dashboard: "डैशबोर्ड",
    portfolio: "पोर्टफोलियो",
    funds: "फंड",
    login: "लॉगिन",
    register: "पंजीकरण",
    about: "के बारे में",
    contact: "संपर्क करें",
    email: "ईमेल",
    password: "पासवर्ड",
  }
}

// Gujarati translations
const gu = {
  translation: {
    welcome: "સ્વાગત છે",
    loading: "લોડ કરી રહ્યું છે...",
    home: "હોમ",
    dashboard: "ડેશબોર્ડ",
    portfolio: "પોર્ટફોલિયો",
    funds: "ફંડ",
    login: "લૉગિન",
    register: "નોંધણી",
    about: "વિશે",
    contact: "સંપર્ક કરો",
    email: "ઈમેલ",
    password: "પાસવર્ડ",
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      hi: hi,
      gu: gu,
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'gu'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n