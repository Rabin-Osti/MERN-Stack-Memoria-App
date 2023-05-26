import React, { useState, useEffect } from "react";
import "./Login.css";
import { loginUser } from "../../features/auth/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../Loader/Loading";

function Login() {
  const dispatch = useDispatch();
  const { isLoading, error, success, user } = useSelector(
    (store) => store.loggedUser
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const addDetail = (key, value) => {
    setDetail((prev) => ({ ...prev, [key]: value }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(detail));
  }
  return (
    <form className="login-wrapper" onSubmit={handleSubmit}>
      <div className="input-wrapper">

      <h3>Login</h3>
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
          Login
        </button>
      </div>
      {isLoading && <Loading />}
      {error && (
        <h4 className="login-msg register">Invalid email or password</h4>
        )}
      <div className="register">
        Don't have an account?<Link to="/register"> Register</Link>
      </div>
        </div>
    </form>
  );
}

export default Login;
