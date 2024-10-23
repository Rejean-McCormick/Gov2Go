 
// Import necessary services
const redisClient = require('../services/CacheService'); // Assuming Redis is used for rate limiting

module.exports = {
  // Time window in seconds and request limit
  rateLimitWindow: 60, // 1 minute
  maxRequests: 100, // Max 100 requests per window

  // Middleware to monitor request count and apply rate limiting
  async monitorRequestCount(req, res, next) {
    try {
      const clientIp = req.ip; // Use client IP for tracking
      const key = `rate-limit:${clientIp}`;

      // Check if this client already exists in Redis
      const requestCount = await redisClient.get(key);

      if (requestCount) {
        if (requestCount >= this.maxRequests) {
          return this.applyRateLimit(res); // Too many requests
        } else {
          // Increment request count
          await redisClient.incr(key);
        }
      } else {
        // New client, set request count to 1 and expire after rateLimitWindow
        await redisClient.set(key, 1, 'EX', this.rateLimitWindow);
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      return this.sendErrorResponse(res, 'Internal server error', 500);
    }
  },

  // Function to apply rate limit by returning 429 response
  applyRateLimit(res) {
    return res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Try again in ${this.rateLimitWindow} seconds.`,
    });
  },

  // Optional function to block abusive clients (403 Forbidden)
  blockRequest(res) {
    return res.status(403).json({
      error: 'Access Denied',
      message: 'You have been temporarily blocked due to repeated rate limit violations.',
    });
  },

  // Helper function to send error responses
  sendErrorResponse(res, message, statusCode = 400) {
    return res.status(statusCode).json({
      error: message,
      code: statusCode,
    });
  },
};
