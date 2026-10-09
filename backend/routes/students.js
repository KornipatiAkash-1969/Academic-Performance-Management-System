const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  getStudents,
  addStudent
} = require('../controllers/studentController');

// GET STUDENTS
router.get('/', authMiddleware, getStudents);

// ADD STUDENT
router.post('/', authMiddleware, addStudent);

module.exports = router;