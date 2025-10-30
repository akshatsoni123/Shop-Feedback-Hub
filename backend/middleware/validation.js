const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// User registration validation rules
const registerValidation = [
    body('name')
        .trim()
        .isLength({ min: 20, max: 60 })
        .withMessage('Name must be between 20 and 60 characters'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be between 8 and 16 characters')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password must contain at least one special character'),
    body('address')
        .trim()
        .isLength({ max: 400 })
        .withMessage('Address must not exceed 400 characters'),
    validate
];

// Login validation rules
const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validate
];

// Store validation rules
const storeValidation = [
    body('name')
        .trim()
        .isLength({ min: 20, max: 60 })
        .withMessage('Store name must be between 20 and 60 characters'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('address')
        .trim()
        .isLength({ max: 400 })
        .withMessage('Address must not exceed 400 characters'),
    validate
];

// Rating validation rules
const ratingValidation = [
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    body('store_id')
        .isInt()
        .withMessage('Valid store ID is required'),
    validate
];

// Password update validation
const passwordUpdateValidation = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 8, max: 16 })
        .withMessage('New password must be between 8 and 16 characters')
        .matches(/[A-Z]/)
        .withMessage('New password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('New password must contain at least one special character'),
    validate
];

module.exports = {
    registerValidation,
    loginValidation,
    storeValidation,
    ratingValidation,
    passwordUpdateValidation
};
