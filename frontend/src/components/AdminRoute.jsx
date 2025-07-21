import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { auth } = useAuth();

  if (auth.loading) {
    return <p>Loading...</p>; // Or a spinner component
  }

  return auth.user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
