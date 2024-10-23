// /backend/microservices/education/services/gradeService.js

const GradeModel = require('../models/gradeModel'); // Assuming a GradeModel is defined
const { validateUUID, validateGrade } = require('../../utils/validationUtils'); // Assuming validation utilities for UUIDs and grades

/**
 * Assigns a grade to a student for a specified course.
 * @param {string} studentId - The ID of the student.
 * @param {string} courseId - The ID of the course.
 * @param {string} grade - The grade to be assigned.
 * @returns {Object} - The status of the grade assignment.
 */
async function assignGrade(studentId, courseId, grade) {
    try {
        // Validate inputs
        if (!validateUUID(studentId) || !validateUUID(courseId) || !validateGrade(grade)) {
            return { status: 'error', message: 'Invalid student ID, course ID, or grade' };
        }

        // Create grade record
        const result = await GradeModel.create({ studentId, courseId, grade });
        return { status: 'success', result };
    } catch (error) {
        console.error('Error assigning grade:', error);
        return { status: 'error', message: 'Failed to assign grade' };
    }
}

/**
 * Updates an existing grade for a student in a specified course.
 * @param {string} studentId - The ID of the student.
 * @param {string} courseId - The ID of the course.
 * @param {string} newGrade - The new grade to be assigned.
 * @returns {Object} - The status of the grade update.
 */
async function updateGrade(studentId, courseId, newGrade) {
    try {
        // Validate inputs
        if (!validateUUID(studentId) || !validateUUID(courseId) || !validateGrade(newGrade)) {
            return { status: 'error', message: 'Invalid student ID, course ID, or grade' };
        }

        // Update grade record
        const result = await GradeModel.update({ grade: newGrade }, {
            where: { studentId, courseId }
        });

        if (result[0] > 0) { // Check if any rows were updated
            return { status: 'success', message: 'Grade updated successfully' };
        } else {
            return { status: 'error', message: 'No grade record found to update' };
        }
    } catch (error) {
        console.error('Error updating grade:', error);
        return { status: 'error', message: 'Failed to update grade' };
    }
}

/**
 * Retrieves all grades for a specific student across all courses.
 * @param {string} studentId - The ID of the student.
 * @returns {Object} - The student's grade information.
 */
async function getStudentGrades(studentId) {
    try {
        // Validate input
        if (!validateUUID(studentId)) {
            return { status: 'error', message: 'Invalid student ID' };
        }

        // Retrieve grades
        const grades = await GradeModel.findAll({
            where: { studentId }
        });

        return { status: 'success', grades };
    } catch (error) {
        console.error('Error retrieving grades:', error);
        return { status: 'error', message: 'Failed to retrieve grades' };
    }
}

// Exporting the grade service methods
module.exports = {
    assignGrade,
    updateGrade,
    getStudentGrades
};
