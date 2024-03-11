import React from "react";
const DonationItem = ({ imageUrl, heading, text }) => {
    return (
        <>
            <div class="donation-flip-card">
                <div class="donation-flip-card-inner">
                    <div class="donation-flip-card-front">
                        <img src={imageUrl} />
                    </div>
                    <div class="donation-flip-card-back">
                        <img src={imageUrl} />
                        <div className="donation-item-text">
                            <h1>{heading}</h1>
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonationItem;