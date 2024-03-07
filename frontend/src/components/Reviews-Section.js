import React from "react";
import ReviewCard from "./ReviewCard";
import imgSrc from './Images/pexels-photo-415829.webp'
import imgSrc1 from './Icons/quote.png'

// CSS written in homepage css
function ReviewsSection() {
    return (
        <>
            <div className="review-section-container">
                <div className="review-tagline-div">
                    <div className="review-tagline-innerdiv"><span className="review-tagline">Explore the testimonials from our generous community of donors and volunteers</span>
                    {/* <img src={imgSrc1} /> */}
                    </div>
                </div>
                <div className="review-section">
                    <div className="review-cards-container">
                        <ReviewCard
                            review="This is a fantastic product! I highly recommend it."
                            username="John Doe"
                            profileImage={imgSrc}
                        />
                        <ReviewCard
                            review="This is a fantastic product! I highly recommend it."
                            username="John Doe"
                            profileImage={imgSrc}
                        />
                        <ReviewCard
                            review="This is a fantastic product! I highly recommend it."
                            username="JohnDoe"
                            profileImage={imgSrc}
                        />
                        <ReviewCard
                            review="This is a fantastic product! I highly recommend it."
                            username="JohnDoe"
                            profileImage={imgSrc}
                        />
                        <ReviewCard
                            review="This is a fantastic product! I highly recommend it."
                            username="JohnDoe"
                            profileImage={imgSrc}
                        />
                        <ReviewCard
                            review="This is a fantastic product! I highly recommend it."
                            username="JohnDoe"
                            profileImage={imgSrc}
                        />
                    </div>
                </div>
            </div>
            <br></br><br></br><br></br><br></br><br></br>
        </>
    )
}

export default ReviewsSection;