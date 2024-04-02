import React, { useEffect, useState } from 'react';
import '../CSS/schedule-pickup-page.css';
import { FaTshirt, FaBook, FaBasketballBall, FaMobileAlt } from 'react-icons/fa';
import { MdToys } from "react-icons/md";
import { GiRunningShoe } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

const DonationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    pickupScheduleDate: '',
  });

  const [itemsToDonate, setItemsToDonate] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const itemsToDonateCategoriesArray = [
    { name: 'clothes', label: 'Clothes', icon: FaTshirt },
    { name: 'books', label: 'Books', icon: FaBook },
    { name: 'toys', label: 'Toys', icon: MdToys },
    { name: 'sportsEquipment', label: 'Sports Equipment', icon: FaBasketballBall },
    { name: 'shoes', label: 'Shoes', icon: GiRunningShoe },
    { name: 'devices', label: 'Devices', icon: FaMobileAlt },
  ];

  // format contact number
  const handleKeyPress = (e) => {
  // Check if the input is a number or a backspace
  const isNumber = /^[0-9]$/.test(e.key);
  const isBackspace = e.keyCode === 8; // Use keyCode 8 for backspace

  // Allow only numbers and backspace
  if (!isNumber && !isBackspace) {
    e.preventDefault();
  } else {
    const { value } = e.target;
    const unformattedValue = value.replace(/\D/g, ''); // Remove non-digit characters

    // Check if the unformatted value has more than 10 digits
    if (unformattedValue.length >= 10 && !isBackspace) {
      e.preventDefault();
      return;
    }

    const formattedValue = unformattedValue
      .replace(/(\d{5})(\d*)/, '$1 $2') // Add space after every 5 digits
      .trim(); // Remove leading/trailing spaces

    // Update the input value with formatted value (with spaces)
    e.target.value = formattedValue;

    // Update the formData state with unformatted value (without spaces)
    setFormData({ ...formData, contactNumber: unformattedValue });
  }
};

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = document.cookie.includes("Login");
      if (loggedIn) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
    }

    checkAuth();
    setLoadingPercentage(100);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryClick = (categoryName) => {
    if (itemsToDonate.includes(categoryName)) {
      setItemsToDonate(itemsToDonate.filter((item) => item !== categoryName));
    } else {
      setItemsToDonate([...itemsToDonate, categoryName]);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isLoggedIn) {
      alert("You are not Logged In. Please Login First");
      window.location.href = "/LoginPage";
      return;
    }

    try {
      // setLoading(true);
      // console.log("Cookies in ft " , document.cookies);
      // console.log(formData.pickupScheduleDate);
      const response = await fetch('http://localhost:4000/itemsDonationRequest', {
        method: 'POST',
        headers: {
          cookies: document.cookie,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData: formData,
          itemsToDonate: itemsToDonate,
        }),
      });

      console.log("Response : ", response);

      navigate('/thankyouPage');
      if (response.success) {
        console.log(response);
      }
      else {
        throw new Error('Some error occurred while submitting your request');
      }

    }
    catch (error) {
      console.log("Error in form for donation : ", error);
    }
  }

  if (loadingPercentage < 100) {
    return <div>Loading... {loadingPercentage}%</div>;
  }

  return (
      <div className="schedule-pickup-form-container">
        <h1>Schedule Pickup</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Contact Number"
              required
            />
          </div>
          <div className="input-row">
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pin Code"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City/Town"
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>
          <div className="input-row">
            <div className='date-input-container'>
              <span>Schedule Date:</span>
              <input
                type="date"
                name="pickupScheduleDate"
                value={formData.pickupScheduleDate}
                onChange={handleChange}
                id="pickupScheduleDate"
                required
              />
            </div>
          </div>
          <div className="items-to-donate">
            <h3>Pick Categories:</h3>
            <div className="items-to-donate-container">
              {itemsToDonateCategoriesArray.map((category) => (
                <div
                  key={category.name}
                  className={`item-button ${itemsToDonate.includes(category.name) ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span className="item-icon">{React.createElement(category.icon)}</span>
                  {category.label}
                </div>
              ))}
            </div>
          </div>
          <div className='sc-pickup-submit-container'>
            <button type="submit">Schedule</button>
          </div>
        </form>
      </div>
  );
};

export default DonationForm;
