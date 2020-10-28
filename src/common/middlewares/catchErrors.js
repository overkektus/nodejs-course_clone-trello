const logger = require('../utils/logger');

const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    logger.error(`StatusCode ${error.status}, Message: ${error.message}`);
    if (error.status) {
      return res.status(error.status).send({ error: error.message });
    }
    return res.sendStatus(500);
  }
};

const onUncaughtException = error => {
  logger.error(`Unhandled exception: ${error.message}, stack: ${error.stack}`);
};

const onUnhandledPromiseRejection = error => {
  logger.error(
    `Unhandled promise rejection: ${error.message}, stack: ${error.stack}`
  );
};

module.exports = {
  catchErrors,
  onUnhandledPromiseRejection,
  onUncaughtException
};
