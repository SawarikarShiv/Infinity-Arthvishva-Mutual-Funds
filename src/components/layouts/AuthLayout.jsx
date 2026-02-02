import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="auth-layout d-flex min-vh-100 bg-light">
      {/* Left Side: Branding/Illustration */}
      <div className="auth-brand-side d-none d-lg-flex col-lg-6 bg-primary-gradient align-items-center justify-content-center text-white p-5">
        <div className="auth-brand-content text-center">
          <div className="mb-4">
            <img 
              src="/assets/icons/logo-white.svg" 
              alt="Infinity Arthvishva" 
              className="auth-logo"
            />
          </div>
          <h1 className="display-5 fw-bold mb-4">Infinity Arthvishva</h1>
          <p className="lead opacity-85 mb-4">
            Smart Mutual Fund Investment Platform. 
            Manage your wealth with expert guidance and real-time tracking.
          </p>
          <div className="features-list text-start mt-5">
            <div className="feature-item d-flex align-items-center mb-3">
              <i className="bi bi-shield-check me-3 fs-5"></i>
              <span>Secure & Regulated Platform</span>
            </div>
            <div className="feature-item d-flex align-items-center mb-3">
              <i className="bi bi-graph-up me-3 fs-5"></i>
              <span>Real-time Portfolio Tracking</span>
            </div>
            <div className="feature-item d-flex align-items-center">
              <i className="bi bi-headset me-3 fs-5"></i>
              <span>Expert Advisory Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Authentication Forms */}
      <div className="auth-form-side col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
        <div className="auth-form-container w-100" style={{ maxWidth: '450px' }}>
          {/* Mobile Logo */}
          <div className="text-center mb-4 d-lg-none">
            <img 
              src="/assets/icons/logo.svg" 
              alt="Infinity Arthvishva Logo" 
              className="mobile-logo"
            />
          </div>
          
          {/* Form Card */}
          <div className="auth-card card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              {/* This is where Login/Register forms will appear */}
              <Outlet />
            </div>
          </div>

          {/* Footer */}
          <div className="auth-footer mt-4 text-center text-muted">
            <small>
              &copy; {currentYear} Infinity Arthvishva. All rights reserved.
              <div className="mt-2">
                <a href="/privacy" className="text-muted text-decoration-none me-3">Privacy Policy</a>
                <a href="/terms" className="text-muted text-decoration-none">Terms of Service</a>
              </div>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

// Optional: Add CSS for better styling
const styles = `
.auth-layout {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.bg-primary-gradient {
  background: linear-gradient(135deg, #4a6ee0 0%, #3a56d0 100%);
}

.auth-logo {
  width: 150px;
  height: auto;
}

.mobile-logo {
  width: 60px;
  height: auto;
}

.auth-card {
  border-radius: 16px;
  overflow: hidden;
}

.feature-item {
  font-size: 0.95rem;
}

.auth-footer {
  font-size: 0.85rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .auth-form-container {
    padding: 1rem;
  }
  
  .auth-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }
}
`;

// You can add this CSS to your global styles or create a separate AuthLayout.css file