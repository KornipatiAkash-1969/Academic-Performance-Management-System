import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import TopNavbar from '../TopNavbar';
import './index.css';

function DashboardLayout({ children, role: propRole, title }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const location = useLocation();

  // Load user
  let user = {};
  try {
    const userStr = localStorage.getItem('user');
    user = userStr ? JSON.parse(userStr) : {};
  } catch {
    user = {};
  }

  const role = propRole || user.role || 'student';

  // Toggle collapse and persist preference
  const handleToggleCollapse = () => {
    setDesktopCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebar_collapsed', String(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock mobile body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <div className={`app-layout theme-${role} ${desktopCollapsed ? 'layout-collapsed' : ''}`}>
      {/* MOBILE BACKDROP OVERLAY */}
      <div
        className={`sidebar-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* SIDEBAR (SLIDE BAR) */}
      <Sidebar
        isOpen={mobileOpen}
        isCollapsed={desktopCollapsed}
        onClose={() => setMobileOpen(false)}
        toggleCollapse={handleToggleCollapse}
        role={role}
        user={user}
      />

      {/* MAIN WRAPPER */}
      <div className="layout-main-wrapper">
        <TopNavbar
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
          onToggleCollapse={handleToggleCollapse}
          isCollapsed={desktopCollapsed}
          role={role}
          user={user}
          title={title}
        />

        <main className="layout-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
