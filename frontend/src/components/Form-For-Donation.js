import React, { useState } from 'react';
import '../CSS/pickup-page.css'; // Import CSS file

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    itemsToDonate: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        itemsToDonate: [...formData.itemsToDonate, name],
      });
    } else {
      setFormData({
        ...formData,
        itemsToDonate: formData.itemsToDonate.filter(item => item !== name),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission or other actions here
    console.log(formData);
  };

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
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
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
            name="pinCode"
            value={formData.pinCode}
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
                checked={formData.itemsToDonate.includes('clothes')}
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
                checked={formData.itemsToDonate.includes('books')}
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
                checked={formData.itemsToDonate.includes('toys')}
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
                checked={formData.itemsToDonate.includes('shoes')}
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
                checked={formData.itemsToDonate.includes('devices')}
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
