const express = require("express");
const router = express.Router(); 
const roleController = require("../controllers/roleController"); 
const {addRoleValidation} = require("../middlewares/validations/roleValidation")

router.get('/roles', roleController.getRoles);
router.post('/addRole', addRoleValidation, roleController.addRole);
router.delete('/deleteRole/:id', roleController.deleteRole);

module.exports = router; 