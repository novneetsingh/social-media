// Importing express module
const express = require("express");

// Creating a router object
const router = express.Router();

// Importing controller functions from adminController
const {
  register,
  login,
  getAllUsers,
} = require("../controllers/adminController");

// Importing authentication middleware
const { auth } = require("../middleware/auth");

// Route for admin signup
router.post("/signup", register);

// Route for admin login
router.post("/login", login);

// Route to get all user details, protected by authentication middleware
router.get("/getAllUserDetails", auth, getAllUsers);

// Exporting the router object to be used in other parts of the application
module.exports = router;