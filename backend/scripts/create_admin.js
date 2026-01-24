import { createConnection } from 'mysql2/promise';
import { hashPassword } from '../middleware/auth.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function createAdminUser() {
  let connection;

  try {
    // Create database connection
    connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('Connected to database');

    // Hash the default admin password
    const password = process.env.ADMIN_PASSWORD;
    const hashedPassword = await hashPassword(password);

    // Insert default admin user
    const insertQuery = `
      INSERT INTO users (username, email, password_hash, role) 
      VALUES (?, ?, ?, 'admin')
    `;

    const [result] = await connection.execute(insertQuery, [process.env.ADMIN_USERNAME, process.env.ADMIN_EMAIL, hashedPassword]);

    console.log(`Admin user created successfully with ID: ${result.insertId}`);
    console.log(`Username: ${process.env.ADMIN_USERNAME}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD}`);
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