// Importing mongoose module
const mongoose = require("mongoose");

// Defining the schema for the Admin model
const adminSchema = new mongoose.Schema({
  // Admin username, must be unique and is required
  username: { type: String, required: true, unique: true },
  // Admin password, is required
  password: { type: String, required: true },
});

// Exporting the Admin model to be used in other parts of the application
module.exports = mongoose.model("Admin", adminSchema);
