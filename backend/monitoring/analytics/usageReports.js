// /backend/monitoring/analytics/usageReports.js

const userActivityService = require('./services/userActivityService');
const systemMetricsService = require('./services/systemMetricsService');
const reportGenerator = require('./services/reportGenerator');
const reportExportService = require('./services/reportExportService');

/**
 * Generates a user activity report for a specified time range, detailing user interactions and engagement metrics.
 * @param {Date} startDate - The start date for the report period.
 * @param {Date} endDate - The end date for the report period.
 * @returns {Promise<Object>} - The generated user activity report.
 */
async function generateUserReport(startDate, endDate) {
    try {
        const userActivityData = await userActivityService.getActivityData(startDate, endDate);
        const report = await reportGenerator.createUserReport(userActivityData);
        return { status: 'success', report };
    } catch (error) {
        return { status: 'error', message: 'Failed to generate user report' };
    }
}

/**
 * Generates a system performance report for a specified time range, summarizing system metrics such as CPU usage and memory consumption.
 * @param {Date} startDate - The start date for the report period.
 * @param {Date} endDate - The end date for the report period.
 * @returns {Promise<Object>} - The generated system performance report.
 */
async function generateSystemPerformanceReport(startDate, endDate) {
    try {
        const systemMetrics = await systemMetricsService.getPerformanceData(startDate, endDate);
        const report = await reportGenerator.createSystemPerformanceReport(systemMetrics);
        return { status: 'success', report };
    } catch (error) {
        return { status: 'error', message: 'Failed to generate system performance report' };
    }
}

/**
 * Exports a given report in the specified format (e.g., PDF, CSV).
 * @param {Object} reportData - The data to be exported.
 * @param {String} format - The format for exporting the report ('PDF' or 'CSV').
 * @returns {Promise<Object>} - The exported report file or an error message.
 */
async function exportReport(reportData, format) {
    try {
        const exportedFile = await reportExportService.export(reportData, format);
        return { status: 'success', file: exportedFile };
    } catch (error) {
        return { status: 'error', message: 'Failed to export report' };
    }
}

module.exports = {
    generateUserReport,
    generateSystemPerformanceReport,
    exportReport,
};
 
