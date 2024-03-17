import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import '../CSS/CampaignCard.css'

function PendingTickets({ role }) {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);

  useEffect(() => {
    // Check if the user is admin, if not, do nothing
    if (role !== "admin") {
      return;
    }

    fetch('http://localhost:4000/campaigns/pending')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPendingCampaigns(data);
      })
      .catch(error => {
        console.error('Error fetching pending campaigns:', error);
      });
  }, [role]);

  // If user is not admin, display a message
  if (role !== "admin") {
    return <div>Access denied: You are not authorized to view this page.</div>;
  }

  return (
    <div className='cc-campaign-container'>
      <h2>Pending Campaigns</h2>
      <div className="cc-heading-decoration"></div>
      <ul className="pending-campaign-list">
        {pendingCampaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} role={role} />
        ))}
      </ul>
    </div>
  );
}

export default PendingTickets;
