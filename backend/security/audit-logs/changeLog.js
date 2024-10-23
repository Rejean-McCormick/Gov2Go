// changeLog.js
// Tracks changes made to critical data or system configurations, ensuring all modifications are logged for auditing and compliance purposes.

class ChangeLog {
  constructor() {
    this.changeLogs = []; // In-memory storage for change logs; replace with database or persistent storage in production
  }

  /**
   * Logs changes made to critical system data or configurations.
   * @param {Object} changeDetails - An object containing details of the change (e.g., { userId, changedData, timestamp, changeType }).
   */
  logChange(changeDetails) {
    // Validate change details
    if (!changeDetails.userId || !changeDetails.changedData || !changeDetails.timestamp || !changeDetails.changeType) {
      throw new Error('Invalid change details. userId, changedData, timestamp, and changeType are required.');
    }

    // Log the change event
    const logEntry = {
      userId: changeDetails.userId,
      changedData: changeDetails.changedData,
      timestamp: changeDetails.timestamp,
      changeType: changeDetails.changeType,
    };

    this.changeLogs.push(logEntry);
    console.log('Logging change:', logEntry);

    // In a real application, this would be stored in a database or a centralized logging system
    // Example: database.insert(logEntry);
  }

  /**
   * Retrieves change logs based on specific criteria, such as change type or time period.
   * @param {Object} filters - An object to filter the logs (e.g., { startDate, endDate, changeType }).
   * @returns {Array} - An array of logs matching the filters.
   */
  fetchChangeLogs(filters) {
    // Validate filters
    if (!filters || (!filters.startDate && !filters.endDate && !filters.changeType)) {
      throw new Error('At least one filter (startDate, endDate, changeType) is required.');
    }

    // Filter logs based on criteria
    const filteredLogs = this.changeLogs.filter((log) => {
      const matchChangeType = filters.changeType ? log.changeType === filters.changeType : true;
      const matchStartDate = filters.startDate ? new Date(log.timestamp) >= new Date(filters.startDate) : true;
      const matchEndDate = filters.endDate ? new Date(log.timestamp) <= new Date(filters.endDate) : true;

      return matchChangeType && matchStartDate && matchEndDate;
    });

    console.log('Fetching change logs with filters:', filters);
    return filteredLogs;
  }

  /**
   * Exports the change logs for external use, typically for compliance audits.
   * @param {String} exportFormat - The format in which the logs should be exported (e.g., 'CSV', 'PDF').
   * @returns {String|Buffer} - The exported logs in the specified format.
   */
  exportChangeLog(exportFormat) {
    if (!exportFormat || (exportFormat !== 'CSV' && exportFormat !== 'PDF')) {
      throw new Error('Invalid export format. Supported formats are CSV and PDF.');
    }

    console.log('Exporting change logs in format:', exportFormat);

    // Convert logs to the specified format (for simplicity, handling CSV here)
    if (exportFormat === 'CSV') {
      const csvHeader = 'userId,changedData,timestamp,changeType\n';
      const csvContent = this.changeLogs
        .map(log => `${log.userId},"${log.changedData}",${log.timestamp},${log.changeType}`)
        .join('\n');
      return csvHeader + csvContent;
    }

    // For PDF export, use a library like PDFKit to generate a PDF (mocking for simplicity)
    if (exportFormat === 'PDF') {
      // Example: use pdfkit to generate a PDF (not implemented here)
      console.log('PDF export is not yet implemented.');
      return 'PDF export not yet available'; // Placeholder for real PDF buffer
    }
  }
}

// Exporting an instance of ChangeLog for use in other parts of the application
module.exports = new ChangeLog();
 
