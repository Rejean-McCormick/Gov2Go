/**
* File: /frontend/src/utils/fileUpload.js
* Role: Utility functions for managing file uploads, including validation and integration with backend storage APIs.
*
* Methods:
* - validateFileType(): Checks if the uploaded file's type is allowed (e.g., image/jpeg, application/pdf).
* - uploadFile(): Sends the validated file to the backend API for storage.
* - getFileSize(): Returns the size of the file in bytes for size validation.
*/

const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

/**
 * Validate the file type based on the allowed types.
 * @param {File} file - The file to validate.
 * @returns {boolean} - True if the file type is valid, false otherwise.
 */
export const validateFileType = (file) => {
  return allowedFileTypes.includes(file.type);
};

/**
 * Get the size of the file.
 * @param {File} file - The file to check.
 * @returns {number} - The file size in bytes.
 */
export const getFileSize = (file) => {
  return file.size;
};

/**
 * Upload the file to the backend API.
 * @param {File} file - The file to upload.
 * @param {string} apiUrl - The backend API URL for file storage.
 * @returns {Promise} - Resolves with the API response if the upload is successful.
 */
export const uploadFile = async (file, apiUrl) => {
  try {
    if (!validateFileType(file)) {
      throw new Error('Invalid file type.');
    }

    if (getFileSize(file) > maxFileSize) {
      throw new Error('File size exceeds the limit.');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
 
