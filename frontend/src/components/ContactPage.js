import React, { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/contact/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submission successful:", data);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input
          className="form-input-field"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email : </label>
        <input
          className="form-input-field"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone : </label>
        <input
          className="form-input-field"
          id="phone"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        <label htmlFor="company">Company : </label>
        <input
          className="form-input-field"
          id="company"
          type="text"
          name="company"
          placeholder="Enter your company name"
          value={formData.company}
          onChange={handleChange}
        />
        <label htmlFor="message">Message : </label>
        <textarea
          className="form-input-field"
          id="message"
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <div className="flex items-center justify-between">
          <button
            className="form-button"
            type="submit"
            style={{ border: "2px solid black", backgroundColor: "white" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
