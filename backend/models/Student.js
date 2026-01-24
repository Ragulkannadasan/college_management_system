import { pool } from '../config/db.js';
import { executeQuery } from '../utils/dbHelpers.js';
import { hashPassword } from '../middleware/auth.js';

class Student {
  
  // Create a new student and their user account in a single transaction
  static async create(studentData) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Step 1: Create the user account
      const hashedPassword = await hashPassword(studentData.password);
      const userQuery = `
        INSERT INTO users (username, email, password_hash, role, password_reset_required) 
        VALUES (?, ?, ?, 'student', 1)
      `;
      const [userResult] = await connection.execute(userQuery, [
        studentData.username,
        studentData.email,
        hashedPassword
      ]);
      const userId = userResult.insertId;

      // Step 2: Create the student profile linked to the user account
      const studentFields = {
        user_id: userId,
        registration_number: studentData.registration_number,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        email: studentData.email,
        course_id: studentData.course_id,
        semester: studentData.semester,
        section: studentData.section || null,
        admission_date: studentData.admission_date || new Date()
      };

      const columns = Object.keys(studentFields).join(', ');
      const placeholders = Object.keys(studentFields).map(() => '?').join(', ');
      const values = Object.values(studentFields);

      const studentQuery = `INSERT INTO students (${columns}) VALUES (${placeholders})`;
      const [studentResult] = await connection.execute(studentQuery, values);
      
      await connection.commit();
      
      // Return the newly created student's full info
      const createdStudent = await this.findById(studentResult.insertId);
      return createdStudent;

    } catch (error) {
      await connection.rollback();
      console.error('Error in Student.create transaction:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Find a single student by their ID
  static async findById(id) {
    const query = `
      SELECT s.*, c.name as course_name 
      FROM students s
      LEFT JOIN courses c ON s.course_id = c.id
      WHERE s.id = ?
    `;
    const results = await executeQuery(query, [id]);
    return results.length > 0 ? results[0] : null;
  }
  
  // Find a student by their unique registration number
  static async findByRegistrationNumber(registrationNumber) {
    const query = 'SELECT * FROM students WHERE registration_number = ?';
    const results = await executeQuery(query, [registrationNumber]);
    return results.length > 0 ? results[0] : null;
  }

  // Find all students with pagination and course name
  static async findAll(page = 1, limit = 10) {
    const query = `
      SELECT s.*, c.name as course_name 
      FROM students s
      LEFT JOIN courses c ON s.course_id = c.id
      ORDER BY s.created_at DESC
      LIMIT ? OFFSET ?
    `;
    return executeQuery(query, [limit, (page - 1) * limit]);
  }

  // Count all students
  static async count() {
    const results = await executeQuery('SELECT COUNT(*) as count FROM students');
    return results[0].count;
  }
}

export default Student;
