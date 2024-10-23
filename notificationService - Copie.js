import api from './api'; // Importing the API instance
import { io } from 'socket.io-client'; // Importing socket.io-client for WebSocket connection

let socket;

const notificationService = {
    // Sends a notification using an API call
    async sendNotification(notificationData) {
        try {
            const response = await api.post('/notifications', notificationData);
            return response.data;
        } catch (error) {
            throw error; // Handle errors appropriately
        }
    },

    // Establishes WebSocket connection and listens for real-time notifications
    subscribeToNotifications(callback) {
        socket = io(process.env.SOCKET_URL); // Connect to the WebSocket server
        socket.on('notification', (data) => {
            callback(data); // Trigger the callback function when a notification is received
        });
    },

    // Closes the WebSocket connection
    disconnectNotifications() {
        if (socket) {
            socket.disconnect(); // Close the connection
        }
    }
};

export default notificationService;
