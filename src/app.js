const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/tasks.router');

const logRequestsMiddleware = require('./common/middlewares/logRequests');
const {
  onUnhandledPromiseRejection,
  onUncaughtException
} = require('./common/middlewares/catchErrors');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequestsMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use('*', (req, res) => res.sendStatus(501));

process.on('uncaughtException', error => {
  onUncaughtException(error);
});

process.on('unhandledRejection', error => {
  onUnhandledPromiseRejection(error);
});

// PUT IT HERE
// if (newLocal) {
//   throw Error('uncaughtException - Oops!');
// }

// PUT IT HERE
// Promise.reject(Error('Promise: Oops!'));

module.exports = app;
