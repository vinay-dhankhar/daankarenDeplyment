import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaTruck, FaSmile } from 'react-icons/fa';
import heroImage from '../components/Images/people-donating-collecting-clothes-charity-600nw-2411437163_upscaled.jpeg';
import '../CSS/VolunteerPage.css';

const VolunteerPage = () => {
    const navigate = useNavigate();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const numVolunteers = 500;
    const numDeliveries = 2000;
    const joyfulSmiles = 10000;

    const getDataFromSessionStorage = () => {
        const lat = sessionStorage.getItem('latitude');
        const lon = sessionStorage.getItem('longitude');
        return { lat, lon };
    };

    const [pickups, setPickups] = useState([]);
    const [initialCardsCount, setInitialCardsCount] = useState(8);
    const [currentIndex, setCurrentIndex] = useState(8);
    const [pincodeFilter, setPincodeFilter] = useState('');

    const fetchData = () => {
        fetch("http://localhost:4000/itemDonations/approved")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Fetch failed");
                }
                return response.json();
            })
            .then(data => {
                console.log(data.length);
                setPickups(data);
            })
            .catch(error => {
                console.log("Fetch cause error : ", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handlePincodeFilterChange = (event) => {
        setPincodeFilter(event.target.value);
        setCurrentIndex(initialCardsCount); // Reset currentIndex when filter changes
    };


    const filteredPickups = pickups.filter(donation =>
        new RegExp(pincodeFilter, 'i').test(donation.ticket.pincode)
    );



    useEffect(() => {
        const isLoggedIn = document.cookie.includes("Login");

        if (!isLoggedIn) {
            toast.error("Please Login to access this Page");
            navigate('/LoginPage');
            return;
        }

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
        try {
            const response = await fetch("http://localhost:4000/volunteerSelf", {
                method: 'POST',
                headers: {
                    cookies: document.cookie,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ donor: donor, items: items }),
            });
            if (response.ok) {
                console.log("Volunteered successfully");
                fetchData();
            } else {
                console.log("Volunteer failed");
            }
        } catch (error) {
            console.log(error);
            console.log("Error handling volunteer");
        }
    };

    console.log("Pickups : ", pickups.length);

    return (
        <div className='volunteer-page'>
            <div className="volunteer-page-hero-section">
                <div className="volunteer-page-hero-content">
                    <h1>More than Just Donations</h1>
                    <p>As a volunteer, you can not only donate but also help by delivering the essentials to those in need. Your contribution goes beyond monetary value; it's about spreading happiness and making a tangible impact.</p>
                    <button className="hero-btn">Hands On!</button>
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
                    <h2 className="section-heading">Get Involved</h2>
                    <p className="section-description">
                        You can make a difference by volunteering to fulfill donation requests in your city. Click the button below to view
                        pending requests and sign up to deliver the essentials to those in need or to our Share&Sahyog warehouses.
                    </p>
                </div>

                {/* Volunteer Heading */}
                <h2 className="section-heading">Volunteer Here to Help Us Deliver These Items to the Needy</h2>

                {/* Donation Card Slider */}
                <div className='volunteer-cards-container'>
                    <div className="filter-container">
                        <label htmlFor="pincode-filter" className="filter-label">Filter by Pincode:</label>
                        <input
                            type="text"
                            id="pincode-filter"
                            value={pincodeFilter}
                            onChange={handlePincodeFilterChange}
                            className="pincode-filter-input"
                            placeholder="Enter pincode"
                        />
                    </div>
                    <div className="donation-grid">
                        {filteredPickups.slice(0, currentIndex).map(donation => {
                            // console.log(donation);
                            return (
                                <div key={donation.ticket._id} className="stuff-donation-volunteer-card">
                                    <div className="card-content">
                                        <p><strong>Requested By:</strong> {donation.user.username}</p>
                                        <p><strong>Items:</strong> {donation.ticket.itemsType.join(' , ').toUpperCase()}</p>
                                        <p><strong>Date of Pickup:</strong> {donation.ticket.scheduledDate.split('T')[0]}</p>
                                        <p><strong>Contact Details:</strong> {donation.ticket.contact}</p>
                                        <p><strong>Address:</strong> {donation.ticket.pickupAddress}, {donation.ticket.city}, {donation.ticket.pincode}, {donation.ticket.state}</p>
                                    </div>
                                    <div className="vol-page-donation-buttons">
                                        <button className="btn btn-secondary" onClick={() => handleDirectionsClick(donation.ticket.pickupAddress, donation.ticket.city, donation.ticket.state)}>
                                            Directions
                                        </button>
                                        <button className="btn btn-primary" onClick={() => handleVolunteer(donation.ticket.user, donation.ticket._id)}>
                                            Volunteer
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {currentIndex < filteredPickups.length ? (
                        <button className="btn btn-primary view-more-btn" onClick={() => setCurrentIndex(currentIndex + initialCardsCount)}>
                            View More
                        </button>
                    ) : (
                        <p className="no-more-requests">No more pending requests</p>
                    )}
                </div>

                {/* View Pending Requests */}
                <div className="view-pending">
                    <a href="pending-requests.html" className="btn btn-primary">
                        View Pending Requests
                    </a>
                </div>
            </section>
        </div>
    );
};

export default VolunteerPage;