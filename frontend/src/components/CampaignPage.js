import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../CSS/campaignPage.css';

const CampaignPage = ({role}) => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState(null); // Assuming role is determined somewhere in your application

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`http://localhost:4000/campaigns/${campaignId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch campaign');
        }
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error('Error fetching campaign:', error);
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

  if (!campaign) {
    return <div>Loading...</div>;
  }

  return (
    <div className="campaign-detail-page">
      <h1>{campaign.campaignName}</h1>
      <p>Description: {campaign.description}</p>
      <div className="image-gallery">
        {campaign.images && campaign.images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`${campaign.campaignName} Image ${index + 1}`} />
        ))}
      </div>
      <div className="contact-details">
        <p>Contact Number: {campaign.contactNumber}</p>
        {/* Add more contact details here */}
      </div>
      {role === "admin" && campaign.status === "pending" && (
        <button className="verify-button" onClick={handleVerify}>Verify</button>
      )}
      {role === "admin" && (
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      )}
      <p>Status: {campaign.status}</p>
    </div>
  );
}

export default CampaignPage;
