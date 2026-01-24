import express from 'express';
import { verifyToken, authorizeRoles } from '../../middleware/auth.js';
import User from '../../models/User.js';

const router = express.Router();

// Get all staff members (Admin only)
router.get('/', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Fetch staff members with pagination
    const staffMembers = await User.findAll(pageNum, limitNum, 'staff');

    // Get total count for pagination metadata
    const totalCount = await User.count('staff');
    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      data: staffMembers,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: totalCount,
        itemsPerPage: limitNum
      }
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get staff by ID (Admin only)
router.get('/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid staff ID is required'
      });
    }

    const staffMember = await User.findById(id);

    if (!staffMember || staffMember.role !== 'staff') {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      data: staffMember
    });
  } catch (error) {
    console.error('Error fetching staff by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new staff member (Admin only)
router.post('/', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists'
      });
    }

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Create new staff user
    const newStaff = await User.create({
      username,
      email,
      password,
      role: 'staff'
    });

    res.status(201).json({
      success: true,
      message: 'Staff member created successfully',
      data: newStaff
    });
  } catch (error) {
    console.error('Error creating staff:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update staff member (Admin only)
router.put('/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid staff ID is required'
      });
    }

    // Check if staff member exists
    const existingStaff = await User.findById(id);
    if (!existingStaff || existingStaff.role !== 'staff') {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    // Prepare update data
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;

    // Check for duplicate username/email if provided
    if (username) {
      const duplicateUser = await User.findByUsername(username);
      if (duplicateUser && duplicateUser.id !== parseInt(id)) {
        return res.status(409).json({
          success: false,
          message: 'Username already exists'
        });
      }
    }

    if (email) {
      const duplicateEmail = await User.findByEmail(email);
      if (duplicateEmail && duplicateEmail.id !== parseInt(id)) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    // Update staff member
    const updatedStaff = await User.update(id, updateData);

    res.json({
      success: true,
      message: 'Staff member updated successfully',
      data: updatedStaff
    });
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete staff member (Admin only)
router.delete('/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid staff ID is required'
      });
    }

    // Check if staff member exists
    const existingStaff = await User.findById(id);
    if (!existingStaff || existingStaff.role !== 'staff') {
      return res.status(404).json({
        success: false,
        message: 'Staff member not found'
      });
    }

    // Delete staff member
    await User.delete(id);

    res.json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;