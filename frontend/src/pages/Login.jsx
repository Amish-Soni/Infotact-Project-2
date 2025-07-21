// src/pages/Login.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      login(res.data.user);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <AuthForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isRegister={false}
      />
      <p style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
};

export default Login;
