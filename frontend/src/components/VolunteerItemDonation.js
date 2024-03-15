import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VolunteerItemDonation = () => {

    const navigate = useNavigate();
    const [pickups , setPickups] = useState([]);

    useEffect(()=>{

        const isLoggedIn = document.cookie.includes("Login");

        if(!isLoggedIn){
            toast.error("Please Login to access this Page");
            navigate('/LoginPage');
            return;
        }

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

    const [sourceAddress , setSourceAddress] = useState('');

    

    const handleDirectionsClick = (destination) => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(sourceAddress)}&destination=${encodeURIComponent(destination)}`;
        window.open(url, '_blank');
      };


  return (
    <div className='mt-[100px] w-10/12 mx-auto'>
        <h2 className='text-center font-bold'> Volunteer Here to Help Us Deliver These Items to the needy :</h2>
            <div className='flex flex-row flex-wrap w-full gap-4 justify-center items-center '>
                {pickups.map(donation => (
                    <div key={donation.ticket._id} className='w-1/4 bg-slate-300 p-3 rounded-md'>
                        <div>
                            <p>Requested By: {donation.user.username}</p>
                            <p>Items : {donation.ticket.itemsType.join(' , ').toUpperCase()}</p>
                            <p>Date of Pickup : {donation.ticket.scheduledDate.split('T')[0]}</p>
                            <p>Address : {donation.ticket.pickupAddress + " , " + donation.ticket.city + " , " + donation.ticket.pincode + " , " + donation.ticket.state}</p>

                        </div>
                        <div>
                            <button className='bg-blue-400 p-2 rounded-lg' onClick={ () => handleDirectionsClick(donation.ticket.pickupAddress + " , " + donation.ticket.city + " , " + donation.ticket.state)}>
                                Directions
                            </button>
                            <button className='bg-green-400 p-2 rounded-lg'>
                                Volunteer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default VolunteerItemDonation;