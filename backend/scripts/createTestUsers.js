import User from '../models/User.js';

// Test users data
export const testUsers = [
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

const createTestUsers = async () => {
  try {
    console.log('Creating test users...');
    
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
        console.log(`Created user: ${newUser.username} (${newUser.role})`);
      } catch (error) {
        console.error(`Error creating user ${userData.username}:`, error.message);
      }
    }
    
    console.log('Test users creation completed!');
  } catch (error) {
    console.error('Error in createTestUsers:', error);
  }
};

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  createTestUsers();
}

export default createTestUsers;