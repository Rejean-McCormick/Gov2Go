// preferencesModel.js
// Defines the database schema for storing user preferences, including settings for language, theme, and notifications.

const mongoose = require('mongoose');

// Define the user preferences schema
const preferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // References the User model
  },
  language: {
    type: String,
    required: true,
    default: 'en', // Default language setting
  },
  theme: {
    type: String,
    required: true,
    default: 'light', // Default theme setting
  },
  notifications: {
    type: Object,
    default: {}, // Stores user notification preferences as an object
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create the model from the schema
const UserPreferences = mongoose.model('UserPreferences', preferencesSchema);

module.exports = UserPreferences;
 
