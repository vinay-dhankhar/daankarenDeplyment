import React, { useState, useEffect } from "react";
import CampaignCard from "./CampaignCard";

function ViewCampaigns({ role }) {
  const [campaignsByCity, setCampaignsByCity] = useState({});
  const [city, setCity] = useState("");

  //fetch all the campaigns based on their cities
  useEffect(() => {
    fetch("http://localhost:4000/campaigns/approved")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const campaignsByCity = data.reduce((acc, campaign) => {
          const city = campaign.city;
          if (!acc[city]) {
            acc[city] = [];
          }
          acc[city].push(campaign);
          return acc;
        }, {});
        console.log("Grouped campaigns by city:", campaignsByCity);
        setCampaignsByCity(campaignsByCity);
      })
      .catch((error) => {
        console.error("Error fetching pending campaigns:", error);
      });
  }, []);

  //fetch again for the entered city
  async function submitHandler(event) {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });
      const data = await res.json();
      if (res.ok) {
        setCampaignsByCity({ [city]: data });
      } else {
        console.error("Error fetching campaigns by city:", data.error);
      }
    } catch (error) {
      console.error(error);
      console.log("An Error occurred while fetching campaigns by city");
    }
  }

  return (
    <div className="campaign-container">
      <h2>All Campaigns</h2>
      <form className="campaign-form" onSubmit={submitHandler}>
        <label>
          {" "}
          Enter City:
          <input
            className="city-input"
            name="city"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            type="text"
            required
          />
        </label>
        <button className="submit-button" type="submit">Search</button>
      </form>
      {Object.keys(campaignsByCity).map((city) => (
        <div key={city}>
          <h3>Campaigns in {city}</h3>
          <ul className="campaign-list">
            {Array.isArray(campaignsByCity[city]) ? (
              campaignsByCity[city].length > 0 ? (
                campaignsByCity[city].map((campaign) => (
                  <CampaignCard
                    key={campaign._id}
                    campaign={campaign}
                    role={role}
                  />
                ))
              ) : (
                <p>No campaigns found for {city}</p>
              )
            ) : null}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ViewCampaigns;