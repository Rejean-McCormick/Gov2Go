// /backend/microservices/education/controllers/courseController.js

// Import necessary modules and models
const { CourseModel } = require('../models/courseModel');
const { validationResult } = require('express-validator');

// Controller to manage course-related operations

/**
 * Adds a new course to the system.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function addCourse(req, res) {
    try {
        // Validate incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const courseData = req.body;
        const newCourse = await CourseModel.create(courseData);
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ message: 'Failed to add course' });
    }
}

/**
 * Updates an existing course identified by courseId.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function updateCourse(req, res) {
    try {
        // Validate incoming data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { courseId } = req.params;
        const courseData = req.body;
        const [updated] = await CourseModel.update(courseData, {
            where: { id: courseId }
        });

        if (updated) {
            const updatedCourse = await CourseModel.findOne({ where: { id: courseId } });
            res.status(200).json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Failed to update course' });
    }
}

/**
 * Retrieves a list of all available courses.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getCourseList(req, res) {
    try {
        // Implementing pagination for performance optimization
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const courses = await CourseModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error retrieving courses:', error);
        res.status(500).json({ message: 'Failed to retrieve courses' });
    }
}

// Exporting controller methods
module.exports = {
    addCourse,
    updateCourse,
    getCourseList
};
 
