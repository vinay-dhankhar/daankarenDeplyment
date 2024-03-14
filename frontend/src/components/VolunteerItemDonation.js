import React, { useEffect, useState } from 'react'

const VolunteerItemDonation = () => {

    const [pickups , setPickups] = useState([]);
    // const [isLoggedIn , setLoggedIn] = useState(false);

    // useEffect(()=>{
    //     const checkAuth = () => {
    //         const loggedIn = document.cookie.includes("Login");
    //         if(loggedIn){
    //           setLoggedIn(true);
    //         }
    //         else{
    //           setLoggedIn(false);

    //         }
    //       }
    //     checkAuth();
    // } , []);

    useEffect(()=>{
        fetch("http://localhost:4000/itemDonations/approved")
        .then( response => {
            if(!response.ok){
                throw new Error("Fetch failed");
            }
            return response.json();
        })
        .then( data => {
            setPickups(data);
        } )
        .catch(error => {
            console.log( "Fetch cause error : " , error);
        })
    } , []);


  return (
    <div className='mt-[100px]'>
        <h2> Volunteer Here to Help Us Deliver These Items to the needy :</h2>
        <ul>
                {pickups.map(donation => (
                    <div key={donation.ticket._id}>
                        <div>
                            <p>Requested By: {donation.user.username}</p>
                            <p>Items : {donation.ticket.itemsType.join(' , ').toUpperCase()}</p>
                            <p>Date of Pickup : {donation.ticket.scheduledDate.split('T')[0]}</p>
                            <p>Address : {donation.ticket.pickupAddress + " , " + donation.ticket.city + " , " + donation.ticket.pincode + " , " + donation.ticket.state}</p>
                        </div>
                        <div>
                            <button>
                                Directions
                            </button>
                            <button >
                                Volunteer
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
    </div>
  )
}

export default VolunteerItemDonation;