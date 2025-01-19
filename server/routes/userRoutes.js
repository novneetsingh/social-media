// Importing express module
const express = require("express");

// Creating a router object
const router = express.Router();

// Importing controller function from userController
const { createUser } = require("../controllers/userController");

// Route for user form submission
router.post("/submit", createUser);

// Exporting the router object to be used in other parts of the application
module.exports = router;