// Importing required modules
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, socialMediaHandle } = req.body;

    // Array to hold the URLs of uploaded images
    const uploadedImages = [];

    // Get the files from the request
    const files = Array.isArray(req.files.images)
      ? req.files.images
      : [req.files.images];

    // Upload each file to Cloudinary
    for (const file of files) {
      const image = await uploadImageToCloudinary(
        file,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      uploadedImages.push(image.secure_url); // Save the secure URL of the uploaded image
    }

    // Save user data in MongoDB
    const user = new User({
      name,
      socialMediaHandle,
      images: uploadedImages,
    });
    await user.save();

    // Respond with success message
    res.status(201).json({ message: "User submitted successfully.", user });
  } catch (error) {
    // Log the error and respond with a failure message
    console.error("Error in createUser:", error);
    res.status(500).json({ error: "Failed to submit user data." });
  }
};
