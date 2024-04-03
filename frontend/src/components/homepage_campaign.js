import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import '../CSS/homepage.css';

const HomepageCampaign = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Education for All',
      description: 'Providing access to quality education for underprivileged children.',
      goal: 50000,
      raised: 25000,
      image: 'https://via.placeholder.com/300x200.png?text=Education+for+All',
    },
    {
      id: 2,
      title: 'Clean Water Initiative',
      description: 'Bringing clean and safe drinking water to communities in need.',
      goal: 75000,
      raised: 40000,
      image: 'https://via.placeholder.com/300x200.png?text=Clean+Water+Initiative',
    },
    {
      id: 3,
      title: 'Sustainable Agriculture',
      description: 'Supporting small-scale farmers with eco-friendly farming practices.',
      goal: 90000,
      raised: 60000,
      image: 'https://via.placeholder.com/300x200.png?text=Sustainable+Agriculture',
    },
    {
      id: 4,
      title: 'Disaster Relief',
      description: 'Helping the victims by providing them with relief packages.',
      goal: 120000,
      raised: 100000,
      image: 'https://via.placeholder.com/300x200.png?text=Disaster+Relief',
    }
  ];

  return (
    <div className="homepage-campaign-section">
      <div className="section-heading">
        <h2 className="section-title">Featured Campaigns</h2>
        <div className="heading-decoration"></div>
      </div>
      <div className="campaign-cards-container">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="homepage-campaign-card">
            <img src={campaign.image} alt={campaign.title} className="campaign-image" />
            <div className="campaign-details">
              <div className='campaign-details-para'>
                <h3 className="campaign-title">{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>
              </div>
              <div className='campaign-cards-progess-stats'>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="campaign-stats">
                  <span className="raised">₹{campaign.raised.toLocaleString()} raised</span>
                  <span className="goal">₹{campaign.goal.toLocaleString()} goal</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='homepage-see-more-campaign'>
        <Link to="/ViewCampaigns" className="view-all-btn">
          See More {'>'}
        </Link>
      </div>
    </div>
  );
};

export default HomepageCampaign;