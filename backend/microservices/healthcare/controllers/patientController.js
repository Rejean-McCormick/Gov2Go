// /backend/microservices/healthcare/controllers/patientController.js

const PatientModel = require('../models/patientModel'); // Assuming PatientModel is defined
const { validationResult } = require('express-validator'); // For input validation

/**
 * Registers a new patient in the system.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function registerPatient(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const patientDetails = req.body;
        const newPatient = await PatientModel.create(patientDetails);
        res.status(201).json({ status: 'success', patient: newPatient });
    } catch (error) {
        console.error('Error registering patient:', error);
        res.status(500).json({ status: 'error', message: 'Failed to register patient' });
    }
}

/**
 * Updates the health record of an existing patient.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function updatePatientRecord(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { patientId } = req.params;
        const updatedDetails = req.body;
        const [updated] = await PatientModel.update(updatedDetails, { where: { id: patientId } });

        if (updated) {
            const updatedPatient = await PatientModel.findOne({ where: { id: patientId } });
            res.status(200).json({ status: 'success', patient: updatedPatient });
        } else {
            res.status(404).json({ status: 'error', message: 'Patient record not found' });
        }
    } catch (error) {
        console.error('Error updating patient record:', error);
        res.status(500).json({ status: 'error', message: 'Failed to update patient record' });
    }
}

/**
 * Retrieves detailed information about a specific patient.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getPatientDetails(req, res) {
    try {
        const { patientId } = req.params;
        const patient = await PatientModel.findOne({ where: { id: patientId } });

        if (patient) {
            res.status(200).json({ status: 'success', patient });
        } else {
            res.status(404).json({ status: 'error', message: 'Patient record not found' });
        }
    } catch (error) {
        console.error('Error retrieving patient details:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve patient details' });
    }
}

// Export the controller methods
module.exports = {
    registerPatient,
    updatePatientRecord,
    getPatientDetails
};
