import React, { useEffect, useState } from 'react';
import '../CSS/PendingDonateItems.css';

const PendingDonateItems = ({ role }) => {
  const [pendingTickets, setPendingTickets] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (role !== "admin") {
      return;
    }

    fetch("http://localhost:4000/itemDonations/pending")
      .then(response => {
        if (!response.ok) {
          throw new Error("Problem fetching the Pending Tickets for item donation");
        }
        return response.json();
      })
      .then(data => {
        setPendingTickets(data);
      })
      .catch(error => {
        console.log("Error fetching tickets ", error);
      });
  }, [role, counter]);

  if (role !== "admin") {
    return <h1 className="not-allowed">You are not allowed to access this page</h1>;
  }

  const handleDelete = async (donationID) => {
    try {
      const response = await fetch(`http://localhost:4000/itemsDonationRequest/delete/${donationID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        window.alert("The Request has been deleted successfully");
        setCounter((counter + 1) / 10);
      } else {
        throw new Error("Failed to delete the request");
      }
    } catch (error) {
      console.log("Error deleting campaign ", error);
    }
  };

  const handleApprove = async (donationID) => {
    try {
      const response = await fetch(`http://localhost:4000/itemsDonationRequest/approve/${donationID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        window.alert("The Request has been Approved successfully");
        setCounter((counter + 1) / 10);
      } else {
        throw new Error("Failed to delete the request");
      }
    } catch (error) {
      console.log("Error deleting campaign ", error);
    }
  };

  return (
    <div className="pdi-pending-donate-container">
      <h2 className="pdi-pending-donate-title">Pending Tickets for Item Donation</h2>
      <div className="pdi-pending-donate-list">
        {pendingTickets.map(donation => (
          <div key={donation.ticket._id} className="pdi-pending-donate-card">
            <div className="pdi-pending-donate-details">
              <p><b>Requested By:</b> {donation.user.username}</p>
              <p><b>Items:</b> {donation.ticket.itemsType.join(', ').toUpperCase()}</p>
              <p><b>Date of Pickup:</b> {donation.ticket.scheduledDate.split('T')[0]}</p>
              <p><b>Address:</b> {donation.ticket.pickupAddress}, {donation.ticket.city}, {donation.ticket.pincode}, {donation.ticket.state}</p>
            </div>
            <div className="pdi-pending-donate-actions">
              <button className="pdi-delete-btn" onClick={() => handleDelete(donation.ticket._id)}>Delete</button>
              <button className="pdi-approve-btn" onClick={() => handleApprove(donation.ticket._id)}>Confirm</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingDonateItems;