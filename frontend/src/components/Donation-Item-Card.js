import React from "react";

const DonationItem = ({ imageUrl, heading, text }) => {
  return (
    <div className="donation-item-container">
      <div className="donation-card">
        <div className="donation-card-inner">
          <div className="donation-card-front">
            <img src={imageUrl} alt={heading} />
          </div>
          <div className="donation-card-text">
            <div className="donation-item-text">
              <h1>{heading}</h1>
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationItem;