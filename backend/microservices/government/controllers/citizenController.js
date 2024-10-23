// /backend/microservices/government/controllers/citizenController.js

const CitizenModel = require('../models/citizenModel'); // Assuming the CitizenModel is defined
const { validationResult } = require('express-validator'); // For input validation

/**
 * Registers a new citizen in the system.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function registerCitizen(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const citizenData = req.body;
        const newCitizen = await CitizenModel.create(citizenData);
        res.status(201).json({ status: 'success', citizen: newCitizen });
    } catch (error) {
        console.error('Error registering citizen:', error);
        res.status(500).json({ status: 'error', message: 'Failed to register citizen' });
    }
}

/**
 * Updates details of an existing citizen.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function updateCitizenRecord(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { citizenId } = req.params;
        const updatedData = req.body;
        const [updated] = await CitizenModel.update(updatedData, {
            where: { id: citizenId }
        });

        if (updated) {
            const updatedCitizen = await CitizenModel.findOne({ where: { id: citizenId } });
            res.status(200).json({ status: 'success', citizen: updatedCitizen });
        } else {
            res.status(404).json({ status: 'error', message: 'Citizen not found' });
        }
    } catch (error) {
        console.error('Error updating citizen record:', error);
        res.status(500).json({ status: 'error', message: 'Failed to update citizen record' });
    }
}

/**
 * Retrieves detailed information about a specific citizen.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getCitizenDetails(req, res) {
    try {
        const { citizenId } = req.params;
        const citizen = await CitizenModel.findOne({ where: { id: citizenId } });

        if (citizen) {
            res.status(200).json({ status: 'success', citizen });
        } else {
            res.status(404).json({ status: 'error', message: 'Citizen not found' });
        }
    } catch (error) {
        console.error('Error retrieving citizen details:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve citizen details' });
    }
}

// Exporting controller methods
module.exports = {
    registerCitizen,
    updateCitizenRecord,
    getCitizenDetails
};
