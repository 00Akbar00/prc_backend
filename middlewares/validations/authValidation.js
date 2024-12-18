const { body } = require('express-validator');

const loginValidation = [
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
    .withMessage('Password is required'),
];

module.exports = { loginValidation };
