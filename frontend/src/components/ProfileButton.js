import React, { useState, useEffect, useRef } from 'react';
import { FaComment, FaCog, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { Link } from 'react-router-dom';

const ProfileButton = ({ imageUrl , username ,  handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handling the visibility of the dropdown menu
  useEffect(() => {
    // Function to handle click event outside the dropdown menu
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="profile-button" onClick={toggleDropdown}>
      {
       !imageUrl && <img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="User-Profile-Image" /> 
      }
      {
        imageUrl && <img src={imageUrl} alt="Profile" />
      }
      </div>
      {isOpen && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <Link to="/profilePage">
            <div className="dropdown-header" onClick={closeDropdown}>
            {
               !imageUrl && <img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="User-Profile-Image" /> 
            }
            {
              imageUrl && <img src={imageUrl} alt="Profile" />
            }
              <span>{username}</span>
            </div>
          </Link>
          <div className="dropdown-items">
            <button onClick={closeDropdown}>
              <span className='profile-dropdown-icons-span'>
                <MdOutlineFeedback />
              </span>
              <span>Give Feedback</span>
            </button>
            <button onClick={closeDropdown}>
              <span className='profile-dropdown-icons-span'>
                <IoHelpCircleOutline />
              </span>
              <span>Help & Support</span>
            </button>
            <button onClick={closeDropdown}>
              <span className='profile-dropdown-icons-span'>
                <IoSettingsOutline />
              </span>
              <span>Settings</span>
            </button>
            <button id='logout-button' onClick={closeDropdown}>
              <Link
                to="/logout"
                className='logout'
                onClick={handleLogout}
              >
                <span className='profile-dropdown-icons-span'>
                  <IoLogOutOutline />
                </span>
                <span>Logout</span>
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileButton;