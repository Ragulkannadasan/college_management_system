import { createConnection } from 'mysql2/promise';
import { hashPassword } from '../middleware/auth.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function updateAdminPassword() {
  let connection;

  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    console.error('Error: ADMIN_USERNAME and ADMIN_PASSWORD must be set in the .env file.');
    return;
  }

  try {
    // Create database connection
    connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('Connected to the database.');

    // Hash the admin password from the .env file
    const hashedPassword = await hashPassword(process.env.ADMIN_PASSWORD);

    // Update the admin user's password
    const updateQuery = `
      UPDATE users SET password_hash = ? WHERE username = ?
    `;

    const [result] = await connection.execute(updateQuery, [hashedPassword, process.env.ADMIN_USERNAME]);

    if (result.affectedRows > 0) {
      console.log(`Successfully updated password for admin user: '${process.env.ADMIN_USERNAME}'`);
    } else {
      console.error(`Error: Admin user '${process.env.ADMIN_USERNAME}' not found. Please ensure the user exists in the database.`);
    }

  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

// Run the function
updateAdminPassword();
