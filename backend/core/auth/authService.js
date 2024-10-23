import api from './api';  // Import the Axios instance

// Auth Service
const authService = {
    async login(credentials) {
        try {
            const response = await api.post('/login', credentials);
            const { token, user } = response.data;
            // Store token in localStorage
            localStorage.setItem('authToken', token);
            return user;  // Return user data
        } catch (error) {
            throw error;  // Handle errors appropriately
        }
    },

    async register(userData) {
        try {
            const response = await api.post('/register', userData);
            const { token, user } = response.data;
            // Store token in localStorage
            localStorage.setItem('authToken', token);
            return user;  // Return user data
        } catch (error) {
            throw error;  // Handle errors appropriately
        }
    },

    logout() {
        localStorage.removeItem('authToken');  // Clear token on logout
    }
};

export default authService;
 
