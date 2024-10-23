 
// preferencesRoutes.js
// Defines the API routes for managing user preferences, such as language, theme, and notification settings.

const express = require('express');
const preferencesController = require('./preferencesController');
const router = express.Router();

// Function to set up all routes related to user preferences
function setupPreferencesRoutes() {
  registerGetPreferencesRoute();
  registerUpdatePreferencesRoute();
  registerResetPreferencesRoute();
}

// Route for retrieving user preferences
function registerGetPreferencesRoute() {
  router.get('/:userId', preferencesController.getUserPreferences);
}

// Route for updating user preferences
function registerUpdatePreferencesRoute() {
  router.put('/:userId', preferencesController.updateUserPreferences);
}

// Route for resetting user preferences to default
function registerResetPreferencesRoute() {
  router.post('/:userId/reset', preferencesController.resetPreferencesToDefault);
}

// Initialize all routes
setupPreferencesRoutes();

module.exports = router;
