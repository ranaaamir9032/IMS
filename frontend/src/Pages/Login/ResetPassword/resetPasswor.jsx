import React, { useState } from 'react'
import logo from "../../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ResetPasswor() {
    let error;
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const submit = () => {
      if(step < 3){
        setStep(step + 1);
      } else {
        navigate('/')
      }      
    }

  return (
    <div className="login-container">
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
    <div className="container-login">
      <h4>Forgot Password?</h4>
      <p>Don't worry, enter below your email and a<br/>verification code will be sent to your mail</p>
      <form className="login-form">
      {step === 1 && 
       <div className="otp" style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          <label>Email</label>
        <input
          required
          type="text"
          placeholder="Enter Email"
        //   onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        </div>}
       {step === 2 && 
       <div className="otp" style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          <label>Otp</label>
        <input
          required
          type="text"
          placeholder="Enter OTP"
        //   onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        </div>}
       {step === 3 && <div className="otp" style={{width: '100%', display: 'flex', flexDirection: 'column', margin: '2% 0'}}>
          <label>Password</label>
        <input
          required
          type="text"
          placeholder="Enter New password"
        //   onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label>Confirm Password</label>
        <input
          required
          type="text"
          placeholder="Confirm New Password"
        //   onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        </div>}
        {error && (
          <div className="error" style={{ color: "red", fontWeight: 500 }}>
            {error}
          </div>
        )}
        <button type="submit" className="login-btn" onClick={submit}>
          {step === 1 ? "Send Verification Code" : step === 2 ? "Continue" : "Reset Password"}
        </button>
      </form>
    </div>
    <p>
      Entered wrong credentials? Go back to <a href="/">Login</a>
    </p>
  </div>
  )
}
