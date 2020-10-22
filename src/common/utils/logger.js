const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.printf(info => `${info.level}: ${info.message}`)
  ),

  exitOnError: false,

  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(format.colorize(), format.simple())
    }),
    new transports.File({
      filename: './logs/logger.log',
      level: 'info',
      format: format.combine(format.colorize(), format.json())
    }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.combine(format.colorize(), format.json())
    })
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
