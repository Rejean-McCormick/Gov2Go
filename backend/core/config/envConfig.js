 
// /backend/core/config/envConfig.js

const dotenv = require('dotenv');
const path = require('path');

class EnvConfig {
  constructor() {
    this.config = {};
  }

  // Load environment variables from .env file or system environment
  loadConfig() {
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });
    this.config = {
      // Example configuration values
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || 3000,
      DATABASE_URL: process.env.DATABASE_URL || '',
      JWT_SECRET: process.env.JWT_SECRET || '',
      REDIS_URL: process.env.REDIS_URL || '',
      API_KEY: process.env.API_KEY || '',
      LOGGING_LEVEL: process.env.LOGGING_LEVEL || 'info',
    };

    // Validate loaded configuration
    this.validateConfig(this.config);
    return this.config;
  }

  // Validate configuration values to ensure essential variables are present
  validateConfig(config) {
    const requiredFields = ['NODE_ENV', 'PORT', 'DATABASE_URL', 'JWT_SECRET'];
    requiredFields.forEach((field) => {
      if (!config[field]) {
        throw new Error(`Missing required environment variable: ${field}`);
      }
    });

    // Example validation for URL format (could be extended based on specific needs)
    if (!this.isValidUrl(config.DATABASE_URL)) {
      throw new Error(`Invalid DATABASE_URL format: ${config.DATABASE_URL}`);
    }
    if (!this.isValidUrl(config.REDIS_URL) && config.REDIS_URL !== '') {
      throw new Error(`Invalid REDIS_URL format: ${config.REDIS_URL}`);
    }
  }

  // Utility function to check if a string is a valid URL
  isValidUrl(urlString) {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = new EnvConfig();
