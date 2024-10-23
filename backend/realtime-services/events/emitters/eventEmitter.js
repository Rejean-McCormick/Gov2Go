// eventEmitter.js
// This file defines the base class for emitting and handling events within the real-time services system.
// It supports event broadcasting and listening, enabling reactive behavior across various components.

class EventEmitter {
  constructor() {
    // A map to hold event types and their associated listeners
    this.events = new Map();
  }

  /**
   * Emits an event of the given eventType with the associated payload.
   * @param {string} eventType - The type of the event being emitted.
   * @param {Object} payload - The data associated with the event.
   */
  emit(eventType, payload) {
    if (this.events.has(eventType)) {
      // Retrieve the listeners for the event type
      const listeners = this.events.get(eventType);
      // Invoke each listener with the provided payload
      listeners.forEach((listener) => listener(payload));
    }
  }

  /**
   * Registers an event listener for a specific eventType.
   * @param {string} eventType - The event type to listen for.
   * @param {function} handler - A callback function that will be invoked when the event is emitted.
   */
  onEvent(eventType, handler) {
    if (!this.events.has(eventType)) {
      // Initialize an empty array for new event types
      this.events.set(eventType, []);
    }
    // Add the listener to the array for the specified event type
    this.events.get(eventType).push(handler);
  }

  /**
   * Removes a specific event listener for a given event type.
   * @param {string} eventType - The event type to remove the listener from.
   * @param {function} handler - The specific handler function to remove.
   */
  offEvent(eventType, handler) {
    if (this.events.has(eventType)) {
      const listeners = this.events.get(eventType);
      const index = listeners.indexOf(handler);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
      // If no listeners are left, remove the event type from the map
      if (listeners.length === 0) {
        this.events.delete(eventType);
      }
    }
  }

  /**
   * Removes all listeners for a given event type.
   * @param {string} eventType - The event type to clear listeners for.
   */
  removeAllListeners(eventType) {
    if (this.events.has(eventType)) {
      this.events.delete(eventType);
    }
  }
}

// Example usage:
const eventEmitter = new EventEmitter();

// Register an event listener for 'USER_LOGIN'
eventEmitter.onEvent('USER_LOGIN', (payload) => {
  console.log(`User logged in: ${payload.userId}, Timestamp: ${payload.timestamp}`);
});

// Emit a 'USER_LOGIN' event
eventEmitter.emit('USER_LOGIN', { userId: '1234', timestamp: Date.now() });

// Remove the listener for 'USER_LOGIN'
const loginHandler = (payload) => {
  console.log(`User logged in: ${payload.userId}`);
};
eventEmitter.onEvent('USER_LOGIN', loginHandler);
eventEmitter.offEvent('USER_LOGIN', loginHandler);

module.exports = EventEmitter;
 
