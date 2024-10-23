// /backend/microservices/healthcare/routes/healthcareRoutes.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const appointmentController = require('../controllers/appointmentController');

/**
 * Configures and registers all healthcare-related routes in the application.
 */
function setupRoutes(app) {
    registerPatientRoutes(router);
    registerAppointmentRoutes(router);
    app.use('/api/healthcare', router);
}

/**
 * Registers routes related to patient management operations.
 */
function registerPatientRoutes(router) {
    // Route for registering a new patient
    router.post('/patients', patientController.registerPatient);

    // Route for retrieving details of an existing patient
    router.get('/patients/:id', patientController.getPatientDetails);

    // Route for updating an existing patient's record
    router.put('/patients/:id', patientController.updatePatientRecord);
}

/**
 * Registers routes related to appointment management operations.
 */
function registerAppointmentRoutes(router) {
    // Route for scheduling a new appointment
    router.post('/appointments', appointmentController.scheduleAppointment);

    // Route for retrieving details of an existing appointment
    router.get('/appointments/:id', appointmentController.getAppointmentDetails);

    // Route for updating an existing appointment
    router.put('/appointments/:id', appointmentController.updateAppointment);
}

// Export the setupRoutes function
module.exports = {
    setupRoutes
};
 
