import React from "react";
import '../CSS/schedule-pickup-page.css'
import DonationForm from "./Form-For-Donation";
// css written in pickup-page.css
const PickUpPage = () => {
    return (
        <>
            <div className="schedule-pickup-page">
                <DonationForm />
            </div>
        </>
    )
}

export default PickUpPage;