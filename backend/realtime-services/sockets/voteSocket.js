// voteSocket.js
// Manages WebSocket connections to provide real-time voting updates to connected clients.

class VoteSocket {
  constructor() {
    this.clients = new Set(); // Set to store connected clients
  }

  /**
   * Establishes a WebSocket connection with a client for receiving voting updates.
   * @param {WebSocket} client - The WebSocket client attempting to connect.
   */
  connectSocket(client) {
    console.log('Client connected for voting updates:', client.id);

    // Add the client to the set of connected clients
    this.clients.add(client);

    // Listen for messages from the client (if needed)
    client.on('message', (message) => {
      console.log(`Message received from client ${client.id}:`, message);
    });

    // Handle client disconnection
    client.on('close', () => {
      this.closeSocket(client);
    });
  }

  /**
   * Broadcasts a voting update to all connected clients.
   * @param {Object} voteData - The voting data to be broadcasted (e.g., new vote results).
   */
  broadcastVoteUpdate(voteData) {
    this.clients.forEach((client) => {
      client.send(JSON.stringify(voteData));
    });
    console.log('Voting update broadcasted to all clients:', voteData);
  }

  /**
   * Disconnects the WebSocket connection when a client ends the session.
   * @param {WebSocket} client - The WebSocket client that is disconnecting.
   */
  closeSocket(client) {
    console.log('Client disconnected from voting updates:', client.id);

    // Remove the client from the set of connected clients
    this.clients.delete(client);

    // Additional cleanup logic if necessary
  }
}

// Exporting an instance of VoteSocket for use in other parts of the application
module.exports = new VoteSocket();
 
