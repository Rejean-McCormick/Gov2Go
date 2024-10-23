// /backend/microservices/healthcare/services/medicalRecordService.js

const MedicalRecordModel = require('../models/medicalRecordModel');

/**
 * Adds a new medical record for the specified patient.
 * @param {string} patientId - The ID of the patient.
 * @param {Object} medicalDetails - The details of the medical record.
 * @returns {Promise<Object>} - Confirmation of record creation or an error message.
 */
async function createMedicalRecord(patientId, medicalDetails) {
    try {
        // Validate input data
        if (!patientId || !medicalDetails) {
            throw new Error('Invalid input data');
        }

        // Create a new medical record entry in the database
        const newRecord = await MedicalRecordModel.create({
            patientId,
            medicalDetails
        });

        return { status: 'success', recordId: newRecord.id };
    } catch (error) {
        console.error('Error creating medical record:', error);
        return { status: 'error', message: 'Failed to create medical record' };
    }
}

/**
 * Updates an existing medical record with new medical information.
 * @param {string} recordId - The ID of the medical record to update.
 * @param {Object} updatedDetails - The updated medical record details.
 * @returns {Promise<Object>} - Confirmation of the update or an error message.
 */
async function updateMedicalRecord(recordId, updatedDetails) {
    try {
        // Find the medical record by ID
        const record = await MedicalRecordModel.findOne({ where: { id: recordId } });

        if (!record) {
            return { status: 'error', message: 'Medical record not found' };
        }

        // Update the medical record with new details
        await MedicalRecordModel.update(updatedDetails, { where: { id: recordId } });
        const updatedRecord = await MedicalRecordModel.findOne({ where: { id: recordId } });

        return { status: 'success', record: updatedRecord };
    } catch (error) {
        console.error('Error updating medical record:', error);
        return { status: 'error', message: 'Failed to update medical record' };
    }
}

/**
 * Retrieves the full medical history of a specified patient.
 * @param {string} patientId - The ID of the patient.
 * @returns {Promise<Object>} - The patient's full medical history or an error message.
 */
async function getMedicalRecord(patientId) {
    try {
        // Find all medical records for the patient
        const records = await MedicalRecordModel.findAll({ where: { patientId } });

        if (!records || records.length === 0) {
            return { status: 'error', message: 'No medical records found for this patient' };
        }

        return { status: 'success', medicalHistory: records };
    } catch (error) {
        console.error('Error retrieving medical records:', error);
        return { status: 'error', message: 'Failed to retrieve medical records' };
    }
}

// Export the service methods
module.exports = {
    createMedicalRecord,
    updateMedicalRecord,
    getMedicalRecord
};
 
