import React, { useState } from "react";
import "./SignupForm.css";

function SignupFormServiceProvider() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    address: "",
    eventType: "funeral",
    specificService: "",
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

    const response = await fetch("http://localhost:8000/signup.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        type: "Service-provider",
      }),
    });

    if (response.ok) {
      console.log("Signup successful");
      // Redirect or handle successful signup
    } else {
      console.error("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Event Type:
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
        >
          <option value="funeral">Funeral</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="graduation">Graduation</option>
          <option value="concert">Concert</option>
        </select>
      </label>
      <br />
      <label>
        Specific Service:
        <input
          type="text"
          name="specificService"
          value={formData.specificService}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormServiceProvider;
