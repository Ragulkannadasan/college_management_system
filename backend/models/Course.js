import { executeQuery } from '../utils/dbHelpers.js';

class Course {
  constructor(courseData) {
    this.id = courseData.id;
    this.name = courseData.name;
    this.code = courseData.code;
    this.department_id = courseData.department_id;
    this.duration_semesters = courseData.duration_semesters;
    this.credits = courseData.credits;
    this.description = courseData.description;
    this.created_at = courseData.created_at;
  }

  // Create a new course
  static async create(courseData) {
    try {
      const query = `
        INSERT INTO courses (name, code, department_id, duration_semesters, credits, description) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      const result = await executeQuery(query, [
        courseData.name,
        courseData.code,
        courseData.department_id,
        courseData.duration_semesters,
        courseData.credits,
        courseData.description
      ]);
      
      return {
        id: result.insertId,
        ...courseData
      };
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  // Find course by ID
  static async findById(id) {
    try {
      const query = `
        SELECT c.*, d.name as department_name 
        FROM courses c
        LEFT JOIN departments d ON c.department_id = d.id
        WHERE c.id = ?
      `;
      const results = await executeQuery(query, [id]);
      
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding course by ID:', error);
      throw error;
    }
  }

  // Find course by code
  static async findByCode(code) {
    try {
      const query = `
        SELECT c.*, d.name as department_name 
        FROM courses c
        LEFT JOIN departments d ON c.department_id = d.id
        WHERE c.code = ?
      `;
      const results = await executeQuery(query, [code]);
      
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding course by code:', error);
      throw error;
    }
  }

  // Get all courses with pagination
  static async findAll(page = 1, limit = 10, departmentId = null, search = null) {
    try {
      let query = `
        SELECT c.*, d.name as department_name 
        FROM courses c
        LEFT JOIN departments d ON c.department_id = d.id
      `;
      let params = [];
      
      // Add filters if provided
      let whereConditions = [];
      if (departmentId) {
        whereConditions.push('c.department_id = ?');
        params.push(departmentId);
      }
      if (search) {
        whereConditions.push('(c.name LIKE ? OR c.code LIKE ?)');
        params.push(`%${search}%`, `%${search}%`);
      }
      
      if (whereConditions.length > 0) {
        query += ' WHERE ' + whereConditions.join(' AND ');
      }
      
      query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
      params.push(limit, (page - 1) * limit);
      
      const results = await executeQuery(query, params);
      return results;
    } catch (error) {
      console.error('Error finding all courses:', error);
      throw error;
    }
  }

  // Update course
  static async update(id, updateData) {
    try {
      let query = 'UPDATE courses SET ';
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
      console.error('Error updating course:', error);
      throw error;
    }
  }

  // Delete course
  static async delete(id) {
    try {
      // Check if course has associated subjects or students before deletion
      const subjectCheckQuery = 'SELECT COUNT(*) as count FROM subjects WHERE course_id = ?';
      const subjectResults = await executeQuery(subjectCheckQuery, [id]);
      
      if (subjectResults[0].count > 0) {
        throw new Error('Cannot delete course with associated subjects');
      }

      const studentCheckQuery = 'SELECT COUNT(*) as count FROM students WHERE course_id = ?';
      const studentResults = await executeQuery(studentCheckQuery, [id]);
      
      if (studentResults[0].count > 0) {
        throw new Error('Cannot delete course with enrolled students');
      }

      const query = 'DELETE FROM courses WHERE id = ?';
      await executeQuery(query, [id]);
      return true;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }

  // Count total courses
  static async count(departmentId = null) {
    try {
      let query = 'SELECT COUNT(*) as count FROM courses';
      let params = [];
      
      if (departmentId) {
        query += ' WHERE department_id = ?';
        params.push(departmentId);
      }
      
      const results = await executeQuery(query, params);
      return results[0].count;
    } catch (error) {
      console.error('Error counting courses:', error);
      throw error;
    }
  }
}

export default Course;