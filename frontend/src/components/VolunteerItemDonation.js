import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VolunteerItemDonation = () => {

    const navigate = useNavigate();
    const [pickups , setPickups] = useState([]);
    const [latitude , setLatitude] = useState(null);
    const [longitude , setLongitude] = useState(null);

    const getDataFromSessionStorage = () => {
        const lat = sessionStorage.getItem('latitude');
        const lon = sessionStorage.getItem('longitude');
        return { lat, lon };
    };
    // console.log("Lat:" , lat , "  Lon:" , lon);

    const fetchData = () =>{
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
    }

    useEffect(()=>{

        const isLoggedIn = document.cookie.includes("Login");

        if(!isLoggedIn){
            toast.error("Please Login to access this Page");
            navigate('/LoginPage');
            return;
        }

        const {lat , lon } = getDataFromSessionStorage();
        if( !lat || !lon ){
            if('geolocation' in navigator){
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
    
                        sessionStorage.setItem('latitude' , lat);
                        sessionStorage.setItem('longitude' , lon);
    
                        setLatitude(lat);
                        setLongitude(lon);
                    },
                    error => {
                        console.log("Error fetching lat lon : " , error);
                    }
                );
            }
            else{
                console.log("Geolocation not supported");
            }
        }

        fetchData();
    } , []);

    const {lat , lon } = getDataFromSessionStorage();
    console.log("LatD:" , lat , "  LonD:" , lon);
    const sourceAddress = `${lat} , ${lon}`;
    console.log("Source : " , sourceAddress);

    const handleDirectionsClick = (destination) => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(sourceAddress)}&destination=${encodeURIComponent(destination)}`;
        window.open(url, '_blank');
      };

    const handleVolunteer = async (donor , items) => {
        try{
            const response = await fetch("http://localhost:4000/volunteerSelf" , {
                method:'POST',
                headers:{
                    cookies: document.cookie,
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({donor:donor , items:items}),
            });
            if(response.ok){
                console.log("Volunteered successfully");
                fetchData();
            }
            else{
                console.log("Volunteer failed");
            }
        }
        catch(error){
            console.log(error);
            console.log("Error handling volunteer");
        }
    }


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
                            <p>Contact Details: {donation.ticket.contact}</p>
                        </div>
                        <div>
                            <button className='bg-blue-400 p-2 rounded-lg' onClick={ () => handleDirectionsClick(donation.ticket.pickupAddress + " , " + donation.ticket.city + " , " + donation.ticket.state)}>
                                Directions
                            </button>
                            <button className='bg-green-400 p-2 rounded-lg' onClick={()=>handleVolunteer(donation.ticket.user , donation.ticket._id)}>
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