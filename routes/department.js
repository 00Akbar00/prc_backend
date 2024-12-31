const express = require("express");
const router = express.Router(); 
const departmentController = require("../controllers/departmentController"); 
const {addDepartmentValidation} = require("../middlewares/validations/departmentValidation")

router.get('/departments', departmentController.getDepartments);
router.post('/addDepartment', addDepartmentValidation, departmentController.addDepartment);
router.delete('/deleteDepartment/:id', departmentController.deleteDepartment);

module.exports = router; 