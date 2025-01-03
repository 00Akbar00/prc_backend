const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const roleRoutes = require('./role');
const permissionRoutes = require('./permission');
const departmentRoutes = require('./department');
const salaryRoutes = require('./salary')

router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);
router.use('/department', departmentRoutes);
router.use('/salary', salaryRoutes)

module.exports = router;
