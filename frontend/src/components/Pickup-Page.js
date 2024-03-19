import React from "react";
import '../CSS/schedule-pickup-page.css'
import DonationForm from "./Form-For-Donation";
// css written in pickup-page.css
const PickUpPage = () => {
    return (
        <>
            <div className="schedule-pickup-page">
                <div className='schedule-pickup-page-container'>
                    <DonationForm />
                    <div className="schedule-pickup-rsection">
                        <div className="schedule-pickup-rsection-tagline">
                            <p>❝Empower Change, One Click at a time:</p>
                            <p>Donate Today!❞</p>
                        </div>
                        <div className="schedule-pickup-rsection-image"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PickUpPage;