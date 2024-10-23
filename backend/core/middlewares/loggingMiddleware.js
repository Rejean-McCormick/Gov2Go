// Import necessary libraries
const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Create custom log format
const customFormat = printf(({ level, message, timestamp, meta }) => {
  return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

// Configure the logger using Winston
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    colorize(),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ],
});

// Middleware for logging incoming requests
function logRequest(req, res, next) {
  const startTime = process.hrtime();
  res.on('finish', () => {
    const elapsedTime = process.hrtime(startTime);
    const elapsedMilliseconds = (elapsedTime[0] * 1e3) + (elapsedTime[1] / 1e6);
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${elapsedMilliseconds.toFixed(2)} ms`;

    // Log request details including user info if available
    logger.info(logMessage, {
      user: req.user ? { id: req.user.id, email: req.user.email } : 'Guest',
    });
  });
  next();
}

// Function to log system events like server startup or shutdown
function logSystemEvent(event, message) {
  logger.info(`System Event: ${event} - ${message}`, {
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  logRequest,
  logSystemEvent,
};
 
