// voteSub.js
// This file defines the subscriber logic for vote events in a publish-subscribe architecture.

class VoteSubscriber {
  constructor(publisher) {
    this.publisher = publisher;
  }

  /**
   * Subscribes to vote events that are published within the system.
   */
  subscribeToVoteEvents() {
    console.log('Subscribing to vote events...');
    // Subscribe to the vote events published by the publisher instance
    this.publisher.subscribe('voteUpdateService', this.processVoteUpdate);
  }

  /**
   * Processes voting updates as they are received.
   * @param {object} voteData - Object containing details about the vote (e.g., user ID, vote choice, timestamp).
   */
  processVoteUpdate(voteData) {
    console.log('Processing vote update:', voteData);
    // Add logic to handle the vote update
    // Example: Update vote count in the database, notify users, or log the vote details
    try {
      // Example logic for processing a vote
      console.log(`User ${voteData.userId} voted ${voteData.voteChoice} at ${voteData.timestamp}`);
      // You could add further functionality here, such as updating a database or triggering notifications.
    } catch (error) {
      console.error('Error processing vote update:', error);
    }
  }
}

// Example usage
const VotePublisher = require('./votePub'); // Importing the vote publisher
const votePubInstance = new VotePublisher();
const voteSub = new VoteSubscriber(votePubInstance);

// Start listening for vote events
voteSub.subscribeToVoteEvents();

// Simulate a vote event being published for testing
votePubInstance.publishVoteEvent({
  userId: '67890',
  voteChoice: 'NO',
  timestamp: new Date().toISOString(),
});

module.exports = VoteSubscriber;
 
