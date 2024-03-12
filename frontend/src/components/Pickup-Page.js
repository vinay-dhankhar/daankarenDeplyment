import React from "react";
import '../CSS/pickup-page.css'
import DonationForm from "./Form-For-Donation";
// css written in pickup-page.css
const PickUpPage = () => {
    return (
        <>
            <div className="pickup-page">
                <DonationForm />
            </div>
        </>
    )
}

export default PickUpPage;