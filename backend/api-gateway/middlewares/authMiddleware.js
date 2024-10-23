 
// Import necessary services
const authService = require('../../core/auth/authService');

module.exports = {
  // Middleware to validate JWT token
  async validateToken(req, res, next) {
    try {
      // Extract the Authorization token from headers
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return this.denyAccess(res, 'Authorization header missing', 401); // 401 Unauthorized
      }

      // Check if token is in the correct Bearer format
      const token = authHeader.split(' ')[1];
      if (!token) {
        return this.denyAccess(res, 'Bearer token missing', 401); // 401 Unauthorized
      }

      // Validate token using authService
      const decodedToken = await authService.verifyToken(token);
      if (!decodedToken) {
        return this.denyAccess(res, 'Invalid token', 401); // 401 Unauthorized
      }

      // Attach user info to the request object
      req.user = decodedToken;
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token validation error:', error);
      return this.denyAccess(res, 'Internal server error', 500); // 500 Internal Server Error
    }
  },

  // Middleware to authenticate user roles
  authenticateUser(req, res, next, roles = []) {
    if (!req.user || !roles.includes(req.user.role)) {
      return this.denyAccess(res, 'Forbidden: insufficient privileges', 403); // 403 Forbidden
    }

    next(); // Proceed if user has the required role
  },

  // Function to deny access with appropriate error message and status code
  denyAccess(res, message, statusCode = 401) {
    return res.status(statusCode).json({
      error: message,
      code: statusCode,
    });
  },
};
