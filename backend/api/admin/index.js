import express from 'express';
import staffRoutes from './staff.js';

const router = express.Router();

// Mount admin sub-routes
router.use('/staff', staffRoutes);

// Health check for admin routes
router.get('/', (req, res) => {
  res.json({
    message: 'Admin API is running',
    endpoints: {
      staff: '/api/admin/staff',
      // More admin endpoints will be added here
    }
  });
});

export default router;