const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');
const { ratingValidation } = require('../middleware/validation');

// All routes require user authentication
router.use(authenticate);
router.use(authorize('user'));

// Store browsing
router.get('/stores', userController.getStores);

// Rating management
router.post('/ratings', ratingValidation, userController.submitRating);
router.put('/ratings', ratingValidation, userController.updateRating);
router.get('/ratings', userController.getMyRatings);

module.exports = router;
