import React, { useEffect, useState } from 'react'

const PendingDonateItems = ({ role }) => {

    const [pendingTickets, setPendingTickets] = useState([]);
    const [counter , setCounter] = useState(0);
    const [isLoggedIn , setLoggedIn] = useState(false);

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
            })
    }, [role , counter]);

    if (role !== "admin") {
        return (<h1>You are not allowed to access this page</h1>);
    }

    const handleDelete = async(donationID) => {
        try{
            const response = await fetch(`http://localhost:4000/itemsDonationRequest/delete/${donationID}` ,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(response.ok){
                window.alert("The Request has been deleted successfully");
                setCounter((counter+1)/10)
            }
            else{
                throw new Error("Failed to delete the request")
            }
        }
        catch(error){
            console.log("Error deleting campaign " , error);
        }
    }

    const handleApprove = async(donationID) => {
        try{
            console.log(donationID);
            const response = await fetch(`http://localhost:4000/itemsDonationRequest/approve/${donationID}` ,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(response.ok){
                window.alert("The Request has been Approved successfully");
                setCounter((counter+1)/10)
            }
            else{
                throw new Error("Failed to delete the request")
            }
        }
        catch(error){
            console.log("Error deleting campaign " , error);
        }
    }

    return (
        <div className='mt-[100px]'>
            <h2 >Pending Tickets for Item Donation </h2>
            <ul>
                {pendingTickets.map(donation => (
                    <div key={donation.ticket._id}>
                        <div>
                            <p>Requested By: {donation.user.username}</p>
                            <p>Items : {donation.ticket.itemsType.join(' , ').toUpperCase()}</p>
                            <p>Date of Pickup : {donation.ticket.scheduledDate.split('T')[0]}</p>
                            <p>Address : {donation.ticket.pickupAddress + " , " + donation.ticket.city + " , " + donation.ticket.pincode + " , " + donation.ticket.state}</p>
                        </div>
                        <div>
                            <button onClick={ () => handleDelete(donation.ticket._id)}>
                                Delete
                            </button>
                            <button onClick={ () => handleApprove(donation.ticket._id)}>
                                Confirm
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default PendingDonateItems