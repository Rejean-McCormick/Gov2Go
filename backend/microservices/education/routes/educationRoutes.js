// /backend/microservices/education/routes/educationRoutes.js

const express = require('express');
const studentController = require('../controllers/studentController');
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../../middlewares/authMiddleware'); // Assuming authentication and authorization middlewares

/**
 * Sets up all education-related routes with the application instance.
 * @param {Object} app - The express application instance.
 */
function setupRoutes(app) {
    registerStudentRoute(app);
    registerCourseRoute(app);
}

/**
 * Registers student-related routes.
 * @param {Object} app - The express application instance.
 */
function registerStudentRoute(app) {
    // Route to enroll a student in a course
    app.post(
        '/students/enroll',
        authenticate, // Middleware to authenticate users
        authorize(['admin', 'teacher']), // Middleware to authorize access
        studentController.enrollStudent
    );

    // Route to update a student's profile
    app.put(
        '/students/:studentId',
        authenticate,
        authorize(['admin', 'teacher']),
        studentController.updateStudentProfile
    );

    // Route to get student details
    app.get(
        '/students/:studentId',
        authenticate,
        authorize(['admin', 'teacher', 'student']),
        studentController.getStudentDetails
    );
}

/**
 * Registers course-related routes.
 * @param {Object} app - The express application instance.
 */
function registerCourseRoute(app) {
    // Route to add a new course
    app.post(
        '/courses',
        authenticate,
        authorize(['admin', 'teacher']),
        courseController.addCourse
    );

    // Route to update an existing course
    app.put(
        '/courses/:courseId',
        authenticate,
        authorize(['admin', 'teacher']),
        courseController.updateCourse
    );

    // Route to get the list of all courses
    app.get(
        '/courses',
        authenticate,
        authorize(['admin', 'teacher', 'student']),
        courseController.getCourseList
    );
}

// Export the setupRoutes function to be used in the main application file
module.exports = {
    setupRoutes
};
