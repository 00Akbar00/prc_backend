const { body } = require('express-validator');

const addDepartmentValidation = [
  // Validate role name
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Role name is required')
    .isString()
    .withMessage('Role name must be a string')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Role name must contain only alphabets and spaces')
];

module.exports = { addDepartmentValidation };
