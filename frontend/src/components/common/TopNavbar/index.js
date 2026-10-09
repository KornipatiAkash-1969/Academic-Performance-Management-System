import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './index.css';

function TopNavbar({ onToggleMobile, onToggleCollapse, isCollapsed, role: propRole, user: propUser, title }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Load user
  let user = propUser;
  if (!user) {
    try {
      const userStr = localStorage.getItem('user');
      user = userStr ? JSON.parse(userStr) : {};
    } catch {
      user = {};
    }
  }

  const role = propRole || user.role || 'student';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Derive dynamic page title if not explicitly passed
  const getPageTitle = () => {
    if (title) return title;
    const path = location.pathname;
    const titles = {
      '/': 'Dashboard',
      '/teacher-dashboard': 'Dashboard',
      '/subjects': 'Subjects Management',
      '/teacher-students': 'Students List',
      '/add-student': 'Add Student',
      '/add-marks': 'Add Marks',
      '/student-dashboard': 'Dashboard',
      '/student-subjects': 'My Subjects',
      '/student-marks': 'Marks & Performance',
      '/coordinator-dashboard': 'Dashboard',
      '/create-teacher': 'Create Teacher',
      '/coordinator-notes': 'Notes & Announcements',
      '/my-account': 'My Account'
    };
    return titles[path] || 'Portal';
  };

  const roleBadges = {
    teacher: { label: 'Teacher', emoji: '👨‍🏫' },
    student: { label: 'Student', emoji: '👨‍🎓' },
    coordinator: { label: 'Coordinator', emoji: '👨‍💼' }
  };

  const roleConfig = roleBadges[role] || roleBadges.student;

  return (
    <header className={`top-navbar role-${role}`} aria-label="Top Navigation">
      {/* LEFT: HAMBURGER & PAGE BREADCRUMB */}
      <div className="navbar-left">
        {/* MOBILE HAMBURGER BUTTON (Slides sidebar open) */}
        <button
          type="button"
          className="navbar-hamburger-btn mobile-only"
          onClick={onToggleMobile}
          aria-label="Open navigation sidebar"
          title="Open menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* DESKTOP TOGGLE BUTTON (Collapses / expands sidebar) */}
        <button
          type="button"
          className="navbar-hamburger-btn desktop-only"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <div className="navbar-title-group">
          <span className="portal-pill">
            <span className="portal-pill-emoji">{roleConfig.emoji}</span>
            <span className="portal-pill-text">{roleConfig.label}</span>
          </span>
          <span className="title-separator">/</span>
          <h1 className="navbar-page-title">{getPageTitle()}</h1>
        </div>
      </div>

      {/* RIGHT: USER INFO CHIP & QUICK LOGOUT */}
      <div className="navbar-right">
        <Link to="/my-account" className="navbar-user-chip" title="View & edit My Account">
          <div className="user-chip-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : roleConfig.label.charAt(0)}
          </div>
          <div className="user-chip-details">
            <span className="user-chip-name">{user.name || 'User'}</span>
            <span className="user-chip-role">{roleConfig.label}</span>
          </div>
        </Link>

        <button
          type="button"
          className="navbar-logout-btn"
          onClick={handleLogout}
          title="Logout of session"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
