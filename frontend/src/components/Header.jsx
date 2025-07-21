import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Header.css";

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
    setMenuOpen(false); // Close menu on logout
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          HomeCook
        </Link>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          {auth.user?.role === "chef" && (
            <NavLink to="/chef/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
          )}
          {auth.user?.role === "user" && (
            <NavLink to="/my-orders" onClick={() => setMenuOpen(false)}>
              My Orders
            </NavLink>
          )}
          {auth.user?.role === "admin" && (
            <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
          )}

          <div className="mobile-auth-links">
            {auth.user ? (
              <>
                <Link
                  to="/cart"
                  className="cart-link"
                  onClick={() => setMenuOpen(false)}
                >
                  🛒 Cart
                </Link>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="desktop-auth-links">
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
      </div>
    </header>
  );
};

export default Header;
