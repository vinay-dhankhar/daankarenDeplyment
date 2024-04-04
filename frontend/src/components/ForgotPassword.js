import React, { useState } from 'react';
import '../CSS/forgotpassword-page.css'; // Import your CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = async () => {
    try {
      console.log("email-="+email);
      const response = await fetch('https://daankaren-deplyment-server.vercel.app/send-otp', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email}),
        credentials: "include",
      });
      if(response.ok){
      setIsOtpSent(true);     
      setSuccessMessage("OTP sent successfully to your email address.");
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('https://daankaren-deplyment-server.vercel.app/verify-otp', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,otp}),
        credentials: "include",
      });
      if(response.ok){
      const isOtpVerified = true; // Assume OTP is verified for demonstration
      if (isOtpVerified) {
        console.log("i got  you here");
        setIsOtpVerified(true);
        setSuccessMessage("OTP verified successfully.");
        setErrorMessage(null);
      } 
    }
    else {
      console.log("i got her");
      setIsOtpVerified(false);
      setErrorMessage("Invalid OTP. Please try again.");
    }
    } catch (error) {
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if(newPassword==confirmPassword){
    try {
      // console.log("npsw="+newPassword);

      const response = await fetch('https://daankaren-deplyment-server.vercel.app/change-password', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,otp,newPassword}),
        credentials: "include",
      });
      if(response.ok){
    
      setSuccessMessage("Password reset successfully.");
      // Reset form fields
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setIsOtpSent(false);
      setIsOtpVerified(false);
  }
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
    }
  }
  else{
    setErrorMessage("Passwords do not match");

  }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isOtpSent) {
      handleVerifyOtp();
    } else {
      handleSendOtp();
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <h2>Forgot Password</h2>
      {errorMessage && <div className="error-message-forgot-password">{errorMessage}</div>}
      {successMessage && <div className="success-message-forgot-password">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
      {!isOtpSent && (
          <div className="form-group-forgot-password">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        {!isOtpVerified&&isOtpSent &&
          <div className="form-group-forgot-password">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        }
        {!isOtpSent &&
          <button className="button-forgot-password" type="button" onClick={handleSendOtp}>Send OTP</button>
        }
        {!isOtpVerified&&isOtpSent &&
          <button className="button-forgot-password" type="button" onClick={handleVerifyOtp}>Verify OTP</button>
        }
        {isOtpVerified && isOtpSent &&
          <>
            <div className="form-group-forgot-password">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group-forgot-password">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="button-forgot-password" type="button" onClick={handleResetPassword}>Reset Password</button>
          </>
        }
      </form>
    </div>
  );
};

export default ForgotPassword;
