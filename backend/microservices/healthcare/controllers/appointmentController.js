// /backend/microservices/healthcare/controllers/appointmentController.js

const AppointmentModel = require('../models/appointmentModel'); // Assuming AppointmentModel is defined
const { validationResult } = require('express-validator'); // For input validation

/**
 * Schedules a new healthcare appointment for a patient.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function scheduleAppointment(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { patientId } = req.params;
        const appointmentDetails = req.body;
        const newAppointment = await AppointmentModel.create({ patientId, ...appointmentDetails });
        res.status(201).json({ status: 'success', appointment: newAppointment });
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        res.status(500).json({ status: 'error', message: 'Failed to schedule appointment' });
    }
}

/**
 * Updates the details of an existing appointment.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function updateAppointment(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { appointmentId } = req.params;
        const updatedDetails = req.body;
        const [updated] = await AppointmentModel.update(updatedDetails, { where: { id: appointmentId } });

        if (updated) {
            const updatedAppointment = await AppointmentModel.findOne({ where: { id: appointmentId } });
            res.status(200).json({ status: 'success', appointment: updatedAppointment });
        } else {
            res.status(404).json({ status: 'error', message: 'Appointment not found' });
        }
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ status: 'error', message: 'Failed to update appointment' });
    }
}

/**
 * Retrieves detailed information about a specific appointment.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getAppointmentDetails(req, res) {
    try {
        const { appointmentId } = req.params;
        const appointment = await AppointmentModel.findOne({ where: { id: appointmentId } });

        if (appointment) {
            res.status(200).json({ status: 'success', appointment });
        } else {
            res.status(404).json({ status: 'error', message: 'Appointment not found' });
        }
    } catch (error) {
        console.error('Error retrieving appointment details:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve appointment details' });
    }
}

// Export the controller methods
module.exports = {
    scheduleAppointment,
    updateAppointment,
    getAppointmentDetails
};
