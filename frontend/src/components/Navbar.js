import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import '../CSS/nav-styles.css'
import { useLocation } from "react-router-dom";

const Navcomp = ({ userId, role }) => {
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleName, SetRoleName] = useState("");
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const checkCookies = () => {
      const cookies = document.cookie;

      if (!cookies.includes("Login")) {
        console.error("Cookies are not  present");
        setIsLoggedIn(false);
        SetRoleName("");
      } else {
        setIsLoggedIn(true);
        // console.log("login=" + isLoggedIn);
        // console.log("role=" + role);
        SetRoleName(role);
      }

      if (userId) {
        setUid(userId); // Update uid when userId changes
      }
    };

    checkCookies();
  }, [userId], [isLoggedIn], [role]);

  // Code for the frontend designs of the navbar
  let location = useLocation();
  const [navbarClass, setNavbarClass] = useState("header navbar-in-home")
  const [navItemsHoverclass, setNavItemsHoverclass] = useState("nav-link-items nav-link-items-home")
  const [donateButtonBg, setDonateButtonBg] = useState("#00a950");
  const [donateButtonClass, setDonateButtonClass] = useState("navbar-donate-button");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const isHomePage = location.pathname === '/';

    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        console.log(isScrolled);
        setScrolled(isScrolled);
      }
    };
    if (isHomePage) {
      if (scrolled) {
        setNavbarClass("header navbar-scrolled");
        setNavItemsHoverclass("nav-link-items nav-link-items-everywhere");
      }
      else {
        setNavbarClass("header navbar-in-home");
        setNavItemsHoverclass("nav-link-items nav-link-items-home")
      }
    } else {
      setNavbarClass("header navbar-everywhere");
      setNavItemsHoverclass("nav-link-items nav-link-items-everywhere")
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, scrolled]);

  const handleDonateHover = () => {
    setDonateButtonBg("#008b41");
  }
  const handleDonateOut = () => {
    setDonateButtonBg("#00a950");
  }
  const handleDonateClick = () => {
    setDonateButtonClass('navbar-donate-button-clicked navbar-donate-button');
  }
  const handleNavLinksClick = () => {
    setDonateButtonClass('navbar-donate-button')
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
            {/* {roleName !== "admin" && (
              <li id='navbar-home-icon'>
                <NavLink exact="true" to="/" activeclassname="active" onClick={handleNavLinksClick}>
                  <img src={homePageIcon}></img>
                </NavLink>
              </li>
            )} */}
            {roleName === "admin" && (
              <li className={navItemsHoverclass}>
                <NavLink exact="true" to="/" activeclassname="active" onClick={handleNavLinksClick}>
                  AdminDashboard
                </NavLink>
              </li>
            )}
            <li className={navItemsHoverclass}>
              <NavLink to="/ViewCampaigns" activeClassName="active" onClick={handleNavLinksClick}>
                Campaigns
              </NavLink>
            </li>
            {
              roleName !== "admin" && (
                <li className={navItemsHoverclass}>
                  <NavLink to="/NewCampaign" activeClassName="active" onClick={handleNavLinksClick}>
                    Request Campaign
                  </NavLink>
                </li>
              )
            }
            {roleName !== "admin" && (
              <li className={navItemsHoverclass}>
                <NavLink to="/PartnerPage" activeclassname="active" onClick={handleNavLinksClick}>
                  Our Partners
                </NavLink>
              </li>
            )}
            {role !== "admin" && (

              <li className={navItemsHoverclass}>
                <NavLink to="/ContactPage" activeclassname="active" onClick={handleNavLinksClick}>
                  Contact Us
                </NavLink>
              </li>
            )}
            {roleName !== "admin" && (
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

            )}
            {roleName === "admin" && isLoggedIn && (
              <NavLink to="/PendingTickets" activeclassname="active" onClick={handleNavLinksClick}>
                Pending Tickets
              </NavLink>
            )}

          </ul>
          {!isLoggedIn && (
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
          )}
          {isLoggedIn && (
            <ul className="login-signup">
              <li>
                <button className="logout-button">
                  <NavLink to="/logout" className="nav-link-button" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </button>
              </li>
            </ul>
          )}
        </Nav>
      </nav >
    </>
  );
};

export default Navcomp;
