// File: /backend/core/middlewares/securityMiddleware.js

const rateLimit = require('express-rate-limit');

// Middleware responsible for enforcing security measures
const securityMiddleware = {};

// Enforce Cross-Origin Resource Sharing (CORS) policies
securityMiddleware.enforceCORS = (req, res, next) => {
  const allowedOrigins = ['https://example.com', 'https://anotherdomain.com'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  } else {
    res.status(403).send('CORS Policy: Access Denied');
  }
};

// Set essential security headers
securityMiddleware.setSecurityHeaders = (req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none';");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting
securityMiddleware.rateLimit = (req, res, next) => {
  return limiter(req, res, next);
};

module.exports = securityMiddleware;
 
