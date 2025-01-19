import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]); // To hold user submissions
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user submissions
  const fetchUserDetails = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const token = localStorage.getItem("authToken"); // Token already exists if the user is authenticated

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getAllUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token for authentication
          },
        }
      );
      // console.log(response.data.users); // Log the response data
      setUsers(response.data.users); // Set users data from response
    } catch (error) {
      console.error("Error fetching user details:", error); // Log errors in the console
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []); // Fetch data when the component mounts

  if (loading) {
    return <div className="text-center mt-10 text-3xl">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 underline">Admin Dashboard</h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No user submissions found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600 mb-4">
                Social Media: {user.socialMediaHandle}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {user.images.map((image, index) => (
                  <a
                    key={index}
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={image}
                      alt={`Submission ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
