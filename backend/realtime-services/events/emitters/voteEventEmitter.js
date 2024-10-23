// voteEventEmitter.js
// This file defines an event emitter for managing vote-related events such as casting votes and updating vote statuses.
// It enables real-time broadcasting and handling of voting events within the system.

const EventEmitter = require('./eventEmitter'); // Import the base EventEmitter class

class VoteEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * Emits a new vote event with the provided voting details.
   * @param {object} voteDetails - An object containing voting data.
   * @param {string} voteDetails.userId - The ID of the user casting the vote.
   * @param {string} voteDetails.voteChoice - The option chosen by the user.
   * @param {string} voteDetails.timestamp - The timestamp of when the vote was cast.
   */
  emitVoteEvent(voteDetails) {
    // Validate the vote details before emitting
    if (!voteDetails.userId || !voteDetails.voteChoice || !voteDetails.timestamp) {
      throw new Error('Invalid vote details provided');
    }

    // Emit the vote event with the type 'NEW_VOTE' and the vote details
    this.emit('NEW_VOTE', voteDetails);
  }

  /**
   * Subscribes to changes in vote events such as updates or cancellations.
   * @param {string} changeType - The type of vote change to listen for (e.g., 'VOTE_UPDATE', 'VOTE_CANCEL').
   * @param {function} handler - The function to execute when the vote change event is emitted.
   */
  subscribeToVoteChanges(changeType, handler) {
    // Register the handler for the specified change type
    this.onEvent(changeType, handler);
  }
}

// Example usage
const voteEventEmitter = new VoteEventEmitter();

// Subscribe to a 'VOTE_UPDATE' event
voteEventEmitter.subscribeToVoteChanges('VOTE_UPDATE', (voteUpdateData) => {
  console.log(`Vote Updated: ${JSON.stringify(voteUpdateData)}`);
});

// Emit a new vote event
voteEventEmitter.emitVoteEvent({
  userId: '12345',
  voteChoice: 'YES',
  timestamp: new Date().toISOString(),
});

// Subscribe to a 'VOTE_CANCEL' event
voteEventEmitter.subscribeToVoteChanges('VOTE_CANCEL', (cancelData) => {
  console.log(`Vote Canceled: ${JSON.stringify(cancelData)}`);
});

// Emit a vote update event
voteEventEmitter.emit('VOTE_UPDATE', {
  userId: '12345',
  previousChoice: 'YES',
  newChoice: 'NO',
  timestamp: new Date().toISOString(),
});

// Emit a vote cancelation event
voteEventEmitter.emit('VOTE_CANCEL', {
  userId: '12345',
  timestamp: new Date().toISOString(),
});

module.exports = VoteEventEmitter;
 
