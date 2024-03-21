// CampaignPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../CSS/campaignPage.css';
import { FaCheckCircle, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const CampaignPage = ({ role }) => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0); 

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:4000/campaigns/${campaignId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch campaign');
        }
        setLoadingPercentage(50);
        const data = await response.json();
        setCampaign(data);
        setLoadingPercentage(100);
      } catch (error) {
        console.error('Error fetching campaign:', error);
         setLoadingPercentage(100);
        // Handle error here (e.g., set error state)
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const handleVerify = async () => {
    try {
      const response = await fetch(`http://localhost:4000/campaigns/${campaignId}/approve`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to approve campaign');
      }

      // Update the campaign status in the frontend
      setCampaign(prevCampaign => ({
        ...prevCampaign,
        status: 'approved'
      }));

      alert('Campaign approved successfully');
    } catch (error) {
      console.error('Error approving campaign:', error);
      // Handle error here
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/campaigns/${campaignId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete campaign');
      }

      // Optionally, you can navigate the user to a different page or perform other actions after deletion
      alert('Campaign deleted successfully');
    } catch (error) {
      console.error('Error deleting campaign:', error);
      // Handle error here
    }
  };

  const handleDonate = () => {
    navigate("/DonationPaymentPage", { state: { campaign: campaign } });
  }

  const handleImageClick = (index) => {
    setMainImageIndex(index);
  }

  if (!campaign) {
    return <div>Loading...</div>;
  }

  const progressPercentage = (campaign.amountCollected / campaign.goalAmount) * 100;


    if (loadingPercentage < 100) {
      // console.log('Loading percentage:', loadingPercentage); 
    return <div>Loading... {loadingPercentage}%</div>;
  }

  return (
    <div className="cp-campaign-page-container">
      <div className="cp-campaign-header">
        <div className="cp-campaign-info">
          <h1 className="cp-campaign-title">{campaign.campaignName}</h1>
          {campaign.status === 'approved' && <div className="cp-verified-tag"><FaCheckCircle />Verified</div>}
          <div className="cp-campaign-organizer">
            <p>Organized by: {campaign.organizerName}</p>
          </div>
        </div>
        {role !== "admin" && (
        <div className="cp-campaign-actions">
          <button className="cp-donate-button cp-tempting-button" onClick={handleDonate}>Donate Now</button>
        </div>)}
      </div>
      <div className="cp-campaign-content">
        <div className="cp-campaign-images">
          <div className="cp-main-image">
            <img src={campaign.images[mainImageIndex]} alt={`${campaign.campaignName} Main Image`} />
          </div>
          <div className="cp-additional-images">
            {campaign.images && campaign.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`${campaign.campaignName} Additional Image ${index + 1}`}
                className="cp-additional-image"
                onClick={() => handleImageClick(index)}
                style={{ border: mainImageIndex === index ? '2px solid #004b8d' : 'none' }}
              />
            ))}
          </div>
        </div>
        <div className="cp-campaign-details">
          <div className="cp-share-section">
            <p>Help spread the word:</p>
            <div className="cp-share-buttons">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="cp-share-icon cp-facebook-icon" />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="cp-share-icon cp-twitter-icon" />
              </a>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="cp-share-icon cp-whatsapp-icon" />
              </a>
            </div>
          </div>
          <div className="cp-campaign-progress">
            <h2>Status</h2>
            <div className="cp-progress-container">
              <div className="cp-progress-bar">
                <div
                  className="cp-progress-bar-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="cp-progress-info">
                <p>Raised: ₹{campaign.amountCollected.toLocaleString()}</p>
                <p>Goal: ₹{campaign.goalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="cp-campaign-description">
            <h2>Details</h2>
            <p>{campaign.description.substring(0, 20)}</p>
          </div>
          <div className="cp-contact-details">
            <h2>Contact Details</h2>
            <p className="cp-contact-number">Contact Number: {campaign.contactNumber}</p>
            {/* Add more contact details here */}
          </div>
        </div>
      </div>
      <div className="cp-campaign-full-description">
        <h2>More Details</h2>
        <p>{campaign.description}</p>
      </div>
      {role !== "admin" && (
      <div className="cp-campaign-actions">
        <button className="cp-donate-button cp-tempting-button" onClick={handleDonate}>Donate Now</button>
      </div>)}
      {role === "admin" && campaign.status === "pending" && (
        <button className="cp-action-button-verify-button" onClick={handleVerify}>Verify</button>
      )}
      {role === "admin" && (
        <button className="cp-action-button-delete-button" onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
}

export default CampaignPage;