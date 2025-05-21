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
          redirectPath = '/chatpdf?loggedIn=true';
        } else if (originalUrl === '/admin-login' && user.role === 'admin') {
          redirectPath = '/dashboard?loggedIn=true';
        } else {
          redirectPath = originalUrl ? `${originalUrl}?loggedIn=true` : '/home?loggedIn=true';
        }

        if (!redirectPath || !redirectPath.startsWith('/')) {
          redirectPath = `/home?loggedIn=true`;
        }

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
  console.log('User in /user:', req.user, req.session); // Sửa comment
  if (req.user) {
    res.json({
      id: req.user.id,
      _id: req.user._id || req.user.id,
      name: req.user.fullName || req.user.displayName,
      email: req.user.email || req.user.emails?.[0]?.value,
      avatar: req.user.picture || req.user.photos?.[0]?.value,
      role: req.user.role || 'user',
      userId: req.user.id || req.user.userId,
      token: req.user.token || '',
      statusOnline: req.user.statusOnline || false,
    });
  } else {
    res.status(401).json({ error: 'Không có thông tin người dùng' });
  }
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