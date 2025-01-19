import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Error from "./Pages/Error";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import UserForm from "./Pages/UserForm";

const App = () => {
  // Helper function to check if the user is logged in
  const isLoggedIn = () => {
    return !!localStorage.getItem("authToken"); // Return true if token exists, otherwise false
  };

  return (
    <div className="w-screen min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/userform" element={<UserForm />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
