// File: /backend/microservices/business/services/salesService.js

const OrderModel = require('../models/orderModel'); // Assuming the order model is used for sales orders
const inventoryManagementService = require('./inventoryManagementService'); // Import inventory service to manage stock
const { Op } = require('sequelize'); // Sequelize operator for date range filtering

/**
 * Process a new sales order
 * @param {Object} orderData - The data of the new sales order (e.g., clientId, productId, quantity, price, status)
 * @returns {Object} - The newly created order
 */
async function processOrder(orderData) {
    try {
        // Validate and save the order
        const newOrder = await OrderModel.create(orderData);

        // Update inventory based on the ordered items
        await inventoryManagementService.updateInventoryStock(orderData.productId, {
            stock: orderData.stock - orderData.quantity
        });

        return newOrder;
    } catch (error) {
        throw new Error('Order processing failed: ' + error.message);
    }
}

/**
 * Calculate total sales within a given date range
 * @param {String} startDate - The start date for the sales calculation
 * @param {String} endDate - The end date for the sales calculation
 * @returns {Number} - The total sales amount
 */
async function calculateTotalSales(startDate, endDate) {
    try {
        const totalSales = await OrderModel.sum('price', {
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        return totalSales;
    } catch (error) {
        throw new Error('Failed to calculate total sales: ' + error.message);
    }
}

/**
 * Generate a sales report for a given date range
 * @param {String} startDate - The start date for the sales report
 * @param {String} endDate - The end date for the sales report
 * @returns {Array} - A list of all sales activities within the given period
 */
async function generateSalesReport(startDate, endDate) {
    try {
        const salesData = await OrderModel.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            attributes: ['id', 'clientId', 'productId', 'quantity', 'price', 'status']
        });
        return salesData;
    } catch (error) {
        throw new Error('Failed to generate sales report: ' + error.message);
    }
}

module.exports = {
    processOrder,
    calculateTotalSales,
    generateSalesReport
};
 
