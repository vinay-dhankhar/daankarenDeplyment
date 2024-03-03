import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <NavLink exact to="/">
        <h1>
          <span id="daan">दान</span>
          <span id="karen">Karen</span>
        </h1>
      </NavLink>
      <div className="footer-content">
        <p className="footer-text">DaanKaren is our site. Aapko koi problem??</p>
        <ul className="footer-links">
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about-us">About us</NavLink>
          </li>
          <li>
            <NavLink to="/our-work">Our Work</NavLink>
          </li>
          <li>
            <NavLink to="/help-center">Help Center</NavLink>
          </li>
          <li>
            <NavLink to="/LoginPage">Login</NavLink>
          </li>
          <li>
            <NavLink to="/SignupPage">Get Started</NavLink>
          </li>
          <li>
            <NavLink to="/ContactPage">Contact Us</NavLink>
          </li>
        </ul>
      </div>
      <div className="footer-social-media">
        <NavLink to="/facebook" className="footer-social-media-link">
          <img src="./images/facebook-icon.png" alt="Facebook" />
        </NavLink>
        <NavLink to="/linkedin" className="footer-social-media-link">
          <img src="./images/linkedin-icon.png" alt="LinkedIn" />
        </NavLink>
        <NavLink to="/instagram" className="footer-social-media-link">
          <img src="./images/insta-icon.png" alt="Instagram" />
        </NavLink>
        <NavLink to="/dribbble" className="footer-social-media-link">
          <img src="./images/dribble-icon.png" alt="Dribbble" />
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
