import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeI18n } from './i18n/i18n'; // Import i18n initialization
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeContext for managing themes

// Initialize i18n for internationalization
initializeI18n();

// Render the application into the DOM with ThemeProvider for theme management
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
