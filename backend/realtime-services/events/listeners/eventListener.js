// eventListener.js
// This file defines a base class for setting up event listeners within the real-time services system.
// It provides foundational logic to listen for and process events emitted by various event emitters.

class EventListener {
  constructor() {
    this.events = {};
  }

  /**
   * Listens for a specific type of event and associates a handler function to process it.
   * @param {string} eventType - The type of event to listen for (e.g., 'NOTIFICATION_EVENT', 'VOTE_EVENT').
   * @param {function} handler - The function to handle the event when it is triggered.
   */
  listen(eventType, handler) {
    if (!this.events[eventType]) {
      this.events[eventType] = [];
    }
    // Add the handler function to the array of listeners for this event type
    this.events[eventType].push(handler);
  }

  /**
   * Handles the logic for processing an event when it occurs. This method is called by emitters.
   * @param {string} eventType - The type of event being processed.
   * @param {object} eventData - The data associated with the event.
   */
  handleEvent(eventType, eventData) {
    const handlers = this.events[eventType];
    if (handlers) {
      handlers.forEach((handler) => {
        try {
          handler(eventData);
        } catch (error) {
          console.error(`Error handling event ${eventType}:`, error);
        }
      });
    } else {
      console.warn(`No handlers registered for event type: ${eventType}`);
    }
  }
}

// Example usage
const eventListener = new EventListener();

// Listen for 'NOTIFICATION_EVENT' and log the notification message
eventListener.listen('NOTIFICATION_EVENT', (notificationData) => {
  console.log(`Notification received: ${notificationData.message}`);
});

// Listen for 'VOTE_EVENT' and log the voting details
eventListener.listen('VOTE_EVENT', (voteData) => {
  console.log(`Vote received: User ${voteData.userId} voted ${voteData.voteChoice}`);
});

// Simulating an event being emitted and handled
eventListener.handleEvent('NOTIFICATION_EVENT', { message: 'You have a new message!' });
eventListener.handleEvent('VOTE_EVENT', { userId: '12345', voteChoice: 'YES' });

module.exports = EventListener;
 
