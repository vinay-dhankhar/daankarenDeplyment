import React, { useState, useEffect, useRef } from "react";
import "../CSS/PartnersPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnersPage = () => {
  // const orgSliderRef = useRef(null);


  // const orgSettings = {
  //   dots: false,
  //   slidesToShow: 3,
  //   slidesToScroll: 2,
  //   arrows: true,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //   ],
  // };

  const [brandPartners, setBrandPartners] = useState([]);
  const [orgPartners, setOrgPartners] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await fetch(
          "http://localhost:4000/partners/brands"
        );
        const brandData = await brandResponse.json();
        setLoadingPercentage(20);

        const orgResponse = await fetch(
          "http://localhost:4000/partners/org"
        );
        setLoadingPercentage(40);
        const orgData = await orgResponse.json();

        setBrandPartners(brandData);
        setOrgPartners(orgData);
        setLoadingPercentage(100);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingPercentage(100);
      }
    };

    fetchData();
  }, []);

  if (loadingPercentage < 100) {
    return <div>Loading... {loadingPercentage}%</div>;
  }

  return (
    <div className="partners-page">

<div className="partners-section">
  <h2 className="partners-heading">Organisation Partners</h2>
  <div className="org-partners-container">
      {orgPartners.map((partner, index) => (
        <div className="partner-card" key={index}>
          <div className="partner-card-border-top">
            <img
              className="img"
              src={`https://via.placeholder.com/150`}
              alt={partner.orgName}
            />
          </div>
          <span>{partner.orgName}</span>
          <p>{partner.motive}</p>
        </div>
      ))}
  </div>
</div>

      <div className="partners-section">
        <h2 className="partners-heading">Brand Partners</h2>
        <div className="brand-partners">
          {brandPartners.map((partner, index) => (
            <div key={index} className="brand-logo-container">
              <img
                src={partner.logo}
                alt={partner.name}
                className="brand-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
