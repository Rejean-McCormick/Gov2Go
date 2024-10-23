// /backend/microservices/education/tests/courseTests.js

const assert = require('assert');
const courseController = require('../controllers/courseController');
const { setupTestDB, teardownTestDB } = require('../../utils/testUtils'); // Assuming utilities for test DB setup

// Sample mock data for testing
const mockCourseData = { 
    name: 'Physics 101', 
    description: 'Basic Physics', 
    duration: '8 weeks' 
};

const mockUpdateData = { 
    name: 'Physics 102', 
    description: 'Advanced Physics' 
};

/**
 * Sets up the testing environment before each test run.
 */
before(async () => {
    await setupTestDB(); // Setup mock/test database environment
});

/**
 * Tears down the testing environment after all tests are complete.
 */
after(async () => {
    await teardownTestDB(); // Cleanup test database
});

/**
 * Tests adding a new course to the system.
 */
async function testAddCourse() {
    try {
        const result = await courseController.addCourse({ body: mockCourseData });
        assert.strictEqual(result.status, 'success', 'Course addition failed');
        console.log('testAddCourse: Success');
    } catch (error) {
        console.error('testAddCourse: Failed -', error.message);
    }
}

/**
 * Tests updating an existing course's details.
 */
async function testUpdateCourse() {
    try {
        // Assuming we have a predefined course ID for testing
        const courseId = 'mock-course-uuid';
        const result = await courseController.updateCourse({ params: { courseId }, body: mockUpdateData });
        assert.strictEqual(result.status, 'success', 'Course update failed');
        console.log('testUpdateCourse: Success');
    } catch (error) {
        console.error('testUpdateCourse: Failed -', error.message);
    }
}

/**
 * Tests retrieving the list of all courses.
 */
async function testGetCourseList() {
    try {
        const result = await courseController.getCourseList();
        assert(Array.isArray(result.courses), 'Course list is not an array');
        assert(result.courses.length > 0, 'Course list is empty');
        console.log('testGetCourseList: Success');
    } catch (error) {
        console.error('testGetCourseList: Failed -', error.message);
    }
}

/**
 * Executes all tests sequentially.
 */
async function runTests() {
    console.log('Running course tests...');
    await testAddCourse();
    await testUpdateCourse();
    await testGetCourseList();
}

// Execute tests
runTests().then(() => {
    console.log('All tests completed.');
}).catch((err) => {
    console.error('Tests failed with error:', err);
});
