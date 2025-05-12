const express = require('express');
const router = express.Router();
const { checkRole, ensureAuthenticated } = require('../middlewares/auth');

// Route chỉ cho admin
router.get('/dashboard', checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard', user: req.user });
});
router.get('/', checkRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard', user: req.user });
});

// Route cho cả user và admin (ví dụ)
router.get('/translatepdf', ensureAuthenticated, (req, res) => {
  res.json({ message: 'Translate PDF page', user: req.user });
});

module.exports = router;