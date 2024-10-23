// csrfProtection.js
// Provides protection against Cross-Site Request Forgery (CSRF) attacks by validating incoming requests with CSRF tokens.

const crypto = require('crypto');
const tokenStore = require('./tokenStore'); // A hypothetical module for storing and validating CSRF tokens

const csrfProtection = {
  /**
   * Validates the CSRF token included in the request.
   * @param {Object} request - The HTTP request object containing headers or body.
   * @returns {boolean} - Returns true if the token is valid, otherwise rejects the request.
   */
  validateCsrfToken: (request) => {
    const token = request.headers['csrf-token'] || request.body.csrfToken;

    if (token && tokenStore.isValid(token)) {
      return true;
    }

    return csrfProtection.rejectInvalidRequest(request);
  },

  /**
   * Generates a new CSRF token for use in client requests.
   * @returns {string} - A newly generated secure CSRF token.
   */
  generateCsrfToken: () => {
    const token = csrfProtection.generateSecureToken();
    tokenStore.storeToken(token);
    return token;
  },

  /**
   * Rejects requests that have invalid or missing CSRF tokens.
   * @param {Object} request - The HTTP request object.
   * @returns {Object} - Response indicating rejection due to invalid CSRF token.
   */
  rejectInvalidRequest: (request) => {
    console.warn('CSRF protection: Invalid or missing CSRF token detected for request:', request.url);
    return {
      status: 403,
      message: 'Invalid or missing CSRF token.',
    };
  },

  /**
   * Generates a secure random token for CSRF protection.
   * @returns {string} - A securely generated token.
   */
  generateSecureToken: () => {
    return crypto.randomBytes(32).toString('hex');
  },
};

module.exports = csrfProtection;
 
