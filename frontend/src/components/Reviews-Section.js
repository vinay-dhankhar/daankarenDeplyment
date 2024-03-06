import React from "react";
import ReviewCard from "./ReviewCard";
import imgSrc from './Icons/circle_14025055.png'

// CSS written in homepage css
function ReviewsSection() {
    return (
        <>
            <div className="review-section-container">
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
        </>
    )
}

export default ReviewsSection;