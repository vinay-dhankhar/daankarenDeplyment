import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/footer.css";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import instagramIcon from "./Icons/insta-icon.png";


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
        <p className="footer-text">
          DaanKaren is our site. Aapko koi problem??
        </p>
        <ul className="footer-links">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
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
    <FaFacebookSquare size={32} color="#316FF6" />
  </NavLink>
  <NavLink to="/linkedin" className="footer-social-media-link">
    <FaLinkedin size={32} color="#0077b5" />
  </NavLink>
  <NavLink to="/instagram" className="footer-social-media-link">
    <img src={instagramIcon} alt="Instagram" width={32} height={32} />
  </NavLink>
  <NavLink to="/dribbble" className="footer-social-media-link">
    <FaGithub size={32} color="#2b3137" />
  </NavLink>
</div>

    </footer>
  );
};

export default Footer;
