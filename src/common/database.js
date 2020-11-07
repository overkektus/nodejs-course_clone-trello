const bcrypt = require('bcrypt');
const { MONGO_CONNECTION_STRING, BCRYPT_SALT } = require('./config');
const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const mongoose = require('mongoose');

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log("MongoDB: we're connected!");
    db.dropCollection('users', (err, result) => {
      db.dropCollection('boards', (err, result) => {
        db.dropCollection('tasks', async (err, result) => {
          const password = await bcrypt.hash('admin', BCRYPT_SALT);
          await User.create({
            name: 'admin',
            login: 'admin',
            password
          });
          callback();
        });
      });
    });
  });
};

module.exports = { connectToDB };
