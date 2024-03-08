import React, { useState, useEffect } from 'react';
import CampaignCard from './CampaignCard';

function ViewCampaigns({role}) {
  const [viewCampaigns, setViewCampaigns] = useState([]);
  const [city, setCity] = useState('');


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

  async function submitHandler(event){
    event.preventDefault();
    try{
      const res = await fetch(`http://localhost:4000/city` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ city })
      });
      const data = await res.json();
      setViewCampaigns(data);
    }
    catch (error) {
      console.error(error);
      console.log("An Error occured while fetching according to city");
    }
  }

  return (
    <div>
      <h2>All Campaigns</h2>
      <form onSubmit={submitHandler}>
        <label> Enter City: 
          <input
            name='city'
            value={city}
            placeholder='Enter city name'
            onChange={(e) => setCity(e.target.value)}
            type='text'
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {viewCampaigns.map(campaign => (
          <CampaignCard campaign={campaign} role={role}/>
        ))}
      </ul>
    </div>
  );
}

export default ViewCampaigns;
