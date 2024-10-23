import { useState, useEffect } from 'react';

// Custom hook to manage user authentication
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    // Check for stored token in local storage when the component mounts
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    // Login function that interacts with the backend API
    const login = async (credentials) => {
        try {
            // Make the API call to login the user
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.token) {
                // Save the token and update the login state
                setToken(data.token);
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
            } else {
                // Handle invalid credentials or failed login attempt
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    // Logout function that clears the authentication token and state
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    // Function to check if the user is authenticated
    const isAuthenticated = () => {
        return isLoggedIn;
    };

    // Return the authentication methods and state
    return {
        login,
        logout,
        isAuthenticated,
        token,
    };
};

export default useAuth;
 
