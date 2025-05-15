const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware để đảm bảo người dùng đã đăng nhập
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Chưa đăng nhập' });
};

// GET all users
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a single user by ID
router.get('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);

    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;