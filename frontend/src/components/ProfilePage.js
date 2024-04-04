import React, { useEffect, useState } from "react";
import "../CSS/profilePage.css";
import CampaignCard from "./CampaignCard";

const MyDonations = ({ user }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchDonatedCampaigns(user._id);
  }, [user]);

  const fetchDonatedCampaigns = (userId) => {
    fetch(`https://daankaren-deplyment-server.vercel.app/fetchDonatedCampaigns/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCampaigns(data.campaigns);
      })
      .catch((error) => console.error("Error fetching campaigns:", error));
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div className="donations">
        <h2>My Donations</h2>
        <div className={`card-list ${showAll ? "show-all" : ""}`}>
          {campaigns.length !== 0 &&
            campaigns.map((campaign, index) => (
              <div
                key={campaign._id}
                className="card"
                style={{ display: index < 4 || showAll ? "block" : "none" }}
              >
                <CampaignCard campaign={campaign} role={"user"} />
              </div>
            ))}
          {campaigns.length === 0 && <p>No donation done yet.</p>}
        </div>
        {campaigns.length > 4 && (
          <button className="show-hide-btn" onClick={toggleShowAll}>
            {showAll ? "Hide All" : "Show All"}
          </button>
        )}
      </div>
    </>
  );
};

const MyCampaigns = ({ user }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchCampaigns(user._id);
  }, [user]);

  const fetchCampaigns = (userId) => {
    fetch(`https://daankaren-deplyment-server.vercel.app/fetchCampaignsOfUser/${userId}`)
      .then((response) => response.json())
      .then((data) => setCampaigns(data))
      .catch((error) => console.error("Error fetching campaigns:", error));
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div className="campaigns">
        <h2 id="mycampaigns-section">My Campaigns</h2>
        <div className={`campaign-list card-list ${showAll ? "show-all" : ""}`}>
          {campaigns.length !== 0 &&
            campaigns.map((campaign, index) => (
              <div
                key={campaign._id}
                className="card"
                style={{ display: index < 4 || showAll ? "block" : "none" }}
              >
                <CampaignCard
                  className="campaigns-card"
                  campaign={campaign}
                  role={"user"}
                />
              </div>
            ))}
          {campaigns.length === 0 && <p>No campaign started yet.</p>}
        </div>
        {campaigns.length > 4 && (
          <button className="show-hide-btn" onClick={toggleShowAll}>
            {showAll ? "Hide All" : "Show All"}
          </button>
        )}
      </div>
    </>
  );
};

const UpcomingRides = ({ user, volunteeredRides, setVolunteeredRides }) => {
  const [file, setFile] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handlePicked = async (rideId) => {
    try {
      const response = await fetch(
        `https://daankaren-deplyment-server.vercel.app/handlePick/${rideId}`,
        {
          method: "PUT",
        }
      );

      fetchVolunteeredRides(user._id);
    } catch (error) {
      console.log(error);
      console.log("Error handling volunteer");
    }
  };

  const handleDelivery = async (event, rideId) => {
    event.preventDefault();
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("files", file);
      const response = await fetch(
        `https://daankaren-deplyment-server.vercel.app/handleDelivery/${rideId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      fetchVolunteeredRides(user._id);
    } catch (error) {
      console.log(error);
      console.log("Error handling Delivery");
    }
  };

  const fetchVolunteeredRides = (userId) => {
    fetch(`https://daankaren-deplyment-server.vercel.app/volunteeredRides/${userId}`)
      .then((response) => response.json())
      .then((data) => setVolunteeredRides(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchVolunteeredRides(user._id);
  }, [volunteeredRides]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div className="campaigns">
        <div className="campaigns-header">
          <h2>Accepted Rides</h2>
          <div className="counter-section-data">
            <div className="counter-dial">{volunteeredRides.length}</div>
          </div>
        </div>
        <div className={`card-list ${showAll ? "show-all" : ""}`}>
          {volunteeredRides &&
            volunteeredRides.map((ride, index) => (
              <div
                key={ride._id}
                className="card"
                style={{ display: index < 4 || showAll ? "block" : "none" }}
              >
                <p><b>Donor:</b> {ride.donor.username}</p>
                <p><b>Items:</b> {ride.donation.itemsType.join(" , ")}</p>
                <p>
                  <b>Pickup Address:</b> {ride.donation.pickupAddress},{" "}
                  {ride.donation.city}, {ride.donation.pincode},{" "}
                  {ride.donation.state}
                </p>
                <p><b>Date:</b> {ride.donation.scheduledDate.split("T")[0]}</p>
                <p><b>Contact:</b> {ride.donation.contact}</p>
                {ride.status === "volunteered" && (
                  <button
                    className="rider-pickup-btn"
                    onClick={() => handlePicked(ride._id)}
                  >
                    Picked
                  </button>
                )}
                {ride.status === "picked" && (
                  <div>
                    <form
                      onSubmit={(event) => handleDelivery(event, ride._id)}
                      encType="multipart/form-data"
                    >
                      <input
                        type="file"
                        name="files"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <button type="submit" className="rider-pickup-btn">
                        Delivered
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          {!volunteeredRides && <p>No Upcoming Rides</p>}
        </div>
        {volunteeredRides.length > 4 && (
          <button className="show-hide-btn" onClick={toggleShowAll}>
            {showAll ? "Hide All" : "Show All"}
          </button>
        )}
      </div>
    </>
  );
};

const DoneRides = ({ user, volunteeredRides }) => {
  const [completedRides, setcompletedRides] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const showCompletedRides = () => {
    setShowAll(!showAll);
  };

  const fetchCompletedRides = (userId) => {
    fetch(`https://daankaren-deplyment-server.vercel.app/completedRides/${userId}`)
      .then((response) => response.json())
      .then((data) => setcompletedRides(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCompletedRides(user._id);
  }, [user, volunteeredRides, completedRides]);

  return (
    <>
      <div className="campaigns">
        <div className="campaigns-header">
          <h2>Completed Rides</h2>
          <div className="counter-section-data">
            <div className="counter-dial">{completedRides.length}</div>
          </div>
        </div>
        {showAll && (
          <div className={`card-list ${showAll ? "show-all" : ""}`}>
            {completedRides &&
              completedRides.map((ride, index) => (
                <div
                  key={ride._id}
                  className="card"
                  style={{ display: "block" }}
                >
                  <p><b>Donor:</b> {ride.donor.username}</p>
                  <p><b>Items:</b> {ride.donation.itemsType.join(" , ")}</p>
                  <p>
                    <b>Pickup Address:</b> {ride.donation.pickupAddress},{" "}
                    {ride.donation.city}, {ride.donation.pincode},{" "}
                    {ride.donation.state}
                  </p>
                  <p><b>Date:</b> {ride.donation.scheduledDate.split("T")[0]}</p>
                  <p><b>Contact:</b> {ride.donation.contact}</p>
                </div>
              ))}
            {!completedRides && <p>No Rides Completed Yet</p>}
          </div>
        )}
        {completedRides.length > 0 && (
          <button className="show-hide-btn" onClick={showCompletedRides}>
            {showAll ? "Hide All" : "Show All"}
          </button>
        )}
      </div>
    </>
  );
};

const InitiatedRides = ({ user }) => {
  const [initiatedRides, setInitiatedRides] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchInitiatedRides = (userId) => {
    fetch(`https://daankaren-deplyment-server.vercel.app/initiatedRides/${userId}`)
      .then((response) => response.json())
      .then((data) => setInitiatedRides(data))
      .catch((error) => console.log(error));
  };

  const handleSeen = async (rideId) => {
    try {
      const res = await fetch(`https://daankaren-deplyment-server.vercel.app/handleSeen/${rideId}`, {
        method: "PUT",
      });

      fetchInitiatedRides(user._id);
    } catch (error) {
      console.log(error);
      console.log("Error in updating seen");
    }
  };

  useEffect(() => {
    fetchInitiatedRides(user._id);
  }, [user]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div className="campaigns">
        <h2>Pending Donations</h2>
        <div className={`card-list ${showAll ? "show-all" : ""}`}>
          {initiatedRides &&
            initiatedRides.map((ride, index) => (
              <div
                key={ride._id}
                className="card"
                style={{ display: index < 4 || showAll ? "block" : "none" }}
              >
                <p><b>Items:</b> {ride.donation.itemsType.join(" , ")}</p>
                <p>
                  <b>Pickup Address:</b> {ride.donation.pickupAddress},{" "}
                  {ride.donation.city}, {ride.donation.pincode},{" "}
                  {ride.donation.state}
                </p>
                <p><b>Date:</b> {ride.donation.scheduledDate.split("T")[0]}</p>
                <p><b>Rider:</b> {ride.volunteer.username}</p>
                {ride.imageUrl && (
                  <div>
                    <p><b>Status: </b> <b style={{color: "green"}}>Delivered</b></p>
                    <p>
                      <b>Proof:</b>{" "}
                      <a
                        href={ride.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800"
                      >
                        Click here to see delivery image
                      </a>
                    </p>
                    <button
                      className="donor-verify-delivery-btn"
                      onClick={() => handleSeen(ride._id)}
                    >
                      OK
                    </button>
                  </div>
                )}
                {!ride.imageUrl && <p><b>Status: </b><b style={{color: "red"}}>Not delivered</b></p>}
              </div>
            ))}
          {!initiatedRides && <p>No rides initiated</p>}
        </div>
        {initiatedRides.length > 4 && (
          <button className="show-hide-btn" onClick={toggleShowAll}>
            {showAll ? "Hide All" : "Show All"}
          </button>
        )}
      </div>
    </>
  );
};

const UserProfile = ({ user, volunteeredRides, completedRides }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(user.profileImg);
  const [previewImage, setPreviewImage] = useState(null);

  const handleProfile = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
      const response = await fetch(
        `https://daankaren-deplyment-server.vercel.app/handleProfile/${user._id}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setProfileImg(data.response.profileImg);
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
      setSelectedFile(null);

      // reload can be replaced by linking the navbar and profile page
      window.location.reload();
      console.log("File uploaded successfully!", response);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const resetPreview = (event) => {
    URL.revokeObjectURL(previewImage);
    setSelectedFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="user-profile">
      <div className="text-center text-white">
        <div className="profile-pic-section">
          {previewImage && (
            <img src={previewImage} alt="User-Selected-Preview-Image" />
          )}
          {!previewImage && profileImg && (
            <img src={profileImg} alt="User-Profile-Image" />
          )}
          {!previewImage && !profileImg && (
            <img
              src="https://img.icons8.com/bubbles/100/000000/user.png"
              alt="User-Profile-Image"
            />
          )}
          <h6>{user.username}</h6>
          <p>{user.email}</p>
        </div>

        <div className="profile-pic-change">
          <label htmlFor="fileInput" className="profile-pic-label">
            <i className="fas fa-camera"></i> Change Profile Pic
          </label>
          <input
            type="file"
            id="fileInput"
            name="files"
            accept=".jpg, .jpeg, .png"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {previewImage && selectedFile && (
            <div className="profile-preview-buttons">
              <button type="button" onClick={resetPreview} className="profile-cancel-btn">
                Cancel
              </button>
              <button type="submit" onClick={handleProfile} className="profile-confirm-btn">
                Confirm
              </button>
            </div>
          )}
        </div>
        <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
      </div>
      <div className="profile-counter">
        <div className="profile-counter-section">
          <div className="profile-counter-dial">{completedRides.length}</div>
          <span>Completed Rides</span>
        </div>
        <div className="profile-counter-section">
          <div className="profile-counter-dial">{volunteeredRides.length}</div>
          <span>Volunteered Rides</span>
        </div>
      </div>
    </div>
  );
};

// const UserInfo = ({ user }) => {
//   return (
//     <div className="user-info profile-container">
//       <div>
//         <h6>Information</h6>
//         <div>
//           <div>
//             <p>Email</p>

//           </div>
//           <div>
//             <p>Phone</p>

//           </div>
//         </div>
//         <ul>
//           <li>
//             <a
//               href="#!"
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title=""
//               data-original-title="facebook"
//               data-abc="true"
//             >
//               <i
//                 className="mdi mdi-facebook feather icon-facebook facebook"
//                 aria-hidden="true"
//               ></i>
//             </a>
//           </li>
//           <li>
//             <a
//               href="#!"
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title=""
//               data-original-title="twitter"
//               data-abc="true"
//             >
//               <i
//                 className="mdi mdi-twitter feather icon-twitter twitter"
//                 aria-hidden="true"
//               ></i>
//             </a>
//           </li>
//           <li>
//             <a
//               href="#!"
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title=""
//               data-original-title="instagram"
//               data-abc="true"
//             >
//               <i
//                 className="mdi mdi-instagram feather icon-instagram instagram"
//                 aria-hidden="true"
//               ></i>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

const CampaignsSection = ({ user }) => {
  return (
    <div className="section">
      <MyCampaigns user={user} />
    </div>
  );
};

const DonationsSection = ({ user }) => {
  return (
    <div className="section">
      <h2 id="main-section">Donations</h2>
      <div className="profile-heading-decoration"></div>
      <InitiatedRides user={user} />
      <MyDonations user={user} />
    </div>
  );
};

const VolunteeredRidesSection = ({
  user,
  volunteeredRides,
  setVolunteeredRides,
  completedRides,
}) => {
  return (
    <div className="section">
      <h2 id="main-section">Volunteered Rides</h2>
      <div className="profile-heading-decoration"></div>
      <UpcomingRides
        user={user}
        volunteeredRides={volunteeredRides}
        setVolunteeredRides={setVolunteeredRides}
      />
      <DoneRides
        user={user}
        volunteeredRides={volunteeredRides}
        completedRides={completedRides}
      />
    </div>
  );
};

const UserCard = ({
  user,
  volunteeredRides,
  setVolunteeredRides,
  completedRides,
}) => {
  return (
    <div>
      <UserProfile
        user={user}
        volunteeredRides={volunteeredRides}
        completedRides={completedRides}
      />
      <CampaignsSection user={user} />
      <DonationsSection user={user} />
      <VolunteeredRidesSection
        user={user}
        volunteeredRides={volunteeredRides}
        setVolunteeredRides={setVolunteeredRides}
        completedRides={completedRides}
      />
    </div>
  );
};
const ProfilePage = () => {
  const [volunteeredRides, setVolunteeredRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [user, setUser] = useState({});
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoadingPercentage(10);
        const response = await fetch("https://daankaren-deplyment-server.vercel.app/fetchUserDetails", {
          method: "GET",
          headers: {
            cookies: document.cookie,
          },
        });
        setLoadingPercentage(30);
        const data = await response.json();
        setUser(data);
        setLoadingPercentage(100);
      } catch (error) {
        console.log("error=" + error);
        setLoadingPercentage(100);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchVolunteeredRides = async () => {
      try {
        const response = await fetch(
          `https://daankaren-deplyment-server.vercel.app/volunteeredRides/${user._id}`
        );
        const data = await response.json();
        setVolunteeredRides(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCompletedRides = async () => {
      try {
        const response = await fetch(
          `https://daankaren-deplyment-server.vercel.app/completedRides/${user._id}`
        );
        const data = await response.json();
        setCompletedRides(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user._id) {
      fetchVolunteeredRides();
      fetchCompletedRides();
    }
  }, [user._id]);

  if (loadingPercentage < 100) {
    return <div>Loading... {loadingPercentage}%</div>;
  }

  return (
    <div className="page-content profile-page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <UserCard
            user={user}
            volunteeredRides={volunteeredRides}
            setVolunteeredRides={setVolunteeredRides}
            completedRides={completedRides}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
