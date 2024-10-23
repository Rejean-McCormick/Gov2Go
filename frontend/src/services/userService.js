 
import api from './api';  // Import the configured Axios instance

// User Service
const userService = {
    // Fetches detailed user information from the backend
    async getUserDetails() {
        try {
            const response = await api.get('/user');
            return response.data;  // Return user data
        } catch (error) {
            throw error;  // Handle errors appropriately
        }
    },

    // Sends updated user information to the backend
    async updateUserDetails(userData) {
        try {
            const response = await api.put('/user', userData);
            return response.data;  // Return the updated user data
        } catch (error) {
            throw error;  // Handle errors appropriately
        }
    },

    // Deletes a user account by sending a request to the backend
    async deleteUser(userId) {
        try {
            const response = await api.delete(`/user/${userId}`);
            return response.data;  // Confirm deletion
        } catch (error) {
            throw error;  // Handle errors appropriately
        }
    }
};

export default userService;
