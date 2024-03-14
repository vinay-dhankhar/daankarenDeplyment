// ProfileButton.js
import React from 'react';
import './Profile.css';

const ProfileButton = ({ imageUrl }) => {
  return (
    <div className="profile-button">
      <img src={imageUrl} alt="Profile Picture" />
    </div>
  );
}

export default ProfileButton;
