 
// /backend/monitoring/analytics/systemLogs.js

const logStorageService = require('./services/logStorageService');
const archiveService = require('./services/archiveService');

/**
 * Logs a specific system event with relevant details such as timestamp, event type, and severity.
 * @param {String} eventType - The type of event (e.g., error, warning, info).
 * @param {String} severity - The severity level of the event (e.g., low, medium, high).
 * @param {Object} details - Additional details about the event.
 * @returns {Promise<Object>} - Confirmation of log entry storage.
 */
async function logEvent(eventType, severity, details) {
    try {
        const logEntry = {
            timestamp: new Date(),
            eventType,
            severity,
            details,
        };

        const result = await logStorageService.store(logEntry);
        return { status: 'success', logId: result.id };
    } catch (error) {
        return { status: 'error', message: 'Failed to log event' };
    }
}

/**
 * Retrieves logs based on specified filters, such as time range, severity level, or event type.
 * @param {Object} filter - Criteria for filtering logs (e.g., time range, severity, event type).
 * @returns {Promise<Array>} - Array of logs matching the filter criteria.
 */
async function fetchSystemLogs(filter) {
    try {
        const logs = await logStorageService.queryLogs(filter);
        return { status: 'success', logs };
    } catch (error) {
        return { status: 'error', message: 'Failed to retrieve logs' };
    }
}

/**
 * Archives older logs for long-term storage or compliance purposes.
 * @param {Date} olderThanDate - Date before which logs should be archived.
 * @returns {Promise<Object>} - Confirmation of successful log archiving.
 */
async function archiveLogs(olderThanDate) {
    try {
        const logsToArchive = await logStorageService.getLogsOlderThan(olderThanDate);
        const result = await archiveService.archive(logsToArchive);
        return { status: 'success', archivedCount: result.count };
    } catch (error) {
        return { status: 'error', message: 'Failed to archive logs' };
    }
}

module.exports = {
    logEvent,
    fetchSystemLogs,
    archiveLogs,
};
