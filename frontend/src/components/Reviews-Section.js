import React, { useState, useRef } from "react";
import ReviewCard from "./ReviewCard";
import imgSrc from './Images/pexels-photo-415829.webp'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
        scrollToCard(currentIndex, 'prev');
    };

    const handleNext = () => {
        if (currentIndex === cards.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
        scrollToCard(currentIndex, 'next');
    };

    const scrollToCard = (index, direction) => {
        if (cardContainerRef.current) {
            const cardGroupWidth = cardContainerRef.current.offsetWidth;
            cardContainerRef.current.scrollLeft = index * cardGroupWidth;

            const animatedCardIndex = direction === 'next' ? 0 : 2;
            const animatedCard = cardContainerRef.current.children[animatedCardIndex];

            // Remove the animation class from all cards
            Array.from(cardContainerRef.current.children).forEach((card) => {
                card.classList.remove('card-animate');
            });

            // Add the animation class to the next/prev card
            if (animatedCard) {
                animatedCard.classList.add('card-animate');
            }

            setIsAnimating(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 500); // Adjust the duration as needed
        }
    };

    const cards = [
        <ReviewCard
            key={1}
            review="Volunteering through this website has been an incredibly rewarding experience. The platform made it easy to find opportunities that aligned with my interests and schedule. I've met amazing people and made a positive impact in my community. Highly recommend!"
            username="Sarah M."
            profileImage={imgSrc}
        />,
        <ReviewCard
            key={2}
            review="Donating through this website is hassle-free and transparent. I love being able to support causes I care about with just a few clicks. The regular updates and feedback on how my donations are making a difference really make me feel connected to the projects."
            username="John D."
            profileImage={imgSrc}
        />,
        <ReviewCard
            key={3}
            review="I've been volunteering for years, but this website takes it to a whole new level. The interface is user-friendly, and the variety of opportunities available is impressive. Whether you're a seasoned volunteer or just starting out, this platform makes it easy to get involved and make a difference."
            username="Emily R."
            profileImage={imgSrc}
        />,
        <ReviewCard
            key={4}
            review="As a busy professional, finding time to volunteer can be challenging. This website solves that problem by offering flexible opportunities that fit into my schedule. I appreciate how it caters to individuals with diverse backgrounds and commitments, making it easy for anyone to contribute in their own way."
            username="Mark S."
            profileImage={imgSrc}
        />,
        <ReviewCard
            key={5}
            review="I've been donating through this website for months now, and I'm continually impressed by the impact my contributions are making. The projects are well-vetted, and the reporting on outcomes is thorough and transparent. It's reassuring to know that my donations are being used effectively to create positive change."
            username="Lisa H."
            profileImage={imgSrc}
        />,
        <ReviewCard
            key={6}
            review="Finding volunteer opportunities has never been easier thanks to this website. The search filters allow me to pinpoint exactly what I'm looking for, whether it's a one-time event or a long-term commitment. Plus, the community aspect of the platform has connected me with like-minded individuals who share my passion for giving back."
            username="Michael T."
            profileImage={imgSrc}
        />
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
                    <div className="gradient-container">
                        <div className="card-groups-container" ref={cardContainerRef}>
                            {[cards[currentIndex], cards[(currentIndex + 1) % cards.length], cards[(currentIndex + 2) % cards.length]]}
                        </div>
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