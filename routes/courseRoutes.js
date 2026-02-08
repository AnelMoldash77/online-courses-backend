const express = require('express');
const auth = require('../middleware/authMiddleware');
const courseController = require('../controllers/courseController');

const router = express.Router();

// ===== READ =====

// All courses (read-only, from all users)
router.get('/all', auth, courseController.getAllCourses);

// Courses created by logged-in user
router.get('/', auth, courseController.getCourses);

// ===== ENROLL / UNENROLL =====

// Enroll to a course
router.post('/:id/enroll', auth, courseController.enrollCourse);

// Unenroll from a course
router.post('/:id/unenroll', auth, courseController.unenrollCourse);

// ===== CRUD for OWN courses =====

// Get single own course
router.get('/:id', auth, courseController.getCourseById);

// Create course
router.post('/', auth, courseController.createCourse);

// Update own course
router.put('/:id', auth, courseController.updateCourse);

// Delete own course
router.delete('/:id', auth, courseController.deleteCourse);

module.exports = router;
