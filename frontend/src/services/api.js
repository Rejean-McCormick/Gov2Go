import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: process.env.API_URL,  // Ensure you use environment variables for flexibility
    timeout: 10000,                // Set a 10-second timeout for requests
});

// Request Interceptor to add the auth token to headers if present
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken'); // Retrieve auth token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
        }
        return config;
    },
    error => {
        return Promise.reject(error);  // Handle request errors
    }
);

// Response Interceptor to handle global errors and response structure
api.interceptors.response.use(
    response => response,  // Simply return the response data
    error => {
        // Handle global error responses here
        return Promise.reject(error.response || error.message);
    }
);

// API Methods
export const get = (url, params) => api.get(url, { params }); // GET method
export const post = (url, data) => api.post(url, data);       // POST method
export const put = (url, data) => api.put(url, data);         // PUT method
export const deleteRequest = (url) => api.delete(url);        // DELETE method

// Function to set or remove auth token
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('authToken', token); // Store token in local storage
    } else {
        localStorage.removeItem('authToken');    // Remove token from storage
    }
};

export default api;
 
