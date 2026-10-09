import './index.css';

import {
  useState
} from 'react';

import {
  Link
} from 'react-router-dom';

import DashboardLayout from '../../components/common/DashboardLayout';

import NotesList
from '../../components/common/NotesList';

import {
  createNote
} from '../../services/noteService';

function CoordinatorDashboard() {

  const userString =
    localStorage.getItem('user');

  let user = {};

  try {
    user = userString
      ? JSON.parse(userString)
      : {};
  } catch (error) {
    console.log(error);
  }

  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target_role: 'both'
  });

  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNote(formData);
      alert('Note Posted Successfully');
      setFormData({
        title: '',
        message: '',
        target_role: 'both'
      });
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        'Failed to post note'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="coordinator" title="Coordinator Dashboard">

      {/* CONTENT */}
      <div className="dashboard-content">
        {/* TOP */}
        <div className="dashboard-top">
          <h1>Coordinator Dashboard</h1>
          <p>Manage academic coordination, teacher accounts, and broadcast notes</p>
        </div>

        {/* PROFILE CARD */}
        <div className="coordinator-card">
          <div className="coordinator-avatar">
            {user.name ? user.name.charAt(0) : 'C'}
          </div>

          <div className="coordinator-details">
            <h2>Welcome, {user.name || 'Coordinator'}</h2>
            <div className="coordinator-info-grid">
              <div className="info-box">
                <span>Coordinator ID</span>
                <h3>{user.student_id || `COR-${user.id}`}</h3>
              </div>
              <div className="info-box">
                <span>Email</span>
                <h3>{user.email || 'N/A'}</h3>
              </div>
              <div className="info-box">
                <span>Role</span>
                <h3>{user.role || 'coordinator'}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div className="dashboard-grid">
          {/* NOTES PAGE LINK */}
          <Link to="/coordinator-notes" className="dashboard-box">
            <div className="box-icon">📝</div>
            <h3>Notes Management</h3>
            <p>Post and manage notes for students, teachers, or both</p>
          </Link>

          {/* CREATE TEACHER */}
          <Link to="/create-teacher" className="dashboard-box">
            <div className="box-icon">👨‍🏫</div>
            <h3>Create Teacher</h3>
            <p>Register new teacher accounts with secure credentials</p>
          </Link>
        </div>

        {/* QUICK CREATE NOTE CARD */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '35px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ margin: '0 0 10px', color: '#0F172A', fontSize: '24px' }}>
            📢 Post Note (Student / Teacher / Both)
          </h2>
          <p style={{ color: '#64748B', marginBottom: '20px', fontSize: '15px' }}>
            Choose whether this note is for students, teachers, or both groups.
          </p>

          <form onSubmit={handleCreateNote}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0F172A' }}>
                  Note Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Note Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '15px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0F172A' }}>
                  Target Audience
                </label>
                <select
                  name="target_role"
                  value={formData.target_role}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '15px',
                    background: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="both">👥 Both (Students & Teachers)</option>
                  <option value="student">👨‍🎓 Students Only</option>
                  <option value="teacher">👨‍🏫 Teachers Only</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#0F172A' }}>
                Note Message
              </label>
              <textarea
                name="message"
                placeholder="Write the note message here..."
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#2563EB',
                color: 'white',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: '0.2s'
              }}
            >
              {loading ? 'Posting Note...' : 'Post Note'}
            </button>
          </form>
        </div>

        {/* NOTES SECTION */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ margin: '0 0 20px', color: '#0F172A', fontSize: '24px' }}>
            Academic Notes Feed
          </h2>
          <NotesList key={refreshKey} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CoordinatorDashboard;