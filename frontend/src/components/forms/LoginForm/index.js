import './index.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';

function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('coordinator');
  const [rememberMe, setRememberMe] = useState(true);

  const demoAccounts = [
    {
      role: 'coordinator',
      label: 'Coordinator',
      sublabel: 'Full Access',
      email: 'coordinator@example.com',
      password: '123456',
      placeholder: 'coordinator@example.com',
      accentColor: '#4F46E5',
      accentLight: '#EEF2FF',
      gradient: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #4338CA 100%)',
      glow: 'rgba(79, 70, 229, 0.35)'
    },
    {
      role: 'teacher',
      label: 'Teacher',
      sublabel: 'Faculty Portal',
      email: 'teacher@example.com',
      password: '123456',
      placeholder: 'teacher@example.com',
      accentColor: '#2563EB',
      accentLight: '#EFF6FF',
      gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #1D4ED8 100%)',
      glow: 'rgba(37, 99, 235, 0.35)'
    },
    {
      role: 'student',
      label: 'Student',
      sublabel: 'Learner Portal',
      email: 'student@example.com',
      password: '123456',
      placeholder: 'student@example.com',
      accentColor: '#059669',
      accentLight: '#ECFDF5',
      gradient: 'linear-gradient(135deg, #059669 0%, #10B981 50%, #047857 100%)',
      glow: 'rgba(5, 150, 105, 0.35)'
    }
  ];

  const currentRoleConfig =
    demoAccounts.find((account) => account.role === selectedRole) ||
    demoAccounts[0];

  // Start with empty or remembered email so the placeholder is clearly displayed
  const [formData, setFormData] = useState({
    email: localStorage.getItem('remembered_email') || '',
    password: ''
  });

  const handleSelectRole = (account) => {
    setSelectedRole(account.role);
    setFormData({
      email: account.email,
      password: account.password
    });
    setErrorMessage('');
  };

  const handleChange = (e) => {
    setErrorMessage('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await loginUser(formData);

      // Save authentication token and user details.
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      if (rememberMe) {
        localStorage.setItem('remembered_email', formData.email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      // Redirect users directly to Dashboard at /
      navigate('/');
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Unable to sign in. Please verify your email and password.';
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wide-container">
      <div className="login-wide-card">

        {/* LEFT PANEL: HERO BRANDING */}
        <div className="login-hero-panel">
          <div className="hero-decor-circle circle-1"></div>
          <div className="hero-decor-circle circle-2"></div>
          <div className="hero-grid-pattern"></div>

          <div className="hero-content">
            {/* BRAND BADGE */}
            <div className="hero-top-badge">
              <svg className="hero-badge-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              <span>ACADEMIC PERFORMANCE MANAGEMENT</span>
            </div>

            {/* HEADLINE */}
            <div className="hero-headline-group">
              <h1 className="hero-heading">
                Smart Academic Analytics & Portal
              </h1>
              <p className="hero-tagline">
                Centralized academic intelligence platform for real-time grade calculations, marks management, student tracking, and faculty coordination.
              </p>
            </div>

            {/* LIVE PREVIEW WIDGET */}
            <div className="hero-mini-widget">
              <div className="widget-header">
                <div className="widget-dot-row">
                  <span className="dot dot-green"></span>
                  <span className="widget-live-label">LIVE SYSTEM METRICS</span>
                </div>
                <span className="widget-pill">Active Session</span>
              </div>
              <div className="widget-stats-grid">
                <div className="widget-stat-card">
                  <span className="stat-value">3 Roles</span>
                  <span className="stat-desc">Role-Gated Portals</span>
                </div>
                <div className="widget-stat-card">
                  <span className="stat-value">Instant</span>
                  <span className="stat-desc">GPA & Marks Sync</span>
                </div>
                <div className="widget-stat-card">
                  <span className="stat-value">100%</span>
                  <span className="stat-desc">Secure JWT Auth</span>
                </div>
              </div>
            </div>

            {/* VALUE PROPOSITIONS */}
            <div className="hero-features-list">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V10M12 20V4M6 20v-6"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Automated Grading & Performance</h4>
                  <p>Real-time computation of totals, percentages, and performance tiers.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Role-Based Access Control</h4>
                  <p>Dedicated workspaces tailored for Coordinators, Teachers, and Students.</p>
                </div>
              </div>
            </div>

            {/* SYSTEM STATUS FOOTER */}
            <div className="hero-footer-status">
              <div className="status-indicator">
                <span className="status-pulse-dot"></span>
                <span>System Operational • Node & SQLite Engine</span>
              </div>
              <span className="version-tag">v2.4 Enterprise</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: LOGIN FORM */}
        <div className="login-form-panel">

          {/* MOBILE BRAND HEADER (Visible on small screens) */}
          <div className="mobile-brand-banner">
            <div className="mobile-logo-badge">🎓 APMS Portal</div>
            <h2>Sign In to Portal</h2>
            <p>Access your academic workspace</p>
          </div>

          {/* DESKTOP HEADER */}
          <div className="form-panel-header">
            <div className="header-eyebrow">
              <span className="eyebrow-line"></span>
              <span>AUTHENTICATION</span>
            </div>
            <h2>Welcome Back</h2>
            <p>Select your portal role and sign in to manage your academic workspace.</p>
          </div>

          {/* ROLE SELECTOR TABS */}
          <div className="role-selector-section">
            <label className="section-label">SELECT PORTAL ROLE</label>
            <div className="role-pills-bar">
              {demoAccounts.map((account) => {
                const isActive = selectedRole === account.role;
                return (
                  <button
                    type="button"
                    key={account.role}
                    onClick={() => handleSelectRole(account)}
                    className={`role-pill-btn ${isActive ? 'active' : ''}`}
                    style={
                      isActive
                        ? {
                            borderColor: account.accentColor,
                            color: account.accentColor,
                            backgroundColor: account.accentLight,
                            boxShadow: `0 3px 12px ${account.glow}`
                          }
                        : {}
                    }
                  >
                    <span className="role-pill-dot" style={{ backgroundColor: account.accentColor }}></span>
                    <span className="role-pill-name">{account.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ERROR ALERT */}
          {errorMessage && (
            <div className="form-error-alert" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN FORM FIELDS */}
          <form className="login-fields-form" onSubmit={handleSubmit} noValidate>

            {/* EMAIL FIELD */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address
                <span className="active-role-tag" style={{ color: currentRoleConfig.accentColor }}>
                  ({currentRoleConfig.label})
                </span>
              </label>
              <div className="input-box">
                <span className="input-box-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="input-box-field"
                  placeholder={currentRoleConfig.placeholder || 'coordinator@example.com'}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <span className="hint-pill">Default: <code>123456</code></span>
              </div>
              <div className="input-box">
                <span className="input-box-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="input-box-field"
                  placeholder="Enter password (e.g. 123456)"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* FORM OPTIONS */}
            <div className="form-options-row">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Keep me signed in</span>
              </label>

              <span className="secure-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Encrypted
              </span>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="login-action-btn"
              disabled={loading}
              style={{
                background: currentRoleConfig.gradient,
                boxShadow: `0 6px 20px ${currentRoleConfig.glow}`
              }}
            >
              {loading ? (
                <span className="btn-loading-state">
                  <svg className="btn-spinner" width="18" height="18" viewBox="0 0 24 24">
                    <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.3"></circle>
                    <path className="spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                <span className="btn-text-state">
                  <span>Sign In as {currentRoleConfig.label}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* QUICK CREDENTIAL CHIPS */}
          <div className="quick-fill-section">
            <span className="quick-fill-label">Quick autofill:</span>
            <div className="quick-fill-chips">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  className={`quick-chip ${selectedRole === account.role ? 'active' : ''}`}
                  onClick={() => handleSelectRole(account)}
                  title={`Fill ${account.label} credentials`}
                >
                  <span className="chip-role-dot" style={{ backgroundColor: account.accentColor }}></span>
                  <span className="chip-name">{account.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="login-footer-info">
            <p>Protected by Academic Performance Access Management • 2026</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;
