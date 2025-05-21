const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const { ensureAuthenticated, checkRole } = require('../middlewares/auth');

router.get(
  '/google',
  (req, res, next) => {
    req.session.returnTo = req.query.origin || '/';

    passport.authenticate('google', {
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/user.birthday.read'
      ]
    })(req, res, next);
  }
);

router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      const originalUrl = req.session.returnTo;
      delete req.session.returnTo;

      if (err) {
        console.error('Authentication error:', err.message);
        return res.redirect(`${process.env.FRONTEND_URL}/error?msg=auth_failed`);
      }
      if (!user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login`);
      }

      req.logIn(user, (err) => {
        if (err) {
          console.error('Login error:', err.message);
          return res.redirect(`${process.env.FRONTEND_URL}/error?msg=login_failed`);
        }

        let redirectPath;

        if (originalUrl === '/home') {
          redirectPath = '/chatpdf';
        } else if (originalUrl === '/admin-login' && user.role === 'admin') {
          redirectPath = '/dashboard';
        } else {
          redirectPath = originalUrl;
        }

        if (!redirectPath || !redirectPath.startsWith('/')) {
          redirectPath = '/home' + (redirectPath || '');
        }

        // Tùy theo vai trò, chọn URL đúng
        let baseUrl = process.env.FRONTEND_URL;
        if (originalUrl === '/admin-login' && user.role === 'admin') {
          baseUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
        }

        return res.redirect(`${baseUrl}${redirectPath}`);
      });
    })(req, res, next);
  }
);

router.get('/user', ensureAuthenticated, (req, res) => {
  console.log('User in /auth/user:', req.user, req.session); // Debug
  res.json(req.user || req.session.user);
});

// API Logout
router.post('/logout', (req, res) => {
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
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});


module.exports = router;