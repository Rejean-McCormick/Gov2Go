// File: /backend/microservices/business/routes/businessRoutes.js

// Import necessary controllers for CRM and inventory management
const crmController = require('../controllers/crmController');
const inventoryController = require('../controllers/inventoryController');

// Function to set up all business-related routes
function setupRoutes(app) {
  registerCRMRoute(app);      // Register CRM-related routes
  registerInventoryRoute(app); // Register Inventory-related routes
}

// Function to register CRM routes
function registerCRMRoute(app) {
  // Route to create a new customer
  app.post('/crm/customers', crmController.createCustomer);

  // Route to update customer details
  app.put('/crm/customers/:customerId', crmController.updateCustomer);

  // Route to get customer details by ID
  app.get('/crm/customers/:customerId', crmController.getCustomerDetails);
}

// Function to register Inventory routes
function registerInventoryRoute(app) {
  // Route to add a new product
  app.post('/inventory/products', inventoryController.addProduct);

  // Route to update stock levels for a specific product
  app.put('/inventory/products/:productId/stock', inventoryController.updateStock);

  // Route to get the list of all products
  app.get('/inventory/products', inventoryController.getProductList);
}

module.exports = {
  setupRoutes
};
 
