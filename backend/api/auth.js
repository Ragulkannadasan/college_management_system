import express from 'express';
import { generateToken, hashPassword, comparePassword, verifyToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate input
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, password, and role are required'
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

    // Check if email already exists
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password,
      role
    });

    // Generate JWT token
    const token = generateToken(newUser.id, newUser.username, newUser.role);

    // Return success response with token and user info
    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Check if user exists using the User model
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.username, user.role);

    // Return success response with token and user info
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create test users endpoint (for development only)
router.post('/create-test-users', async (req, res) => {
  try {
    console.log('Creating test users...');
    
    // Test users data
    const testUsers = [
      {
        username: 'admin_user',
        email: 'admin@college.edu',
        password: 'admin123',
        role: 'admin'
      },
      {
        username: 'staff_user',
        email: 'staff@college.edu',
        password: 'staff123',
        role: 'staff'
      },
      {
        username: 'student_user',
        email: 'student@college.edu',
        password: 'student123',
        role: 'student'
      },
      {
        username: 'john_doe_student',
        email: 'john.doe@student.college.edu',
        password: 'student123',
        role: 'student'
      },
      {
        username: 'jane_smith_student',
        email: 'jane.smith@student.college.edu',
        password: 'student456',
        role: 'student'
      }
    ];
    
    const createdUsers = [];
    
    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findByUsername(userData.username);
        if (existingUser) {
          console.log(`User ${userData.username} already exists, skipping...`);
          continue;
        }
        
        // Create new user
        const newUser = await User.create(userData);
        createdUsers.push({
          username: newUser.username,
          role: newUser.role,
          password: userData.password
        });
        console.log(`Created user: ${newUser.username} (${newUser.role})`);
      } catch (error) {
        console.error(`Error creating user ${userData.username}:`, error.message);
      }
    }
    
    res.json({
      success: true,
      message: 'Test users created successfully',
      users: createdUsers
    });
    
  } catch (error) {
    console.error('Error creating test users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;