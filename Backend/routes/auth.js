const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { ensureAuthenticated, checkRole } = require('../middlewares/auth'); 

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/user.addresses.read']
  })
);

router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        console.error('Authentication error:', err.message);
        return res.status(500).json({ error: 'Authentication failed', details: err.message });
      }
      if (!user) {
        return res.redirect(process.env.CLIENT_URL);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err.message);
          return res.status(500).json({ error: 'Login failed', details: err.message });
        }
        const redirectUrl = user.role === 'admin' ? '/dashboard' : '/translatepdf';
        return res.redirect(`${process.env.FRONTEND_URL}${redirectUrl}`);
      });
    })(req, res, next);
  }
);

router.get('/user', ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;