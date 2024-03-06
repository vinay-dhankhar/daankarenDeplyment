import React, { useState, useEffect } from "react";
import "../CSS/PartnersPage.css";
import NextButton from "./Icons/next.png";
import BackButton from "./Icons/back.png";

const PartnersPage = () => {
  const [brandPartners, setBrandPartners] = useState([
    { logo: "https://cdn.comparably.com/27606131/l/26141/26141_logo_netflix.png", name: "Brand 1" },
    { logo: "https://cdn.comparably.com/27153771/l/25351_logo_apple.png", name: "Brand 2" },
    { logo: "https://cdn.comparably.com/27273438/l/30088_logo_spotify.png", name: "Brand 3" },
    { logo: "https://cdn.comparably.com/27466589/l/16377_logo_roblox.png", name: "Brand 4" },
    { logo: "https://cdn.comparably.com/27414917/l/25287_logo_amazon.png", name: "Brand 5" },
  ]);

  const [peoplePartners, setPeoplePartners] = useState([
    { image: "https://ygo-assets-entities-us.yougov.net/be75ec24-c681-11e8-b786-f96307b120ad.jpg?pw=70", name: "Person 1", profession: "Engineer" },
    { image: "https://ygo-assets-entities-us.yougov.net/2b0fde34-2d07-11e6-a4bd-71dbf5f2854a.jpg?pw=70", name: "Person 2", profession: "Designer" },
    { image: "https://ygo-assets-entities-us.yougov.net/887fa745-c63a-11e8-8e97-49c7134d7a4e.jpg?pw=70", name: "Person 3", profession: "Doctor" },
    { image: "https://ygo-assets-entities-us.yougov.net/67a5222a-5c70-11eb-8d48-eb9b21d67bdc.jpg?pw=70", name: "Person 4", profession: "Teacher" },
    { image: "https://ygo-assets-entities-us.yougov.net/7b63b6f4-2cf9-11e6-8fa2-87887d182df9.jpg?pw=70", name: "Person 5", profession: "Artist" },
    { image: "https://ygo-assets-entities-us.yougov.net/a9630480-6312-11e8-ba78-7d010a78ed44.jpg?zcw=619&zch=619&zct=0&zcl=251&pw=70", name: "Person 6", profession: "Developer" },
    { image: "https://ygo-assets-entities-us.yougov.net/5836d4c1-2d0a-11e6-a4bd-71dbf5f2854a.jpg?pw=70", name: "Person 7", profession: "Writer" },
    { image: "https://ygo-assets-entities-us.yougov.net/2c7caa26-2d06-11e6-a4bd-71dbf5f2854a.jpg?pw=70", name: "Person 8", profession: "Chef" },
    { image: "https://ygo-assets-entities-us.yougov.net/50ad5f2e-312d-11ea-98fc-b960ad360eca.jpg?zcw=524&zch=524&zct=0&zcl=191&pw=70", name: "Person 9", profession: "Musician" },
    { image: "https://ygo-assets-entities-us.yougov.net/65e22c27-cccc-11ee-b469-0d9e22677742.jpg?pw=70", name: "Person 10", profession: "Athlete" },
  ]);
  // const [brandPartners, setBrandPartners] = useState([]);
  // const [peoplePartners, setPeoplePartners] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  // const brandResponse = await fetch('/api/brand-partners');
  // const brandData = await brandResponse.json();

  // const peopleResponse = await fetch('/api/people-partners');
  // const peopleData = await peopleResponse.json();

  // setBrandPartners(brandData);
  // setPeoplePartners(peopleData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [currentPeopleIndex, setCurrentPeopleIndex] = useState(0);

  const handleNextBrand = () => {
    setCurrentBrandIndex((prevIndex) => (prevIndex + 5) % brandPartners.length);
  };

  const handlePreviousBrand = () => {
    setCurrentBrandIndex((prevIndex) => (prevIndex - 5 + brandPartners.length) % brandPartners.length);
  };

  const handleNextPeople = () => {
    setCurrentPeopleIndex((prevIndex) => (prevIndex + 4) % peoplePartners.length);
  };

  const handlePreviousPeople = () => {
    setCurrentPeopleIndex((prevIndex) => (prevIndex - 4 + peoplePartners.length) % peoplePartners.length);
  };

  return (
    <>
      <h1>Our Partners</h1>

      <div>
        <h2>Brand Partners</h2>
        <div className="brand-logos">
        <button onClick={handlePreviousBrand}><span><img src={BackButton} alt="next" width={32} height={32}></img></span></button>
          {brandPartners
            .slice(currentBrandIndex, currentBrandIndex + 5)
            .map((partner, index) => (
              <img
                key={index}
                src={partner.logo}
                alt={partner.name}
                className="brand-logo"
              />
            ))}
        <button onClick={handleNextBrand}><span><img src={NextButton} alt="next" width={32} height={32}></img></span></button>
        </div>
      </div>

      <div>
        <h2>People Partners</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        <button onClick={handlePreviousPeople}><span><img src={BackButton} alt="Back" width={32} height={32}></img></span></button>
          {peoplePartners
            .slice(currentPeopleIndex, currentPeopleIndex + 4)
            .map((partner, index) => (
              <div className="partner-card" key={index}>
  <div className="partner-card-border-top">
  <img className="img" src={partner.image} alt={partner.name} />
  </div>
  <span> Name:{partner.name}</span>
  <p className="profession"> Profession: {partner.profession}</p>
  <button> View More
  </button>
</div>
            ))}
            
        <button onClick={handleNextPeople}><span><img src={NextButton} alt="next" width={32} height={32} ></img></span></button>
        </div>
      </div>
    </>
  );
};

export default PartnersPage;
