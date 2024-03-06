import React from 'react';

const ReviewCard = ({ review, username, profileImage }) => {
  return (
    <div className="review-card">
      <div className="card-review">{review}</div>
      <div className="card-footer">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <span className="username">{username}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
