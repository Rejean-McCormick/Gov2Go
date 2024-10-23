// Import logging service (e.g., Winston) to log error details
const { createLogger, transports, format } = require('winston');

// Initialize logger with error level and format
const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log' })
  ],
});

// Error handling middleware
function handleErrors(err, req, res, next) {
  // Set status code to 500 (Internal Server Error) or use error status if available
  const statusCode = err.statusCode || 500;

  // Log the error details
  logError(err);

  // Format the error response
  const response = {
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }), // Include stack trace in non-production environments
  };

  // Send JSON response with status code and error details
  res.status(statusCode).json(response);
}

// Logging function for error tracking and auditing
function logError(err) {
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    timestamp: new Date().toISOString(),
  });
}

// Export the error handler to use in other parts of the app
module.exports = {
  handleErrors,
};
 
