import { executeQuery } from '../utils/dbHelpers.js';
import { hashPassword } from '../middleware/auth.js';

class User {
  constructor(userData) {
    this.id = userData.id;
    this.username = userData.username;
    this.email = userData.email;
    this.password_hash = userData.password_hash;
    this.role = userData.role;
    this.created_at = userData.created_at;
    this.updated_at = userData.updated_at;
  }

  // Create a new user
  static async create(userData) {
    try {
      const hashedPassword = await hashPassword(userData.password);
      
      const query = `
        INSERT INTO users (username, email, password_hash, role) 
        VALUES (?, ?, ?, ?)
      `;
      
      const result = await executeQuery(query, [
        userData.username,
        userData.email,
        hashedPassword,
        userData.role
      ]);
      
      return {
        id: result.insertId,
        username: userData.username,
        email: userData.email,
        role: userData.role
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
      const results = await executeQuery(query, [id]);
      
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = ?';
      const results = await executeQuery(query, [username]);
      
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const results = await executeQuery(query, [email]);
      
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Get all users with pagination
  static async findAll(page = 1, limit = 10, role = null) {
    try {
      let query = 'SELECT id, username, email, role, created_at FROM users';
      let params = [];
      
      if (role) {
        query += ' WHERE role = ?';
        params.push(role);
      }
      
      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(limit, (page - 1) * limit);
      
      const results = await executeQuery(query, params);
      return results;
    } catch (error) {
      console.error('Error finding all users:', error);
      throw error;
    }
  }

  // Update user
  static async update(id, updateData) {
    try {
      let query = 'UPDATE users SET ';
      const params = [];
      const updates = [];

      // Build dynamic update query
      for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'id' && key !== 'password_hash' && value !== undefined) {
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
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Update password
  static async updatePassword(id, newPassword) {
    try {
      const hashedPassword = await hashPassword(newPassword);
      
      const query = 'UPDATE users SET password_hash = ? WHERE id = ?';
      await executeQuery(query, [hashedPassword, id]);
      
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const query = 'DELETE FROM users WHERE id = ?';
      await executeQuery(query, [id]);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Count total users
  static async count(role = null) {
    try {
      let query = 'SELECT COUNT(*) as count FROM users';
      let params = [];
      
      if (role) {
        query += ' WHERE role = ?';
        params.push(role);
      }
      
      const results = await executeQuery(query, params);
      return results[0].count;
    } catch (error) {
      console.error('Error counting users:', error);
      throw error;
    }
  }
}

export default User;