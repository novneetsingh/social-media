import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Form submission logic
  const onSubmit = async (data) => {
    const { name, socialMediaHandle, images } = data;
    const formData = new FormData();

    // Append form data
    formData.append("name", name);
    formData.append("socialMediaHandle", socialMediaHandle);
    Array.from(images).forEach((image) => formData.append("images", image));

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/submit`,
        formData
      );
      alert("Form submitted successfully!");
      // console.log("Server response:", response.data);
      reset(); // Reset form fields
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          User Submission Form
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Social Media Handle Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Social Media Handle
            </label>
            <input
              type="text"
              {...register("socialMediaHandle", {
                required: "Social media handle is required",
              })}
              className={`w-full px-4 py-2 border ${
                errors.socialMediaHandle ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.socialMediaHandle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.socialMediaHandle.message}
              </p>
            )}
          </div>

          {/* Image Upload Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Images
            </label>
            <input
              type="file"
              {...register("images", {
                required: "Please upload at least one image",
              })}
              multiple
              accept="image/*"
              className={`w-full px-4 py-2 border ${
                errors.images ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
