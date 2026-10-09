const db = require('../database/db');

// ======================================
// CREATE NOTE
// ======================================
const createNote = (req, res) => {
  const {
    title,
    message,
    target_role
  } = req.body;

  if (!title || !message) {
    return res.status(400).json({
      success: false,
      message: 'Title and message are required'
    });
  }

  // target_role can be 'student', 'teacher', or 'both'
  const validRoles = ['student', 'teacher', 'both'];
  const audience = validRoles.includes(target_role) ? target_role : 'both';
  const created_by = req.user?.id || 1;

  db.run(
    `INSERT INTO notes (
      title,
      message,
      target_role,
      created_by
    )
    VALUES (?, ?, ?, ?)`,
    [title, message, audience, created_by],
    function(err) {
      if (err) {
        console.error('Error creating note:', err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: 'Note Created Successfully',
        note: {
          id: this.lastID,
          title,
          message,
          target_role: audience,
          created_by
        }
      });
    }
  );
};

// ======================================
// GET NOTES
// ======================================
const getNotes = (req, res) => {
  const userRole = req.user?.role;
  const filterRole = req.query?.target_role;

  let query = `
    SELECT
      notes.id,
      notes.title,
      notes.message,
      COALESCE(notes.target_role, 'both') AS target_role,
      notes.created_by,
      notes.created_at,
      users.name AS coordinator_name
    FROM notes
    LEFT JOIN users ON notes.created_by = users.id
  `;

  const params = [];

  if (filterRole && ['student', 'teacher', 'both'].includes(filterRole)) {
    query += ` WHERE (notes.target_role = ? OR notes.target_role = 'both' OR notes.target_role IS NULL)`;
    params.push(filterRole);
  } else if (userRole === 'student') {
    query += ` WHERE (notes.target_role = 'student' OR notes.target_role = 'both' OR notes.target_role IS NULL)`;
  } else if (userRole === 'teacher') {
    query += ` WHERE (notes.target_role = 'teacher' OR notes.target_role = 'both' OR notes.target_role IS NULL)`;
  }
  // coordinator sees all notes unless specific filter requested

  query += ` ORDER BY notes.created_at DESC`;

  db.all(query, params, (err, notes) => {
    if (err) {
      console.error('Error fetching notes:', err);
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(notes);
  });
};

// ======================================
// DELETE NOTE
// ======================================
const deleteNote = (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM notes WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        console.error('Error deleting note:', err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      res.status(200).json({
        success: true,
        message: 'Note Deleted Successfully'
      });
    }
  );
};

module.exports = {
  createNote,
  getNotes,
  deleteNote
};