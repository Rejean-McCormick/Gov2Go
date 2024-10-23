// /backend/microservices/government/services/voterRegistrationService.js

const VoterModel = require('../models/voterModel'); // Assuming VoterModel is defined
const CitizenModel = require('../models/citizenModel'); // Assuming CitizenModel is defined for citizen data
const { validationResult } = require('express-validator'); // For input validation

/**
 * Registers a new voter in the system using the provided citizen ID and voter details.
 * @param {string} citizenId - The ID of the citizen.
 * @param {Object} voterDetails - An object containing voter-specific details (e.g., address, district).
 * @returns {Object} - The status of the voter registration.
 */
async function registerVoter(citizenId, voterDetails) {
    try {
        // Validate the citizen's eligibility before registration
        const isEligible = await validateVoterEligibility(citizenId);
        if (!isEligible) {
            return { status: 'error', message: 'Citizen is not eligible to vote' };
        }

        // Register the voter
        const newVoter = await VoterModel.create({ citizenId, ...voterDetails });
        return { status: 'success', voter: newVoter };
    } catch (error) {
        console.error('Error registering voter:', error);
        return { status: 'error', message: 'Failed to register voter' };
    }
}

/**
 * Updates the voter's record with new information.
 * @param {string} voterId - The ID of the voter.
 * @param {Object} updatedDetails - An object containing the updated voter information (e.g., address).
 * @returns {Object} - The status of the voter record update.
 */
async function updateVoterRecord(voterId, updatedDetails) {
    try {
        const [updated] = await VoterModel.update(updatedDetails, { where: { id: voterId } });

        if (updated) {
            const updatedVoter = await VoterModel.findOne({ where: { id: voterId } });
            return { status: 'success', voter: updatedVoter };
        } else {
            return { status: 'error', message: 'Voter record not found' };
        }
    } catch (error) {
        console.error('Error updating voter record:', error);
        return { status: 'error', message: 'Failed to update voter record' };
    }
}

/**
 * Validates if a citizen is eligible to vote based on predefined criteria.
 * @param {string} citizenId - The ID of the citizen.
 * @returns {boolean} - True if the citizen is eligible to vote, false otherwise.
 */
async function validateVoterEligibility(citizenId) {
    try {
        const citizen = await CitizenModel.findOne({ where: { id: citizenId } });

        if (!citizen) {
            console.error('Citizen not found');
            return false;
        }

        // Example criteria: Citizen must be at least 18 years old and have a valid legal status
        return citizen.age >= 18 && citizen.isEligible;
    } catch (error) {
        console.error('Error validating voter eligibility:', error);
        return false;
    }
}

// Export the service functions
module.exports = {
    registerVoter,
    updateVoterRecord,
    validateVoterEligibility
};
