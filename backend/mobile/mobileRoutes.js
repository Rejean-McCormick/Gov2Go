// /backend/mobile/mobileRoutes.js

const express = require('express');
const userController = require('./controllers/userController');
const notificationController = require('./controllers/notificationController');

const router = express.Router();

/**
 * Configures and initializes all routes specifically designed for the mobile application APIs.
 * @param {Object} app - Express app instance
 */
function setupMobileRoutes(app) {
    registerUserRoutes(app);
    registerNotificationRoutes(app);
}

/**
 * Registers API routes related to user operations (e.g., login, registration, profile updates) for mobile clients.
 * @param {Object} app - Express app instance
 */
function registerUserRoutes(app) {
    router.post('/mobile/user/login', userController.login);
    router.post('/mobile/user/register', userController.register);
    router.put('/mobile/user/profile', userController.updateProfile);
    router.get('/mobile/user/profile', userController.getUserProfile);
}

/**
 * Registers API routes for managing push notifications for mobile devices.
 * @param {Object} app - Express app instance
 */
function registerNotificationRoutes(app) {
    router.post('/mobile/notifications/send', notificationController.sendPushNotification);
    router.get('/mobile/notifications', notificationController.getNotifications);
    router.delete('/mobile/notifications/:id', notificationController.deleteNotification);
}

// Initialize routes
setupMobileRoutes(router);

module.exports = router;
 
