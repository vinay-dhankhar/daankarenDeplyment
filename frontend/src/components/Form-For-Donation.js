import React, { useEffect, useState } from 'react';
import '../CSS/pickup-page.css';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [itemsToDonate , setItemsToDonate] = useState([]);

  const [isLoggedIn , setLoggedIn] = useState(false);
  const [loading , setLoading] = useState(false);

  useEffect(()=>{
    const checkAuth = () => {
      const loggedIn = document.cookie.includes("Login");
      if(loggedIn){
        setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
      }
    }

    checkAuth();
  } , []);

  function handleChange(event){
    const {name , value} = event.target;
    setFormData((prev)=> ({...prev , [name]:value}));
  } 

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    console.log(e.target);
    if(itemsToDonate.includes(name)){
      setItemsToDonate( itemsToDonate.filter( val => val !== name ) );
    }
    else{
      setItemsToDonate( [...itemsToDonate , name]);
    }
  };

  async function handleSubmit(event){

    console.log(formData);

    event.preventDefault();

    if(!isLoggedIn){
      alert("You are not Logged In. Please Login First");
      window.location.href="/LoginPage";
      return;
    }

    try{
      setLoading(true);
      // console.log("Cookies in ft " , document.cookies);
      const response = await fetch('http://localhost:4000/itemsDonationRequest', {
        method: 'POST',
        headers: {
          cookies: document.cookie,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData:formData,
          itemsToDonate:itemsToDonate,
        }),
      });

      console.log("Response : " , response);

      if(response.success){
        console.log(response);
      }
      else{
        throw new Error('Some error occurred while submitting your request');
      }

    }
    catch(error){
      console.log("Error in form for donation : ",error);
    }
  }

  return (
    <div className="form-container">
      <h2>Donation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          City/Town:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Pin Code:
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </label>
        <br />
        <div>
          Items to Donate:
          <div>
            <label>
              <input
                type="checkbox"
                name="clothes"
                checked={itemsToDonate.includes('clothes')}
                onChange={handleCheckboxChange}
              />
              Clothes
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="books"
                checked={itemsToDonate.includes('books')}
                onChange={handleCheckboxChange}
              />
              Books
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="toys"
                checked={itemsToDonate.includes('toys')}
                onChange={handleCheckboxChange}
              />
              Toys & Sports Equipment
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="shoes"
                checked={itemsToDonate.includes('shoes')}
                onChange={handleCheckboxChange}
              />
              Shoes
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="devices"
                checked={itemsToDonate.includes('devices')}
                onChange={handleCheckboxChange}
              />
              Devices
            </label>
          </div>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DonationForm;
