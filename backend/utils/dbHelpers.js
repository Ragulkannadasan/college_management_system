import { pool } from '../config/db.js';

// Database helper functions

// Execute query with error handling using connection pool
export const executeQuery = async (query, params = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

// Begin transaction using connection pool
export const beginTransaction = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    return connection; // Return connection for use in transaction
  } catch (error) {
    if (connection) connection.release();
    console.error('Error beginning transaction:', error);
    throw error;
  }
};

// Commit transaction
export const commitTransaction = async (connection) => {
  try {
    await connection.commit();
  } catch (error) {
    console.error('Error committing transaction:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

// Rollback transaction
export const rollbackTransaction = async (connection) => {
  try {
    await connection.rollback();
  } catch (error) {
    console.error('Error rolling back transaction:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

// Escape special characters to prevent SQL injection
export const escapeString = (str) => {
  if (typeof str !== 'string') return str;
  
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\0/g, '\\0')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\x1a/g, '\\Z');
};