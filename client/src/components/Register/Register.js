import React, { useState } from "react";
import "../Login/Login.css";
function Register() {
  const [detail, setDetail] = useState({
    username: "",
    email: "",
    password: "",
  });
  const addDetail = (key, value) => {
    setDetail((prev) => ({ ...prev, [key]: value }));
  };
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="login-wrapper">
      <div className="input-wrapper">
        <h3>Register</h3>
        <div className="login-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => addDetail("username", e.target.value)}
          />
        </div>
        <div className="login-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={(e) => addDetail("email", e.target.value)}
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => addDetail("password", e.target.value)}
          />
        </div>
        <div className="login-input">
          <button onClick={handleSubmit} type="submit">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
