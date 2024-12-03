const express = require('express'); // Import the express module
const router = express.Router(); // Create a new router instance
const authController = require('../controllers/authController'); // Import the user controller


app.post("/login",authController.login);


module.exports = router;