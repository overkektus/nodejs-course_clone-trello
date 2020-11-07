const dotenv = require('dotenv');
const path = require('path');

const BCRYPT_SALT = 10;
const TOKEN_EXPIRES_IN = '24h';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  BCRYPT_SALT,
  TOKEN_EXPIRES_IN,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};
