const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { ensureAuthenticated, checkRole } = require('../middlewares/auth');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read']
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
        return res.redirect(process.env.FRONTEND_URL);
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err.message);
          return res.status(500).json({ error: 'Login failed', details: err.message });
        }
        const redirectUrl = user.role === 'admin' ? '/dashboard' : '/';
        return res.redirect(`${process.env.FRONTEND_URL}${redirectUrl}`);
      });
    })(req, res, next);
  }
);

router.get('/user', ensureAuthenticated, (req, res) => {
  console.log('User in /auth/user:', req.user, req.session); // Debug
  res.json(req.user || req.session.user);
});

  // API Logout
  router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err.message);
        return res.status(500).json({ message: 'Logout error', details: err.message });
      }
       if (req.session.currentUser) {
      delete req.session.currentUser;
    }
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destroy error:', err.message);
          return res.status(500).json({ message: 'Session destroy error', details: err.message });
        }
        res.clearCookie('connect.sid'); // Xóa cookie session
        res.json({ message: 'Logged out successfully' });
      });
    });
  });


module.exports = router;