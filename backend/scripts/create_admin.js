import { createConnection } from 'mysql2/promise';
import { hashPassword } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdminUser() {
  let connection;

  try {
    // Create database connection
    connection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'cms_user',
      password: process.env.DB_PASSWORD || 'CMS_Password123',
      database: process.env.DB_NAME || 'college_management',
    });

    console.log('Connected to database');

    // Hash the default admin password
    const password = 'admin123';
    const hashedPassword = await hashPassword(password);

    // Insert default admin user
    const insertQuery = `
      INSERT INTO users (username, email, password_hash, role) 
      VALUES ('admin', 'admin@college.edu', ?, 'admin')
    `;

    const [result] = await connection.execute(insertQuery, [hashedPassword]);

    console.log(`Admin user created successfully with ID: ${result.insertId}`);
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Role: admin');

  } catch (error) {
    if (error.errno === 1062) { // Duplicate entry error
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin user:', error);
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the function
createAdminUser();