/**
* File: /frontend/src/utils/validation.js
* Role: Utility functions for validating form inputs such as email addresses and passwords.
*
* Instructions to Program:
* 1. Implement validation methods for common input fields.
* 2. Ensure robust error handling and return appropriate error messages when validation fails.
*
* Methods:
* - `validateEmail()`: Validates whether the email follows a proper format (e.g., user@example.com).
* - `validatePassword()`: Ensures that the password meets security requirements such as minimum length and complexity.
* - `isEmpty()`: Checks if an input field is empty or contains only whitespace.
*
* Usage:
* Use these functions across forms to validate user input before submission, ensuring that all data meets necessary criteria.
*/

// Validates email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }
  return null;
};

// Validates password with basic rules (e.g., minimum 8 characters, at least one number)
export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return 'Password must be at least 8 characters long and include at least one number';
  }
  return null;
};

// Checks if a field is empty
export const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'This field cannot be empty';
  }
  return null;
};

export default {
  validateEmail,
  validatePassword,
  isEmpty,
};
 
