import React, { useState, useEffect, useRef } from "react";
import "../CSS/PartnersPage.css";

const PartnersPage = () => {
  const [brandPartners, setBrandPartners] = useState([]);
  const [orgPartners, setOrgPartners] = useState([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [selectedOrg, setSelectedOrg] = useState(null);

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

  const handleOrgClick = (org) => {
    setSelectedOrg(org);
  };

  const closePopup = () => {
    setSelectedOrg(null);
  };
  return (
    <div className="partners-page">
      <div className="partners-section">
        <h2 className="partners-heading">Organisation Partners</h2>
        <div className="org-partners-container">
          {orgPartners.map((partner, index) => (
            <div
              className="partner-card"
              key={index}
              onClick={() => handleOrgClick(partner)}
            >
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

      {selectedOrg && (
        <div className="popup">
          <div className="popup-container">
            <div className="popup-content">
              <img
                className="img"
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                alt={selectedOrg.orgName}
              />
                  <h3>{selectedOrg.orgName}</h3>
                  <p>{selectedOrg.email}</p>
                  <p>{selectedOrg.address}</p>
                  <p>{selectedOrg.contactNumber}</p>
                  <p>The motive of an NGO (Non-Governmental Organization) encapsulates a multifaceted commitment to catalyzing positive change in society. Rooted in a fervent dedication to addressing pressing issues, the motive of an NGO is driven by a profound sense of social responsibility and a desire to alleviate suffering, promote human rights, and foster sustainable development. At its core, an NGO operates with the overarching goal of advocating for marginalized communities, amplifying their voices, and empowering them to access resources, opportunities, and essential services. Whether focused on humanitarian aid, environmental conservation, healthcare access, education, or socio-economic development, the motive of an NGO is guided by principles of equity, justice, and inclusivity.</p>
                  {/* <p>{selectedOrg.motive}</p> */}
            </div>
            <span className="close-button" onClick={closePopup}>
              &times;
            </span>
          </div>
        </div>
      )}

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
