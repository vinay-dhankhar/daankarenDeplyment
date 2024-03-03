import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';

function PendingTickets() {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h2>Pending Campaigns</h2>
      <ul>
        {pendingCampaigns.map(campaign => (
          <CampaignCard campaign={campaign}/>
        ))}
      </ul>
    </div>
  );
}

export default PendingTickets;
