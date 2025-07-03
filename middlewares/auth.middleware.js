const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['access-token'];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
