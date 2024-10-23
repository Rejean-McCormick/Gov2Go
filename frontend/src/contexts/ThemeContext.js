import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// ThemeProvider component to provide theme settings
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');  // Default theme is light

  // Apply theme to the body class when the theme changes
  useEffect(() => {
    document.body.className = theme;  // Update the body class based on the theme
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));  // Switch between themes
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for accessing the theme context
export const useTheme = () => {
  return useContext(ThemeContext);  // Return the context
};
 
