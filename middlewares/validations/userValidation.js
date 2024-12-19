const { body } = require('express-validator');

const addUserValidation = [
  // Validate name
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Name must not contain numbers or special characters'),

  // Validate email
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  // Validate password
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character'),

  // Validate roleIds
  body('roleIds')
    .isArray({ min: 1 })
    .withMessage('Role IDs must be an array with at least one element')
    .custom((value) => value.every((id) => Number.isInteger(id) && id > 0))
    .withMessage('Each Role ID must be a positive integer'),

  // Validate departmentIds
  body('departmentIds')
    .isArray({ min: 1 })
    .withMessage('Department IDs must be an array with at least one element')
    .custom((value) => value.every((id) => Number.isInteger(id) && id > 0))
    .withMessage('Each Department ID must be a positive integer'),
];

const updateUserValidation = [
  // Validate name (optional but must follow the same rules if provided)
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name must not be empty')
    .isString()
    .withMessage('Name must be a string')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Name must not contain numbers or special characters'),

  // Validate email (optional but must follow the same rules if provided)
  body('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Email must not be empty')
    .isEmail()
    .withMessage('Invalid email address'),

  // Validate password (optional but must follow the same rules if provided)
  body('password')
    .optional()
    .notEmpty()
    .withMessage('Password must not be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character'),

  // Validate roleIds (optional but must be an array of positive integers if provided)
  body('roleIds')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Role IDs must be an array with at least one element')
    .custom((value) => value.every((id) => Number.isInteger(id) && id > 0))
    .withMessage('Each Role ID must be a positive integer'),

  // Validate departmentIds (optional but must be an array of positive integers if provided)
  body('departmentIds')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Department IDs must be an array with at least one element')
    .custom((value) => value.every((id) => Number.isInteger(id) && id > 0))
    .withMessage('Each Department ID must be a positive integer'),
];


module.exports = { addUserValidation, updateUserValidation };
