import React, { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import Navbar from "./Navbar";

function SignupFormCustomer() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(
      "http://localhost:8000/signup.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "customer"
        }),
      }
    );

    if (response.ok) {
      console.log("Signup successful");
      navigate("/signin")
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit} style={formStyle} className="">
      <h2>Signup - Customer</h2>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      <button className="bg-blue-700 mt-4" type="submit">Signup</button>

      <label className="mt-4"> Already have an account? <Link to="/signin" className="text-blue-600 font-semibold"> Sign In</Link> </label>
    </form>
    </>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
};

export default SignupFormCustomer;
