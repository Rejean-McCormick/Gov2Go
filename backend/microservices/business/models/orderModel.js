// File: /backend/microservices/business/models/orderModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Order model schema
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Clients', // Reference to the Clients table (clientModel)
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Products', // Reference to the Products table
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1 // Ensure quantity is at least 1
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending' // Default status for new orders
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Automatically set the timestamp when a new order is created
  }
}, {
  timestamps: false // Disable automatic `updatedAt` field if not needed
});

// Sync the model with the database to create the orders table if it doesn't exist
Order.sync()
  .then(() => {
    console.log('Order table synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing Order table:', error);
  });

module.exports = Order;
 
