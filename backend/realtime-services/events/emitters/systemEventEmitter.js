// systemEventEmitter.js
// This file defines an event emitter for managing system-wide events such as status updates, errors, and critical alerts.
// It handles the emission and subscription of system-related events to facilitate monitoring and alerting services.

const EventEmitter = require('./eventEmitter'); // Import the base EventEmitter class

class SystemEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * Emits a system-wide event with the specified type and data.
   * @param {string} eventType - The type of the event (e.g., 'SYSTEM_UPDATE', 'ERROR').
   * @param {object} eventData - The details of the event (e.g., error message or status update information).
   */
  emitSystemEvent(eventType, eventData) {
    // Emit the event with the given type and data
    this.emit(eventType, eventData);
  }

  /**
   * Registers a listener for critical system alerts.
   * @param {string} alertType - The type of alert to listen for (e.g., 'HIGH_CPU_USAGE').
   * @param {function} handler - The function to execute when the alert is emitted.
   */
  onSystemAlert(alertType, handler) {
    // Register the handler for the specified alert type
    this.onEvent(alertType, handler);
  }
}

// Example usage
const systemEventEmitter = new SystemEventEmitter();

// Subscribe to an 'ERROR' event
systemEventEmitter.onSystemAlert('ERROR', (alertData) => {
  console.error(`System Error: ${alertData.message} (Code: ${alertData.code})`);
});

// Emit an 'ERROR' event
systemEventEmitter.emitSystemEvent('ERROR', { message: 'Database connection failed', code: 500 });

// Subscribe to a 'HIGH_CPU_USAGE' alert
systemEventEmitter.onSystemAlert('HIGH_CPU_USAGE', (alertData) => {
  console.warn(`Alert: High CPU usage detected! Details: ${JSON.stringify(alertData)}`);
});

// Emit a 'HIGH_CPU_USAGE' alert
systemEventEmitter.emitSystemEvent('HIGH_CPU_USAGE', { cpuLoad: 95, timestamp: Date.now() });

module.exports = SystemEventEmitter;
 
