 
// Import necessary services
const authService = require('../../core/auth/authService');
const ValidationService = require('../services/ValidationService');
const CacheService = require('../services/CacheService');

module.exports = {
  // Main handler for incoming requests
  async handleRequest(req, res) {
    try {
      // Step 1: Validate the request (Authorization token and input validation)
      const validationError = this.validateRequest(req);
      if (validationError) {
        return this.sendErrorResponse(res, validationError, 400); // Bad Request
      }

      // Step 2: Forward the request to the correct microservice
      const result = await this.forwardToService(req);

      // Step 3: Send back the successful response
      return res.status(200).json(result); // 200 OK
    } catch (error) {
      // Handle errors (either validation or internal)
      console.error('Error handling request:', error);
      return this.sendErrorResponse(res, 'Internal Server Error', 500); // 500 Internal Server Error
    }
  },

  // Validation function to check authorization and required fields
  validateRequest(req) {
    // Validate JWT token
    const token = req.headers.authorization;
    if (!token) {
      return 'Authorization token missing';
    }

    const isValidToken = authService.verifyToken(token);
    if (!isValidToken) {
      return 'Invalid or expired token';
    }

    // Validate required fields based on request type
    const validationErrors = ValidationService.validate(req.body);
    if (validationErrors) {
      return validationErrors;
    }

    // No errors, return null
    return null;
  },

  // Function to forward the request to the appropriate microservice
  async forwardToService(req) {
    const cachedResponse = await CacheService.get(req.originalUrl);
    if (cachedResponse) {
      return cachedResponse; // Return cached data to optimize performance
    }

    // Route the request to the appropriate microservice based on URL or request type
    const microserviceResponse = await this.routeToMicroservice(req);

    // Cache the response if it's frequently requested
    await CacheService.set(req.originalUrl, microserviceResponse);

    return microserviceResponse;
  },

  // Route to the specific microservice (placeholder function)
  async routeToMicroservice(req) {
    // Logic to determine and forward request to the microservice
    // This would depend on the URL path or some other parameters
    return { message: 'Request successfully routed to microservice' };
  },

  // Function to handle and send error responses
  sendErrorResponse(res, error, statusCode = 400) {
    return res.status(statusCode).json({
      error: error,
      code: statusCode,
    });
  },
};
