// Import necessary dependencies
const proxyHandler = require('./proxyHandler');
const routesConfig = require('./proxyConfig');

module.exports = {
  // Function to match incoming request URLs and methods to predefined routing rules
  matchRoute(req) {
    const { method, originalUrl } = req;
    const targetRoutes = routesConfig.initializeProxySettings().targetServices;

    // Match route based on URL and HTTP method
    for (let route in targetRoutes) {
      const routePattern = new RegExp(`^/api/${route}`, 'i');
      if (routePattern.test(originalUrl) && method === 'GET') {
        return targetRoutes[route];
      }
    }
    return null;
  },

  // Function to forward request to the matched microservice
  redirectRequest(req, res, proxy) {
    const matchedRoute = this.matchRoute(req);
    if (matchedRoute) {
      // Forward to the appropriate microservice using proxyHandler
      return proxyHandler.forwardRequest(req, res, proxy);
    } else {
      return this.handleNoMatch(res);
    }
  },

  // Function to handle requests that do not match any routing rules
  handleNoMatch(res) {
    return res.status(404).json({
      error: 'Not Found',
      message: 'The requested resource could not be found',
    });
  },
};
 
