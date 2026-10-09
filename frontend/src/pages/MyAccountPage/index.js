import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/common/DashboardLayout';
import { getProfile, updateProfile, changePassword } from '../../services/authService';
import './index.css';

function MyAccountPage() {
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : {};
    } catch {
      return {};
    }
  });

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'security'

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || ''
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });

  // Password Form State
  const [passData, setPassData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Fetch freshest profile from server on load
  useEffect(() => {
    loadFreshProfile();
  }, []);

  const loadFreshProfile = async () => {
    try {
      const res = await getProfile();
      if (res && res.success && res.user) {
        setUser(res.user);
        setProfileData({
          name: res.user.name || '',
          email: res.user.email || ''
        });
        localStorage.setItem('user', JSON.stringify(res.user));
      }
    } catch (err) {
      console.warn('Could not refresh profile from server, using local data:', err);
    }
  };

  // Handle Profile Update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: '', text: '' });
    setProfileLoading(true);

    try {
      const res = await updateProfile(profileData);
      if (res && res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
        setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setProfileMsg({ type: 'error', text: res?.message || 'Failed to update profile' });
      }
    } catch (err) {
      setProfileMsg({
        type: 'error',
        text: err.response?.data?.message || 'Error updating profile'
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Password Change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassMsg({ type: '', text: '' });

    if (passData.newPassword !== passData.confirmPassword) {
      setPassMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passData.newPassword.length < 6) {
      setPassMsg({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    setPassLoading(true);
    try {
      const res = await changePassword({
        currentPassword: passData.currentPassword,
        newPassword: passData.newPassword
      });

      if (res && res.success) {
        setPassMsg({ type: 'success', text: 'Password changed successfully!' });
        setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPassMsg({ type: 'error', text: res?.message || 'Failed to change password' });
      }
    } catch (err) {
      setPassMsg({
        type: 'error',
        text: err.response?.data?.message || 'Incorrect current password or server error'
      });
    } finally {
      setPassLoading(false);
    }
  };

  const roleMeta = {
    teacher: { label: 'Teacher', emoji: '👨‍🏫', color: '#2563EB', bg: '#EFF6FF' },
    student: { label: 'Student', emoji: '👨‍🎓', color: '#059669', bg: '#ECFDF5' },
    coordinator: { label: 'Coordinator', emoji: '👨‍💼', color: '#4F46E5', bg: '#EEF2FF' }
  };

  const currentRole = roleMeta[user.role] || roleMeta.student;

  return (
    <DashboardLayout role={user.role} title="My Account">
      <div className="account-page-container">
        {/* HEADER HERO CARD */}
        <div className="account-hero-card">
          <div className="account-avatar-wrap">
            <div className="account-avatar-large">
              {user.name ? user.name.charAt(0).toUpperCase() : currentRole.label.charAt(0)}
            </div>
            <span className="account-status-dot" title="Active Account"></span>
          </div>

          <div className="account-hero-info">
            <div className="hero-name-row">
              <h2>{user.name || 'User Name'}</h2>
              <span
                className="account-role-badge"
                style={{ backgroundColor: currentRole.bg, color: currentRole.color }}
              >
                {currentRole.emoji} {currentRole.label}
              </span>
            </div>
            <p className="account-hero-meta">
              <span>{user.email || 'user@example.com'}</span>
              <span className="dot-divider">•</span>
              <span>ID: <strong>{user.student_id || `ID-${user.id}`}</strong></span>
              <span className="dot-divider">•</span>
              <span className="status-text">Status: <strong>Active</strong></span>
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="account-tabs-bar">
          <button
            type="button"
            className={`account-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Personal Details
          </button>
          <button
            type="button"
            className={`account-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Security & Password
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="account-body-grid">
          {/* LEFT: MAIN FORM */}
          <div className="account-form-section">
            {activeTab === 'profile' ? (
              /* ================= PROFILE FORM ================= */
              <div className="account-card">
                <div className="card-header">
                  <h3>Edit Profile Details</h3>
                  <p>Update your personal information and contact email</p>
                </div>

                {profileMsg.text && (
                  <div className={`alert-box ${profileMsg.type}`}>
                    {profileMsg.type === 'success' ? '✓ ' : '⚠ '}
                    {profileMsg.text}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      placeholder="Enter your email address"
                      required
                    />
                    <small>Used for logging into your account</small>
                  </div>

                  <div className="form-group">
                    <label>Portal ID (Assigned by Administration)</label>
                    <input
                      type="text"
                      value={user.student_id || `ID-${user.id}`}
                      disabled
                      className="disabled-input"
                    />
                    <small>Official ID identifier (read-only)</small>
                  </div>

                  <div className="form-group">
                    <label>Assigned Portal Role</label>
                    <input
                      type="text"
                      value={currentRole.label}
                      disabled
                      className="disabled-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="account-submit-btn"
                    disabled={profileLoading}
                  >
                    {profileLoading ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            ) : (
              /* ================= SECURITY & PASSWORD FORM ================= */
              <div className="account-card">
                <div className="card-header">
                  <h3>Change Password</h3>
                  <p>Ensure your account is using a long and secure password</p>
                </div>

                {passMsg.text && (
                  <div className={`alert-box ${passMsg.type}`}>
                    {passMsg.type === 'success' ? '✓ ' : '⚠ '}
                    {passMsg.text}
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <div className="input-password-wrap">
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        value={passData.currentPassword}
                        onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                        placeholder="Enter your current password"
                        required
                      />
                      <button
                        type="button"
                        className="toggle-pass-btn"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                      >
                        {showCurrentPass ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>New Password</label>
                    <div className="input-password-wrap">
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        value={passData.newPassword}
                        onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                        placeholder="At least 6 characters"
                        required
                      />
                      <button
                        type="button"
                        className="toggle-pass-btn"
                        onClick={() => setShowNewPass(!showNewPass)}
                      >
                        {showNewPass ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passData.confirmPassword}
                      onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                      placeholder="Repeat new password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="account-submit-btn"
                    disabled={passLoading}
                  >
                    {passLoading ? 'Updating Password...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT: QUICK INFO & SUMMARY */}
          <div className="account-sidebar-info">
            <div className="info-summary-card">
              <h4>Account Information</h4>
              <ul className="info-list">
                <li>
                  <span className="info-label">Account Role</span>
                  <span className="info-val">{currentRole.label}</span>
                </li>
                <li>
                  <span className="info-label">Member ID</span>
                  <span className="info-val">{user.student_id || user.id}</span>
                </li>
                <li>
                  <span className="info-label">Account Security</span>
                  <span className="info-val" style={{ color: '#059669', fontWeight: 'bold' }}>Protected 🔒</span>
                </li>
              </ul>
            </div>

            <div className="quick-shortcuts-card">
              <h4>Quick Shortcuts</h4>
              <div className="shortcuts-links">
                <Link to="/" className="shortcut-btn">
                  📊 Go to Dashboard
                </Link>
                {user.role === 'teacher' && (
                  <>
                    <Link to="/subjects" className="shortcut-btn">
                      📚 Manage Subjects
                    </Link>
                    <Link to="/teacher-students" className="shortcut-btn">
                      👥 Students List
                    </Link>
                    <Link to="/add-marks" className="shortcut-btn">
                      📝 Add Marks
                    </Link>
                  </>
                )}
                {user.role === 'student' && (
                  <>
                    <Link to="/student-subjects" className="shortcut-btn">
                      📚 My Subjects
                    </Link>
                    <Link to="/student-marks" className="shortcut-btn">
                      📈 My Marks & Grades
                    </Link>
                  </>
                )}
                {user.role === 'coordinator' && (
                  <>
                    <Link to="/create-teacher" className="shortcut-btn">
                      👨‍🏫 Create Teacher
                    </Link>
                    <Link to="/coordinator-notes" className="shortcut-btn">
                      📢 Announcements
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MyAccountPage;
