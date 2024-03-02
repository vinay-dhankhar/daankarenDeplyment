import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import '../CSS/nav-styles.css'

const Navcomp = () => {
  const [donateButtonBg, setDonateButtonBg] = useState("#00a950")
  const [donateButtonClass, setDonateButtonClass] = useState("donate-button")
  const handleDonateHover = () => {
    setDonateButtonBg("#008b41");
  }
  const handleDonateOut = () => {
    setDonateButtonBg("#00a950");
  }
  const handleDonateClick = () => {
    setDonateButtonClass('donate-button-clicked donate-button');
  }
  const handleNavLinksClick = () => {
    setDonateButtonClass('donate-button')
  }
  return (
    <nav className="navbar">
      <Nav >
        <h1 className="foundation">
          <NavLink exact to="/">
            <h1><span id='daan'>दान</span><span id='karen'>Karen</span></h1>
          </NavLink>
        </h1>
        <ul className="nav-links">
          <li className='nav-link-items'>
            <NavLink exact to="/" activeClassName="active" onClick={handleNavLinksClick}>
              Home
            </NavLink>
          </li>
          <li className='nav-link-items'>
            <NavLink to="/CampaignsPage" activeClassName="active" onClick={handleNavLinksClick}>
              Our Campaigns
            </NavLink>
          </li>
          <li className='nav-link-items'>
            <NavLink to="/ContactPage" activeClassName="active" onClick={handleNavLinksClick}>
              Contact Us
            </NavLink>
          </li>
          <li className='nav-link-items'>
            <NavLink to="/PartnerPage" activeClassName="active" onClick={handleNavLinksClick}>
              Our Partners
            </NavLink>
          </li>
          <li className='donate-button-container'>
            <NavLink to="/DonationPage" className={donateButtonClass} onMouseOver={handleDonateHover}
              onMouseOut={handleDonateOut} onClick={handleDonateClick}
              style={{
                backgroundColor: donateButtonBg
              }}
            >
              Donate
            </NavLink>
          </li>
        </ul>

        <ul className="login-signup">
          <li>
            <button className="login-button">
              <NavLink to="/LoginPage" className="nav-link-button">
                Sign In
              </NavLink>
            </button>
          </li>
          <li>
            <button className="signup-button">
              <NavLink to="/SignupPage" className="nav-link-button">
                Get Started
              </NavLink>
            </button>
          </li>
        </ul>

      </Nav>
    </nav >
  );
};

export default Navcomp;
