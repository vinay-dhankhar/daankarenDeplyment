import React, { useEffect } from 'react';
import '../CSS/donation-page.css';
import DonationItem from './Donation-Item-Card';
import { Link } from 'react-router-dom';

// Stuffs to donate
import booksImage from './Images/donation-stuff/books-to-donate.jpg';
import shoesImage from './Images/donation-stuff/shoes-to-donate.jpg';
import clothesImage from './Images/donation-stuff/clothes-to-donate.jpg';
import toysImage from './Images/donation-stuff/toys-to-donate.jpg';
import sportsEquipmentImage from './Images/donation-stuff/sports-euipments-to-donate.jpg';
import laptopImage from './Images/donation-stuff/laptop-to-donate.jpg';

// css written in donation-page.css
function DonationPage() {
  useEffect(() => {
    const textContainer = document.getElementById('donation-page-carousel-text-container');
    setTimeout(() => {
      textContainer.classList.add('fade-in');
    }, 500); // Delay of 500ms before adding the fade-in class
  }, []);

  return (
    <>
      <div className='donation-page-carousel-container'>
        <div className='donation-page-carousel'>
          <div id='donation-page-carousel-text-container'>
            <p id='donation-page-carousel-text'>
              <span id="donation-page-carousel-text1">Lend a Hand</span>
              <span id="donation-page-carousel-text2">“To Make the World a Better Place”</span>
            </p>
            <div id="schedule-now-button-container">
              <Link to="/PickupPage">
                <button id="schedule-now-button">Contribute Today</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='types-of-donation-container'>
        <div>
          <div className='help-and-donate-heading'>
            <h1 id='how-can-i-help'>How Can I Help?</h1>
            <h2 id='what-you-can-donate'>You Can Help By Donating...</h2>
          </div>
          <div className='donation-items'>
            <DonationItem imageUrl={clothesImage} heading="Clothes" text="Your unused clothes can bring warmth and dignity to those in need. Donate today and make a tangible difference in someone's life. Together, let's clothe the world with compassion." />
            <DonationItem imageUrl={booksImage} heading="Books" text="Give the gift of endless possibilities through book donation. Spark curiosity, inspire minds, and enrich communities with the magic of reading. Donate your books and change lives today." />
            <DonationItem imageUrl={shoesImage} heading="Shoes" text="Walk a mile in someone else's shoes by donating yours. Your gently used footwear can offer comfort and hope to those in need. Take a step towards kindness today." />
            <DonationItem imageUrl={toysImage} heading="Toys" text="Spread joy and laughter by donating your toys. Your generosity brings smiles to children facing hardship. Every toy donated is a gift of happiness and a reminder of the kindness in the world." />
            <DonationItem imageUrl={laptopImage} heading="Devices" text="Empower young minds with the gift of technology. Your donation of computers or laptops opens doors to endless opportunities for children in need, enabling them to learn, explore, and succeed." />
            <DonationItem imageUrl={sportsEquipmentImage} heading="Sports Equipments" text="Empower dreams and fuel passions through sports equipment donation. Your gear can inspire the next generation of athletes, fostering health, confidence, and teamwork. Make a sporting difference today." />
          </div>
          <div className='click-to-donate'>
            <Link to="/PickupPage"><button>Schedule Now</button></Link>
          </div>
        </div>
      </div>
      {/* Taking the pin code address */}
      <div className='pincode-input-container'></div>
    </>
  )
}

export default DonationPage;
