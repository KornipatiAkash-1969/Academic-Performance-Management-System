import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

// SVG Icons for maximum clarity and responsive crispness
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5"></rect>
      <rect x="14" y="3" width="7" height="5" rx="1.5"></rect>
      <rect x="14" y="12" width="7" height="9" rx="1.5"></rect>
      <rect x="3" y="16" width="7" height="5" rx="1.5"></rect>
    </svg>
  ),
  Subjects: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      <line x1="9" y1="7" x2="16" y2="7"></line>
      <line x1="9" y1="11" x2="14" y2="11"></line>
    </svg>
  ),
  Students: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  AddStudent: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <line x1="20" y1="8" x2="20" y2="14"></line>
      <line x1="23" y1="11" x2="17" y2="11"></line>
    </svg>
  ),
  AddMarks: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Marks: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10"></path>
      <path d="M12 20V4"></path>
      <path d="M6 20v-6"></path>
    </svg>
  ),
  CreateTeacher: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <circle cx="19" cy="8" r="2"></circle>
      <line x1="19" y1="13" x2="19" y2="17"></line>
    </svg>
  ),
  Notes: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Logout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Account: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Collapse: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="11 17 6 12 11 7"></polyline>
      <polyline points="18 17 13 12 18 7"></polyline>
    </svg>
  ),
  Expand: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 17 18 12 13 7"></polyline>
      <polyline points="6 17 11 12 6 7"></polyline>
    </svg>
  )
};

function Sidebar({ isOpen, isCollapsed, onClose, toggleCollapse, role: propRole, user: propUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Load user data
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

  // Role metadata and navigation links
  const roleMeta = {
    teacher: {
      portalTitle: 'Teacher Portal',
      icon: '👨‍🏫',
      badge: 'Teacher',
      links: [
        { path: '/', label: 'Dashboard', icon: Icons.Dashboard },
        { path: '/subjects', label: 'Subjects', icon: Icons.Subjects },
        { path: '/teacher-students', label: 'Students List', icon: Icons.Students },
        { path: '/add-student', label: 'Add Student', icon: Icons.AddStudent },
        { path: '/add-marks', label: 'Add Marks', icon: Icons.AddMarks },
        { path: '/my-account', label: 'My Account', icon: Icons.Account }
      ]
    },
    student: {
      portalTitle: 'Student Portal',
      icon: '👨‍🎓',
      badge: 'Student',
      links: [
        { path: '/', label: 'Dashboard', icon: Icons.Dashboard },
        { path: '/student-subjects', label: 'My Subjects', icon: Icons.Subjects },
        { path: '/student-marks', label: 'My Marks & Grades', icon: Icons.Marks },
        { path: '/my-account', label: 'My Account', icon: Icons.Account }
      ]
    },
    coordinator: {
      portalTitle: 'Coordinator Portal',
      icon: '👨‍💼',
      badge: 'Coordinator',
      links: [
        { path: '/', label: 'Dashboard', icon: Icons.Dashboard },
        { path: '/create-teacher', label: 'Create Teacher', icon: Icons.CreateTeacher },
        { path: '/coordinator-notes', label: 'Notes & Announcements', icon: Icons.Notes },
        { path: '/my-account', label: 'My Account', icon: Icons.Account }
      ]
    }
  };

  const currentRoleConfig = roleMeta[role] || roleMeta.student;

  return (
    <aside
      className={`app-sidebar role-${role} ${isOpen ? 'mobile-open' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}
      aria-label="Main Navigation"
    >
      {/* SIDEBAR HEADER / BRANDING */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-emoji" role="img" aria-label={currentRoleConfig.portalTitle}>
            {currentRoleConfig.icon}
          </span>
          {!isCollapsed && (
            <div className="brand-text">
              <span className="brand-title">{currentRoleConfig.portalTitle}</span>
              <span className="brand-badge">{currentRoleConfig.badge}</span>
            </div>
          )}
        </div>

        {/* CLOSE BUTTON (Mobile Drawer) */}
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close navigation sidebar"
        >
          <Icons.Close />
        </button>

        {/* DESKTOP COLLAPSE TOGGLE */}
        {toggleCollapse && (
          <button
            type="button"
            className="sidebar-collapse-toggle"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <Icons.Expand /> : <Icons.Collapse />}
          </button>
        )}
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="sidebar-nav">
        {!isCollapsed && (
          <div className="nav-section-label">
            MENU
          </div>
        )}
        <ul className="nav-list">
          {currentRoleConfig.links.map((link) => {
            const Icon = link.icon;
            const isDashboard = location.pathname === '/' ||
              location.pathname === '/teacher-dashboard' ||
              location.pathname === '/student-dashboard' ||
              location.pathname === '/coordinator-dashboard';
            const isActive = link.path === '/' ? isDashboard : location.pathname === link.path;
            return (
              <li key={link.path} className="nav-item">
                <NavLink
                  to={link.path}
                  onClick={onClose}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? link.label : undefined}
                >
                  <span className="nav-icon">
                    <Icon />
                  </span>
                  {!isCollapsed && (
                    <span className="nav-label">{link.label}</span>
                  )}
                  {isActive && <span className="nav-active-pill" />}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* USER PROFILE & LOGOUT FOOTER */}
      <div className="sidebar-footer">
        <NavLink
          to="/my-account"
          onClick={onClose}
          className="user-profile-card user-profile-link"
          title="Manage My Account"
        >
          <div className="user-avatar" title={user.name || 'User'}>
            {user.name ? user.name.charAt(0).toUpperCase() : currentRoleConfig.badge.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name" title={user.name || 'User'}>
                {user.name || 'Signed In'}
              </span>
              <span className="user-subtext">
                ⚙️ Manage Account
              </span>
            </div>
          )}
        </NavLink>

        <button
          type="button"
          className="sidebar-logout-btn"
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <span className="logout-icon">
            <Icons.Logout />
          </span>
          {!isCollapsed && <span className="logout-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
