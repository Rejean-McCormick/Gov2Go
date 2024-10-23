// File: /backend/microservices/business/controllers/inventoryController.js

const inventoryService = require('../services/inventoryService');

// Add a new product to the inventory
async function addProduct(req, res) {
  try {
    const productData = req.body;
    const newProduct = await inventoryService.addProduct(productData);
    res.status(201).json(newProduct); // Respond with 201 status and the added product
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Unable to add product' });
  }
}

// Update the stock levels of an existing product
async function updateStock(req, res) {
  try {
    const { productId } = req.params;
    const stockUpdate = req.body;
    const updatedProduct = await inventoryService.updateStock(productId, stockUpdate);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct); // Respond with 200 status and updated product
  } catch (error) {
    console.error('Error updating stock levels:', error);
    res.status(500).json({ error: 'Unable to update stock levels' });
  }
}

// Get a list of all products in the inventory
async function getProductList(req, res) {
  try {
    const products = await inventoryService.getProductList();
    res.status(200).json(products); // Respond with 200 status and product list
  } catch (error) {
    console.error('Error retrieving product list:', error);
    res.status(500).json({ error: 'Unable to retrieve product list' });
  }
}

module.exports = {
  addProduct,
  updateStock,
  getProductList,
};
 
