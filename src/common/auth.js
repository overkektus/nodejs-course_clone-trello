const JWT = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.sendStatus(401);
    }
    const user = JWT.verify(token, JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
