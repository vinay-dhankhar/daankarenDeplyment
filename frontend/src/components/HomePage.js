import React from 'react';
import Carousel from './Carousel';
import '../CSS/homepage.css'
function HomePage() {
  return (
    <>
      <Carousel />
      <div className='data'>
        <div className='data-cards-container'>
          <div className='data-cards'></div>
          <div className='data-cards'></div>
          <div className='data-cards'></div>
        </div>
      </div>
    </>
  )
}

export default HomePage