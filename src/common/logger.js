/*
 * Logger middleware
 */

const { finished } = require('stream');

exports.logger = (req, res, next) => {
  const { method, url, query, body } = req;
  finished(res, () => {
    const { statusCode } = res;
    console.log(
      `${method} ${statusCode} URL: ${url} QUERY: ${JSON.stringify(
        query
      )} BODY: ${JSON.stringify(body)}`
    );
  });
  next();
};
