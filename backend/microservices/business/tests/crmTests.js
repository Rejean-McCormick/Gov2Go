// File: /backend/microservices/business/tests/crmTests.js

const assert = require('assert'); // Node.js assert module for validation
const crmController = require('../controllers/crmController'); // Import CRM controller
const sinon = require('sinon'); // Library for mocking/stubbing

// Mock service for CRM to avoid actual database interaction
const crmService = require('../services/crmService');

// Mock data for customer testing
const mockCustomer = {
    id: 'customer-uuid',
    name: 'John Doe',
    email: 'john.doe@example.com'
};

// Test: Create a new customer
async function testCreateCustomer() {
    // Mock the service method
    const createCustomerStub = sinon.stub(crmService, 'createCustomer').returns(Promise.resolve(mockCustomer));

    // Create customer via controller
    const req = { body: mockCustomer };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };

    await crmController.createCustomer(req, res);

    // Assertions
    assert.strictEqual(res.status.calledWith(201), true, 'Expected status code 201 for customer creation');
    assert.strictEqual(createCustomerStub.calledOnce, true, 'Expected createCustomer to be called once');
    createCustomerStub.restore();
}

// Test: Update an existing customer
async function testUpdateCustomer() {
    const updatedCustomer = { name: 'John Smith', email: 'john.smith@example.com' };

    // Mock the service method
    const updateCustomerStub = sinon.stub(crmService, 'updateCustomer').returns(Promise.resolve(updatedCustomer));

    // Update customer via controller
    const req = { params: { customerId: 'customer-uuid' }, body: updatedCustomer };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };

    await crmController.updateCustomer(req, res);

    // Assertions
    assert.strictEqual(res.status.calledWith(200), true, 'Expected status code 200 for customer update');
    assert.strictEqual(updateCustomerStub.calledOnce, true, 'Expected updateCustomer to be called once');
    updateCustomerStub.restore();
}

// Test: Get customer details
async function testGetCustomerDetails() {
    // Mock the service method
    const getCustomerDetailsStub = sinon.stub(crmService, 'getCustomerDetails').returns(Promise.resolve(mockCustomer));

    // Get customer details via controller
    const req = { params: { customerId: 'customer-uuid' } };
    const res = { status: sinon.stub().returns({ json: sinon.stub() }) };

    await crmController.getCustomerDetails(req, res);

    // Assertions
    assert.strictEqual(res.status.calledWith(200), true, 'Expected status code 200 for customer retrieval');
    assert.strictEqual(getCustomerDetailsStub.calledOnce, true, 'Expected getCustomerDetails to be called once');
    assert.strictEqual(res.status().json.calledWith(mockCustomer), true, 'Expected customer details to be returned');
    getCustomerDetailsStub.restore();
}

// Run all tests
(async () => {
    await testCreateCustomer();
    console.log('testCreateCustomer passed.');

    await testUpdateCustomer();
    console.log('testUpdateCustomer passed.');

    await testGetCustomerDetails();
    console.log('testGetCustomerDetails passed.');
})().catch(err => {
    console.error('Test failed:', err);
});
 
