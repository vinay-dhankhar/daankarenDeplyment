import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';
import '../CSS/CampaignCard.css'

function PendingTickets({ role }) {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    // Check if the user is admin, if not, do nothing
    if (role !== "admin") {
      return;
    }
  
    const fetchPendingCampaigns = async () => {
      try {
        setLoadingPercentage(30); // Set loading percentage to 30%
  
        const response = await fetch('http://localhost:4000/campaigns/pending');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPendingCampaigns(data);
  
        setLoadingPercentage(70); // Set loading percentage to 70%
      } catch (error) {
        console.error('Error fetching pending campaigns:', error);
      } finally {
        setLoadingPercentage(100); // Set loading percentage to 100%
      }
    };
  
    fetchPendingCampaigns();
  }, [role]);
  

  // If user is not admin, display a message
  if (role !== "admin") {
    return <div>Access denied: You are not authorized to view this page.</div>;
  }
  if (loadingPercentage < 100) {
    // console.log('Loading percentage:', loadingPercentage); // Log loading percentage to console
    return <div>Loading... {loadingPercentage}%</div>;
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
