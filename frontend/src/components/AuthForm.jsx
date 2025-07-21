import React from "react";
import "./AuthForm.css"; // Import the new CSS

const AuthForm = ({
  handleSubmit,
  formData,
  setFormData,
  isRegister,
  title,
}) => {
  return (
    <div className="auth-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {isRegister && (
          <select
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="user">Customer</option>
            <option value="chef">Chef</option>
          </select>
        )}

        <button type="submit" className="btn btn-secondary auth-button">
          {isRegister ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
