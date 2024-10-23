// notificationEventListener.js
// This file defines a listener specifically for handling notification-related events within the real-time services system.

const EventListener = require('./eventListener');

class NotificationEventListener extends EventListener {
  constructor() {
    super();
  }

  /**
   * Handles notification events when they are emitted by the system.
   * @param {object} notificationData - Object containing details about the notification (e.g., userId, message, timestamp).
   */
  onNotification(notificationData) {
    console.log(`New notification for user ${notificationData.userId}: ${notificationData.message}`);
    // Add additional logic here to send push notifications or update the user interface
  }

  /**
   * Logs the details of the received notification for later analysis or auditing.
   * @param {object} notificationData - The notification details to be logged (e.g., message content, userId, timestamp).
   */
  logNotification(notificationData) {
    console.log(`Notification logged: ${JSON.stringify(notificationData)}`);
    // Additional logic can be added here to save logs in a database or a logging service
  }
}

// Instantiate the NotificationEventListener
const notificationEventListener = new NotificationEventListener();

// Example usage: Listen for 'NOTIFICATION_EVENT' and process notifications
notificationEventListener.listen('NOTIFICATION_EVENT', (notificationData) => {
  notificationEventListener.onNotification(notificationData);
  notificationEventListener.logNotification(notificationData);
});

// Simulating an event being emitted
notificationEventListener.handleEvent('NOTIFICATION_EVENT', {
  userId: '1234',
  message: 'You have a new message!',
  timestamp: new Date().toISOString(),
});

module.exports = NotificationEventListener;
 
