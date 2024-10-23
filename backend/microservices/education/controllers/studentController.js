// /backend/microservices/education/controllers/studentController.js

// Import necessary modules and models
const { StudentModel } = require('../models/studentModel');
const { EnrollmentModel } = require('../models/enrollmentModel');
const { validationResult } = require('express-validator');

// Controller to manage student-related operations

/**
 * Enrolls a student in a course.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function enrollStudent(req, res) {
    try {
        // Validate incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { studentId, courseId } = req.body;
        const enrollment = await EnrollmentModel.create({ studentId, courseId });
        res.status(201).json(enrollment);
    } catch (error) {
        console.error('Error enrolling student:', error);
        res.status(500).json({ message: 'Failed to enroll student in course' });
    }
}

/**
 * Updates the profile information of a student.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function updateStudentProfile(req, res) {
    try {
        // Validate incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { studentId } = req.params;
        const studentData = req.body;
        const [updated] = await StudentModel.update(studentData, {
            where: { id: studentId }
        });

        if (updated) {
            const updatedProfile = await StudentModel.findOne({ where: { id: studentId } });
            res.status(200).json(updatedProfile);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error updating student profile:', error);
        res.status(500).json({ message: 'Failed to update student profile' });
    }
}

/**
 * Retrieves details of a specific student.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getStudentDetails(req, res) {
    try {
        const { studentId } = req.params;
        const student = await StudentModel.findByPk(studentId);

        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        console.error('Error retrieving student details:', error);
        res.status(500).json({ message: 'Failed to retrieve student details' });
    }
}

// Exporting controller methods
module.exports = {
    enrollStudent,
    updateStudentProfile,
    getStudentDetails
};
