import React from 'react';
import '../CSS/CampaignCard.css'; // Import CSS file

const CampaignCard = ({ campaign }) => {
  // Check if images array exists and has at least one image
  const imageUrl = campaign.images && campaign.images.length > 0 ? campaign.images[0] : '';

  return (
    <div className="campaign-card">
      <img src={imageUrl} alt={campaign.campaignName} />
      <h2>{campaign.campaignName}</h2>
      <p>{campaign.description.substring(0, 20)}...</p>
      <div className="options">
        <button className="share-button" onClick={() => handleShare(campaign)}>Share</button>
        <button className="donate-button" onClick={() => handleDonate(campaign)}>Donate</button>
      </div>
    </div>
  );
}

// Dummy functions for share and donate actions
const handleShare = (campaign) => {
  console.log('Sharing campaign:', campaign);
}

const handleDonate = (campaign) => {
  console.log('Donating to campaign:', campaign);
}

export default CampaignCard;
