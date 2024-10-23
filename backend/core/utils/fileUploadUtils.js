// File: /backend/core/utils/fileUploadUtils.js

const fs = require('fs');
const path = require('path');

// Log helper for file uploads
const logStatus = (message) => {
  console.log(`${new Date().toISOString()} - ${message}`);
};

const fileUploadUtils = {};

// Validate the file format against allowed formats
fileUploadUtils.validateFileFormat = (file, allowedFormats) => {
  const fileExtension = path.extname(file.originalname).toLowerCase().replace('.', '');
  
  if (!allowedFormats.includes(fileExtension)) {
    throw new Error(`Invalid file format. Allowed formats are: ${allowedFormats.join(', ')}`);
  }
  
  logStatus(`File format validated: ${file.originalname}`);
  return true;
};

// Check the file size against the max allowed size
fileUploadUtils.checkFileSize = (file, maxSize) => {
  const fileSize = file.size;  // Size in bytes
  
  if (fileSize > maxSize) {
    throw new Error(`File size exceeds the limit of ${maxSize / 1024 / 1024} MB`);
  }

  logStatus(`File size validated: ${file.originalname}, Size: ${fileSize} bytes`);
  return true;
};

// Save the file to a specified location
fileUploadUtils.saveFile = (file, destinationPath) => {
  return new Promise((resolve, reject) => {
    const sanitizedFileName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.\-_]/g, '_');  // Sanitize file name
    const fullPath = path.join(destinationPath, sanitizedFileName);
    
    // Write the file to the specified destination asynchronously
    fs.writeFile(fullPath, file.buffer, (err) => {
      if (err) {
        logStatus(`File save failed: ${file.originalname} - ${err.message}`);
        return reject(new Error('File could not be saved'));
      }

      logStatus(`File saved successfully: ${fullPath}`);
      resolve(fullPath);
    });
  });
};

module.exports = fileUploadUtils;
 
