import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./UserTypeSelection.css";

function UserTypeSelection() {
  const handleSelection = (userType) => {
    Cookies.set("userType", userType, { expires: 7 });
  };

  return (
    <div className="containerStyle">
      <h1>Which type of account do you want to sign in to?</h1>
      <Link to="/signin" onClick={() => handleSelection("customer")}>
        <button className="buttonStyle">Customer</button>
      </Link>
      <Link to="/signin" onClick={() => handleSelection("service-provider")}>
        <button className="buttonStyle">Service Provider</button>
      </Link>
    </div>
  );
}

export default UserTypeSelection;
