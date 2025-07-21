import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout and Route Protection
import Layout from "./components/Layout";
import UserRoute from "./components/UserRoute";
import ChefRoute from "./components/ChefRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChefDashboard from "./pages/ChefDashboard";
import CartPage from "./pages/CartPage";
import UserOrders from "./pages/UserOrders";
import OrderSuccess from "./pages/OrderSuccess";
import AdminRoute from "./components/AdminRoute"; // Import AdminRoute
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Protected User Routes */}
          <Route element={<UserRoute />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="my-orders" element={<UserOrders />} />
          </Route>

          {/* Protected Chef Routes */}
          <Route element={<ChefRoute />}>
            <Route path="chef/dashboard" element={<ChefDashboard />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
