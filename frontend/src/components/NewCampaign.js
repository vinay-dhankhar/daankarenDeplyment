import React, { useState } from 'react';
import '../CSS/NewCampaign.css';

// CSS written in NewCampaign.css
function NewCampaign({ onNextClick }) {
  const [campaignName, setCampaignName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [files, setFiles] = useState([]);
  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    formData.append('campaignName', campaignName);
    formData.append('goalAmount', goalAmount);
    formData.append('description', description);
    formData.append('contactNumber', contactNumber);
    files.forEach(file => formData.append('files', file));

    // Clear form fields
    setCampaignName('');
    setGoalAmount('');
    setDescription('');
    setContactNumber('');
    setFiles([]);

    onNextClick(formData); // Trigger the next step with form data
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  return (
    <div className="new-campaign-form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-heading">New Campaign</h2>
        <div className="form-group">
          <label htmlFor="campaignName">Campaign Name</label>
          <input
            type="text"
            id="campaignName"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="goalAmount">Goal Amount</label>
          <input
            type="number"
            id="goalAmount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Campaign Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="files">Images Upload</label>
          <input
            type="file"
            id="files"
            name="files"
            onChange={handleImageChange}
            multiple
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Next</button>
      </form>
    </div>
  );
}

export default NewCampaign;
