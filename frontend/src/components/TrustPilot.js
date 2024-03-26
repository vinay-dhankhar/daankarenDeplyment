import React from 'react';
import '../CSS/TrustPilot.css';
import trustpilotHeader from './Images/trustpilot_header.png';

const RatingSection = () => {
  return (
    <div className="rating-section">
      <div className="content-container">
        <div className="header-container">
          <img src={trustpilotHeader} alt="TrustPilot Header" className="trustpilot-header" />
          <div className="header-text">
            <h2>Trusted by Many</h2>
            <p>Our endeavour has been recognized as one of the most reputable and highly-rated platforms for charitable initiatives.</p>
          </div>
        </div>
        <a href="https://www.trustpilot.com" className="view-reviews-btn">
          View Reviews
        </a>
      </div>
    </div>
  );
};

export default RatingSection;