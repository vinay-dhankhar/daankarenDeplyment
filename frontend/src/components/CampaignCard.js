import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/CampaignCard.css';

const CampaignCard = ({ campaign ,role }) => {


  // const renderActions = () => {
  //   if (role === 'user') {
  //     return (
  //       <div className="options">
  //         <button className="share-button" onClick={() => handleShare(campaign)}>Share</button>
  //         <button className="donate-button" onClick={() => handleDonate(campaign)}>Donate</button>
  //       </div>
  //     );
  //   } else if (role === 'admin') {
  //     return (
  //       <div className="options">
  //         <button className="verify-button" onClick={() => handleVerify(campaign)}>Verify</button>
  //       </div>
  //     );
  //   }
  // }

  return (
    <div className="cc-campaign-card">
      <Link to={`/campaigns/${campaign._id}`}>
        <img src={campaign.images && campaign.images.length > 0 ? campaign.images[0] : ''} alt={campaign.campaignName} className="cc-campaign-image" />
      <div className="cc-campaign-details">
          <h3 className="cc-campaign-title">{campaign.campaignName}</h3>
          <p className="cc-campaign-description">{campaign.description.substring(0, 20)}</p>
          <div className="cc-progress-bar">
            <div className="cc-progress" style={{ width: `${(campaign.amountCollected / campaign.goalAmount) * 100}%` }}>
            </div>
          </div>
            <div className="cc-campaign-stats">
              <span className="cc-raised">₹{campaign.amountCollected.toLocaleString()} raised</span>
              <span className="cc-goal">₹{campaign.goalAmount.toLocaleString()} goal</span>
            </div>
      </div>
      </Link>
      {/* {renderActions()} */}
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
