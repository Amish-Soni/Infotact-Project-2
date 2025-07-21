import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// Protects routes for users with 'chef' role
const ChefRoute = () => {
  const { auth } = useAuth();
  return auth.user?.role === "chef" ? <Outlet /> : <Navigate to="/" />;
};

export default ChefRoute;
