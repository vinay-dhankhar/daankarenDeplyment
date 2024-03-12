import React, { useState, useEffect, useRef } from "react";
import "../CSS/PartnersPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnersPage = () => {
  const brandSliderRef = useRef(null);
  const peopleSliderRef = useRef(null);

  const brandSettings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const peopleSettings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  
  const [brandPartners, setBrandPartners] = useState([]);
  const [peoplePartners, setPeoplePartners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
  const brandResponse = await fetch('http://localhost:4000/partners/brands');
  const brandData = await brandResponse.json();

  const peopleResponse = await fetch('http://localhost:4000/partners/people');
  const peopleData = await peopleResponse.json();

  setBrandPartners(brandData);
  setPeoplePartners(peopleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="partners-page">
      <h1>Our Partners</h1>

      <div className="partners-section">
        <h2 className="partners">Brand Partners</h2>
        <div className="brand-partners-slider">
          <Slider {...brandSettings} ref={brandSliderRef}>
            {brandPartners.map((partner, index) => (
              <div key={index}>
                <img src={partner.logo} alt={partner.name} className="brand-logo" />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="partners-section">
        <h2 className="partners">People Partners</h2>
        <div className="people-partners-slider">
          <Slider {...peopleSettings} ref={peopleSliderRef}>
            {peoplePartners.map((partner, index) => (
              <div className="partner-card" key={index}>
                <div className="partner-card-border-top">
                  <img className="img" src={partner.image} alt={partner.name} />
                </div>
                <span>Name: {partner.name}</span>
                <p className="profession">Profession: {partner.profession}</p>
                <button>View More</button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};


export default PartnersPage;
