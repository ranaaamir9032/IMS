import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/Users/userActions";
import { useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const {error} = useSelector((state) => state.userHandler);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(user));
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="container-login">
        <h4>Welcome Back!</h4>
        <p>Enter your credentials to access your account</p>
        <form className="login-form" onSubmit={loginHandler}>
          <label>Email</label>
          <input
            required
            type="text"
            placeholder="Enter Email Address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label>Password</label>
          <input
            required={true}
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {error && (
            <div className="error" style={{ color: "red", fontWeight: 500 }}>
              {error}
            </div>
          )}
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
      </div>
      <p>
        Forgot your Password? <a href="/resetPassword">Reset Password</a>
      </p>
    </div>
  );
}
