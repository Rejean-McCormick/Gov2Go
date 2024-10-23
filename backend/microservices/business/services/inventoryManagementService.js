// File: /backend/microservices/business/services/inventoryManagementService.js

const InventoryModel = require('../models/productModel'); // Assuming the product model is used for inventory items

/**
 * Add a new item to the inventory
 * @param {Object} itemData - The data for the new inventory item (e.g., name, price, stock)
 * @returns {Object} - The newly created inventory item
 */
async function addInventoryItem(itemData) {
    try {
        const newItem = await InventoryModel.create(itemData);
        return newItem;
    } catch (error) {
        throw new Error('Unable to add item to inventory');
    }
}

/**
 * Update the stock level of an existing inventory item
 * @param {String} itemId - The ID of the item to update
 * @param {Object} stockData - The new stock data (e.g., stock: 200)
 * @returns {Object} - The updated inventory item
 */
async function updateInventoryStock(itemId, stockData) {
    try {
        const updatedItem = await InventoryModel.update(
            { stock: stockData.stock },
            { where: { id: itemId } }
        );
        return updatedItem;
    } catch (error) {
        throw new Error('Unable to update stock level');
    }
}

/**
 * Remove an item from the inventory
 * @param {String} itemId - The ID of the item to remove
 * @returns {Object} - A confirmation message indicating the item was removed
 */
async function removeInventoryItem(itemId) {
    try {
        await InventoryModel.destroy({ where: { id: itemId } });
        return { message: 'Item removed successfully' };
    } catch (error) {
        throw new Error('Unable to remove item from inventory');
    }
}

module.exports = {
    addInventoryItem,
    updateInventoryStock,
    removeInventoryItem
};
 
