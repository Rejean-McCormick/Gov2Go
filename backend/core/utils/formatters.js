// File: /backend/core/utils/formatters.js

const moment = require('moment');  // Library for date formatting

const formatters = {};

// Format a timestamp into a human-readable date format
formatters.formatDate = (timestamp, format = 'MM/DD/YYYY') => {
  if (!timestamp) {
    throw new Error('Invalid timestamp provided');
  }
  
  return moment(timestamp).format(format);
};

// Format a number into a currency string with a currency symbol
formatters.formatCurrency = (number, currencySymbol = '$') => {
  if (typeof number !== 'number') {
    throw new Error('Invalid number provided for currency formatting');
  }
  
  return `${currencySymbol}${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};

// Capitalize the first letter of the input string
formatters.capitalizeString = (inputString) => {
  if (typeof inputString !== 'string') {
    throw new Error('Invalid input, expected a string');
  }
  
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

// Truncate a string to the specified maxLength and append ellipses if needed
formatters.truncateString = (inputString, maxLength) => {
  if (typeof inputString !== 'string') {
    throw new Error('Invalid input, expected a string');
  }

  if (inputString.length > maxLength) {
    return inputString.slice(0, maxLength - 3) + '...';
  }
  
  return inputString;
};

module.exports = formatters;
 
