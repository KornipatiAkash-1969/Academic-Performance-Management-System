import './index.css';

import {
  useEffect,
  useState
} from 'react';

import {
  getNotes,
  deleteNote
} from '../../../services/noteService';

function NotesList() {

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const userString = localStorage.getItem('user');
  let user = {};
  try {
    user = userString ? JSON.parse(userString) : {};
  } catch (e) {
    console.error(e);
  }

  const isCoordinator = user?.role === 'coordinator';

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await getNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      console.error('Failed to delete note:', err);
      alert('Failed to delete note');
    }
  };

  const displayedNotes = notes.filter((n) => {
    if (!isCoordinator || filter === 'all') return true;
    const target = n.target_role || 'both';
    if (filter === 'student') return target === 'student';
    if (filter === 'teacher') return target === 'teacher';
    if (filter === 'both') return target === 'both';
    return true;
  });

  const getBadgeInfo = (target) => {
    switch (target) {
      case 'student':
        return { label: '👨‍🎓 For Students', bg: '#EFF6FF', color: '#1D4ED8' };
      case 'teacher':
        return { label: '👨‍🏫 For Teachers', bg: '#F5F3FF', color: '#6D28D9' };
      default:
        return { label: '👥 Both (All)', bg: '#ECFDF5', color: '#047857' };
    }
  };

  return (
    <div className="notes-list-container">
      {/* COORDINATOR FILTER TABS */}
      {isCoordinator && (
        <div className="notes-filter-bar">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Notes ({notes.length})
          </button>
          <button
            className={`filter-btn ${filter === 'student' ? 'active' : ''}`}
            onClick={() => setFilter('student')}
          >
            👨‍🎓 For Students ({notes.filter(n => (n.target_role || 'both') === 'student').length})
          </button>
          <button
            className={`filter-btn ${filter === 'teacher' ? 'active' : ''}`}
            onClick={() => setFilter('teacher')}
          >
            👨‍🏫 For Teachers ({notes.filter(n => (n.target_role || 'both') === 'teacher').length})
          </button>
          <button
            className={`filter-btn ${filter === 'both' ? 'active' : ''}`}
            onClick={() => setFilter('both')}
          >
            👥 For Both ({notes.filter(n => (n.target_role || 'both') === 'both').length})
          </button>
        </div>
      )}

      {loading ? (
        <div className="notes-loading">Loading Notes...</div>
      ) : displayedNotes.length > 0 ? (
        <div className="notes-grid">
          {displayedNotes.map((note) => {
            const badge = getBadgeInfo(note.target_role || 'both');
            return (
              <div key={note.id} className="note-card">
                <div className="note-card-header">
                  <h3>{note.title}</h3>
                  <span
                    className="target-role-badge"
                    style={{ backgroundColor: badge.bg, color: badge.color }}
                  >
                    {badge.label}
                  </span>
                </div>

                <p className="note-message">{note.message}</p>

                <div className="note-footer">
                  <span className="note-date">
                    {note.created_at ? new Date(note.created_at).toLocaleDateString() : 'Recent'}
                  </span>
                  {isCoordinator && (
                    <button
                      className="note-delete-btn"
                      onClick={() => handleDelete(note.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-notes">
          No notes available {filter !== 'all' ? `for "${filter}"` : ''}
        </div>
      )}
    </div>
  );
}

export default NotesList;