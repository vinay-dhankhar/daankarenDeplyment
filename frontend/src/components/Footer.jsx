import React, { useState } from "react";
import "../CSS/footer.css";
import { NavLink } from "react-router-dom";
import { FaFacebookSquare , FaLinkedin , FaInstagramSquare , FaGithub } from "react-icons/fa";


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
        <p className="footer-text">DaanKaren is our site.Aapko koi problem??</p>
        <ul className="footer-links">
          <li>
            <a href="/">Home</a>
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
            <a href="/LoginPage">Login</a>
          </li>
          <li>
            <a href="/SignupPage">Get Started</a>
          </li>
          <li>
            <a href="/ContactPage">Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="footer-social-media">
        <a href="/facebook" className="footer-social-media-link">
          <FaFacebookSquare size={42} />
        </a>
        <a href="/linkedin" className="footer-social-media-link">
          <FaLinkedin size={42}  />
        </a>
        <a href="/instagram" className="footer-social-media-link">
          <FaInstagramSquare size={42} />
        </a>
        <a href="/github" className="footer-social-media-link">
          <FaGithub size={42} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;