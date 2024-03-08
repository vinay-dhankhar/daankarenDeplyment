import React, { useState } from 'react';
import '../CSS/NewCampaign.css';

function NewCampaign() {
  const [campaignName, setCampaignName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    formData.append('campaignName', campaignName);
    formData.append('goalAmount', goalAmount);
    formData.append('description', description);
    formData.append('contactNumber', contactNumber);
    // const imageFiles = images.map(image => image.file);
    files.forEach(file => formData.append('files', file));
    // console.log("Form Data:", formData); // Log FormData with images
    // console.log("First image:", formData.get('files'));

    // console.log("Campaign Name:", formData.get('campaignName'));
    // console.log("Goal Amount:", formData.get('goalAmount'));
    // console.log("Description:", formData.get('description'));
    // console.log("Contact Number:", formData.get('contactNumber'));
    
    try {
      const response = await fetch('http://localhost:4000/RequestCampaign', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  return (
    <div className="form-container">
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
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default NewCampaign;
