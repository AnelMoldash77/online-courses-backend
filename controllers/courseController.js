const Course = require('../models/Course');

// CREATE course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const course = await Course.create({
      title,
      description,
      createdBy: req.user.id
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all courses of logged-in user
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all courses (from all users, read-only)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'username email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const User = require('../models/User');

// ENROLL to course
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.id;

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UNENROLL from course
exports.unenrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.id;

    user.enrolledCourses = user.enrolledCourses.filter(
      c => c.toString() !== courseId
    );

    await user.save();

    res.json({ message: 'Unenrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
