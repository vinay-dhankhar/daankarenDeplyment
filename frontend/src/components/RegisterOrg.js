import React, { useEffect, useState } from "react";
import "../CSS/contact-form.css";
import PhoneIcon from '../components/Icons/Phone.png';
import ChatIcon from '../components/Icons/Chat.png';
import { useNavigate } from 'react-router-dom';


function RegisterOrg() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    contactNumber: "",
    motive: "",
    poc: "",
    pocDesignation: "",
    address: "",
    city:"",
    pincode:"",
    state:""
  });

  const [isLoggedIn , setLoggedIn] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(()=>{

    const checkAuth = () => {
      const loggedIn = document.cookie.includes("Login");
      if(loggedIn){
        setLoggedIn(true);
        setLoadingPercentage(70);
      }
      else{
        setLoggedIn(false);
      }
    }
    setLoadingPercentage(10);

    checkAuth();
    setLoadingPercentage(100);
  } , []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isLoggedIn){
        alert("You are not Logged In. Please Login First");
        window.location.href="/LoginPage";
        return;
    }

    try {
      const res = await fetch("http://localhost:4000/registerOrg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({formData}),
      });
      alert("Form submitted successfully!");
      
    if(res.ok){
        console.log("Registration Request Submitted");
        navigate('/thankyou-page')
        
    }
    else{
        console.log("Registration Failed");
    }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };

  if (loadingPercentage < 100) {
    return <div>Loading... {loadingPercentage}%</div>;
  }

  return (
    <>
    <div className="contact-page-background">
    <div>
      <h1>Register your Organisation With Us</h1>
      <p>We'd love to solve any kind of query you have and guide you through your journey of doing the selfless acts of donation</p>
    </div>
    </div>
    <section className="contact-page-container">
      <div className="contact-details">
        <div className="contact-details-phone">
        <img src={PhoneIcon}></img>
          <div className="contact-details-content">
            <h1>Call us at</h1>
            <a href="tel:8181818181">+91 8181818181</a>
          </div>
        </div>
        <div className="contact-details-chat">
        <img src={ChatIcon}></img>
          <div className="contact-details-content">
            <h1>Chat with us</h1>
            <button>Chat</button>
          </div>
        </div>
      </div>
      <div className="contact-form-container flex">
        <form onSubmit={handleSubmit}>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="orgName"
              name="orgName"
              placeholder="Enter your Organisation name"
              value={formData.orgName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="poc"
              name="poc"
              placeholder="Enter your name"
              value={formData.poc}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="pocDesignation"
              name="pocDesignation"
              placeholder="Enter your role in the Organisation"
              value={formData.pocDesignation}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="phone"
              name="contactNumber"
              type="number"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="email"
              type="email"
              name="email"
              placeholder="Enter email of organisation"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="pincode"
              name="pincode"
              placeholder="Pincode"
              type="number"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <input
              className="contact-form-input-field"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-0">
            <textarea
              cols={50}
              rows={4}
              className="contact-form-input-field"
              id="motive"
              name="motive"
              placeholder="Details about your org , what it does and why you want to register yourself on our platform. "
              value={formData.motive}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button className="contact-form-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
}

export default RegisterOrg;
