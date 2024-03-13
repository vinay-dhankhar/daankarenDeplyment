import React, { useState, useEffect } from 'react';
import '../CSS/locationForm.css'; // Import CSS file

function LocationForm({ formData }) {
  const [city, setCity] = useState('');
  const [buildingNo, setBuildingNo] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [addressConfirmed, setAddressConfirmed] = useState(false);

  const handleUpdateLocation = async (e) => {
    e.preventDefault();

    formData.set('buildingNo', buildingNo);
    formData.set('pincode', pincode);
    formData.set('city', city);
    formData.set('state', state);

    const address = `${city}, ${state}, India, ${pincode}`;
    const formattedAddress = address.replace(/\s+/g, '+');
    setLatitude(1);
    setLongitude(1);


    try {
      // Change the map URL using the current latitude and longitude
      const mapIframe = document.getElementById('map-iframe');
      if (mapIframe) {
        mapIframe.src = `https://maps.google.com/maps?q=${formattedAddress}&z=15&output=embed`;
      }
    } catch (error) {
      console.error('Error fetching latitude and longitude:', error);
    }

    setAddressConfirmed(true);
  };

  const fetchLocation = (address, formData) => {
    const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en&address=${encodeURIComponent(
      address
    )}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const { latitude, longitude, postal, city, principalSubdivision } = data;
        setLatitude(latitude);
        setLongitude(longitude);

        // Extract city, state, and postal code from response data
        const extractedCity = city ? city : '';
        const extractedState = principalSubdivision ? principalSubdivision : '';
        const extractedPostal = postal ? postal : '';

        // Update state variables for city, state, and postal code
        setCity(extractedCity);
        setState(extractedState);
        setPincode(extractedPostal);

        // Update value of city, state, and postal code in the form
        const cityElement = document.getElementsByName('city')[0];
        cityElement.value = extractedCity;

        const stateElement = document.getElementsByName('state')[0];
        stateElement.value = extractedState;

        const pincodeElement = document.getElementsByName('pincode')[0];
        pincodeElement.value = extractedPostal;
      })
      .catch((error) => console.log(error));
  };

  const sendFormData = async (formData, event) => {
    if (addressConfirmed) {
      try {
        const response = await fetch('http://localhost:4000/RequestCampaign', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const responseData = await response.json();
          console.log(responseData.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please confirm your address before submitting.');
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const address = `${latitude}, ${longitude}`;
        fetchLocation(address, new FormData());
        setAddressConfirmed(false); // Reset address confirmation
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="location-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendFormData(formData, event);
        }}
      >
        <label className="form-label">
          Building No:
          <input
            type="text"
            name="buildingNo"
            className="input-field"
            value={buildingNo}
            onChange={(e) => setBuildingNo(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Pincode:
          <input
            type="text"
            name="pincode"
            className="input-field"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          City:
          <input
            type="text"
            name="city"
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          State:
          <input
            type="text"
            name="state"
            className="input-field"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit-button" onClick={handleUpdateLocation}>
          Confirm Address
        </button>
        <button type="button" onClick={(e) => handleGetLocation(e)} className="get-location-button">
          Get My Location
        </button>

        {/* Submit button that refers to sendFormData */}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {(latitude !== null && longitude !== null )&& (
        <div>
          <iframe
            id="map-iframe"
            title="map"
            width="360"
            height="270"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default LocationForm;
