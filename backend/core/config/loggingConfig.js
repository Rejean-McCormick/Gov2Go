// File: /backend/core/config/loggingConfig.js
const winston = require('winston');

const initializeLogger = () => {
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      }),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' })
    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  return logger;
};

const logEvent = (level, message, metadata = {}) => {
  const logger = initializeLogger();
  logger.log(level, message, { ...metadata, timestamp: new Date().toISOString() });
};

module.exports = {
  initializeLogger,
  logEvent,
};
 
