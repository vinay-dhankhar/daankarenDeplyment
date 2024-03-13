import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Navcomp from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from './components/Footer';
import DonationPage from './components/DonationPage';
import CampaignsPage from './components/CampaignPage';
import ContactPage from './components/ContactPage';
import PartnerPage from './components/PartnerPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PendingTickets from './components/PendingTickets';
import ViewCampaigns from './components/ViewCampaigns';
import NewCampaign from './components/NewCampaign';
import CampaignCard from './components/CampaignCard';
import CampaignPage from './components/CampaignPage';
import DonationPaymentPage from './components/DonationPaymentPage';
import LocationForm from './components/location';
import NewCampaignForm from './components/NewCampaignForm';


function App() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");


  useEffect(() => {
    // Retrieve user information from local storage on component mount
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
  if (storedUserId&&document.cookie.includes("Login")) {
    setUserId(storedUserId);
    setRole(storedRole);
  } else {
    setRole(null);
    setUserId(null);
  }

    // console.log("role="+role);
    // console.log("userId="+userId);
  }, []);


  async function loginHandler(email,password,setToken) {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include",
    })
    const responseData = await response.json();
    if (response.ok) {
      const { uid, role, token } = responseData;
      window.location.href = "/";
      // console.log("reached here")
    
      // Set token in state
      setToken(token);
    
      // Set user ID and role in state and local storage
      setUserId(uid);
      setRole(role);
      localStorage.setItem("userId", uid);
      localStorage.setItem("role", role);
    
      // Redirect to home page
      // console.log("chl toh raha hai")
      // // Return user data
      return {
        uid: uid,
        role: role,
      };
    
    
    } else {
      console.log("error is there");
    }
  }

  return (
    <>
      <Router>
        {/* <Navcomp userId={userId} role={role} /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/DonationPage" element={<DonationPage />} />
          <Route path="/DonationPaymentPage" element={<DonationPaymentPage />} />
          <Route path="/CampaignsPage" element={<CampaignsPage role={role}/>} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/NewCampaign" element={<NewCampaign />} />
          <Route path="/NewCampaignForm" element={<NewCampaignForm />} />
          <Route path="/PartnerPage" element={<PartnerPage />} />
          <Route path="/LoginPage" element={<LoginPage loginHandler={loginHandler} />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          <Route path="/PendingTickets" element={<PendingTickets role={role} />} />
          <Route path="/CampaignCard" element={<CampaignCard  />} />
          <Route path="/campaigns/:campaignId" element={<CampaignPage role={role} />} />
          <Route path="/ViewCampaigns" element={<ViewCampaigns role={role} />} />
          <Route path="/location" element={<LocationForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
