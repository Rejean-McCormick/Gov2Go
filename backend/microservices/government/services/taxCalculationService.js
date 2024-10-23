// /backend/microservices/government/services/taxCalculationService.js

/**
 * Calculates the tax rate based on predefined tax brackets.
 * @param {number} income - The income amount.
 * @returns {number} - The applicable tax rate for the income.
 */
function getTaxRateForIncome(income) {
    if (income <= 10000) {
        return 0.1;
    } else if (income <= 40000) {
        return 0.2;
    } else if (income <= 100000) {
        return 0.3;
    } else {
        return 0.4;
    }
}

/**
 * Calculates the tax amount based on income and predefined tax brackets.
 * @param {number} income - The income amount.
 * @returns {number} - The calculated tax amount.
 */
function calculateIncomeTax(income) {
    const taxRate = getTaxRateForIncome(income);
    return income * taxRate;
}

/**
 * Applies deductions to the calculated tax amount.
 * @param {number} taxAmount - The initial tax amount.
 * @param {Object} deductions - An object containing all applicable deductions.
 * @returns {number} - The adjusted tax amount after applying deductions.
 */
function applyDeductions(taxAmount, deductions) {
    const totalDeductions = deductions?.totalDeductible || 0;
    return Math.max(0, taxAmount - totalDeductions);
}

/**
 * Generates a tax summary report for a citizen based on their income, tax amount, and deductions.
 * @param {string} citizenId - The ID of the citizen.
 * @param {number} income - The income amount.
 * @param {Object} deductions - An object containing deductions (e.g., totalDeductible).
 * @returns {Object} - A summary report including income, deductions, and the final tax amount.
 */
function generateTaxSummary(citizenId, income, deductions) {
    const taxAmount = calculateIncomeTax(income);
    const finalTax = applyDeductions(taxAmount, deductions);

    return {
        citizenId,
        income,
        deductions,
        finalTax
    };
}

// Export the service functions
module.exports = {
    calculateIncomeTax,
    applyDeductions,
    generateTaxSummary
};
