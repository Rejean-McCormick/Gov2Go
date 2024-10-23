// Import required dependencies
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Create a connection pool using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Ensures SSL for security if enabled
  },
  max: process.env.DB_MAX_CLIENTS || 10, // Max clients in the pool
  idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT || 30000, // Timeout for idle clients
  connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 2000, // Timeout for initial connection
});

// Connect to the database
async function connect() {
  try {
    const client = await pool.connect();
    console.log('Database connection established successfully');
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw new Error('Database connection failed');
  }
}

// Disconnect from the database
async function disconnect() {
  try {
    await pool.end();
    console.log('Database connection closed successfully');
  } catch (error) {
    console.error('Error closing the database connection:', error.message);
    throw new Error('Failed to close the database connection');
  }
}

module.exports = { connect, disconnect, pool };
 
