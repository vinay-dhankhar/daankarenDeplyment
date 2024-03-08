import React from "react";
const DonationItem = ({ imageUrl }) => {
    return (
        <>
            <div class="donation-flip-card">
                <div class="donation-flip-card-inner">
                    <div class="donation-flip-card-front">
                        <img src={imageUrl} />
                    </div>
                    <div class="donation-flip-card-back">
                        <h1>John Doe</h1>
                        <p>Architect & Engineer</p>
                        <p>We love that guy</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonationItem;