import React from "react";
import image from './Images/donation-stuff/freshly-laundered-linens-stacked-neatly-table-bright-laundry-room.jpg'
const DonationItem = () => {
    return (
        <>
            <div className="donation-item">
                <img src={image}/>
            </div>
        </>
    )
}

export default DonationItem;