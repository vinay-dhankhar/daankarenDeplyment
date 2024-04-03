import React, { useState } from "react";
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import '../CSS/signup-page.css';
import {auth,provider} from "../config/firebase-config"

// importing the required images
import facebookLogo from './Icons/facebook-logo.png'
import googleLogo from './Icons/google-logo.png'
import instagramLogo from "./Icons/insta-icon.png"
import DonationPageVector from './Images/Donation-Page-Image.png'
import { signInWithPopup } from "firebase/auth";

// css written in signup-page.css
const SignupPage = ({loginHandler}) => {
  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [contact , setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


  const handleSignup = async () => {
    if (password !== confirmedPassword) {
      console.log("Password Not Matched")
      setErrorMessage("Password Not Matched");

    }

      else if (!password.match(passwordFormat)) {
        setErrorMessage("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.");
        // return;
      }
    
    else {
      // console.log("username"+username+"pasw"+password+"email"+email);

      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password, email: email }),
        credentials: "include",
      })
      if (response.ok) {
        // console.log(response);
        console.log('Signup successful!');
        toast.success("Signed Up Successfully");
        const user = await loginHandler(email, password, setToken);
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
        navigate("/");

      } else {
        console.error('Signup failed');
        setErrorMessage("User Already Exists")
      }
    }
    // Handle signup logic here
  }
  const handleGoogleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("User:", user);
      // Alternatively, you can log individual properties of the user object
      // console.log("User UID:", user.uid);
      // console.log("User Display Name:", user.displayName);
      // console.log("User Email:", user.email);
      // console.log("User Photo URL:", user.photoURL);
      // Add more properties as needed
      // console.log(password+email);
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.displayName, password: user.uid, email: user.email }),
        credentials: "include",
      });
      if (response.ok) {
        // console.log(response);
        console.log('Signup successful!');
        toast.success("Signed Up Successfully");
        const user2=await loginHandler(user.email, user.uid, setToken);
        if (document.cookie.includes("Login")) {
          // Redirect to the home page for regular users
          // console.log("hello");
          // window.location.href = "/";
          navigate('/');
        } else if (user2 && user2.role === "admin") {
          // Redirect to the admin page for admin users
          // window.location.href = "/";
          navigate('/');
        } else {
          // Handle unexpected user data or role
          console.error("Unexpected user data or role");
        }
        window.location.reload();
        navigate("/");
        navigate("/");
      } else {
        console.error('Signup failed');
        setErrorMessage("User Already Exists")
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErrorMessage("Error signing in with Google:")
    }
  };
  
  
  

  return (
    <>
      <div id="signup-page">
        
        <div className="signup-image-section">
          <h1 className="signup-page-tagline">Discover a World of flavor in every sip !</h1>
          <img src={DonationPageVector} />
        </div>
        <div className="signup-form-section">
          <div id="signup-form-container">
            <h1 className="signup-form-heading">Create Account</h1>
            <form className="grid grid-cols-1 gap-y-4 signup-form">
              <div className="grid grid-cols-2 gap-x-4">
                <input
                  className="signup-form-input"
                  id="fName"
                  type="text"
                  value={fName}
                  placeholder="First Name"
                  onChange={(e) => setFName(e.target.value)}
                />
                <input
                  className="signup-form-input"
                  id="lName"
                  type="text"
                  value={lName}
                  placeholder="Last Name"
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>
              <input
                className="signup-form-input"
                id="username"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="signup-form-input"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="signup-form-input"
                id="contact"
                type="number"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <div className="signup-form-passwords">
                <input
                  className="signup-form-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="signup-show-password-icon">
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </div>
              <div className="signup-form-passwords">
                <input
                  className="signup-form-input"
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  onChange={(event) => setConfirmedPassword(event.target.value)}
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="signup-show-password-icon">
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="signup-form-signup-button"
                  onClick={handleSignup}
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="signup-social-media">
              <div className="signup-social-divider">
                <span>Or Sign Up with</span>
              </div>
              <div className="signup-social-media-icons">
                <div className="signup-social-media-icon">
                  <button onClick={handleGoogleClick}>
                  <img src={googleLogo} />
                  </button>
                </div>
                <div className="signup-social-media-icon">
                  <img src={instagramLogo} />
                </div>
                <div className="signup-social-media-icon">
                  <img src={facebookLogo} />
                </div>
              </div>
            </div>
            <div className="signup-login-link">
              <span>Already have an account?</span>
              {/* <NavLink to="/LoginPage" className="text-blue-500 hover:text-blue-700">
                Sign In
              </NavLink> */}
            </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
