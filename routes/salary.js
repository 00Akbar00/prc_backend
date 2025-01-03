const express = require("express");
const router = express.Router(); 
const salaryController = require("../controllers/salaryController"); 

router.get('/getSalary', salaryController.getSalary);
router.post('/addSalary', salaryController.addSalary);
router.put('/updateSalary', salaryController.updateSalary)
router.delete('/deleteSalary/:salaryId', salaryController.deleteSalary);

module.exports = router; 