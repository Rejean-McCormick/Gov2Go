// setupTests.js
// Import necessary utilities from React Testing Library and Jest
import '@testing-library/jest-dom/extend-expect'; // Adds extra matchers to Jest
import { configure } from '@testing-library/react';

// Optionally configure the testing utilities globally
configure({
  asyncUtilTimeout: 1000, // Example configuration: set timeout for async utilities
});

// Mock browser APIs if needed for your tests
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// You can also include other global mocks or helpers here as needed
 
