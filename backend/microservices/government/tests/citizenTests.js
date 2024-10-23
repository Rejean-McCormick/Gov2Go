// /backend/microservices/government/tests/citizenTests.js

const request = require('supertest');
const app = require('../../app'); // Assuming app.js is the entry point for the application
const { setupTestDB, teardownTestDB } = require('../../utils/testUtils'); // Assuming utilities for test DB setup
const citizenController = require('../controllers/citizenController');

// Mock data for testing
const mockCitizenData = { 
    name: 'John Doe', 
    address: '123 Main St', 
    idNumber: 'AB123456' 
};

const updatedCitizenData = { 
    address: '456 Elm St' 
};

// Setup and teardown for the test environment
beforeAll(async () => {
    await setupTestDB(); // Initialize the test database
});

afterAll(async () => {
    await teardownTestDB(); // Clean up after all tests
});

/**
 * Tests the citizen registration functionality.
 */
describe('Citizen Registration', () => {
    it('should register a new citizen successfully', async () => {
        const response = await request(app)
            .post('/api/government/citizens')
            .send(mockCitizenData)
            .expect(201);

        expect(response.body.status).toBe('success');
        expect(response.body.citizen.name).toBe(mockCitizenData.name);
    });
});

/**
 * Tests updating an existing citizen's record.
 */
describe('Update Citizen Record', () => {
    it('should update an existing citizen record successfully', async () => {
        // First, register the citizen to update
        const registrationResponse = await request(app)
            .post('/api/government/citizens')
            .send(mockCitizenData)
            .expect(201);

        const citizenId = registrationResponse.body.citizen.id;

        // Update the registered citizen's address
        const updateResponse = await request(app)
            .put(`/api/government/citizens/${citizenId}`)
            .send(updatedCitizenData)
            .expect(200);

        expect(updateResponse.body.status).toBe('success');
        expect(updateResponse.body.citizen.address).toBe(updatedCitizenData.address);
    });
});

/**
 * Tests the retrieval of detailed information for a specific citizen.
 */
describe('Retrieve Citizen Details', () => {
    it('should retrieve citizen details successfully', async () => {
        // First, register the citizen to retrieve
        const registrationResponse = await request(app)
            .post('/api/government/citizens')
            .send(mockCitizenData)
            .expect(201);

        const citizenId = registrationResponse.body.citizen.id;

        // Retrieve the citizen details
        const response = await request(app)
            .get(`/api/government/citizens/${citizenId}`)
            .expect(200);

        expect(response.body.status).toBe('success');
        expect(response.body.citizen.name).toBe(mockCitizenData.name);
        expect(response.body.citizen.address).toBe(mockCitizenData.address);
    });
});
