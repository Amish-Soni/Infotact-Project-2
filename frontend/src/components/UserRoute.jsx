import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

// Protects routes for logged-in users of any role
const UserRoute = () => {
  const { auth } = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoute;
