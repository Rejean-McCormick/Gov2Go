// Import required dependencies
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

module.exports = {
  // Initialize proxy settings from environment variables or default values
  initializeProxySettings() {
    return {
      targetServices: {
        service1: process.env.SERVICE_1_URL || 'http://localhost:3001',
        service2: process.env.SERVICE_2_URL || 'http://localhost:3002',
        service3: process.env.SERVICE_3_URL || 'http://localhost:3003',
      },
      secure: process.env.PROXY_SECURE === 'true', // Ensure HTTPS if needed
      changeOrigin: true, // Change origin header to target URL
    };
  },

  // Configure routes and link HTTP request paths to their corresponding microservices
  configureRoutes(app, proxy) {
    const proxySettings = this.initializeProxySettings();

    // Route for service1
    app.use('/api/service1', (req, res) => {
      proxy.web(req, res, { target: proxySettings.targetServices.service1 });
    });

    // Route for service2
    app.use('/api/service2', (req, res) => {
      proxy.web(req, res, { target: proxySettings.targetServices.service2 });
    });

    // Route for service3
    app.use('/api/service3', (req, res) => {
      proxy.web(req, res, { target: proxySettings.targetServices.service3 });
    });
    
    // Handle errors in the proxy
    proxy.on('error', (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  },
};
 
