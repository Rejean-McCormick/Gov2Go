// notificationEventEmitter.js
// This file defines a specialized event emitter for managing notification-related events in the real-time services system.
// It handles the emission and subscription of events related to user notifications, such as new messages or alerts.

const EventEmitter = require('./eventEmitter'); // Import the base EventEmitter class

class NotificationEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * Emits a notification event with the given user ID, message, and timestamp.
   * @param {string} userId - The ID of the user receiving the notification.
   * @param {string} message - The content of the notification message.
   * @param {number} timestamp - The time when the notification is created.
   */
  emitNotification(userId, message, timestamp) {
    const notificationPayload = {
      userId,
      message,
      timestamp,
    };
    // Emit a general notification event
    this.emit('NOTIFICATION', notificationPayload);
  }

  /**
   * Subscribes a handler function to a specific type of notification event.
   * @param {string} eventType - The notification event type to listen for (e.g., 'NEW_MESSAGE').
   * @param {function} handler - The callback function to be triggered when the event is emitted.
   */
  subscribeToNotifications(eventType, handler) {
    this.onEvent(eventType, handler);
  }
}

// Example usage
const notificationEventEmitter = new NotificationEventEmitter();

// Subscribe to a 'NEW_MESSAGE' event
notificationEventEmitter.subscribeToNotifications('NEW_MESSAGE', (notification) => {
  console.log(`New message for user ${notification.userId}: ${notification.message}`);
});

// Emit a 'NEW_MESSAGE' event
notificationEventEmitter.emitNotification('1234', 'You have a new message', Date.now());

module.exports = NotificationEventEmitter;
 
