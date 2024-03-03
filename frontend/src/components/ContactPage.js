import React, { useState } from "react";

function ContactPage() {
  const [formName, setName] = useState("");
  const [formMail, setMail] = useState("");
  const [formNumber, setNumber] = useState("");
  const [formCompany, setCompany] = useState("");
  const [formMessage, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name: " + formName + " Mail: " + formMail + " Phone: " + formNumber + " Company: " + formCompany + " Message: " + formMessage);
    setName('');
    setMail('');
    setNumber('');
    setCompany('');
    setMessage('');
  }

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input
          className="form-input-field"
          id="name"
          type="text"
          placeholder={formName}
          value={formName}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email : </label>
        <input
          className="form-input-field"
          id="email"
          type="text"
          placeholder={formMail}
          value={formMail}
          onChange={(e) => setMail(e.target.value)}
        />
        <label htmlFor="phone">Phone : </label>
        <input
          className="form-input-field"
          id="phone"
          type="number"
          placeholder={formNumber}
          value={formNumber}
          onChange={(e) => setNumber(e.target.value)}
        />
        <label htmlFor="company">Company : </label>
        <input
          className="form-input-field"
          id="company"
          type="text"
          placeholder={formCompany}
          value={formCompany}
          onChange={(e) => setCompany(e.target.value)}
        />
        <label htmlFor="message">Message : </label>
        <textarea
          className="form-input-field"
          id="message"
          type="text"
          placeholder={formMessage}
          value={formMessage}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="flex items-center justify-between">
          <button
            className="form-button"
            type="submit"
            style={{ "border": "2px solid black", "backgroundColor": "white" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
