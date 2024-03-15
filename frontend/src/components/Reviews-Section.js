import React, { useState, useRef } from "react";
import ReviewCard from "./ReviewCard";
import imgSrc from './Images/pexels-photo-415829.webp'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// CSS written in homepage css
function ReviewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardContainerRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(cards.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
        scrollToCard(currentIndex);
    };

    const handleNext = () => {
        if (currentIndex === cards.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
        scrollToCard(currentIndex);
    };

    const scrollToCard = (index) => {
        if (cardContainerRef.current) {
          const cardGroupWidth = cardContainerRef.current.offsetWidth;
          cardContainerRef.current.scrollLeft = index * cardGroupWidth;
          setIsAnimating(true);
          setTimeout(() => {
            setIsAnimating(false);
          }, 500); // Adjust the duration as needed
        }
    };

    const cards = [
        <div key="card-group" className="card-group">
          <ReviewCard
            key={1}
            review="This is a fantastic product! I highly recommend it."
            username="John Doe"
            profileImage={imgSrc}
          />
          <ReviewCard
            key={2}
            review="This is a fantastic product! I highly recommend it."
            username="John Doe"
            profileImage={imgSrc}
          />
          <ReviewCard
            key={3}
            review="This is a fantastic product! I highly recommend it."
            username="John Doe"
            profileImage={imgSrc}
          />
        </div>,
        <div key="card-group" className="card-group">
          <ReviewCard
            key={4}
            review="This is a fantastic product! I highly recommend it."
            username="Jane Doe"
            profileImage={imgSrc}
          />
          <ReviewCard
            key={5}
            review="This is a fantastic product! I highly recommend it."
            username="Jane Doe"
            profileImage={imgSrc}
          />
          <ReviewCard
            key={6}
            review="This is a fantastic product! I highly recommend it."
            username="Jane Doe"
            profileImage={imgSrc}
          />
        </div>
        // Add more card groups here if needed
    ];

    return (
        <>
            <div className="review-section-container">
                <div className="review-tagline-div">
                    <h2 className="review-tagline">What Our Supporters Say</h2>
                </div>
                <div className="review-section">
                    <button className="scroll-btn prev" onClick={handlePrev}>
                        <FaChevronLeft />
                    </button>
                    <div
                    className={`card-groups-container ${isAnimating ? 'animate' : ''}`}
                    ref={cardContainerRef}
                    >
                        {cards[currentIndex]}
                    </div>
                    <button className="scroll-btn next" onClick={handleNext}>
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ReviewsSection;