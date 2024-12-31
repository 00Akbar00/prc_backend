const express = require("express");
const router = express.Router(); 
const permissionController = require("../controllers/permissionController"); 


router.get('/permissions', permissionController.getPermissions)
router.post('/assign-permissions', permissionController.assignPermissionsToRole);

module.exports = router; 