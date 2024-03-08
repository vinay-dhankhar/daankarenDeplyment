import React, { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import '../CSS/donation-payment.css';
import { useLocation } from "react-router-dom";

function DonationPaymentPage() {
  const location = useLocation();
  const campaign = location.state ? location.state.campaign : null;
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status
  const [loading, setLoading] = useState(false); // State to track loading state for payment request

  const handleInputChange = (e) => {
    setDonationAmount(e.target.value);
  };
  const handleDonateNow = async () => {
    // Check if the user is logged in
    if (!isLoggedIn) {
      alert("You are not logged in. Please login first.");
      // Redirect the user to the login page
      window.location.href = "/LoginPage"; // Replace "/LoginPage" with the actual URL of your login page
      return; // Stop further execution of the function
    }
  
    // Handle donation submission here
    console.log(`Donating ${donationAmount} to ${campaign}`);
    try {
      setLoading(true); // Set loading to true before sending payment request
      const { nonce } = await instance.requestPaymentMethod();
      const response = await fetch('http://localhost:4000/braintree/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: donationAmount,
          campaign: campaign,
          nonce: nonce
        })
      });
      const data = await response.json();
      alert("Payment Successful");
      // Handle the response data as needed
      console.log('Payment response:', data);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false); // Set loading to false after receiving payment response
    }
  };
  
  

  const getToken = async () => {
    try {
      // console.log("helllllo im in getToken");
      const response = await fetch('http://localhost:4000/braintree/token');
      const data = await response.json();
      // console.log("data=");
      // console.log(data);
      setClientToken(data.clientToken);
      // console.log("clientToken")
      // console.log(data.clientToken)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = () => {
      // Check if user is logged in using document.cookie
      const loggedIn = document.cookie.includes("Login");

      if (loggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();

    // Call getToken() only once when component mounts
    getToken();
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <div className='donation-page'>
      <h2>Donate to {campaign.campaignName}</h2>
      <div className="donation-options">
        <label htmlFor="donationAmount">Select Donation Amount:</label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={handleInputChange}
          placeholder="Enter amount"
        />
      </div>
      <div>
      {clientToken && (
        <DropIn
          options={{ authorization: clientToken,
          paypal:{
            flow:'vault'
          } }}
          onInstance={(instance) => setInstance(instance)}
        />
      )}
       <button className="donate-button" onClick={handleDonateNow} disabled={loading} >
         {loading ? 'Processing...' : 'Donate Now'}
       </button>
    </div>
    </div>
  );
}

export default DonationPaymentPage;
