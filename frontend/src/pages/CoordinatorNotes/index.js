import './index.css';

import {
  useState
} from 'react';

import DashboardLayout from '../../components/common/DashboardLayout';

import NotesList
from '../../components/common/NotesList';

import {
  createNote
} from '../../services/noteService';

function CoordinatorNotes() {

  // ======================================
  // STATES
  // ======================================

  const [formData, setFormData] =
    useState({
      title: '',
      message: '',
      target_role: 'both'
    });

  const [loading, setLoading] =
    useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ======================================
  // SUBMIT FORM
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNote(formData);

      alert(
        'Note Sent Successfully'
      );

      // RESET FORM
      setFormData({
        title: '',
        message: '',
        target_role: 'both'
      });

      // TRIGGER NOTES REFRESH
      setRefreshKey((prev) => prev + 1);

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        'Failed To Send Note'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="coordinator" title="Coordinator Notes">

      {/* CONTENT */}
      <div className="notes-content">
        {/* TOP */}
        <div className="notes-top">
          <h1>
            Coordinator Notes
          </h1>
          <p>
            Send important academic notes to students, teachers, or both
          </p>
        </div>

        {/* FORM */}
        <form
          className="notes-form"
          onSubmit={handleSubmit}
        >
          {/* TITLE */}
          <div className="input-group">
            <label>
              Note Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Note Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* TARGET AUDIENCE OPTION */}
          <div className="input-group">
            <label>
              Send Note To (Target Audience)
            </label>
            <select
              name="target_role"
              value={formData.target_role}
              onChange={handleChange}
              required
            >
              <option value="both">👥 Both (Students & Teachers)</option>
              <option value="student">👨‍🎓 Students Only</option>
              <option value="teacher">👨‍🏫 Teachers Only</option>
            </select>
            <small>
              Select who should be able to view this note on their dashboard
            </small>
          </div>

          {/* MESSAGE */}
          <div className="input-group">
            <label>
              Note Message
            </label>
            <textarea
              name="message"
              placeholder="Enter Note Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
          >
            {
              loading
              ? 'Sending Note...'
              : 'Send Note'
            }
          </button>
        </form>

        {/* PREVIOUS NOTES */}
        <div style={{ marginTop: '40px', maxWidth: '800px' }}>
          <h2 style={{ color: '#0F172A', marginBottom: '20px', fontSize: '24px' }}>
            Previously Posted Notes
          </h2>
          <NotesList key={refreshKey} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CoordinatorNotes;