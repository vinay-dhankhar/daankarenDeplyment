import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-logo-and-social-media">
          <div className="footer-foundation">
            <NavLink exact to="/" id="foundation-in-footer">
              <span id="daan-footer">दान</span>
              <span id="karen-footer">Karen</span>
            </NavLink>
          </div>
          <div className="footer-social-media">
            <NavLink to="/facebook" className="footer-social-media-link">
              <FaFacebookF />
            </NavLink>
            <NavLink to="/twitter" className="footer-social-media-link">
              <FaTwitter />
            </NavLink>
            <NavLink to="/instagram" className="footer-social-media-link">
              <FaInstagram />
            </NavLink>
            <NavLink to="/youtube" className="footer-social-media-link">
              <FaYoutube />
            </NavLink>
          </div>
        </div>

        <div className="tagline-in-footer">
          <p>
          ❝ Because it’s not about how much we give, but how much love we put into giving…❞
          </p>
        </div>
        <div className="footer-content">
          <div className="footer-contact">
            <h3>Contact</h3>
            <div className="footer-address">
              <i>
                <FaLocationDot />
              </i>
              <p>
                <span>Hostel-10 NIT Kurukshetra,</span>
                <br />
                <span>Kurukshetra, Haryana, India</span>
              </p>
            </div>
            <div className="footer-address">
              <i> <BsFillTelephoneFill /></i>
              <p>
                1234567890
              </p>
            </div>
            <div className="footer-address">
              <i><IoMail /> </i>
              <p>
                daankaren@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <span>copyright © {new Date().getFullYear()} दानKaren | All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;