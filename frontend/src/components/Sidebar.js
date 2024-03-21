import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/nav-styles.css";
import '../CSS/sidebar.css'

const Sidebar = ({ userId, role, setIsLoginClicked, isSidebarOpen }) => {
    const [uid, setUid] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roleName, SetRoleName] = useState("");
    useEffect(
        () => {
            const checkCookies = () => {
                const cookies = document.cookie;

                if (!cookies.includes("Login")) {
                    console.error("Cookies are not  present");
                    setIsLoggedIn(false);
                    SetRoleName("");
                } else {
                    setIsLoggedIn(true);
                    // console.log("login=" + isLoggedIn);
                    // console.log("role=" + role);
                    SetRoleName(role);
                }

                if (userId) {
                    setUid(userId); // Update uid when userId changes
                }
            };

            checkCookies();
        },
        [userId],
        [isLoggedIn],
        [role]
    );
    return (
        <>
            {isSidebarOpen && <div className='sidebar'>
                <ul>
                    {roleName === "admin" && (
                        <li >
                            <Link
                                exact="true"
                                to="/"
                                activeclassname="active"
                            >
                                AdminDashboard
                            </Link>
                        </li>
                    )}
                    <li >
                        <Link
                            to="/ViewCampaigns"
                            activeClassName="active"
                        >
                            Campaigns
                        </Link>
                    </li>
                    {roleName !== "admin" && (
                        <li >
                            <Link
                                to="/NewCampaignForm"
                                activeClassName="active"
                            >
                                Request Campaign
                            </Link>
                        </li>
                    )}
                    {roleName !== "admin" && (
                        <li>
                            <Link
                                to="/PartnerPage"
                                activeclassname="active"
                            >
                                Our Partners
                            </Link>
                        </li>
                    )}
                    {role !== "admin" && (
                        <li >
                            <Link
                                to="/registerOrg"
                                activeclassname="active"
                            >
                                Register Organisation
                            </Link>
                        </li>
                    )}

                    {roleName !== "admin" && (
                        <li >
                            <Link
                                to="/Volunteer"
                                activeclassname="active"
                            >
                                Volunteer
                            </Link>
                        </li>
                    )}

                    {roleName !== "admin" && (
                        <li className="donate-button-container">
                            <Link
                                to="/DonationPage"
                            >
                                Donate
                            </Link>
                        </li>
                    )}
                    {roleName === "admin" && isLoggedIn && (
                        <li >
                            <Link
                                to="/PendingTickets"
                                activeclassname="active"
                            >
                                Pending Tickets
                            </Link>
                        </li>
                    )}

                    {roleName === "admin" && isLoggedIn && (
                        <li >
                            <Link
                                to="/VerifyNgoRegistrations"
                                activeclassname="active"
                            >
                                Organisation requests
                            </Link>
                        </li>
                    )}

                    {roleName === "admin" && isLoggedIn && (
                        <li >
                            <Link
                                to="/PendingDonateItems"
                                activeclassname="active"
                            >
                                Donate Items
                            </Link>
                        </li>
                    )}
                </ul>
            </div >
            }
        </>
    );
};

export default Sidebar;
