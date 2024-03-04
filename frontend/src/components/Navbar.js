import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import '../CSS/nav-styles.css'
import { useLocation } from "react-router-dom";

const Navcomp = () => {
  let location = useLocation();
  const [navbarClass, setNavbarClass] = useState("navbar-in-home")
  const [navItemsHoverclass,setNavItemsHoverclass] = useState("nav-link-items nav-link-items-home")
  useEffect(() => {
    if (location.pathname === '/') {
      setNavbarClass("navbar-in-home");
      setNavItemsHoverclass("nav-link-items nav-link-items-home")
    } else {
      setNavbarClass("navbar-everywhere");
      setNavItemsHoverclass("nav-link-items nav-link-items-everywhere")
    }
  }, [location.pathname]);
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
  // const role="admin";
  return (
    <>
      <nav className={navbarClass}>
        <Nav >
          <h1 className="foundation">
            <NavLink exact="true" to="/">
              <h1><span id='daan'>दान</span><span id='karen'>Karen</span></h1>
            </NavLink>
          </h1>
          <ul className="nav-links">
            <li className={navItemsHoverclass}>
              <NavLink exact="true" to="/" activeclassname="active" onClick={handleNavLinksClick}>
                Home
              </NavLink>
            </li>
            <li className={navItemsHoverclass}>
              <NavLink to="/CampaignsPage" activeclassname="active" onClick={handleNavLinksClick}>
                Our Campaigns
              </NavLink>
            </li>
            <li className={navItemsHoverclass}>
              <NavLink to="/ContactPage" activeclassname="active" onClick={handleNavLinksClick}>
                Contact Us
              </NavLink>
            </li>
            <li className={navItemsHoverclass}>
              <NavLink to="/PartnerPage" activeclassname="active" onClick={handleNavLinksClick}>
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
    </>
  );
};

export default Navcomp;
