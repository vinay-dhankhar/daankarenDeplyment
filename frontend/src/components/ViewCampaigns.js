import React, { useState, useEffect } from "react";
import CampaignCard from "./CampaignCard";
import "../CSS/CampaignCard.css";
import { MdFoodBank, MdCastForEducation } from "react-icons/md";
import { CiMedicalCross } from "react-icons/ci";

function ViewCampaigns({ role }) {
  const [campaignsByCity, setCampaignsByCity] = useState({});
  const [city, setCity] = useState("");
  const [type, setType] = useState("all");

  async function handleTypeSelect(event) {
    const type = event.target.innerText;
    setType(type);
    console.log(type);
  
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
  
        if (type === "All") {
          setCampaignsByCity(campaignsByCity);
        } else {
          // Filter campaigns by type
          const filteredCampaigns = {};
          for (const [city, campaigns] of Object.entries(campaignsByCity)) {
            const filteredCampaignsForCity = campaigns.filter(
              (campaign) =>
                campaign &&
                campaign.campaignCategory &&
                campaign.campaignCategory === type
            );
            if (filteredCampaignsForCity.length > 0) {
              filteredCampaigns[city] = filteredCampaignsForCity;
            }
          }
          setCampaignsByCity(filteredCampaigns);
        }
      })
      .catch((error) => {
        console.error("Error fetching pending campaigns:", error);
      });
  }
  

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
    <div className="cc-campaign-container">
      <h2>All Campaigns</h2>
      <div className="cc-heading-decoration"></div>
      <div className="campaign-types-container">
        <div className="campaign-types">
          <button
            onClick={handleTypeSelect}
            className={`category-button ${type === "All" ? "selected" : ""}`}
          >
            <span className="category-text">All</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${type === "Hunger" ? "selected" : ""}`}
          >
            <MdFoodBank className="category-icon" />
            <span className="category-text">Hunger</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Animals" ? "selected" : ""
            }`}
          >
            <span className="category-text">Animals</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Education" ? "selected" : ""
            }`}
          >
            <MdCastForEducation className="category-icon" />
            <span className="category-text">Education</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Medical Emergency" ? "selected" : ""
            }`}
          >
            <CiMedicalCross className="category-icon" />
            <span className="category-text">Medical Emergency</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Children" ? "selected" : ""
            }`}
          >
            <span className="category-text">Children</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Disaster" ? "selected" : ""
            }`}
          >
            <span className="category-text">Disaster</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Disability" ? "selected" : ""
            }`}
          >
            <span className="category-text">Disability</span>
          </button>
        </div>
      </div>
      <form className="cc-campaign-form" onSubmit={submitHandler}>
        <label className="cc-city-input-placeholder">
          {" "}
          Enter City:
          <input
            className="cc-city-input"
            name="city"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            type="text"
            required
          />
        </label>
        <button className="cc-submit-button" type="submit">
          Search
        </button>
      </form>
      {Object.keys(campaignsByCity).map((city) => (
        <div key={city}>
          <div className="cc-campaign-loc-name">
            <h3>Campaigns in {city}:</h3>
          </div>
          <ul className="cc-campaign-list">
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
