import './index.css';

import {
  Link
} from 'react-router-dom';

function CoordinatorHeader() {

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="coordinator-header">
      {/* LOGO */}
      <div className="coordinator-logo">
        Coordinator Portal
      </div>

      {/* LINKS */}
      <div className="coordinator-links">
        <Link to="/coordinator-dashboard">
          Dashboard
        </Link>

        <Link to="/create-teacher">
          Create Teacher
        </Link>

        <Link to="/coordinator-notes">
          Notes
        </Link>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default CoordinatorHeader;