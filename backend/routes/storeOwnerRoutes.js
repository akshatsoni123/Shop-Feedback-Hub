const express = require('express');
const router = express.Router();
const storeOwnerController = require('../controllers/storeOwnerController');
const { authenticate, authorize } = require('../middleware/auth');

// All routes require store owner authentication
router.use(authenticate);
router.use(authorize('store_owner'));

// Store information
router.get('/store', storeOwnerController.getMyStore);

// Dashboard and ratings
router.get('/dashboard/stats', storeOwnerController.getDashboardStats);
router.get('/ratings/users', storeOwnerController.getRatingUsers);

module.exports = router;
