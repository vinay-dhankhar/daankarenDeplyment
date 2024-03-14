import React from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css'

const ProfilePage = () => {
    // Access the username parameter using useParams hook
    const { username } = useParams();

    return (
        <div className='profile-page'>
            <h1>Profile Page</h1>
            <p>Username: {username}</p>
            {/* Other profile page content */}
        </div>
    );
}

export default ProfilePage;
