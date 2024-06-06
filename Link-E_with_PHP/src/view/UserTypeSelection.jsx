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
      <Link to="/signin?type=customer">
        <button className="buttonStyle" onClick={() => handleSelection("customer")}>Customer</button>
      </Link>
      <Link to="/signin?type=service-provider">
        <button className="buttonStyle" onClick={() => handleSelection("service-provider")}>Service Provider</button>
      </Link>
    </div>
  );
}

export default UserTypeSelection;
