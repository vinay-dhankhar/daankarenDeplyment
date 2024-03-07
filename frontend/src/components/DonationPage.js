import React from 'react'
import '../CSS/donation-page.css'

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
          <h1 id='how-can-i-help'>How Can I Help?</h1>
          <h2 id='what-you-can-donate'>You Can Help By Donating These Stuffs</h2>
        </div>
      </div>
    </>
  )
}

export default DonationPage