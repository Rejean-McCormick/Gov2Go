// Import required dependencies
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const inputValidator = require('../middlewares/inputValidator');
const rateLimiter = require('../middlewares/rateLimiter');
const apiController = require('../controllers/apiController');

module.exports = {
  // Function to set up API routes
  setupRoutes(app) {
    // Example route registration
    this.registerRoute('get', '/api/v1/resource', apiController.handleRequest, [authMiddleware.validateToken, rateLimiter.monitorRequestCount]);
    
    // Additional routes can be added here
    this.registerRoute('post', '/api/v1/resource', apiController.handleRequest, [authMiddleware.validateToken, inputValidator.validateBody]);

    // Any other HTTP method and route combinations
  },

  // Function to register a route with method, path, controller, and middleware
  registerRoute(method, path, controller, middleware) {
    switch (method.toLowerCase()) {
      case 'get':
        app.get(path, middleware, controller);
        break;
      case 'post':
        app.post(path, middleware, controller);
        break;
      case 'put':
        app.put(path, middleware, controller);
        break;
      case 'delete':
        app.delete(path, middleware, controller);
        break;
      default:
        console.error(`Unsupported method: ${method}`);
    }
  },
};
 
