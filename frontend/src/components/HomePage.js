import React from 'react';
import Carousel from './Carousel';
import '../CSS/homepage.css'
import ReviewsSection from './Reviews-Section';
import DataSection from './HomepageDataSection';
import HomepageCampaign from './homepage_campaign';
import WhatCanYouDo from './whatcanyoudo';
import RatingSection from './TrustPilot';
function HomePage() {
  return (
    <>
      <Carousel />
      <DataSection />
      <HomepageCampaign />
      <WhatCanYouDo />
      <ReviewsSection />
      <RatingSection />
    </>
  )
}

export default HomePage