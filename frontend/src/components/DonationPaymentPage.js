import React, { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import { useLocation } from "react-router-dom";
import '../CSS/donation-payment.css';

const DonationPaymentPage = () => {
  const location = useLocation();
  const campaign = location.state ? location.state.campaign : null;
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status
  const [loading, setLoading] = useState(false); // State to track loading state for payment request
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const handleInputChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handlePresetAmount = (amount) => {
    setDonationAmount(amount);
  };

  const handleDonateNow = async () => {
    // Check if the user is logged in
    if (!isLoggedIn) {
      alert("You are not logged in. Please login first.");
      window.location.href = "/LoginPage";
      return;
    }

    console.log(`Donating ${donationAmount} to ${campaign}`);
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const response = await fetch('https://daankaren-deplyment-server.vercel.app/braintree/payment', {
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
      console.log('Payment response:', data);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToken = async () => {
    try {
      const response = await fetch('https://daankaren-deplyment-server.vercel.app/braintree/token');
      const data = await response.json();
      setClientToken(data.clientToken);
      // console.log("clientToken")
      // console.log(data.clientToken)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const loggedIn = document.cookie.includes("Login");
      setIsLoggedIn(loggedIn);
    };

    checkAuthentication();
    // Call getToken() only once when component mounts
    getToken();
    setLoadingPercentage(100);
  }, []);
   // Empty dependency array ensures useEffect runs only once when component mounts

   if (loadingPercentage < 100) {
    return <div>Loading... {loadingPercentage}%</div>;
  }

  return (
    <div className="pay-donation-page">
      <div className="pay-donation-card">
        <h2 className="pay-donation-header">{campaign.campaignName}</h2>
        <div className="pay-donation-amount">
          <label htmlFor="donationAmount">Select Donation Amount:</label>
          <div className="pay-preset-amounts">
            <button
              className={`pay-preset-amount ${donationAmount === 100 ? 'active' : ''}`}
              onClick={() => handlePresetAmount(100)}
            >
              ₹100
            </button>
            <button
              className={`pay-preset-amount ${donationAmount === 250 ? 'active' : ''}`}
              onClick={() => handlePresetAmount(250)}
            >
              ₹250
            </button>
            <button
              className={`pay-preset-amount ${donationAmount === 500 ? 'active' : ''}`}
              onClick={() => handlePresetAmount(500)}
            >
              ₹500
            </button>
            <button
              className={`pay-preset-amount ${donationAmount === 1000 ? 'active' : ''}`}
              onClick={() => handlePresetAmount(1000)}
            >
              ₹1000
            </button>
          </div>
          <input
            type="number"
            id="donationAmount"
            value={donationAmount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="pay-amount-input"
          />
        </div>
        {clientToken && (
          <div className="pay-drop-in-container">
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: 'vault'
                }
              }}
              onInstance={(instance) => setInstance(instance)}
            />
          </div>
        )}
        <button
          className="pay-donate-button"
          onClick={handleDonateNow}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </div>
    </div>
  );
};

export default DonationPaymentPage;