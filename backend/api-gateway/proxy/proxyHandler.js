// Import required dependencies
const proxyConfig = require('./proxyConfig');
const logger = require('../middlewares/loggingMiddleware');

module.exports = {
  // Function to forward incoming requests to the appropriate microservice
  forwardRequest(req, res, proxy) {
    try {
      const targetService = proxyConfig.initializeProxySettings().targetServices[req.params.service];
      if (!targetService) {
        return this.handleError(res, 'Service not found', 404);
      }

      // Log the request details
      this.logRequest(req);

      // Forward request to the selected microservice
      proxy.web(req, res, { target: targetService }, (error) => {
        if (error) {
          console.error('Proxy error:', error);
          return this.handleError(res, 'Bad Gateway', 502);
        }
      });
    } catch (error) {
      console.error('Forwarding request failed:', error);
      return this.handleError(res, 'Internal Server Error', 500);
    }
  },

  // Function to handle errors during request forwarding
  handleError(res, message, statusCode) {
    return res.status(statusCode).json({
      error: message,
      code: statusCode,
    });
  },

  // Function to log details of the forwarded request
  logRequest(req) {
    const logDetails = {
      method: req.method,
      path: req.originalUrl,
      headers: req.headers,
      timestamp: new Date(),
    };

    logger.log('info', 'Forwarding request to microservice:', logDetails);
  },
};
 
