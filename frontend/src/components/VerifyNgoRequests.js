import React, { useEffect, useState } from 'react';
import '../CSS/VerifyNgoRequests.css';

const VerifyNgoRegistrations = ({ role }) => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [counter, setCounter] = useState(0);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    if (role !== "admin") {
      return;
    }

    const fetchPendingRegistrations = async () => {
      try {
        setLoadingPercentage(30);

        const response = await fetch("https://daankaren-deplyment-server.vercel.app/registerOrg/pending");
        if (!response.ok) {
          throw new Error("Problem fetching the Pending NGO Registrations");
        }
        const data = await response.json();
        setPendingRegistrations(data);

        setLoadingPercentage(70);
      } catch (error) {
        console.log("Error fetching registrations ", error);
      } finally {
        setLoadingPercentage(100);
      }
    };

    fetchPendingRegistrations();
  }, [role, counter]);

  if (role !== "admin") {
    return <h1 className="not-allowed">You are not allowed to access this page</h1>;
  }

  const handleDelete = async (registrationID) => {
    try {
      const response = await fetch(`https://daankaren-deplyment-server.vercel.app/registerOrg/delete/${registrationID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        window.alert("The registration has been deleted successfully");
        setCounter((counter + 1) / 10);
      } else {
        throw new Error("Failed to delete the registration");
      }
    } catch (error) {
      console.log("Error deleting registration ", error);
    }
  };

  const handleApprove = async (registrationID) => {
    try {
      const response = await fetch(`https://daankaren-deplyment-server.vercel.app/registerOrg/approve/${registrationID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        window.alert("The registration has been approved successfully");
        setCounter((counter + 1) / 10);
      } else {
        throw new Error("Failed to approve the registration");
      }
    } catch (error) {
      console.log("Error approving registration ", error);
    }
  };

  if (loadingPercentage < 100) {
    return <div className="loading-container">Loading... {loadingPercentage}%</div>;
  }

  return (
    <div className="vnr-verify-ngo-container">
      <h2 className="vnr-verify-ngo-title">Pending NGO Registrations</h2>
      <div className="vnr-registration-list">
        {pendingRegistrations.map(registration => (
          <div key={registration._id} className="vnr-registration-card">
            <div className="vnr-registration-details">
              <p><b>Organization Name:</b> {registration.orgName}</p>
              <p><b>Email:</b> {registration.email}</p>
              <p><b>Contact Number:</b> {registration.contactNumber}</p>
              <p><b>Motive:</b> {registration.motive}</p>
              <p><b>Point of Contact:</b> {registration.poc}</p>
              <p><b>POC Designation:</b> {registration.pocDesignation}</p>
              <p><b>Address:</b> {registration.address}, {registration.city}, {registration.pincode}, {registration.state}</p>
            </div>
            <div className="vnr-registration-actions">
              <button className="vnr-delete-btn" onClick={() => handleDelete(registration._id)}>Delete</button>
              <button className="vnr-approve-btn" onClick={() => handleApprove(registration._id)}>Approve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyNgoRegistrations;