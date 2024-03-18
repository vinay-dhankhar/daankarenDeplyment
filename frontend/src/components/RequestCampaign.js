import React, { useState } from 'react';
import '../CSS/RequestCampaign.css'

// import icons
import { FaFacebook, FaLink } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaImages } from "react-icons/fa6";
// CSS written in RequestCampaign.css
function NewCampaign({ onNextClick }) {
  const [campaignName, setCampaignName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [campaignDescription, setDescription] = useState('');
  const [campaignCategory, setCampaignCategory] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [files, setFiles] = useState([]);
  const campaignCategories = ["Hunger", "Disability", "Education", "Medical", "Animals", "Children", "Disaster Relief", "Others"];
  // const [images, setImages] = useState([]);
  // const [documents, setDocuments] = useState([]);
  const formData = new FormData();

  const formatNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, ''); // Remove non-digit characters
    const match = cleanedInput.match(/^(\d{0,5})(\d{0,5})/);
    return !match[2] ? match[1] : `${match[1]} ${match[2]}`;
  };
  const handleContactNumberChange = (e) => {
    console.log(e.target.value);
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedNumber = formatNumber(input);
    setContactNumber(formattedNumber);
  };



  const handleKeyDown = (e) => {
    // Prevent non-digit characters from being entered
    if (!/\d/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.append('campaignName', campaignName);
    formData.append('goalAmount', goalAmount);
    formData.append('description', campaignDescription);
    const finalContactNumber = contactNumber.replace(' ', '');
    console.log(finalContactNumber);
    formData.append('contactNumber', finalContactNumber);
    formData.append('campaignCategory', campaignCategory);
    files.forEach(file => formData.append('files', file));
    // images.forEach(image => formData.append('images', image));
    // documents.forEach(document => formData.append('documents', document));

    // Clear form fields
    setCampaignName('');
    setGoalAmount('');
    setDescription('');
    setContactNumber('');
    setFiles([]);
    // setImages([]);
    // setDocuments([]);
    onNextClick(formData); // Trigger the next step with form data
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
    
    // Print names of files
    files.forEach(file => {
        console.log("File name: " + file.name);
    })
  };
  // const handleImageChange = (e) => {
  //   const images = Array.from(e.target.images);
  //   setImages(images);
  // };
  // const handleDocumentChange = (e) => {
  //   const documents = Array.from(e.target.documents);
  //   setDocuments(documents);
  // };

  return (
    <div className='request-campaign-page'>
      <div className="request-campaign-container">
        <div className="left-section">
          <h2 className='rcpage-contact-heading'>Contact Details</h2>
          <div className='rcpage-contact-details'>
            <i><FaLocationDot /></i>
            <p>Phone: +1 123 456 7890</p>
          </div>
          <div className='rcpage-contact-details'>
            <i><BsFillTelephoneFill /></i>
            <p>Email: info@example.com</p>
          </div>
          <div className='rcpage-contact-details'>
            <i><IoMail /></i>
            <p>
              <span>Hostel-10 NIT Kurukshetra,</span>
              <br />
              <span>Kurukshetra, Haryana, India</span>
            </p>
          </div>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i>
                <FaFacebook />
              </i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="right-section">
          <h2 className='request-campaign-heading'>Request a Campaign</h2>
          <form onSubmit={handleSubmit}>
            <div className="req-campaign-form-group">
              <label className='req-campaign-label' htmlFor="campaignName">Campaign Name</label>
              <input
                type="text"
                id="campaignName"
                name="campaignName"
                value={campaignName}
                className='req-campaign-input'
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>
            <div className="req-campaign-form-group">
              <label htmlFor="goalAmount" className="req-campaign-label">
                Goal Amount
              </label>
              <div className="input-with-icon">
                <div className="rupee-icon"><p>₹</p></div>
                <input
                  type="number"
                  id="goalAmount"
                  name="goalAmount"
                  value={goalAmount}
                  className="req-campaign-input"
                  onChange={(e) => setGoalAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="req-campaign-form-group">
              <label htmlFor="campaignCategory" className='req-campaign-label'>Campaign Category</label>
              <select
                id="campaignCategory"
                name="campaignCategory"
                value={campaignCategory}
                className='req-campaign-input category-selection'
                onChange={(e) => setCampaignCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {campaignCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="req-campaign-form-group">
              <label htmlFor="campaignDescription" className='req-campaign-label'>Campaign Description</label>
              <textarea
                id="campaignDescription"
                name="campaignDescription"
                value={campaignDescription}
                className='req-campaign-input'
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="req-campaign-form-group">
              <label htmlFor="contactNumber" className='req-campaign-label'>Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                onChange={handleContactNumberChange}
                className='req-campaign-input'
                pattern="[0-9]{5} [0-9]{5}"
                onKeyDown={handleKeyDown}
                maxLength={11}
                required
              />
            </div>
            <div className="req-campaign-form-group">
              <label htmlFor="files" className='req-campaign-label'>Upload Images</label>
              <input
                className='campaign-info-input'
                type="file"
                id="files"
                name="files"
                onChange={handleImageChange}
                multiple
              />
            </div>
            <div className='req-campaign-submit-container'>
              <button type="submit" className='req-campaign-submit-button'>Submit</button>
            </div>
            {/* <div className="form-group">
            <label htmlFor="images">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
              multiple
            />
          </div>
          <div className="form-group">
            <label htmlFor="documents">Documents</label>
            <input
              type="file"
              id="documents"
              name="documents"
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentChange}
              multiple
            />
          </div> */}
          </form>
        </div>
      </div>
    </div>
  );

}

export default NewCampaign;

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   formData.append('campaignName', campaignName);
//   formData.append('goalAmount', goalAmount);
//   formData.append('description', description);
//   formData.append('contactNumber', contactNumber);
//   files.forEach(file => formData.append('files', file));

//   // Clear form fields
//   setCampaignName('');
//   setGoalAmount('');
//   setDescription('');
//   setContactNumber('');
//   setFiles([]);

//   onNextClick(formData); // Trigger the next step with form data
// };

// const handleImageChange = (e) => {
//   const files = Array.from(e.target.files);
//   setFiles(files);
// };

// return (
//   <div className="new-campaign-form-container">
//     <form onSubmit={handleSubmit} className="new-campaign-form">
//       <h2 className="form-heading">New Campaign</h2>
//       <div className="form-group">
//         <label htmlFor="campaignName">Campaign Name</label>
//         <input
//           className='campaign-info-input'
//           type="text"
//           id="campaignName"
//           value={campaignName}
//           onChange={(e) => setCampaignName(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="goalAmount">Goal Amount</label>
//         <input
//           className='campaign-info-input'
//           type="number"
//           id="goalAmount"
//           value={goalAmount}
//           onChange={(e) => setGoalAmount(e.target.value)}
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="description">Campaign Description</label>
//         <textarea
//           className='campaign-info-input'
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>
//       </div>
//       <div className="form-group">
//         <label htmlFor="files">Images Upload</label>
//         <input
//           className='campaign-info-input'
//           type="file"
//           id="files"
//           name="files"
//           onChange={handleImageChange}
//           multiple
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="contactNumber">Contact Number</label>
//         <input
//           className='campaign-info-input'
//           type="tel"
//           id="contactNumber"
//           value={contactNumber}
//           onChange={(e) => setContactNumber(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" className="submit-btn">Next</button>
//     </form>
//   </div>
// );
