import { executeQuery } from '../utils/dbHelpers.js';

class Student {
  constructor(studentData) {
    this.id = studentData.id;
    this.user_id = studentData.user_id;
    this.registration_number = studentData.registration_number;
    this.first_name = studentData.first_name;
    this.last_name = studentData.last_name;
    this.date_of_birth = studentData.date_of_birth;
    this.gender = studentData.gender;
    this.email = studentData.email;
    this.phone = studentData.phone;
    this.address = studentData.address;
    this.course_id = studentData.course_id;
    this.semester = studentData.semester;
    this.section = studentData.section;
    this.admission_date = studentData.admission_date;
    this.profile_image = studentData.profile_image;
    this.created_at = studentData.created_at;
    this.updated_at = studentData.updated_at;
  }

  // Create a new student
  static async create(studentData) {
    try {
      const query = `
        INSERT INTO students (
          user_id, registration_number, first_name, last_name, 
          date_of_birth, gender, email, phone, address, 
          course_id, semester, section, admission_date, profile_image
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const result = await executeQuery(query, [
        studentData.user_id,
        studentData.registration_number,
        studentData.first_name,
        studentData.last_name,
        studentData.date_of_birth,
        studentData.gender,
        studentData.email,
        studentData.phone,
        studentData.address,
        studentData.course_id,
        studentData.semester,
        studentData.section,
        studentData.admission_date,
        studentData.profile_image || null
      ]);
      
      return {
        id: result.insertId,
        ...studentData
      };
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  // Find student by ID
  static async findById(id) {
    try {
      const query = `
        SELECT s.*, u.username, c.name as course_name 
        FROM students s
        LEFT JOIN users u ON s.user_id = u.id
        LEFT JOIN courses c ON s.course_id = c.id
        WHERE s.id = ?
      `;
      const results = await executeQuery(query, [id]);
      
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding student by ID:', error);
      throw error;
    }
  }

  // Find student by registration number
  static async findByRegNumber(regNumber) {
    try {
      const query = `
        SELECT s.*, u.username, c.name as course_name 
        FROM students s
        LEFT JOIN users u ON s.user_id = u.id
        LEFT JOIN courses c ON s.course_id = c.id
        WHERE s.registration_number = ?
      `;
      const results = await executeQuery(query, [regNumber]);
      
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding student by registration number:', error);
      throw error;
    }
  }

  // Get all students with pagination
  static async findAll(page = 1, limit = 10, courseId = null, search = null) {
    try {
      let query = `
        SELECT s.*, u.username, c.name as course_name 
        FROM students s
        LEFT JOIN users u ON s.user_id = u.id
        LEFT JOIN courses c ON s.course_id = c.id
      `;
      let params = [];
      
      // Add filters if provided
      let whereConditions = [];
      if (courseId) {
        whereConditions.push('s.course_id = ?');
        params.push(courseId);
      }
      if (search) {
        whereConditions.push('(s.first_name LIKE ? OR s.last_name LIKE ? OR s.registration_number LIKE ?)');
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }
      
      if (whereConditions.length > 0) {
        query += ' WHERE ' + whereConditions.join(' AND ');
      }
      
      query += ' ORDER BY s.created_at DESC LIMIT ? OFFSET ?';
      params.push(limit, (page - 1) * limit);
      
      const results = await executeQuery(query, params);
      return results;
    } catch (error) {
      console.error('Error finding all students:', error);
      throw error;
    }
  }

  // Update student
  static async update(id, updateData) {
    try {
      let query = 'UPDATE students SET ';
      const params = [];
      const updates = [];

      // Build dynamic update query
      for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'id' && value !== undefined) {
          updates.push(`${key} = ?`);
          params.push(value);
        }
      }

      if (updates.length === 0) {
        throw new Error('No fields to update');
      }

      query += updates.join(', ') + ' WHERE id = ?';
      params.push(id);

      await executeQuery(query, params);
      
      return await this.findById(id);
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  // Delete student
  static async delete(id) {
    try {
      const query = 'DELETE FROM students WHERE id = ?';
      await executeQuery(query, [id]);
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }

  // Count total students
  static async count(courseId = null) {
    try {
      let query = 'SELECT COUNT(*) as count FROM students';
      let params = [];
      
      if (courseId) {
        query += ' WHERE course_id = ?';
        params.push(courseId);
      }
      
      const results = await executeQuery(query, params);
      return results[0].count;
    } catch (error) {
      console.error('Error counting students:', error);
      throw error;
    }
  }
}

export default Student;