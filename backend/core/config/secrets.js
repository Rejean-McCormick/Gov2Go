// File: /backend/core/config/secrets.js

const crypto = require('crypto');
const { promisify } = require('util');
const dotenv = require('dotenv');
dotenv.config();

const secretsStorage = {}; // Simple in-memory storage, replace with secure vault in production

// Utility to encrypt and decrypt secrets using a symmetric key
const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (hash) => {
    const [ivStr, content] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivStr, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
};

// Load secrets from storage or environment
const getSecret = (secretName) => {
    if (secretsStorage[secretName]) {
        return decrypt(secretsStorage[secretName]);
    }
    const envSecret = process.env[secretName];
    if (envSecret) {
        return envSecret;
    }
    throw new Error(`Secret ${secretName} not found`);
};

// Store secret securely (mock implementation, replace with a vault system like AWS Secrets Manager or HashiCorp Vault)
const storeSecret = (secretName, secretValue) => {
    const encryptedValue = encrypt(secretValue);
    secretsStorage[secretName] = encryptedValue;
    return true;
};

// Validate secrets presence during startup
const validateSecrets = () => {
    const requiredSecrets = ['DB_PASSWORD', 'API_KEY', 'SECRET_KEY'];
    requiredSecrets.forEach((secret) => {
        if (!process.env[secret] && !secretsStorage[secret]) {
            throw new Error(`Missing required secret: ${secret}`);
        }
    });
};

// Export the functions for use in other modules
module.exports = {
    getSecret,
    storeSecret,
    validateSecrets
};

// Test cases

if (require.main === module) {
    // Store and retrieve a secret for testing
    try {
        console.log('Storing secret...');
        storeSecret('TEST_SECRET', 'mySuperSecretValue');
        console.log('Secret stored successfully.');

        console.log('Retrieving secret...');
        const secret = getSecret('TEST_SECRET');
        console.log(`Retrieved secret: ${secret}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}
 
