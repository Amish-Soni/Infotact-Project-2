// src/pages/Register.jsx
import React, { useState } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      login(res.data.user);
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <AuthForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isRegister={true}
      />
      <p style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
