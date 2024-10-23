// votePub.js
// This file defines the publisher logic for vote events in a publish-subscribe architecture.

class VotePublisher {
  constructor() {
    this.subscribers = {}; // Object to store subscribers with their corresponding handlers
  }

  /**
   * Publishes a new voting event to all subscribed services.
   * @param {object} voteData - Object containing the details of the vote (e.g., user ID, vote choice, timestamp).
   */
  publishVoteEvent(voteData) {
    console.log('Publishing vote event...', voteData);

    // Iterate over all subscribers and invoke their handlers with the voteData
    for (const serviceId in this.subscribers) {
      if (this.subscribers.hasOwnProperty(serviceId)) {
        const handler = this.subscribers[serviceId];
        try {
          handler(voteData);
          console.log(`Vote event sent to subscriber: ${serviceId}`);
        } catch (error) {
          console.error(`Error notifying subscriber ${serviceId}:`, error);
        }
      }
    }
  }

  /**
   * Subscribes a service to receive vote updates.
   * @param {string} serviceId - The identifier of the subscribing service.
   * @param {function} handler - The function to call when a vote event is published.
   */
  subscribe(serviceId, handler) {
    if (typeof handler !== 'function') {
      throw new Error('Handler must be a function');
    }
    this.subscribers[serviceId] = handler;
    console.log(`Service ${serviceId} subscribed for vote updates.`);
  }

  /**
   * Unsubscribes a specific service from receiving vote updates.
   * @param {string} serviceId - The identifier of the service to be unsubscribed.
   */
  unsubscribe(serviceId) {
    if (this.subscribers[serviceId]) {
      delete this.subscribers[serviceId];
      console.log(`Service ${serviceId} has been unsubscribed from vote updates.`);
    } else {
      console.warn(`Service ${serviceId} is not currently subscribed.`);
    }
  }
}

// Example usage
const votePub = new VotePublisher();

// Example subscriber
votePub.subscribe('analyticsService', (voteData) => {
  console.log(`Analytics Service received vote event: ${JSON.stringify(voteData)}`);
});

// Publishing a vote event
votePub.publishVoteEvent({
  userId: '12345',
  voteChoice: 'YES',
  timestamp: new Date().toISOString(),
});

// Unsubscribing a service
votePub.unsubscribe('analyticsService');

module.exports = VotePublisher;
 
