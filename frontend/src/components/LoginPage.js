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
import { auth, provider } from "../config/firebase-config"
import { signInWithPopup } from "firebase/auth";

const LoginPage = ({ loginHandler, showOverlay, setShowOverlay }) => {

  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handler(event);
    }
  };

  const handleGoogleClick = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);

      const loggedInUser = await loginHandler(user.email, user.uid, setToken);

      if (document.cookie.includes("Login") || (loggedInUser && loggedInUser.role === "admin")) {
        navigate('/');
      } else {
        console.error("Unexpected user data or role");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrorMessage("Invalid email or password.");
    }
  };

  const handler = async (event) => {
    event.preventDefault();
    try {
      console.log(email , password);
      const user = await loginHandler(email, password, setToken);
      console.log(user);
      if (user.message === "Success") {
        if (document.cookie.includes("Login")) {
          navigate('/');
        } else if (user && user.role === "admin") {
          navigate('/');
        } else {
          console.error("Unexpected user data or role");
          setErrorMessage("Invalid email or password.");
        }
        // window.location.reload();
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const modal = document.querySelector('.login-modal');
      if (modal && !modal.contains(event.target)) {
        setShowOverlay(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

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
          <p>&times;</p>
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="forgot-password">
              <NavLink to="/forgotpassword" onClick={handleCloseOverlay}>
                Forgot Password?
              </NavLink>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
            <div className="social-login">
              <div className="login-social-divider">
                <span>or login with</span>
              </div>
              <div className="login-social-icons">
                <button onClick={handleGoogleClick} className="login-social-media-icon">
                  <img src={googleLogo} alt="Google" />
                </button>
                <a href="#" className="login-social-media-icon">
                  <img src={instagramLogo} alt="Instagram" />
                </a>
                <a href="#" className="login-social-media-icon">
                  <img src={facebookLogo} alt="Facebook" />
                </a>
              </div>
            </div>
            <div className="signup-link">
              <p>Don't have an account?&nbsp;</p>
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
