// /backend/microservices/government/routes/governmentRoutes.js

const express = require('express');
const citizenController = require('../controllers/citizenController');
const taxController = require('../controllers/taxController');
const { authenticate, authorize } = require('../../middlewares/authMiddleware'); // Assuming authentication and authorization middlewares

/**
 * Sets up all government-related routes.
 * @param {Object} router - The express router instance.
 */
function setupRoutes(router) {
    registerCitizenRoutes(router);
    registerTaxRoutes(router);
}

/**
 * Registers routes for citizen management operations.
 * @param {Object} router - The express router instance.
 */
function registerCitizenRoutes(router) {
    // Route for registering a new citizen
    router.post(
        '/citizens',
        authenticate, // Middleware to authenticate users
        authorize(['admin']), // Middleware to authorize access for admins
        citizenController.registerCitizen
    );

    // Route for updating a citizen's record
    router.put(
        '/citizens/:id',
        authenticate,
        authorize(['admin']),
        citizenController.updateCitizenRecord
    );

    // Route for retrieving citizen details
    router.get(
        '/citizens/:id',
        authenticate,
        authorize(['admin', 'citizen']),
        citizenController.getCitizenDetails
    );
}

/**
 * Registers routes for tax management operations.
 * @param {Object} router - The express router instance.
 */
function registerTaxRoutes(router) {
    // Route for calculating tax for a citizen
    router.post(
        '/tax/calculate',
        authenticate,
        authorize(['admin', 'tax_officer']),
        taxController.calculateTax
    );

    // Route for updating a citizen's tax record
    router.put(
        '/tax/:id',
        authenticate,
        authorize(['admin', 'tax_officer']),
        taxController.updateTaxRecord
    );

    // Route for retrieving tax details for a citizen
    router.get(
        '/tax/:id',
        authenticate,
        authorize(['admin', 'tax_officer', 'citizen']),
        taxController.getTaxDetails
    );
}

// Export the setupRoutes function for use in the main application file
module.exports = {
    setupRoutes
};
