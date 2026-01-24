import express from 'express';
import studentRoutes from './students.js';

const router = express.Router();

// Mount staff sub-routes
router.use('/students', studentRoutes);

// Health check for staff routes
router.get('/', (req, res) => {
  res.json({
    message: 'Staff API is running',
    endpoints: {
      students: '/api/staff/students',
    }
  });
});

export default router;
