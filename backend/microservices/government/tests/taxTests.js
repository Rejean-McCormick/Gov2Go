// /backend/microservices/government/tests/taxTests.js

const request = require('supertest');
const app = require('../../app'); // Assuming app.js is the entry point for the application
const { setupTestDB, teardownTestDB } = require('../../utils/testUtils'); // Utilities for test DB setup
const taxController = require('../controllers/taxController');

// Mock data for testing
const mockCitizenId = 'mock-citizen-uuid';
const mockIncomeData = { income: 50000 };
const mockTaxData = { taxAmount: 7500 };

// Setup and teardown for the test environment
beforeAll(async () => {
    await setupTestDB(); // Initialize the test database
});

afterAll(async () => {
    await teardownTestDB(); // Clean up after all tests
});

/**
 * Tests the tax calculation functionality.
 */
describe('Tax Calculation', () => {
    it('should calculate tax successfully', async () => {
        const response = await request(app)
            .post(`/api/government/tax/calculate`)
            .send({ citizenId: mockCitizenId, ...mockIncomeData })
            .expect(200);

        expect(response.body.status).toBe('success');
        expect(response.body.taxAmount).toBeGreaterThan(0);
    });
});

/**
 * Tests updating an existing tax record.
 */
describe('Update Tax Record', () => {
    it('should update tax record successfully', async () => {
        // First, create a tax record to update
        const createResponse = await request(app)
            .post(`/api/government/tax/calculate`)
            .send({ citizenId: mockCitizenId, ...mockIncomeData })
            .expect(200);

        const taxId = createResponse.body.taxId;

        // Update the tax record
        const updateResponse = await request(app)
            .put(`/api/government/tax/${taxId}`)
            .send({ taxAmount: mockTaxData.taxAmount })
            .expect(200);

        expect(updateResponse.body.status).toBe('success');
        expect(updateResponse.body.updatedRecord.taxAmount).toBe(mockTaxData.taxAmount);
    });
});

/**
 * Tests retrieving tax details for a specific citizen.
 */
describe('Retrieve Tax Details', () => {
    it('should retrieve tax details successfully', async () => {
        // First, create a tax record to retrieve
        const createResponse = await request(app)
            .post(`/api/government/tax/calculate`)
            .send({ citizenId: mockCitizenId, ...mockIncomeData })
            .expect(200);

        const taxId = createResponse.body.taxId;

        // Retrieve the tax details
        const response = await request(app)
            .get(`/api/government/tax/${taxId}`)
            .expect(200);

        expect(response.body.status).toBe('success');
        expect(response.body.taxDetails.taxAmount).toBeDefined();
    });
});
