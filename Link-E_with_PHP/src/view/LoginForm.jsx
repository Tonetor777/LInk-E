import React, { useState } from "react";
import { Link,  useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import "./LoginForm.css";
import Navbar from "./Navbar";

function LoginForm() {
  const navigate = useNavigate();
  
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
    console.log(userType)
    fetch("http://localhost:8000/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData, 
      type: userType
    }),
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          {userType === "customer" ? (
            navigate("/")
          ) : userType === "service-provider" ? (
            navigate("/dashboard")
          ) : (
            "Please select a user type first"
          )}
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
    <Navbar />
    <div className="login-container">
      <h2 className="login-title text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="">
        <label className="font-semibold">
          Email: </label>
          <input
            className="login-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        
        <label className="login-label font-semibold">
          Password: </label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        <div className="flex justify-center mt-5">
        <button className="login-button w-[100px]" type="submit">
          Login
        </button>
        </div>
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
    </>
  );
}

export default LoginForm;
