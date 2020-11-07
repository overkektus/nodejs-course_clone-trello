const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

const loggerMiddleware = require('./common/logger');
app.use(loggerMiddleware.logger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running! <a href="/doc">Go to Swagger!</a>');
    return;
  }
  next();
});

app.use('/login', loginRouter);

const authMiddleware = require('./common/auth');

app.use('/users', authMiddleware, userRouter);
app.use('/boards', authMiddleware, boardRouter);
boardRouter.use('/:boardId/tasks', authMiddleware, taskRouter);

const { restError } = require('./common/error');

app.use((err, req, res, next) => {
  restError(err, res);
});

module.exports = app;
