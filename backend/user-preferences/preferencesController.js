// preferencesController.js
// Manages user preferences, allowing users to customize their experience by setting options such as language, theme, and notification preferences.

const preferencesService = require('./preferencesService'); // Service handling the logic for user preferences
const preferencesController = {
  /**
   * Retrieves the current preferences for a specified user.
   * @param {string} userId - Unique identifier for the user.
   * @returns {Object} - JSON object containing user preferences.
   */
  getUserPreferences: async (userId) => {
    try {
      const preferences = await preferencesService.getPreferences(userId);
      return {
        status: 200,
        data: preferences,
      };
    } catch (error) {
      console.error('Error retrieving user preferences:', error);
      return {
        status: 500,
        message: 'Error retrieving user preferences',
      };
    }
  },

  /**
   * Updates the user's preferences based on the provided data.
   * @param {string} userId - Unique identifier for the user.
   * @param {Object} preferencesData - Object containing updated preference settings.
   * @returns {Object} - JSON response confirming the update.
   */
  updateUserPreferences: async (userId, preferencesData) => {
    try {
      const updatedPreferences = await preferencesService.updatePreferences(userId, preferencesData);
      return {
        status: 200,
        message: 'Preferences updated successfully',
        data: updatedPreferences,
      };
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return {
        status: 500,
        message: 'Error updating user preferences',
      };
    }
  },

  /**
   * Resets a user’s preferences to their default settings.
   * @param {string} userId - Unique identifier for the user.
   * @returns {Object} - JSON response indicating success or failure of the reset operation.
   */
  resetPreferencesToDefault: async (userId) => {
    try {
      const defaultPreferences = await preferencesService.resetToDefault(userId);
      return {
        status: 200,
        message: 'Preferences reset to default successfully',
        data: defaultPreferences,
      };
    } catch (error) {
      console.error('Error resetting user preferences:', error);
      return {
        status: 500,
        message: 'Error resetting user preferences',
      };
    }
  },
};

module.exports = preferencesController;
 
