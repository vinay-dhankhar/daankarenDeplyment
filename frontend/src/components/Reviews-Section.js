import React, { useRef, useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import imgSrc from './Images/pexels-photo-415829.webp';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const ReviewsSection = () => {

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


    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        console.log("prev");
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 2);
        }
    };

    const handleNext = () => {
        if (currentIndex < cards.length - 2) {
            setCurrentIndex(currentIndex + 2);
        }else{
            if(currentIndex == cards.length - 1){
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        console.log(container);
        const cardWidth = container.offsetWidth / 2; // Divide by number of cards you want to show
        console.log(cardWidth);
        container.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
    }, [currentIndex]);

    return (
        <div className="review-section-container">
            <div className="review-tagline-div">
                <h2 className="review-tagline">What Our Volunteers Say</h2>
            </div>
            <div className="review-section">
                <div className="gradient-container">
                    <button className="review-scroll-btn review-prev" onClick={handlePrev}>
                        <FaAngleLeft />
                    </button>
                    <div className="review-card-groups-container" ref={containerRef}>
                        {cards}
                    </div>
                    <button className="review-scroll-btn review-next" onClick={handleNext}>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewsSection;