import React, { useState } from 'react';
import NewCampaign from './NewCampaign';
import LocationForm from './location';

function NewCampaignForm() {
    const [showSecondPage, setShowSecondPage] = useState(false);
    const [formData, setFormData] = useState({});

    const handleNextClick = (data) => {
        setFormData(data);
        setShowSecondPage(true);
    };

    return (
        <div className="form-container">
            {!showSecondPage && <NewCampaign onNextClick={handleNextClick} />}
            {showSecondPage && <LocationForm formData={formData} />}
        </div>
    );
}

export default NewCampaignForm;
