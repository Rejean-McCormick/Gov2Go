// File: /backend/microservices/business/models/clientModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Client model schema
const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true // Validate the email format
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Automatically set the timestamp when a new record is created
  }
}, {
  timestamps: false // Disable automatic `updatedAt` field if not needed
});

// Sync the model with the database to create the clients table if it doesn't exist
Client.sync()
  .then(() => {
    console.log('Client table synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing Client table:', error);
  });

module.exports = Client;
 
