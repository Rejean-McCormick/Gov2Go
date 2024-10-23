// File: /backend/core/utils/validators.js

const validators = {};

// Validate email format
validators.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format. Please enter a valid email address.');
  }
  
  return true;
};

// Validate password complexity and length
validators.validatePassword = (password) => {
  const minLength = 8;
  const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.length < minLength) {
    throw new Error(`Password must be at least ${minLength} characters long.`);
  }

  if (!complexityRegex.test(password)) {
    throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
  }

  return true;
};

// Validate phone number format
validators.validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  if (!phoneRegex.test(phoneNumber)) {
    throw new Error('Invalid phone number format. Please enter a valid phone number (e.g., +1234567890).');
  }

  return true;
};

// Validate required fields in a form submission
validators.validateRequiredFields = (formData, requiredFields) => {
  const missingFields = requiredFields.filter(field => !formData.hasOwnProperty(field) || !formData[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  return true;
};

module.exports = validators;
 
