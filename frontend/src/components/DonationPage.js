import React from 'react'
import '../CSS/donation-page.css'
import DonationItem from './Donation-Item-Card';

// Stuffs to donate
import booksImage from './Images/donation-stuff/books-to-donate.jpg';
import shoesImage from './Images/donation-stuff/shoes-to-donate.jpg';
import clothesImage from './Images/donation-stuff/clothes-to-donate.jpg';
import toysImage from './Images/donation-stuff/toys-to-donate.jpg';
import sportsEquipmentImage from './Images/donation-stuff/sports-euipments-to-donate.jpg';


// css written in donation-page.css
function DonationPage() {
  return (
    <>
      <div className='donation-page-carousel-container'>
        <div className='donation-page-carousel'>
          <div id='donation-page-carousel-text-container'>
            <p id='donation-page-carousel-text'>
              <span id="donation-page-carousel-text1">GIVE A HAND</span>
              <span id="donation-page-carousel-text2">TO MAKE THE BETTER WORLD</span>
            </p>
          </div>
        </div>
      </div>
      <div className='types-of-donation-container'>
        <div>
          <div className='help-and-donate-heading'>
            <h1 id='how-can-i-help'>How Can I Help?</h1>
            <h2 id='what-you-can-donate'>You Can Help By Donating These Stuffs</h2>
          </div>
          <div className='donation-items'>
            <DonationItem imageUrl={booksImage}/>
            <DonationItem imageUrl={shoesImage}/>
            <DonationItem imageUrl={clothesImage}/>
            <DonationItem imageUrl={toysImage}/>
            <DonationItem imageUrl={sportsEquipmentImage}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DonationPage