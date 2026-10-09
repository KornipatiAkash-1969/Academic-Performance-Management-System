import './index.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';

function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('teacher');
  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState({
    email: 'teacher@example.com',
    password: '123456'
  });

  const demoAccounts = [
    {
      role: 'teacher',
      label: 'Teacher',
      icon: '👨‍🏫',
      email: 'teacher@example.com',
      password: '123456',
      accentColor: '#2563EB',
      gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)'
    },
    {
      role: 'student',
      label: 'Student',
      icon: '👨‍🎓',
      email: 'student@example.com',
      password: '123456',
      accentColor: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #047857)'
    },
    {
      role: 'coordinator',
      label: 'Coordinator',
      icon: '👨‍💼',
      email: 'coordinator@example.com',
      password: '123456',
      accentColor: '#7C3AED',
      gradient: 'linear-gradient(135deg, #7C3AED, #6D28D9)'
    }
  ];

  const currentRoleConfig =
    demoAccounts.find((account) => account.role === selectedRole) ||
    demoAccounts[0];

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

      // Remember the email when requested.
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
        'Unable to sign in. Please check your email and password.';

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wide-container">
      <div className="login-wide-card">

        {/* LEFT PANEL: ACADEMIC BRANDING */}
        <div className="login-hero-panel">
          <div className="hero-content">

            <div className="hero-top-badge">
              <span className="hero-badge-icon">🎓</span>
              <span>ACADEMIC PERFORMANCE MANAGEMENT SYSTEM</span>
            </div>

            <h1 className="hero-heading">
              Track Progress. Achieve Excellence.
            </h1>

            <p className="hero-tagline">
              A unified academic platform designed to simplify student
              performance tracking, assessment management, grade calculation,
              and academic communication.
            </p>

            {/* PLATFORM FEATURES */}
            <div className="hero-features-list">

              <div className="feature-item">
                <div className="feature-icon-box">📊</div>

                <div>
                  <h4>Performance Analytics</h4>
                  <p>
                    Monitor subject-wise marks, percentages, grades, and
                    academic progress.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">👨‍🏫</div>

                <div>
                  <h4>Dedicated User Portals</h4>
                  <p>
                    Personalized dashboards for students, teachers, and
                    academic coordinators.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">📢</div>

                <div>
                  <h4>Academic Announcements</h4>
                  <p>
                    Share important notices and updates with students and
                    faculty.
                  </p>
                </div>
              </div>

            </div>

            {/* SYSTEM STATUS */}
            <div className="hero-footer-status">
              <span className="status-dot"></span>
              <span>Academic Management Portal</span>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: LOGIN FORM */}
        <div className="login-form-panel">

          <div className="form-panel-header">
            <h2>Welcome Back!</h2>
            <p>
              Sign in to access your academic dashboard and manage your
              activities.
            </p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="role-pills-bar">
            {demoAccounts.map((account) => (
              <button
                type="button"
                key={account.role}
                onClick={() => handleSelectRole(account)}
                className={`role-pill-btn ${selectedRole === account.role ? 'active' : ''
                  }`}
                style={
                  selectedRole === account.role
                    ? {
                      borderColor: account.accentColor,
                      backgroundColor: `${account.accentColor}12`,
                      color: account.accentColor
                    }
                    : {}
                }
              >
                <span className="role-pill-icon">{account.icon}</span>
                <span className="role-pill-name">{account.label}</span>
              </button>
            ))}
          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="form-error-alert" role="alert">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form
            className="login-fields-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL ADDRESS */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <div className="input-wrap">
                <span className="input-icon">✉️</span>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrap">
                <span className="input-icon">🔒</span>

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {/* LOGIN OPTIONS */}
            <div className="form-options">
              <label className="remember-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span>Remember me</span>
              </label>

              <span className="pass-pill">
                Demo password: <code>123456</code>
              </span>
            </div>

            {/* SIGN-IN BUTTON */}
            <button
              type="submit"
              className="login-action-btn"
              disabled={loading}
              style={{
                background: currentRoleConfig.gradient,
                boxShadow: `0 4px 14px ${currentRoleConfig.accentColor}35`
              }}
            >
              {loading
                ? 'Signing in...'
                : `Sign In as ${currentRoleConfig.label} →`}
            </button>

          </form>

          {/* DEMO ACCOUNT SHORTCUTS */}
          <div className="demo-accounts-bar">
            <span className="demo-bar-label">Demo Accounts:</span>

            <div className="demo-chips-row">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  className={`quick-chip ${selectedRole === account.role ? 'active' : ''
                    }`}
                  onClick={() => handleSelectRole(account)}
                  title={`Switch to ${account.label}`}
                >
                  <span>{account.icon}</span>
                  <span>{account.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="login-footer">
            <p>
              Secure access to your academic workspace.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginForm;
