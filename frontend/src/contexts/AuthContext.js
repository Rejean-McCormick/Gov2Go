import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // For making API requests

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide authentication state
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  // Function to handle user login
  const login = async (userData, token) => {
    try {
      setAuthState({
        isAuthenticated: true,
        user: userData,
        token: token,
      });

      // Example of storing token securely (e.g., in localStorage)
      localStorage.setItem('authToken', token);

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    try {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });

      // Clear stored token
      localStorage.removeItem('authToken');

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return authState.isAuthenticated;
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
 
