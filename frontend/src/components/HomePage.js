import React from 'react';
import Carousel from './Carousel';
import '../CSS/homepage.css'
import ReviewsSection from './Reviews-Section';
import DataSection from './HomepageDataSection';
function HomePage() {
  return (
    <>
      <Carousel />
      <DataSection />
      <ReviewsSection />
    </>
  )
}

export default HomePage