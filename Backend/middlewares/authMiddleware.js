const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Отсутсвует токен' });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Недействительный токен' });
        }

        req.user = user;

        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
          return res.status(403).json({ message: 'Недостаточно прав' });
        }

        next(); 
      });
    } catch (error) {
      res.status(401).json({ message: 'У токена истек срок' });
    }
  };
};

module.exports = authMiddleware;
