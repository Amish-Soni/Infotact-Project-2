import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios"; // Use the custom instance
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, loading: true });
  // const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      // Don't fetch user on auth pages to avoid flicker
      // if (location.pathname === "/login" || location.pathname === "/register") {
      //   setAuth({ user: null, loading: false });
      //   return;
      // }
      try {
        const res = await axiosInstance.get("/auth/me"); // Use the instance
        setAuth({ user: res.data.user, loading: false });
      } catch {
        setAuth({ user: null, loading: false });
      }
    };
    fetchUser();
  }, [location.pathname]); // Re-run when navigation occurs

  const login = (user) => setAuth({ user, loading: false });
  const logout = () => {
    axiosInstance.get("/auth/logout"); // Call logout endpoint
    setAuth({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
