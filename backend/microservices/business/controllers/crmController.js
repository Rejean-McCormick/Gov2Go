// File: /backend/microservices/business/controllers/crmController.js

const crmService = require('../services/crmService');

// Create a new customer
async function createCustomer(req, res) {
  try {
    const customerData = req.body;
    const newCustomer = await crmService.createCustomer(customerData);
    res.status(201).json(newCustomer); // Respond with 201 status and the created customer
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Unable to create customer' });
  }
}

// Update an existing customer
async function updateCustomer(req, res) {
  try {
    const { customerId } = req.params;
    const updatedData = req.body;
    const updatedCustomer = await crmService.updateCustomer(customerId, updatedData);
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer); // Respond with 200 status and the updated customer
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Unable to update customer' });
  }
}

// Get details of a specific customer
async function getCustomerDetails(req, res) {
  try {
    const { customerId } = req.params;
    const customerDetails = await crmService.getCustomerDetails(customerId);
    if (!customerDetails) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customerDetails); // Respond with 200 status and customer details
  } catch (error) {
    console.error('Error retrieving customer details:', error);
    res.status(500).json({ error: 'Unable to retrieve customer details' });
  }
}

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomerDetails,
};
 
