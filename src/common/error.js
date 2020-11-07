/*
 * Error middleware
 */

process.on('uncaughtException', err => {
  console.error(
    `${new Date().toUTCString()} uncaughtException: ${err.message}`
  );
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error(
    `${new Date().toUTCString()} unhandledRejection: ${reason.message}`
  );
});

const restError = (err, res) => {
  res.status(err.status || 500);
  console.error(`ERROR: ${err.message}`);
  res.send(err.message);
};

module.exports = {
  restError
};
