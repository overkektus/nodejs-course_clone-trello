const moment = require('moment');
const onFinished = require('on-finished');
const logger = require('../utils/logger');

const logRequests = (request, response, next) => {
  const { method, originalUrl, body, query } = request;
  const start = Date.now();
  if (body.password) {
    body.password = '********';
  }

  onFinished(response, () => {
    const ms = Date.now() - start;
    const { statusCode } = response;
    logger.info(
      `DateTime: ${moment().format('YYYY-MM-DD hh:mm:ss')}
      Method: ${method}, URL: ${decodeURI(originalUrl)},
      Query object: ${JSON.stringify(query)},
      Request body: ${JSON.stringify(body)}, 
      StatusCode: ${statusCode} [${ms}ms]`
    );
  });

  next();
};

module.exports = logRequests;
