import express from 'express';
import { verifyToken, authorizeRoles } from '../../middleware/auth.js';
import Student from '../../models/Student.js';
import User from '../../models/User.js'; // Import User model for validation

const router = express.Router();

// Get all students (Staff and Admin)
router.get('/', verifyToken, authorizeRoles('staff', 'admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const students = await Student.findAll(parseInt(page), parseInt(limit));
    const totalCount = await Student.count();
    res.json({
      success: true,
      data: students,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / parseInt(limit)),
        totalItems: totalCount
      }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create new student (Staff only)
router.post('/', verifyToken, authorizeRoles('staff'), async (req, res) => {
  try {
    const { 
      username, 
      password, 
      email,
      firstName, 
      lastName, 
      registrationNumber, 
      course, 
      semester 
    } = req.body;
    
    // 1. Rigorous validation for all required fields
    if (!username || !password || !email || !registrationNumber || !firstName || !lastName) {
      return res.status(400).json({ success: false, message: 'Required fields are missing.' });
    }

    // 2. Check for uniqueness of username, email, and registration number
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists.' });
    }
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Email is already in use.' });
    }
    const existingStudent = await Student.findByRegistrationNumber(registrationNumber);
    if (existingStudent) {
      return res.status(409).json({ success: false, message: 'Registration number already exists.' });
    }
    
    // 3. Prepare the data for the create method
    const studentData = {
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
      registration_number: registrationNumber,
      course_id: course || 1, // Use course from form, or default to 1
      semester,
      admission_date: new Date()
    };

    // 4. Call the robust create method
    const newStudent = await Student.create(studentData);

    // 5. Send a success response
    res.status(201).json({
      success: true,
      message: 'Student created successfully.',
      data: newStudent
    });
  } catch (error) {
    // The model will now throw specific errors, but we keep a generic catch-all
    console.error('Error creating student:', error);
    res.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
});

export default router;
