// /backend/microservices/education/services/enrollmentService.js

const EnrollmentModel = require('../models/enrollmentModel'); // Assuming an EnrollmentModel is defined
const { validateUUID } = require('../../utils/validationUtils'); // Assuming a validation utility for UUIDs

/**
 * Enrolls a student in a specified course.
 * @param {string} studentId - The ID of the student.
 * @param {string} courseId - The ID of the course.
 * @returns {Object} - The status of the enrollment.
 */
async function enrollStudentInCourse(studentId, courseId) {
    try {
        // Validate input
        if (!validateUUID(studentId) || !validateUUID(courseId)) {
            return { status: 'error', message: 'Invalid student or course ID' };
        }

        // Create enrollment record
        const enrollment = await EnrollmentModel.create({ studentId, courseId });
        return { status: 'success', enrollment };
    } catch (error) {
        console.error('Error enrolling student:', error);
        return { status: 'error', message: 'Failed to enroll student' };
    }
}

/**
 * Disenrolls a student from a specified course.
 * @param {string} studentId - The ID of the student.
 * @param {string} courseId - The ID of the course.
 * @returns {Object} - The status of the disenrollment.
 */
async function disenrollStudent(studentId, courseId) {
    try {
        // Validate input
        if (!validateUUID(studentId) || !validateUUID(courseId)) {
            return { status: 'error', message: 'Invalid student or course ID' };
        }

        // Remove enrollment record
        const rowsDeleted = await EnrollmentModel.destroy({
            where: { studentId, courseId }
        });

        if (rowsDeleted) {
            return { status: 'success', message: 'Student disenrolled' };
        } else {
            return { status: 'error', message: 'No enrollment found for this student in the specified course' };
        }
    } catch (error) {
        console.error('Error disenrolling student:', error);
        return { status: 'error', message: 'Failed to disenroll student' };
    }
}

/**
 * Retrieves the enrollment status of a student for a specified course.
 * @param {string} studentId - The ID of the student.
 * @param {string} courseId - The ID of the course.
 * @returns {Object} - The enrollment status of the student.
 */
async function getEnrollmentStatus(studentId, courseId) {
    try {
        // Validate input
        if (!validateUUID(studentId) || !validateUUID(courseId)) {
            return { status: 'error', message: 'Invalid student or course ID' };
        }

        // Retrieve enrollment record
        const enrollment = await EnrollmentModel.findOne({
            where: { studentId, courseId }
        });

        if (enrollment) {
            return { status: 'enrolled', enrollment };
        } else {
            return { status: 'not enrolled' };
        }
    } catch (error) {
        console.error('Error retrieving enrollment status:', error);
        return { status: 'error', message: 'Failed to retrieve enrollment status' };
    }
}

// Exporting the enrollment service methods
module.exports = {
    enrollStudentInCourse,
    disenrollStudent,
    getEnrollmentStatus
};
