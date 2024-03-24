import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaTruck } from 'react-icons/fa';
import '../CSS/VolunteerPage.css';

const VolunteerPage = () => {
    const navigate = useNavigate();
    const [pickups, setPickups] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const numVolunteers = 500; // Replace with the actual number of volunteers
    const numDeliveries = 2000; // Replace with the actual number of deliveries

    const getDataFromSessionStorage = () => {
        const lat = sessionStorage.getItem('latitude');
        const lon = sessionStorage.getItem('longitude');
        return { lat, lon };
    };

    const fetchData = () => {
        fetch("http://localhost:4000/itemDonations/approved")
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
    console.log("LatD:", lat, "  LonD:", lon);
    const sourceAddress = `${lat} , ${lon}`;
    console.log("Source : ", sourceAddress);

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

    console.log( "Pickups : " ,  pickups.length);

    return (
        <div className='volunteer-page'>
            <div className="hero-image">
                <div className="hero-text">
                    <h1>Become a Volunteer</h1>
                    <p>Your time and effort can make a difference.</p>
                </div>
            </div>

            <section>
                <h2>More than Just Donations</h2>
                <p>As a volunteer, you can not only donate but also help by delivering the essentials to those in need. Your contribution goes beyond monetary value; it's about spreading happiness and making a tangible impact.</p>
            </section>

            <section className="volunteer-impact">
                <h2>Our Volunteer Impact</h2>
                <div className="impact-cards">
                    <div className="impact-card">
                        <div className="card-icon">
                            <FaUsers />
                        </div>
                        <div className="card-content">
                            <h3>{numVolunteers}</h3>
                            <p>Volunteers Involved</p>
                        </div>
                    </div>
                    <div className="impact-card">
                        <div className="card-icon">
                            <FaTruck />
                        </div>
                        <div className="card-content">
                            <h3>{numDeliveries}</h3>
                            <p>Deliveries Made</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2>Get Involved</h2>
                <p>You can make a difference by volunteering to fulfill donation requests in your city. Click the button below to view pending requests and sign up to deliver the essentials to those in need or to our Share&Sahyog warehouses.</p>
                <a href="pending-requests.html" className="btn">View Pending Requests</a>
            </section>

            <div className="volunteer-section">
                <h2>Volunteer Here to Help Us Deliver These Items to the needy :</h2>
                <div className="donation-list">
                    {pickups.map(donation => (
                        <div key={donation.ticket._id} className="donation-item">
                            <div className="donation-details">
                                <p>Requested By: {donation.user.username}</p>
                                <p>Items : {donation.ticket.itemsType.join(' , ').toUpperCase()}</p>
                                <p>Date of Pickup : {donation.ticket.scheduledDate.split('T')[0]}</p>
                                <p>Address : {donation.ticket.pickupAddress + " , " + donation.ticket.city + " , " + donation.ticket.pincode + " , " + donation.ticket.state}</p>
                                <p>Contact Details: {donation.ticket.contact}</p>
                            </div>
                            <div className="donation-buttons">
                                <button onClick={() => handleDirectionsClick(donation.ticket.pickupAddress + " , " + donation.ticket.city + " , " + donation.ticket.state)}>
                                    Directions
                                </button>
                                <button className="volunteer-btn" onClick={() => handleVolunteer(donation.ticket.user, donation.ticket._id)}>
                                    Volunteer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VolunteerPage;