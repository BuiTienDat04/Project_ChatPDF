const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

const checkRole = (role) => {
  return (req, res, next) => {
    ensureAuthenticated(req, res, () => {
      if (req.user && req.user.role === role) {
        return next();
      }
      res.status(403).json({ message: `Access denied. Requires ${role} role` });
    });
  };
};

module.exports = { ensureAuthenticated, checkRole };