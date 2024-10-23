// authKeys.js
// Manages the generation, storage, and rotation of authentication keys, such as JWT secret keys, to secure user authentication and authorization processes.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Define the file path for storing the auth key securely
const keyFilePath = path.resolve(__dirname, 'authKey.txt');

class AuthKeys {
  /**
   * Generates a new authentication key for secure user authentication.
   * @returns {string} - The newly generated authentication key.
   */
  generateAuthKey() {
    const newKey = crypto.randomBytes(64).toString('hex');
    console.log('New authentication key generated:', newKey);
    return newKey;
  }

  /**
   * Retrieves the current authentication key in use.
   * @returns {string} - The stored authentication key.
   */
  getStoredAuthKey() {
    try {
      // Check if the auth key file exists and read the key
      if (fs.existsSync(keyFilePath)) {
        const storedKey = fs.readFileSync(keyFilePath, 'utf-8');
        console.log('Retrieved stored authentication key:', storedKey);
        return storedKey.trim();
      } else {
        console.warn('No authentication key found. Generating a new one...');
        // Generate and store a new key if none exists
        const newKey = this.generateAuthKey();
        this.storeAuthKey(newKey);
        return newKey;
      }
    } catch (err) {
      console.error('Error retrieving stored authentication key:', err);
      throw new Error('Failed to retrieve authentication key.');
    }
  }

  /**
   * Stores the authentication key securely in a file.
   * @param {string} key - The authentication key to store.
   */
  storeAuthKey(key) {
    try {
      fs.writeFileSync(keyFilePath, key);
      console.log('Authentication key stored successfully.');
    } catch (err) {
      console.error('Error storing authentication key:', err);
      throw new Error('Failed to store authentication key.');
    }
  }

  /**
   * Rotates or updates the authentication key for security reasons.
   */
  rotateAuthKey() {
    try {
      const newKey = this.generateAuthKey();
      this.storeAuthKey(newKey);
      console.log('Authentication key rotated successfully.');
    } catch (err) {
      console.error('Error rotating authentication key:', err);
      throw new Error('Failed to rotate authentication key.');
    }
  }
}

// Exporting an instance of AuthKeys for use in other parts of the application
module.exports = new AuthKeys();
 
