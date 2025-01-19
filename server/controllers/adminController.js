// Importing required modules
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// Controller function for admin registration
exports.register = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // If user exists, return a 400 status with a message
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const user = await Admin.create({
      username,
      password: hashedPassword,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    // Handle any other errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Controller function for admin login
exports.login = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { username, password } = req.body;

    // Check if all required fields are present
    if (!username || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if user exists
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and success message
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    // Handle any other errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users
    const users = await User.find();

    // Send the users as response
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    // Handle any other errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
