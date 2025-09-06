const jwt = require('jsonwebtoken');
module.exports = (role = false) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ');
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    if (role && decoded.role !== role) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};
