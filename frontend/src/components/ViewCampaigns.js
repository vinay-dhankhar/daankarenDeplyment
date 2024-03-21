import React, { useEffect, useState } from "react";
import CampaignCard from "./CampaignCard";
import "../CSS/CampaignCard.css";
import MedicalIcon from './Icons/medical.png';
import ChildrenIcon from './Icons/children.png';
import AnimalIcon from './Icons/animal.png';
import EducationIcon from './Icons/education.png';
import HungerIcon from './Icons/food.png';
import DisabilityIcon from './Icons/disability.png';
import DisasterIcon from './Icons/disaster.png';

function ViewCampaigns({ role }) {
  const [campaignsByCity, setCampaignsByCity] = useState({});
  const [city, setCity] = useState("");
  const [type, setType] = useState("All");
  const [allCampaigns,setAllCampaigns] = useState({});
  const [loadingPercentage, setLoadingPercentage] = useState(0); 

  async function handleTypeSelect(event) {
    const type = event.target.innerText;
    setType(type);
  
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
  
  useEffect(() => {
    async function fetchAllCampaigns() {
      try {
        const res = await fetch("http://localhost:4000/campaigns/approved");
        const data = await res.json();
        setLoadingPercentage(70);
        if (res.ok) {
          const campaignsByCity = data.reduce((acc, campaign) => {
            const city = campaign.city;
            if (!acc[city]) {
              acc[city] = [];
            }
            acc[city].push(campaign);
            return acc;
          }, {});
          setAllCampaigns(campaignsByCity);
          setCampaignsByCity(campaignsByCity);
          setLoadingPercentage(100);
        } else {
          console.error("Error fetching all campaigns:", data.error);
          setLoadingPercentage(100);
        }
      } catch (error) {
        console.error(error);
        console.log("An Error occurred while fetching all campaigns");
        setLoadingPercentage(100);
      }
    }
    setLoadingPercentage(10);
    
    fetchAllCampaigns(); 
  }, []);
  
  //fetch again for the entered city
  async function submitHandler(event) {
    event.preventDefault();
    if (city === "") {
      setCampaignsByCity(allCampaigns);
    } else {
      const filteredCampaigns = {};
      for (const [cityKey, campaigns] of Object.entries(allCampaigns)) {
        if (cityKey.toLowerCase().includes(city.toLowerCase())) {
          filteredCampaigns[cityKey] = campaigns;
        }
      }
      setCampaignsByCity(filteredCampaigns);
    }
  }

  if (loadingPercentage < 100) {
    return (
              <div className="cp-loading-bar">
                <div
                  className="cp-loading-bar-fill"
                  style={{ width: `${loadingPercentage}%` }}
                ></div>
              </div>
            );
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
                        <img src={HungerIcon} className="category-icon" />
            <span className="category-text">Hunger</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Animals" ? "selected" : ""
            }`}
          >            <img src={AnimalIcon} className="category-icon" />
            <span className="category-text">Animals</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Education" ? "selected" : ""
            }`}
          >
            <img src={EducationIcon} className="category-icon" />
            <span className="category-text">Education</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Medical" ? "selected" : ""
            }`}
          >
            <img src={MedicalIcon} className="category-icon" />
            <span className="category-text">Medical</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Children" ? "selected" : ""
            }`}
          >
                      <img src={ChildrenIcon} className="category-icon" />
            <span className="category-text">Children</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Disaster" ? "selected" : ""
            }`}
          >
                      <img src={DisasterIcon} className="category-icon" />
            <span className="category-text">Disaster</span>
          </button>
          <button
            onClick={handleTypeSelect}
            className={`category-button ${
              type === "Disability" ? "selected" : ""
            }`}
          >
                      <img src={DisabilityIcon} className="category-icon" />
            <span className="category-text">Disability</span>
          </button>
        </div>
      </div>
      <form className="cc-campaign-form cc-search" onSubmit={submitHandler}>
          <input
            className="cc-city-input"
            name="city"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            type="text"
          />
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
