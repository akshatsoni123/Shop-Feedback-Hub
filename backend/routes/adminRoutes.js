const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');
const { registerValidation, storeValidation } = require('../middleware/validation');

// All routes require admin authentication
router.use(authenticate);
router.use(authorize('admin'));

// Dashboard stats
router.get('/dashboard/stats', adminController.getDashboardStats);

// User management
router.post('/users', registerValidation, adminController.createUser);
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserById);

// Store management
router.post('/stores', adminController.createStore);
router.get('/stores', adminController.getStores);

module.exports = router;
