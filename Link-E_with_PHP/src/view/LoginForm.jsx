import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./LoginForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const userType = Cookies.get("userType");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/PHP/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          // Handle successful login, e.g., redirect to another page
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="login-label">
          Email:
          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="login-label">
          Password:
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <p className="signup-text">
        Don't have an account?{" "}
        {userType === "customer" ? (
          <Link to="/signup-customer" className="signup-link">
            Sign Up
          </Link>
        ) : userType === "service-provider" ? (
          <Link to="/signup-service-provider" className="signup-link">
            Sign Up
          </Link>
        ) : (
          "Please select a user type first"
        )}
      </p>
    </div>
  );
}

export default LoginForm;
