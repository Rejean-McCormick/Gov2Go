// /backend/mobile/pushNotifications.js

const notificationService = require('./services/notificationService');
const externalPushService = require('./services/externalPushService'); // e.g., FCM or APNS integration
const notificationScheduler = require('./services/notificationScheduler'); // Scheduling service for notifications

/**
 * Sends an immediate push notification to the specified mobile user using their device token.
 * @param {String} userId - The ID of the user to receive the notification.
 * @param {String} message - The content of the notification message.
 * @returns {Object} - Result of the notification delivery.
 * @throws {Error} - If no device token is found or notification sending fails.
 */
async function sendPushNotification(userId, message) {
    try {
        const userToken = await notificationService.getUserDeviceToken(userId);
        if (!userToken) {
            throw new Error('No device token found for user');
        }

        const result = await externalPushService.send(userToken, message);
        return { status: 'success', result };
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}

/**
 * Schedules a push notification for future delivery based on the specified time.
 * @param {String} userId - The ID of the user to receive the notification.
 * @param {String} message - The content of the notification message.
 * @param {Date} deliveryTime - The scheduled time for delivering the notification.
 * @returns {Object} - Confirmation of the scheduled notification.
 * @throws {Error} - If scheduling fails.
 */
async function scheduleNotification(userId, message, deliveryTime) {
    try {
        const notification = {
            userId,
            message,
            deliveryTime,
        };

        const result = await notificationScheduler.schedule(notification);
        return { status: 'success', scheduledNotificationId: result.id };
    } catch (error) {
        return { status: 'error', message: 'Failed to schedule notification' };
    }
}

/**
 * Cancels a previously scheduled push notification based on the notification ID.
 * @param {String} notificationId - The ID of the scheduled notification to cancel.
 * @returns {Object} - Confirmation of cancellation.
 * @throws {Error} - If cancellation fails.
 */
async function cancelScheduledNotification(notificationId) {
    try {
        const result = await notificationScheduler.cancel(notificationId);
        return { status: 'success', message: 'Notification canceled successfully' };
    } catch (error) {
        return { status: 'error', message: 'Failed to cancel scheduled notification' };
    }
}

module.exports = {
    sendPushNotification,
    scheduleNotification,
    cancelScheduledNotification,
};
 
