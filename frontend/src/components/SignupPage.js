import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAsyncValue, useNavigate } from "react-router-dom";
import { FaInstagram,FaGoogle,FaFacebook } from 'react-icons/fa';
import '../CSS/signup-page.css';

// css written in signup-page.css
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
      if(password!==confirmedPassword){
        console.log("Password Not Matched")
        
      }
      else{
        // console.log("username"+username+"pasw"+password+"email"+email);

      const response=await fetch('http://localhost:4000/signup',{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:username,password:password,email:email}),
        credentials: "include",
    })
    if (response.ok) {
      // console.log(response);
      console.log('Signup successful!');
      toast.success("Signed Up Successfully");
      navigate("/");

      } else {
        console.error('Signup failed');
      }
    }
    // Handle signup logic here
  }

  return (
    <>
      <div id="signup-page">
        <div className="signup-image-section"></div>
        <div className="signup-form-section">
          <div id="signup-form-container">
            <h1 className="signup-form-heading">Create Account</h1>
            <form className="grid grid-cols-1 gap-y-4">
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
              <p>Or sign up with</p>
              <div className="signup-social-media-icons">
                <div className="signup-social-media-icon">
                  <FaGoogle size={20} />
                </div>
                <div className="signup-social-media-icon">
                  <FaInstagram size={20} />
                </div>
                <div className="signup-social-media-icon">
                  <FaFacebook size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
