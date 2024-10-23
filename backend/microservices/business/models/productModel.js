// File: /backend/microservices/business/models/productModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Product model schema
const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0 // Ensure stock cannot be negative
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Automatically set timestamp when a new product is created
  }
}, {
  timestamps: false // Disable automatic `updatedAt` field if not needed
});

// Sync the model with the database to create the Products table if it doesn't exist
Product.sync()
  .then(() => {
    console.log('Product table synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing Product table:', error);
  });

module.exports = Product;
 
