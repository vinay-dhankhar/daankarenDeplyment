import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "../CSS/nav-styles.css";
import FloatingActions from "./FAB_ICONS";
import { useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
// import profileImageUrl from "./Images/pexels-photo-415829.webp";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";

const Navcomp = ({ userId, role, setIsLoginClicked }) => {
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleName, SetRoleName] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogout = async () => {
    handleNavLinksClick();
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

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:4000/fetchUserDetails', {
        method: 'GET',
        headers: {
          cookies: document.cookie
        }
      });
      const data = await response.json();

      // console.log(data);
      setProfileImg(data.profileImg);
      setUsername(data.username);

    }
    catch (error) {
      console.log(error);
      console.log("Error fetching user");
    }
  }

  useEffect(
    () => {
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
          fetchUser();
        }

        if (userId) {
          setUid(userId); // Update uid when userId changes
        }
      };

      checkCookies();
    },
    [userId],
    [isLoggedIn],
    [role]
  );

  // Code for the frontend designs of the navbar
  let location = useLocation();
  const [navbarClass, setNavbarClass] = useState("header navbar-in-home");
  const [navItemsHoverclass, setNavItemsHoverclass] = useState(
    "nav-link-items nav-link-items-home"
  );
  const [donateButtonBg, setDonateButtonBg] = useState("#e95858");
  const [donateButtonClass, setDonateButtonClass] = useState(
    "navbar-donate-button"
  );
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const isHomePage = location.pathname === "/";

    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    if (isHomePage) {
      if (scrolled) {
        setNavbarClass("header navbar-scrolled");
        setNavItemsHoverclass("nav-link-items nav-link-items-everywhere");
      } else {
        setNavbarClass("header navbar-in-home");
        setNavItemsHoverclass("nav-link-items nav-link-items-home");
      }
    } else {
      setNavbarClass("header navbar-everywhere");
      setNavItemsHoverclass("nav-link-items nav-link-items-everywhere");
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, scrolled]);


  const handleDonateHover = () => {
    setDonateButtonBg("#cb4343");
  };
  const handleDonateOut = () => {
    setDonateButtonBg("#e95858");
  };
  const handleDonateClick = () => {
    setDonateButtonClass("navbar-donate-button-clicked navbar-donate-button");
  };
  const handleNavLinksClick = () => {
    setDonateButtonClass('navbar-donate-button')
  }
  const handleLoginClick = () => {
    handleNavLinksClick();
    // console.log("Login Clicked");
    setIsLoginClicked(true);
  }
  // making navbar to sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <header>
        <nav className={navbarClass}>
          <button
            className="sidebar-toggle"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <RxHamburgerMenu />
          </button>
          <Nav>
            <h1 className="foundation">
              <NavLink exact="true" to="/" onClick={handleNavLinksClick}>
                <span id="daan">दान</span>
                <span id="karen">Karen</span>
              </NavLink>
            </h1>

            <ul className={`nav-links`}>
              {roleName !== "admin" && (
                <li className="donate-button-container">
                  <NavLink
                    to="/DonationPage"
                    className={donateButtonClass}
                    onMouseOver={handleDonateHover}
                    onMouseOut={handleDonateOut}
                    onClick={handleDonateClick}
                    style={{
                      backgroundColor: donateButtonBg,
                    }}
                  >
                    Donate
                  </NavLink>
                </li>
              )}
              {roleName === "admin" && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    exact="true"
                    to="/"
                    activeclassname="active"
                    onClick={handleNavLinksClick}
                  >
                    AdminDashboard
                  </NavLink>
                </li>
              )}
              <li className={navItemsHoverclass}>
                <NavLink
                  to="/ViewCampaigns"
                  activeClassName="active"
                  onClick={handleNavLinksClick}
                >
                  Campaigns
                </NavLink>
              </li>
              {roleName !== "admin" && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    to="/NewCampaignForm"
                    activeClassName="active"
                    onClick={handleNavLinksClick}
                  >
                    Request Campaign
                  </NavLink>
                </li>
              )}
              {roleName !== "admin" && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    to="/Volunteer"
                    activeclassname="active"
                    onClick={handleNavLinksClick}
                  >
                    Volunteer
                  </NavLink>
                </li>
              )}
              {role !== "admin" && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    to="/registerOrg"
                    activeclassname="active"
                    onClick={handleNavLinksClick}
                  >
                    Join Us
                  </NavLink>
                </li>
              )}

              {roleName !== "admin" && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    to="/PartnerPage"
                    activeclassname="active"
                    onClick={handleNavLinksClick}
                  >
                    Partners
                  </NavLink>
                </li>
              )}
              {roleName === "admin" && isLoggedIn && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    to="/PendingTickets"
                    activeclassname="active"
                    onClick={handleNavLinksClick}
                  >
                    Pending Tickets
                  </NavLink>
                </li>
              )}

              {roleName === "admin" && isLoggedIn && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    to="/VerifyNgoRegistrations"
                    activeclassname="active"
                    onClick={handleNavLinksClick}
                  >
                    Organisation requests
                  </NavLink>
                </li>
              )}

              {roleName === "admin" && isLoggedIn && (
                <li className={navItemsHoverclass}>
                  <NavLink
                    to="/PendingDonateItems"
                    activeclassname="active"
                    onClick={handleNavLinksClick}
                  >
                    Donate Items
                  </NavLink>
                </li>
              )}
            </ul>
            {!isLoggedIn && (
              <ul className="login-signup">
                <li>
                  <button className="login-button" onClick={handleLoginClick}>
                    Sign In
                  </button>
                </li>
                <li>
                  <button className="signup-button">
                    <NavLink to="/SignupPage" onClick={handleNavLinksClick}>
                      Get Started
                    </NavLink>
                  </button>
                </li>
              </ul>
            )}
            {isLoggedIn && (
              <div className="profile-div">
                <ProfileButton imageUrl={profileImg} username={username} handleLogout={handleLogout} />
              </div>
            )}
          </Nav>
          <Sidebar isSidebarOpen={isSidebarOpen} />
          {/* FAB ICONS */}
          {role !== "admin" && (
            <FloatingActions />
          )}
        </nav >
      </header>
    </>
  );
};

export default Navcomp;
