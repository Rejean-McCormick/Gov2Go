// voteEventListener.js
// This file defines a listener for handling vote-related events within the real-time services system.

const EventListener = require('./eventListener');

class VoteEventListener extends EventListener {
  constructor() {
    super();
  }

  /**
   * Handles new votes cast by users when they are emitted as events.
   * @param {object} voteData - Object containing details about the vote (e.g., user ID, vote choice, timestamp).
   */
  onVoteCast(voteData) {
    console.log(`New vote cast by user: ${voteData.userId}, Choice: ${voteData.voteChoice}`);
    // Add additional logic here to handle the vote, such as saving to the database
    this.updateVoteCount({ voteChoice: voteData.voteChoice });
  }

  /**
   * Updates the vote count in the system based on new voting events.
   * @param {object} voteCountData - Object containing information about the updated vote count (e.g., total votes, time of update).
   */
  updateVoteCount(voteCountData) {
    console.log(`Updating vote count for choice: ${voteCountData.voteChoice}`);
    // Add additional logic here to update the vote count in the system, such as incrementing counts in the database
  }
}

// Instantiate the VoteEventListener
const voteEventListener = new VoteEventListener();

// Example usage: Listen for 'VOTE_EVENT' and process vote events
voteEventListener.listen('VOTE_EVENT', (voteData) => {
  voteEventListener.onVoteCast(voteData);
});

// Simulating a vote event being emitted
voteEventListener.handleEvent('VOTE_EVENT', {
  userId: '12345',
  voteChoice: 'YES',
  timestamp: new Date().toISOString()
});

module.exports = VoteEventListener;
 
