import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import '../CSS/nav-styles.css'

const Navcomp = () => {
  const [donateButtonBg, setDonateButtonBg] = useState("#00a950")
  const handleDonateHover = () => {
    setDonateButtonBg("#00863f");
  }
  const handleDonateOut = () => {
    setDonateButtonBg("#00a950");
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
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li className='nav-link-items'>
            <NavLink to="/CampaignsPage" activeClassName="active">
              Our Campaigns
            </NavLink>
          </li>
          <li className='nav-link-items'>
            <NavLink to="/ContactPage" activeClassName="active">
              Contact Us
            </NavLink>
          </li>
          <li className='nav-link-items'>
            <NavLink to="/PartnerPage" activeClassName="active">
              Our Partners
            </NavLink>
          </li>
          <li className='nav-donate-button'>
            <NavLink to="/DonationPage" className='donate-button' onMouseOver={handleDonateHover}
              onMouseOut={handleDonateOut}
              style={{
                backgroundColor: donateButtonBg
              }}>
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
