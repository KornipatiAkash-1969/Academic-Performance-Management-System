const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  createNote,
  getNotes,
  deleteNote
} = require('../controllers/noteController');

// Create Note
router.post('/', authMiddleware, createNote);

// Get Notes
router.get('/', authMiddleware, getNotes);

// Delete Note
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;