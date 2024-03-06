import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';

function ViewCampaigns({role}) {
  const [viewCampaigns, setViewCampaigns] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/campaigns/approved')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setViewCampaigns(data);
      })
      .catch(error => {
        console.error('Error fetching pending campaigns:', error);
      });
  }, []);

  return (
    <div>
      <h2>All Campaigns</h2>
      <ul>
        {viewCampaigns.map(campaign => (
          <CampaignCard campaign={campaign} role={role}/>
        ))}
      </ul>
    </div>
  );
}

export default ViewCampaigns;
