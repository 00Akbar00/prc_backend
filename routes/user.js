const express = require("express");
const router = express.Router(); 
const userController = require("../controllers/userController"); 
const {addUserValidation, updateUserValidation} = require("../middlewares/validations/userValidation")

router.get("/Users", userController.getUsers);
router.post("/addUser", addUserValidation, userController.addUser);       
router.delete("/deleteUser/:id", userController.deleteUser); 
router.put("/updateUser/:id",updateUserValidation, userController.updateUser);

module.exports = router