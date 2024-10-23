// /backend/microservices/government/controllers/taxController.js

const TaxModel = require('../models/taxModel'); // Assuming TaxModel is defined
const TaxService = require('../services/taxService'); // Assuming TaxService for calculations
const { validationResult } = require('express-validator'); // For input validation

/**
 * Calculates the tax for a citizen based on their income data.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function calculateTax(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { citizenId } = req.params;
        const incomeData = req.body;
        const taxAmount = await TaxService.calculate(citizenId, incomeData);
        res.status(200).json({ status: 'success', taxAmount });
    } catch (error) {
        console.error('Error calculating tax:', error);
        res.status(500).json({ status: 'error', message: 'Failed to calculate tax' });
    }
}

/**
 * Updates the tax records for a citizen.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function updateTaxRecord(req, res) {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { citizenId } = req.params;
        const taxData = req.body;
        const [updated] = await TaxModel.update(taxData, { where: { citizenId } });

        if (updated) {
            const updatedRecord = await TaxModel.findOne({ where: { citizenId } });
            res.status(200).json({ status: 'success', updatedRecord });
        } else {
            res.status(404).json({ status: 'error', message: 'Tax record not found' });
        }
    } catch (error) {
        console.error('Error updating tax record:', error);
        res.status(500).json({ status: 'error', message: 'Failed to update tax record' });
    }
}

/**
 * Retrieves tax details for a specific citizen.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getTaxDetails(req, res) {
    try {
        const { citizenId } = req.params;
        const taxDetails = await TaxModel.findOne({ where: { citizenId } });

        if (taxDetails) {
            res.status(200).json({ status: 'success', taxDetails });
        } else {
            res.status(404).json({ status: 'error', message: 'Tax details not found' });
        }
    } catch (error) {
        console.error('Error retrieving tax details:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve tax details' });
    }
}

// Exporting controller methods
module.exports = {
    calculateTax,
    updateTaxRecord,
    getTaxDetails
};
