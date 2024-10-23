// accessLog.js
// Logs and manages access events such as user logins and API requests for auditing and monitoring purposes.

class AccessLog {
  constructor() {
    this.logs = []; // In-memory storage for logs, replace with database or persistent storage in production
  }

  /**
   * Logs access events with relevant details such as user ID, timestamp, and action performed.
   * @param {Object} eventDetails - An object containing the details of the access event (e.g., { userId, timestamp, action }).
   */
  logAccess(eventDetails) {
    // Validate event details
    if (!eventDetails.userId || !eventDetails.timestamp || !eventDetails.action) {
      throw new Error('Invalid event details. userId, timestamp, and action are required.');
    }

    // Log the access event
    const logEntry = {
      userId: eventDetails.userId,
      timestamp: eventDetails.timestamp,
      action: eventDetails.action,
      additionalInfo: eventDetails.additionalInfo || null, // Optional field for additional details
    };

    this.logs.push(logEntry);
    console.log('Access logged:', logEntry);

    // In a real application, you would store this in a database or a centralized logging system
    // Example: database.insert(logEntry);
  }

  /**
   * Retrieves access logs for auditing or review based on provided filters such as time range or user ID.
   * @param {Object} filters - An object containing the criteria to filter logs (e.g., { startTime, endTime, userId }).
   * @returns {Array} - An array of logs matching the filters.
   */
  retrieveAccessLogs(filters) {
    // Validate filters
    if (!filters || (!filters.startTime && !filters.endTime && !filters.userId)) {
      throw new Error('At least one filter (startTime, endTime, userId) is required.');
    }

    // Filter logs based on criteria
    const filteredLogs = this.logs.filter((log) => {
      const matchUserId = filters.userId ? log.userId === filters.userId : true;
      const matchStartTime = filters.startTime ? new Date(log.timestamp) >= new Date(filters.startTime) : true;
      const matchEndTime = filters.endTime ? new Date(log.timestamp) <= new Date(filters.endTime) : true;

      return matchUserId && matchStartTime && matchEndTime;
    });

    console.log('Retrieving logs with filters:', filters);
    return filteredLogs;
  }
}

// Exporting an instance of AccessLog for use in other parts of the application
module.exports = new AccessLog();
 
