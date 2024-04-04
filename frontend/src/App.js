import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
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
import CampaignCard from './components/CampaignCard';
import CampaignPage from './components/CampaignPage';
import DonationPaymentPage from './components/DonationPaymentPage';
import PickUpPage from './components/Pickup-Page';
import NewCampaignForm from './components/NewCampaignForm';
import PendingDonateItems from './components/PendingDonateItems';
import VolunteerItemDonation from './components/VolunteerItemDonation';
import ProfilePage from './components/ProfilePage';
import toast from 'react-hot-toast';
import RegisterOrg from './components/RegisterOrg';
import VerifyNgoRegistrations from './components/VerifyNgoRequests';
import ForgotPassword from './components/ForgotPassword';
import ThankYouPage from './components/ThankYouPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Retrieve user information from local storage on component mount
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    if (storedUserId && document.cookie.includes("Login")) {
      setUserId(storedUserId);
      setRole(storedRole);
    } else {
      setRole(null);
      setUserId(null);
    }
    // console.log("role="+role);
    // console.log("userId="+userId);
  }, []);

  async function loginHandler(email, password, setToken) {
    // console.log("emailinloginhandler="+email);
    // console.log("pswinloginhandler="+password);
    const response = await fetch('https://daankaren-deplyment-server.vercel.app/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include",
    })
    const responseData = await response.json();
    if (response.ok) {
      // console.log(responseData);
      const { uid, role, token } = responseData;
      toast.success("Logged In Successfully");
      // window.location.href = "/";
      // console.log("reached here")

      // Set token in state
      setToken(token);

      // Set user ID and role in state and local storage
      setUserId(uid);
      setRole(role);

      localStorage.setItem("userId", uid);
      localStorage.setItem("role", role);
      // console.log("loginhandler"+uid+role);

      // Redirect to home page
      // console.log("chl toh raha hai")
      // // Return user data
      return {
        uid: uid,
        role: role,
        message: "Success"
      };
    } else {
      console.log("error is there");
      return {
        message: "Failed to Login"
      }
      // alert("Wrong email ")
    }
  }

  // Variable and function for loginpage's Popup & its state
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navcomp userId={userId} role={role} setIsLoginClicked={setIsLoginClicked} />
        {
          isLoginClicked && <LoginPage loginHandler={loginHandler} showOverlay={isLoginClicked} setShowOverlay={setIsLoginClicked} />
        }
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/DonationPage" element={<DonationPage />} />
          <Route path="/DonationPaymentPage" element={<DonationPaymentPage />} />
          <Route path="/CampaignsPage" element={<CampaignsPage role={role} />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/NewCampaignForm" element={<NewCampaignForm />} />
          <Route path="/PartnerPage" element={<PartnerPage />} />
          <Route path="/SignupPage" element={<SignupPage loginHandler={loginHandler} />}/>
          <Route path="/PendingTickets" element={<PendingTickets role={role} />} />
          <Route path="/CampaignCard" element={<CampaignCard />} />
          <Route path="/campaigns/:campaignId" element={<CampaignPage role={role} />} />
          <Route path="/ViewCampaigns" element={<ViewCampaigns role={role} />} />
          <Route path="/PickupPage" element={<PickUpPage />} />
          <Route path="/PendingDonateItems" element={<PendingDonateItems role={role} />} />
          <Route path="/VerifyNgoRegistrations" element={<VerifyNgoRegistrations role={role} />} />
          <Route path="/Volunteer" element={<VolunteerItemDonation loginHandler={loginHandler}/>} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path='/registerOrg' element={<RegisterOrg />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/thankyouPage' element={<ThankYouPage/>} />
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
