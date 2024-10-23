// File: /backend/core/utils/encryption.js

const crypto = require('crypto');
const bcrypt = require('bcrypt');

// Encryption key (should be securely stored and managed, e.g., using environment variables)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default_encryption_key_32bytes';  // Must be 32 bytes
const IV_LENGTH = 16;  // AES block size for initialization vector

const encryptionUtils = {};

// Encrypt data using AES-256-CBC
encryptionUtils.encryptData = (data) => {
  const iv = crypto.randomBytes(IV_LENGTH);  // Generate random IV
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;  // Return IV with encrypted data
};

// Decrypt data using AES-256-CBC
encryptionUtils.decryptData = (encryptedData) => {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

// Hash a password using bcrypt with salting
encryptionUtils.hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Verify a password against a hashed value
encryptionUtils.verifyHash = async (plainValue, hashedValue) => {
  return await bcrypt.compare(plainValue, hashedValue);
};

module.exports = encryptionUtils;
// encryption.js
// Provides utilities for encrypting and decrypting sensitive data to ensure its confidentiality and security.

const crypto = require('crypto');

const encryption = {
  // Algorithm and initialization vector configuration
  algorithm: 'aes-256-cbc',
  ivLength: 16, // For AES, the IV length is 16 bytes
  secretKey: process.env.ENCRYPTION_KEY || encryption.generateEncryptionKey(), // Key used for encryption and decryption

  /**
   * Encrypts the given sensitive data using AES-256-CBC algorithm.
   * @param {string} data - The plaintext data to be encrypted.
   * @returns {string} - The encrypted data in hex format.
   */
  encryptData: (data) => {
    try {
      const iv = crypto.randomBytes(encryption.ivLength);
      const cipher = crypto.createCipheriv(encryption.algorithm, Buffer.from(encryption.secretKey, 'hex'), iv);
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  },

  /**
   * Decrypts data that was previously encrypted, returning it to its original plaintext form.
   * @param {string} encryptedData - The encrypted data to be decrypted.
   * @returns {string} - The decrypted plaintext data.
   */
  decryptData: (encryptedData) => {
    try {
      const parts = encryptedData.split(':');
      const iv = Buffer.from(parts.shift(), 'hex');
      const encryptedText = parts.join(':');
      const decipher = crypto.createDecipheriv(encryption.algorithm, Buffer.from(encryption.secretKey, 'hex'), iv);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  },

  /**
   * Generates a secure encryption key for AES-256-CBC.
   * @returns {string} - A new 256-bit (32 bytes) encryption key in hex format.
   */
  generateEncryptionKey: () => {
    return crypto.randomBytes(32).toString('hex'); // 256-bit key for AES-256
  },
};

module.exports = encryption;
 
