import React from "react";
import "../CSS/footer.css";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
          <h1 className="foundation">
          <NavLink exact to="/">
            <h1><span id='daan'>दान</span><span id='karen'>Karen</span></h1>
          </NavLink>
        </h1>
      <div className="footer-content">
        <p className="footer-text">DaanKaren is our site.Aapko koi problem??</p>
        <ul className="footer-links">
          <li>
            <a href="/our-service">Our Service</a>
          </li>
          <li>
            <a href="/about-us">About us</a>
          </li>
          <li>
            <a href="/our-work">Our Work</a>
          </li>
          <li>
            <a href="/help-center">Help Center</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/company">Company</a>
          </li>
          <li>
            <a href="/terms-of-use">Terms of Use</a>
          </li>
          <li>
            <a href="/contact-us">Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="footer-social-media">
        <a href="/facebook" className="footer-social-media-link">
          <img src="/facebook-icon.png" alt="Facebook" />
        </a>
        <a href="/linkedin" className="footer-social-media-link">
          <img src="/linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a href="/instagram" className="footer-social-media-link">
          <img src="/instagram-icon.png" alt="Instagram" />
        </a>
        <a href="/dribbble" className="footer-social-media-link">
          <img src="/dribbble-icon.png" alt="Dribbble" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
