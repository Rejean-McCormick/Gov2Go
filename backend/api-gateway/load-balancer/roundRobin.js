 
// Import necessary services
const CacheService = require('../services/CacheService');

module.exports = {
  // Index to track the current microservice in the round-robin selection
  currentServiceIndex: 0,

  // List of microservices to balance the load between
  microservices: [
    'http://microservice1.example.com',
    'http://microservice2.example.com',
    'http://microservice3.example.com',
  ],

  // Main function to distribute load using round-robin strategy
  async distributeLoad(req, res) {
    try {
      // Step 1: Select the next microservice in the pool
      const selectedService = this.getNextService();

      // Step 2: Forward the request to the selected microservice
      const result = await this.forwardToService(req, selectedService);

      // Step 3: Send back the successful response
      return res.status(200).json(result); // 200 OK
    } catch (error) {
      // Handle any errors in the forwarding process
      console.error('Error distributing load:', error);
      return this.sendErrorResponse(res, 'Internal Server Error', 500); // 500 Internal Server Error
    }
  },

  // Get the next microservice based on round-robin logic
  getNextService() {
    const service = this.microservices[this.currentServiceIndex];
    // Update index for the next request
    this.currentServiceIndex = (this.currentServiceIndex + 1) % this.microservices.length;
    return service;
  },

  // Forward the request to the selected microservice
  async forwardToService(req, selectedService) {
    const cachedResponse = await CacheService.get(req.originalUrl);
    if (cachedResponse) {
      return cachedResponse; // Return cached response if available
    }

    // Make the actual request to the selected microservice
    const response = await fetch(selectedService, {
      method: req.method,
      headers: req.headers,
      body: req.body ? JSON.stringify(req.body) : null,
    });

    // Cache the response if it's a frequently accessed service
    const data = await response.json();
    await CacheService.set(req.originalUrl, data);

    return data;
  },

  // Handle errors and send appropriate error responses
  sendErrorResponse(res, error, statusCode = 500) {
    return res.status(statusCode).json({
      error: error,
      code: statusCode,
    });
  },
};
