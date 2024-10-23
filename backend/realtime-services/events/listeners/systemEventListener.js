// systemEventListener.js
// This file defines a listener for handling system-wide events within the real-time services system.

const EventListener = require('./eventListener');

class SystemEventListener extends EventListener {
  constructor() {
    super();
  }

  /**
   * Handles system-level events when they are emitted by the system.
   * @param {object} eventData - Object containing details about the system event (e.g., status change, error message).
   */
  onSystemEvent(eventData) {
    console.log(`System event detected: ${eventData.status}`);
    // Add additional logic here to process or log the system event, such as writing to a log file or a monitoring service
  }

  /**
   * Sends alerts to administrators when critical system events or errors occur.
   * @param {object} alertData - Object containing details about the alert (e.g., error type, severity, timestamp).
   */
  alertAdmin(alertData) {
    console.log(`Alerting admin: Critical issue detected: ${alertData.errorType}`);
    // Add additional logic here to send alerts, such as sending an email, SMS, or posting to a monitoring dashboard
  }
}

// Instantiate the SystemEventListener
const systemEventListener = new SystemEventListener();

// Example usage: Listen for 'SYSTEM_EVENT' and process system events
systemEventListener.listen('SYSTEM_EVENT', (eventData) => {
  systemEventListener.onSystemEvent(eventData);
  
  // If the event is critical, alert the admin
  if (eventData.severity === 'critical') {
    systemEventListener.alertAdmin({
      errorType: eventData.errorType,
      severity: eventData.severity,
      timestamp: eventData.timestamp,
      message: eventData.message,
    });
  }
});

// Simulating an event being emitted
systemEventListener.handleEvent('SYSTEM_EVENT', {
  status: 'ERROR',
  errorType: 'Database Connection Failure',
  severity: 'critical',
  timestamp: new Date().toISOString(),
  message: 'The database connection failed due to timeout.',
});

module.exports = SystemEventListener;
 
