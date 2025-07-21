import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import "./AuthForm.css";

const AuthLayout = ({ isRegister, formData, setFormData, handleSubmit }) => {
  const title = isRegister ? "Create an Account" : "Welcome Back!";
  const switchText = isRegister
    ? "Already have an account?"
    : "Don't have an account?";
  const switchLinkText = isRegister ? "Login" : "Register";
  const switchLinkTo = isRegister ? "/login" : "/register";

  return (
    <div className="auth-page-wrapper">
      <AuthForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isRegister={isRegister}
        title={title}
      />
      <p className="auth-switch-link">
        {switchText} <Link to={switchLinkTo}>{switchLinkText}</Link>
      </p>
    </div>
  );
};

export default AuthLayout;
