import React from "react";
import OrderManagement from "../components/OrderManagement";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage all orders from here.</p>
      <OrderManagement />
    </div>
  );
};

export default AdminDashboard;
