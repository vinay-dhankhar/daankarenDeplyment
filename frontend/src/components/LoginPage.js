// Login.js

import React, { useState, useEffect } from 'react';
import '../CSS/login-page.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// importing brand logos
import facebookLogo from './Icons/facebook-logo.png'
import googleLogo from './Icons/google-logo.png'
import instagramLogo from "./Icons/insta-icon.png"

const LoginPage = ({ loginHandler, showOverlay, setShowOverlay }) => {

  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handler(event);
    }
  };

  const handler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginHandler(email, password, setToken);
      // console.log(user)

      if (document.cookie.includes("Login")) {
        // Redirect to the home page for regular users
        // console.log("hello");
        // window.location.href = "/";
        navigate('/');
      } else if (user && user.role === "admin") {
        // Redirect to the admin page for admin users
        // window.location.href = "/";
        navigate('/');
      } else {
        // Handle unexpected user data or role
        console.error("Unexpected user data or role");
      }

      window.location.reload();


    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure if needed
    }
  };

  // handling the visibility of the overlay
  useEffect(() => {
    // Function to handle click event outside the modal
    const handleOutsideClick = (event) => {
      const modal = document.querySelector('.login-modal');
      if (modal && !modal.contains(event.target)) {
        setShowOverlay(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setShowOverlay]);
  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    showOverlay &&
    <div className="login-overlay">
      <div className="login-modal">
        <div className="close-icon" onClick={handleCloseOverlay}>
          <p>
            &times;
          </p>
        </div>
        <div className='login-form'>
          <h2 className='login-form-heading'>Login</h2>
          <form onSubmit={handler} onKeyDown={handleKeyDown}>
            <div className='login-form-inputs'>
              <input
                type="text"
                id="login"
                value={email}
                className='login-form-input-field'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="login-form-passwords">
                <input
                  className="login-form-input-field"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="login-show-password-icon">
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </div>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            <div className="social-login">
              <div className="login-social-divider">
                <span>or signup with</span>
              </div>
              <div className="social-icons">
                <a href="#" className="login-social-media-icon">
                  <img src={googleLogo} />
                </a>
                <a href="#" className="login-social-media-icon">
                  <img src={instagramLogo} />
                </a>
                <a href="#" className="login-social-media-icon">
                  <img src={facebookLogo} />
                </a>
              </div>
            </div>
            <div className="signup-link">
              <p>Don't have an account?</p>
              <NavLink to="/SignupPage" onClick={handleCloseOverlay}>
                <p>Sign Up</p>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;