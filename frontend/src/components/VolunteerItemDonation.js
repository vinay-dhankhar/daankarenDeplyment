import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaTruck, FaSmile } from 'react-icons/fa';
import { GrSearch } from "react-icons/gr";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import heroImage from '../components/Images/people-donating-collecting-clothes-charity-600nw-2411437163_upscaled.jpeg';
import '../CSS/VolunteerPage.css';
import { toast } from 'react-toastify';
import LoginPage from './LoginPage';

const VolunteerPage = ({ loginHandler }) => {
    const navigate = useNavigate();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const numVolunteers = 500;
    const numDeliveries = 2000;
    const joyfulSmiles = 10000;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginOverlay, setShowLoginOverlay] = useState(false);

    const getDataFromSessionStorage = () => {
        const lat = sessionStorage.getItem('latitude');
        const lon = sessionStorage.getItem('longitude');
        return { lat, lon };
    };

    const [pickups, setPickups] = useState([]);
    const [initialCardsCount, setInitialCardsCount] = useState(8);
    const [currentIndex, setCurrentIndex] = useState(8);

    const fetchData = () => {
        fetch("https://daankaren-deplyment-server.vercel.app/itemDonations/approved")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Fetch failed");
                }
                return response.json();
            })
            .then(data => {
                setPickups(data);
            })
            .catch(error => {
                console.log("Fetch cause error : ", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    const [pincodeFilter, setPincodeFilter] = useState('');
    const handlePincodeFilterChange = (e) => {
        const inputValue = e.target.value;
        // Check if the input value is a number and has a length of 6 or less
        if (/^\d{0,6}$/.test(inputValue)) {
            setPincodeFilter(inputValue);
        }
        setCurrentIndex(initialCardsCount); // Reset currentIndex when filter changes
    };

    const filteredPickups = pickups.filter(donation =>
        new RegExp(pincodeFilter, 'i').test(donation.ticket.pincode)
    );

    useEffect(() => {
        const isUserLoggedIn = document.cookie.includes("Login");
        setIsLoggedIn(isUserLoggedIn);

        const { lat, lon } = getDataFromSessionStorage();
        if (!lat || !lon) {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        sessionStorage.setItem('latitude', lat);
                        sessionStorage.setItem('longitude', lon);

                        setLatitude(lat);
                        setLongitude(lon);
                    },
                    error => {
                        console.log("Error fetching lat lon : ", error);
                    }
                );
            } else {
                console.log("Geolocation not supported");
            }
        }

        fetchData();
    }, []);

    const { lat, lon } = getDataFromSessionStorage();
    const sourceAddress = `${lat} , ${lon}`;

    const handleDirectionsClick = (destination) => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(sourceAddress)}&destination=${encodeURIComponent(destination)}`;
        window.open(url, '_blank');
    };

    const handleVolunteer = async (donor, items) => {
        if (!isLoggedIn) {
            toast.error("Please login to volunteer for a request");
            return;
        }

        try {
            const response = await fetch("https://daankaren-deplyment-server.vercel.app/volunteerSelf", {
                method: 'POST',
                headers: {
                    cookies: document.cookie,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ donor: donor, items: items }),
            });
            if (response.ok) {
                console.log("Volunteered successfully");
                toast.success("Volunteered Successfully");
                fetchData();
            } else {
                console.log("Volunteer failed");
            }
        } catch (error) {
            console.log(error);
            console.log("Error handling volunteer");
        }
    };

    return (
        <div className='volunteer-page'>
            <div className="volunteer-page-hero-section">
                <div className="volunteer-page-hero-content">
                    <h1 className='volunteer-page-hero-heading'>More than Just Donations</h1>
                    <p>As a volunteer, you can not only donate but also help by delivering the essentials to those in need. Your contribution goes beyond monetary value; it's about spreading happiness and making a tangible impact.</p>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Hero" />
                </div>
            </div>

            <section className="volunteer-impact volunteer-page-sections">
                <div className="impact-items">
                    <div className="impact-item">
                        <div className="volunteer-impact-card-icon">
                            <FaUsers />
                        </div>
                        <div className="volunteer-impact-card-content">
                            <h3>{numVolunteers}</h3>
                            <p>Volunteers</p>
                        </div>
                    </div>
                    <div className="impact-item">
                        <div className="volunteer-impact-card-icon">
                            <FaTruck />
                        </div>
                        <div className="volunteer-impact-card-content">
                            <h3>{numDeliveries}</h3>
                            <p>Deliveries Made</p>
                        </div>
                    </div>
                    <div className="impact-item">
                        <div className="volunteer-impact-card-icon">
                            <FaSmile />
                        </div>
                        <div className="volunteer-impact-card-content">
                            <h3>{joyfulSmiles}+</h3>
                            <p>Joyful smiles</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="volunteer-section">
                {/* Get Involved Section */}
                <div className="get-involved">
                    <p className="section-description">
                        ❝Make a difference by volunteering to deliver the  donation requests...❞
                    </p>
                </div>

                {/* Donation Card Slider */}
                <div className='volunteer-cards-container'>
                    <div className="filter-container">
                        <div className="pincode-filter-input-wrapper">
                            <GrSearch className='pincode-filter-icon' />
                            <input
                                type="text"
                                id="pincode-filter"
                                value={pincodeFilter}
                                onChange={handlePincodeFilterChange}
                                className="pincode-filter-input"
                                placeholder="Search your pincode"
                                maxLength={6}
                            />
                        </div>
                    </div>
                </div>
                <div className="donation-grid">
                    {filteredPickups.slice(0, currentIndex).map(donation => {
                        return (
                            <div key={donation.ticket._id} className="stuff-donation-volunteer-card">
                                <div className="card-content">
                                    <p><strong>Requested By:</strong> {donation.user.username}</p>
                                    <p><strong>Items:</strong> {donation.ticket.itemsType.join(' , ').toUpperCase()}</p>
                                    <p><strong>Date of Pickup:</strong> {donation.ticket.scheduledDate.split('T')[0]}</p>
                                    <p><strong>Contact No:</strong> {donation.ticket.contact}</p>
                                    <p><strong>Address:</strong> {donation.ticket.pickupAddress}, {donation.ticket.city}, {donation.ticket.pincode}, {donation.ticket.state}</p>
                                </div>
                                <div className="vol-page-donation-buttons">
                                    {isLoggedIn && (
                                        <button
                                            className="vol-card-buttons directions-button"
                                            onClick={() =>
                                                handleDirectionsClick(
                                                    donation.ticket.pickupAddress,
                                                    donation.ticket.city,
                                                    donation.ticket.state
                                                )
                                            }
                                        >
                                            Directions
                                        </button>
                                    )}
                                    {isLoggedIn ? (
                                        <button
                                            className="vol-card-buttons volunteer-button"
                                            onClick={() => handleVolunteer(donation.ticket.user, donation.ticket._id)}
                                        >
                                            Volunteer
                                        </button>
                                    ) : (
                                        <button className="vol-card-buttons volunteer-button-disabled" onClick={() => setShowLoginOverlay(true)}>
                                            Sign In to Volunteer
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {currentIndex < filteredPickups.length ? (
                    <div className='volunteer-page-view-more-container'>
                        <button className="volunteer-page-view-more" onClick={() => setCurrentIndex(currentIndex + initialCardsCount)}>
                            View More
                            <IoIosArrowDropdownCircle />
                        </button>
                    </div>
                ) : (
                    <p className="no-more-requests">
                        No more pending requests <span className="no-more-requests-icon">🎉</span>
                    </p>
                )}
            </section >
            {showLoginOverlay && (
                <LoginPage
                    loginHandler={loginHandler}
                    showOverlay={showLoginOverlay}
                    setShowOverlay={setShowLoginOverlay}
                />
            )}
        </div >
    );
};

export default VolunteerPage;