import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/CampaignCard.css';

const CampaignCard = ({ campaign }) => {
  const role = "admin";

  const renderActions = () => {
    if (role === 'user') {
      return (
        <div className="options">
          <button className="share-button" onClick={() => handleShare(campaign)}>Share</button>
          <button className="donate-button" onClick={() => handleDonate(campaign)}>Donate</button>
        </div>
      );
    } else if (role === 'admin') {
      return (
        <div className="options">
          <button className="verify-button" onClick={() => handleVerify(campaign)}>Verify</button>
        </div>
      );
    }
  }

  return (
    <div className="campaign-card">
      <Link to={`/campaigns/${campaign._id}`}>
        <img src={campaign.images && campaign.images.length > 0 ? campaign.images[0] : ''} alt={campaign.campaignName} />
      </Link>
      <h2>{campaign.campaignName}</h2>
      <p>{campaign.description.substring(0, 20)}...</p>
      {renderActions()}
    </div>
  );
}

const handleShare = (campaign) => {
  console.log('Sharing campaign:', campaign);
}

const handleDonate = (campaign) => {
  console.log('Donating to campaign:', campaign);
}

const handleVerify = (campaign) => {
  console.log('Verifying campaign:', campaign);
}

export default CampaignCard;
