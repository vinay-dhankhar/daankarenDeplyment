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

    fetch("http://localhost:4000/contact/submit", {
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
    <div className="contact-form w-1/2 mx-auto my-3.5 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Contact Us Form</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">Name : </label>
        <input
          className="form-input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">Email : </label>
        <input
          className="form-input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:shadow-outline"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="phone">Phone : </label>
        <input
          className="form-input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          id="phone"
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="company">Company : </label>
        <input
          className="form-input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          id="company"
          type="text"
          name="company"
          placeholder="Enter your company name"
          value={formData.company}
          onChange={handleChange}
        />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="message">Message : </label>
        <textarea
          cols={50}
          rows={4}
          className="form-input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          id="message"
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="form-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
