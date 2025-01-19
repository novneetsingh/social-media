// Importing mongoose module
const mongoose = require("mongoose");

// Defining the schema for the User model
const userSchema = new mongoose.Schema({
  // User's name, is required
  name: { type: String, required: true },
  // User's social media handle, is required
  socialMediaHandle: { type: String, required: true },
  // Array of image URLs associated with the user, each is required
  images: [{ type: String, required: true }],
});

// Exporting the User model to be used in other parts of the application
module.exports = mongoose.model("User", userSchema);
