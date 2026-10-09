const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/authController');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Profile
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// Change Password
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;