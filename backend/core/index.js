const express = require('express');
const { initializeDatabase } = require('./database/connection');
const { initializeLogger } = require('./config/loggingConfig');
const { configureSecurity } = require('./config/securityConfig');
const { initializeAuth } = require('./auth/authService');
const cors = require('cors');
const csrfProtection = require('./config/securityConfig').enableCSRFProtection;
require('dotenv').config();

// Create the express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Initialize core services
async function initializeServices() {
  try {
    // Initialize database connection
    await initializeDatabase();
    
    // Set up logging system
    initializeLogger();

    // Set up authentication system (JWT, OAuth)
    initializeAuth();

    // Security configurations (CORS, CSRF)
    configureSecurity(app);
    
    console.log('Core services initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize core services:', error);
    process.exit(1); // Exit the application if core services fail to initialize
  }
}

// Start the server
function startServer() {
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Main function to initialize services and start the server
(async () => {
  await initializeServices();
  startServer();
})();

 
