// File: /backend/core/services/cacheService.js

const redis = require('redis');
const client = redis.createClient();

// Log helper to capture cache status messages
const logStatus = (message) => {
  console.log(`${new Date().toISOString()} - ${message}`);
};

const cacheService = {};

// Set data in the cache with an optional expiration time
cacheService.setCache = (key, data, expirationTime) => {
  const stringData = JSON.stringify(data);  // Convert data to string format for Redis
  client.set(key, stringData, (err) => {
    if (err) {
      logStatus(`Failed to set cache for key: ${key} - ${err.message}`);
      return;
    }
    if (expirationTime) {
      client.expire(key, expirationTime);  // Set expiration time if provided
    }
    logStatus(`Cache set for key: ${key} with expiration: ${expirationTime ? expirationTime : 'none'}`);
  });
};

// Retrieve data from the cache by key
cacheService.getCache = (key, callback) => {
  client.get(key, (err, result) => {
    if (err) {
      logStatus(`Error retrieving cache for key: ${key} - ${err.message}`);
      callback(null);
      return;
    }
    if (result) {
      logStatus(`Cache hit for key: ${key}`);
      callback(JSON.parse(result));  // Parse and return the cached data
    } else {
      logStatus(`Cache miss for key: ${key}`);
      callback(null);
    }
  });
};

// Clear specific cached entry or all entries if no key is provided
cacheService.clearCache = (key = null) => {
  if (key) {
    client.del(key, (err, response) => {
      if (err) {
        logStatus(`Failed to clear cache for key: ${key} - ${err.message}`);
        return;
      }
      logStatus(`Cache cleared for key: ${key}`);
    });
  } else {
    client.flushall((err, response) => {
      if (err) {
        logStatus(`Failed to clear all cache - ${err.message}`);
        return;
      }
      logStatus('All cache cleared');
    });
  }
};

module.exports = cacheService;
 
