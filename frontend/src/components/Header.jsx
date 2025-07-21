import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Header.css";

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo">
        HomeCook
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        {auth.user?.role === "chef" && (
          <NavLink to="/chef/dashboard">Dashboard</NavLink>
        )}
        {auth.user?.role === "user" && (
          <NavLink to="/my-orders">My Orders</NavLink>
        )}
        {auth.user?.role === "admin" && (
          <NavLink to="/admin/dashboard">Admin Panel</NavLink>
        )}
      </nav>
      <div className="auth-links">
        {auth.user ? (
          <>
            <span>Welcome, {auth.user.name}</span>
            <Link to="/cart" className="cart-link">
              🛒 Cart
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
