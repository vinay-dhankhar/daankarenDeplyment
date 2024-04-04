import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { PiFilesFill } from "react-icons/pi";
import '../CSS/register-org-page.css';
import heroImage from "./Images/top-view-diverse-people-hands-holding-together-circle-hands-stack.jpg";
import logo from './Images/daanKarenLogo.png'

const HeroSection = () => {
  return (
    <div className="register-org-hero-section">
      <div className="register-org-hero-content">
        <h1 className='register-org-hero-heading'>Empower Your Mission with दानKaren</h1>
        <p>Embark on a journey to uplift your NGO's mission with our दानKaren.
          Experience the warmth of our support and the richness of our resources,
          empowering you to spread positive change across India.</p>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
    </div>
  );
};

function RegisterOrgPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    contactNumber: "",
    motive: "",
    poc: "",
    pocDesignation: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    documents: null
  });

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = document.cookie.includes("Login");
      if (loggedIn) {
        setLoggedIn(true);
        setLoadingPercentage(70);
      } else {
        setLoggedIn(false);
      }
    }
    setLoadingPercentage(10);

    checkAuth();
    setLoadingPercentage(100);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "contactNumber") {
      // Remove non-numeric characters from the input value
      const numericValue = value.replace(/\D/g, "");

      // Limit the length to 10 characters
      const limitedValue = numericValue.slice(0, 10);

      setFormData((prevData) => ({
        ...prevData,
        [name]: limitedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "documents" ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("You are not Logged In. Please Login First");
      window.location.href = "/LoginPage";
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await fetch("https://daankaren-deplyment-server.vercel.app/registerOrg", {
        method: "POST",
        body: formDataToSend,
      });
      alert("Form submitted successfully!");

      if (res.ok) {
        console.log("Registration Request Submitted");
        navigate('/thankyou-page');
      } else {
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
    <div className="register-org-page">
      <HeroSection />
      <div className="register-container">
        <h2 className="register-heading">Register @<img src={logo} /></h2>
        <div className="register-org-form-container">
          <form onSubmit={handleSubmit} className="register-org-form">
            <div className="register-org-form-field">
              <input
                id="orgName"
                name="orgName"
                placeholder="Enter your Organisation name"
                value={formData.orgName}
                onChange={handleChange}
                className="register-org-input"
              />
            </div>
            <div className="register-org-form-field">
              <input
                id="poc"
                name="poc"
                placeholder="Enter your name"
                value={formData.poc}
                onChange={handleChange}
                className="register-org-input"
              />
            </div>
            <div className="register-org-form-field">
              <input
                id="pocDesignation"
                name="pocDesignation"
                placeholder="Enter your role in the Organisation"
                value={formData.pocDesignation}
                onChange={handleChange}
                className="register-org-input"
              />
            </div>
            <div className="reg-org-contact-email">
              <div className="register-org-form-field reg-org-contact-number">
                <div className="reg-org-phone-prefix">+91</div>
                <input
                  id="phone"
                  name="contactNumber"
                  type="number"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="register-org-input"
                  maxLength={10} // Add this line
                />
              </div>
              <div className="register-org-form-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email of organisation"
                  value={formData.email}
                  onChange={handleChange}
                  className="register-org-input"
                />
              </div>
            </div>
            <div className="register-org-form-field">
              <input
                id="address"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="register-org-input"
              />
            </div>
            <div className="reg-org-city-state-pincode">
              <div className="register-org-form-field">
                <input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="register-org-input"
                />
              </div>
              <div className="register-org-form-field">
                <input
                  id="pincode"
                  name="pincode"
                  placeholder="Pincode"
                  type="number"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="register-org-input"
                />
              </div>
              <div className="register-org-form-field">
                <input
                  id="state"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="register-org-input"
                />
              </div>
            </div>
            <div className="register-org-form-field">
              <textarea
                id="motive"
                name="motive"
                placeholder="Details about your org , what it does and why you want to register yourself on our platform."
                value={formData.motive}
                onChange={handleChange}
                className="register-org-textarea"
              ></textarea>
            </div>
            <div className="register-org-form-field">
              <label htmlFor="documents" className="register-org-file-label">
                <PiFilesFill className="register-org-file-icon" /> Upload Required Documents
              </label>
              <input
                type="file"
                id="documents"
                name="documents"
                onChange={handleChange}
                className="register-org-input register-org-file-input"
                multiple
              />
            </div>
            <div className="register-org-form-submit">
              <button type="submit" className="register-org-submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterOrgPage;