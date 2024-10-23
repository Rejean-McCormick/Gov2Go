// /backend/mobile/mobileServices.js

const userService = require('./services/userService');
const notificationService = require('./services/notificationService');
const authService = require('./services/authService');

/**
 * Authenticates mobile users based on the provided credentials.
 * @param {Object} credentials - The user's credentials (email and password).
 * @returns {Object} - JWT token if authentication is successful.
 * @throws {Error} - If authentication fails.
 */
async function authenticateMobileUser(credentials) {
    try {
        const user = await userService.verifyCredentials(credentials.email, credentials.password);
        if (user) {
            return { status: 'success', token: authService.generateToken(user) };
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}

/**
 * Sends a push notification to a mobile device using the registered notification token.
 * @param {Object} notificationData - Contains the token and message for the notification.
 * @returns {Object} - Result of the notification delivery.
 * @throws {Error} - If notification delivery fails.
 */
async function sendMobileNotification(notificationData) {
    try {
        const result = await notificationService.sendToDevice(notificationData.token, notificationData.message);
        return { status: 'success', result };
    } catch (error) {
        return { status: 'error', message: 'Notification delivery failed' };
    }
}

/**
 * Updates the user preferences for a mobile user in the database.
 * @param {String} userId - The ID of the user whose preferences are to be updated.
 * @param {Object} preferences - The new preferences for the user.
 * @returns {Object} - Updated user details.
 * @throws {Error} - If updating preferences fails.
 */
async function updateUserPreferences(userId, preferences) {
    try {
        const updatedUser = await userService.updatePreferences(userId, preferences);
        return { status: 'success', user: updatedUser };
    } catch (error) {
        return { status: 'error', message: 'Failed to update user preferences' };
    }
}

module.exports = {
    authenticateMobileUser,
    sendMobileNotification,
    updateUserPreferences,
};
 
