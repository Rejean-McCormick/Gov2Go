 
// /backend/core/auth/authMiddleware.js

// Import necessary services
const authService = require('../auth/authService'); // Responsible for token validation
const logger = require('../middlewares/loggingMiddleware'); // Log unauthorized attempts

// Middleware function to require authentication
exports.requireAuth = (req, res, next) => {
    try {
        // Extract JWT from Authorization header
        const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
        
        if (!token) {
            logger.logUnauthorizedAttempt(req); // Log the attempt
            return denyAccess(res, 'No token provided.');
        }

        // Verify the JWT token
        const decodedToken = authService.verifyToken(token);

        if (!decodedToken) {
            logger.logUnauthorizedAttempt(req); // Log the attempt
            return denyAccess(res, 'Invalid or expired token.');
        }

        // Set user context for next middleware/controller
        setUserContext(req, decodedToken);
        
        next(); // Proceed to the next middleware if the token is valid
    } catch (error) {
        logger.logUnauthorizedAttempt(req); // Log the attempt
        denyAccess(res, 'Authentication failed.');
    }
};

// Function to set user context from token
function setUserContext(req, tokenData) {
    req.user = {
        id: tokenData.id,
        email: tokenData.email,
        roles: tokenData.roles,
    };
}

// Function to deny access with an appropriate response
function denyAccess(res, message) {
    return res.status(401).json({
        status: 'error',
        message: message || 'Unauthorized access.',
    });
}

module.exports = {
    requireAuth,
};
