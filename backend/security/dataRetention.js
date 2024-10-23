// dataRetention.js
// Manages the enforcement of data retention policies to ensure compliance with regulations such as GDPR and CCPA.

const archiveSystem = require('./archiveSystem'); // Module for archiving data
const database = require('./database'); // Module for interacting with the database

class DataRetention {
  /**
   * Applies the retention policy by evaluating stored data against the defined retention rules.
   */
  applyRetentionPolicy() {
    console.log('Applying data retention policy...');
    const retentionRules = this.getRetentionRules(); // Fetch the retention rules
    const storedData = this.getStoredData(); // Retrieve all stored data

    storedData.forEach((data) => {
      if (this.shouldBeArchived(data, retentionRules)) {
        this.archiveData(data);
      } else if (this.isExpired(data, retentionRules)) {
        this.deleteExpiredData(data);
      }
    });
    console.log('Retention policy applied.');
  }

  /**
   * Archives data that needs long-term storage for compliance.
   * @param {Object} data - The data object to be archived.
   */
  archiveData(data) {
    try {
      archiveSystem.store(data);
      console.log(`Data archived: ${data.id}`);
    } catch (err) {
      console.error('Error archiving data:', err);
      throw new Error('Failed to archive data.');
    }
  }

  /**
   * Deletes data that has passed its retention period according to compliance rules.
   * @param {Object} data - The data object to be deleted.
   */
  deleteExpiredData(data) {
    try {
      database.delete(data.id);
      console.log(`Data deleted: ${data.id}`);
    } catch (err) {
      console.error('Error deleting data:', err);
      throw new Error('Failed to delete expired data.');
    }
  }

  /**
   * Retrieves the retention rules from configuration or policy settings.
   * @returns {Object} - An object containing retention rules.
   */
  getRetentionRules() {
    // Mocked example: In practice, this would fetch from a config file or environment variable
    return {
      archiveAfterDays: 365,
      deleteAfterDays: 730
    };
  }

  /**
   * Fetches all stored data to evaluate against the retention rules.
   * @returns {Array} - An array of data objects.
   */
  getStoredData() {
    // Mocked example: Replace with actual database retrieval logic
    return database.getAllData();
  }

  /**
   * Checks if the data should be archived based on retention rules.
   * @param {Object} data - The data object.
   * @param {Object} retentionRules - The retention rules to evaluate against.
   * @returns {boolean} - True if the data should be archived.
   */
  shouldBeArchived(data, retentionRules) {
    const creationDate = new Date(data.creationDate);
    const archiveThreshold = new Date();
    archiveThreshold.setDate(archiveThreshold.getDate() - retentionRules.archiveAfterDays);

    return creationDate <= archiveThreshold;
  }

  /**
   * Checks if the data has expired and should be deleted based on retention rules.
   * @param {Object} data - The data object.
   * @param {Object} retentionRules - The retention rules to evaluate against.
   * @returns {boolean} - True if the data should be deleted.
   */
  isExpired(data, retentionRules) {
    const creationDate = new Date(data.creationDate);
    const deleteThreshold = new Date();
    deleteThreshold.setDate(deleteThreshold.getDate() - retentionRules.deleteAfterDays);

    return creationDate <= deleteThreshold;
  }
}

// Exporting an instance of DataRetention for use in other parts of the application
module.exports = new DataRetention();
 
