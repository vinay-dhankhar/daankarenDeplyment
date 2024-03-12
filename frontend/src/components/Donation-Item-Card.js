import React from "react";
const DonationItem = ({ imageUrl, heading, text }) => {
    return (
        <>
            <div class="donation-card">
                <div class="donation-card-inner">
                    <div class="donation-card-front">
                        <img src={imageUrl} />
                    </div>
                    <div class="donation-card-text">
                        <div class="donation-item-text">
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