// /backend/microservices/healthcare/services/appointmentService.js

const AppointmentModel = require('../models/appointmentModel');
const { Op } = require('sequelize');

/**
 * Schedules a new appointment for a patient with the specified doctor at the given time.
 * @param {string} patientId - The ID of the patient.
 * @param {string} doctorId - The ID of the doctor.
 * @param {Date} appointmentTime - The scheduled time for the appointment.
 * @returns {Promise<Object>} - The newly created appointment or an error message.
 */
async function createAppointment(patientId, doctorId, appointmentTime) {
    try {
        // Validate input data
        if (!patientId || !doctorId || !appointmentTime) {
            throw new Error('Invalid input data');
        }

        // Check if the doctor is available at the requested time
        const conflictingAppointment = await AppointmentModel.findOne({
            where: {
                doctorId,
                appointmentTime: appointmentTime
            }
        });

        if (conflictingAppointment) {
            return { status: 'error', message: 'Doctor is not available at the requested time' };
        }

        // Create the appointment
        const newAppointment = await AppointmentModel.create({
            patientId,
            doctorId,
            appointmentTime
        });

        return { status: 'success', appointment: newAppointment };
    } catch (error) {
        console.error('Error creating appointment:', error);
        return { status: 'error', message: 'Failed to create appointment' };
    }
}

/**
 * Updates the details of an existing appointment.
 * @param {string} appointmentId - The ID of the appointment to update.
 * @param {Object} updatedDetails - The updated appointment details (e.g., time, doctorId).
 * @returns {Promise<Object>} - The updated appointment details or an error message.
 */
async function modifyAppointment(appointmentId, updatedDetails) {
    try {
        // Find the appointment by ID
        const appointment = await AppointmentModel.findOne({ where: { id: appointmentId } });

        if (!appointment) {
            return { status: 'error', message: 'Appointment not found' };
        }

        // Update the appointment details
        await AppointmentModel.update(updatedDetails, { where: { id: appointmentId } });
        const updatedAppointment = await AppointmentModel.findOne({ where: { id: appointmentId } });

        return { status: 'success', appointment: updatedAppointment };
    } catch (error) {
        console.error('Error modifying appointment:', error);
        return { status: 'error', message: 'Failed to update appointment' };
    }
}

/**
 * Cancels a scheduled appointment.
 * @param {string} appointmentId - The ID of the appointment to cancel.
 * @returns {Promise<Object>} - Confirmation message or an error message.
 */
async function cancelAppointment(appointmentId) {
    try {
        // Find the appointment by ID
        const appointment = await AppointmentModel.findOne({ where: { id: appointmentId } });

        if (!appointment) {
            return { status: 'error', message: 'Appointment not found' };
        }

        // Mark the appointment as canceled (soft delete)
        await AppointmentModel.destroy({ where: { id: appointmentId } });

        return { status: 'success', message: 'Appointment canceled successfully' };
    } catch (error) {
        console.error('Error canceling appointment:', error);
        return { status: 'error', message: 'Failed to cancel appointment' };
    }
}

// Export the service methods
module.exports = {
    createAppointment,
    modifyAppointment,
    cancelAppointment
};
 
