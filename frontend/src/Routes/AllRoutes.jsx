import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Signup-login/Login";
import Signup from "../Components/Signup-login/Signup";
import AuthRoute from "../Private/AuthRoute";
import BlogsDetails from "../Components/Blogs/BlogsDetails";
import Admin from "../Components/Blogs/Admin";
import DashBoard from "../Components/Blogs/DashBoard";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route
        path="/details/:id"
        element={
          <AuthRoute>
            <BlogsDetails />
          </AuthRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthRoute>
            <Admin />
          </AuthRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
