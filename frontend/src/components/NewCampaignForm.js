import React, { useState } from 'react';
import NewCampaign from './RequestCampaign';
import LocationForm from './location';

function NewCampaignForm() {
    const [showSecondPage, setShowSecondPage] = useState(false);
    const [formData, setFormData] = useState({});

    const handleNextClick = (data) => {
        setFormData(data);
        setShowSecondPage(true);
    };

    return (
        <>
            {!showSecondPage && <NewCampaign onNextClick={handleNextClick} />
            }
            {showSecondPage && <LocationForm formData={formData} />}
        </>
    );
}

export default NewCampaignForm;
