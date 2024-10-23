// notificationSocket.js
// Manages WebSocket connections for real-time notification updates to clients.

class NotificationSocket {
  constructor() {
    this.clients = new Map(); // Map to store connected clients with their IDs
  }

  /**
   * Establishes a WebSocket connection with the client.
   * @param {WebSocket} client - The WebSocket client attempting to connect.
   */
  connectSocket(client) {
    console.log('Client connected:', client.id);
    
    // Store the client connection using its ID
    this.clients.set(client.id, client);

    // Listen for messages from the client (if needed for further interaction)
    client.on('message', (message) => {
      console.log(`Received message from client ${client.id}:`, message);
    });

    // Listen for disconnection
    client.on('close', () => {
      this.disconnectSocket(client);
    });
  }

  /**
   * Sends a notification message to the connected client.
   * @param {WebSocket} client - The WebSocket client receiving the notification.
   * @param {Object} message - The notification content to be sent.
   */
  sendNotification(client, message) {
    if (this.clients.has(client.id)) {
      client.send(JSON.stringify(message));
      console.log('Notification sent to client:', client.id);
    } else {
      console.log(`Client ${client.id} is not connected.`);
    }
  }

  /**
   * Closes the WebSocket connection when the client disconnects.
   * @param {WebSocket} client - The WebSocket client that is disconnecting.
   */
  disconnectSocket(client) {
    console.log('Client disconnected:', client.id);

    // Remove the client from the map of active connections
    this.clients.delete(client.id);

    // Additional cleanup logic if needed
  }
}

// Exporting the NotificationSocket instance for use in other parts of the application
module.exports = new NotificationSocket();
 
