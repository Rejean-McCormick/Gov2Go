// Import necessary validation utilities
const ValidationService = require('../../core/utils/validators');

module.exports = {
  // Middleware to validate request body
  validateBody(req, res, next) {
    try {
      const validationErrors = ValidationService.validate(req.body);
      if (validationErrors) {
        return this.sendValidationError(res, validationErrors);
      }
      next(); // Proceed if the body is valid
    } catch (error) {
      console.error('Body validation error:', error);
      return this.sendValidationError(res, 'Internal server error');
    }
  },

  // Middleware to validate query parameters
  validateParams(req, res, next) {
    try {
      const validationErrors = ValidationService.validateQueryParams(req.query);
      if (validationErrors) {
        return this.sendValidationError(res, validationErrors);
      }
      next(); // Proceed if query parameters are valid
    } catch (error) {
      console.error('Query validation error:', error);
      return this.sendValidationError(res, 'Internal server error');
    }
  },

  // Function to send validation error responses
  sendValidationError(res, message, statusCode = 400) {
    return res.status(statusCode).json({
      error: message,
      code: statusCode,
    });
  },
};
 
