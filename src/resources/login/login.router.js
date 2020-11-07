const router = require('express').Router();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const User = require('../users/user.model');
const { JWT_SECRET_KEY, TOKEN_EXPIRES_IN } = require('../../common/config');

router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      res.sendStatus(403);
    }
    const isCheck = await bcrypt.compare(password, user.password);
    if (isCheck) {
      const token = JWT.sign({ userId: user._id, login }, JWT_SECRET_KEY, {
        expiresIn: TOKEN_EXPIRES_IN
      });
      res.status(200).send({ token });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
