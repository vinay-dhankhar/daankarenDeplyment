import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

function ThankYouPage() {
  const navigate = useNavigate(); // useNavigate hook

  // Function to navigate to the home page ("/")
  const navigateToHomePage = () => {
    navigate('/');
  };

  return (
    <div>
      <div>ThankYouPage</div>
      <button onClick={navigateToHomePage}>Go to Home</button> {/* Button to navigate */}
    </div>
  );
}

export default ThankYouPage;
