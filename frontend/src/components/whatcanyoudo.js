// whatcanyoudo.js

import React from 'react';
import { FaTshirt, FaBook, FaCouch, FaLaptop, FaGamepad } from 'react-icons/fa';
import '../CSS/homepage.css';

const WhatCanYouDo = () => {
  return (
    <section className="wcyd-section">
      <div className="wcyd-content">
        <h2 className="wcyd-title">What Can You Donate?</h2>
        <p className="wcyd-description">
          Your generosity has the power to transform lives. Donate your gently used items and contribute to a more sustainable and compassionate world. Every donation, no matter how small, can make a significant impact.
        </p>

        <div className="wcyd-categories">
          <div className="wcyd-category">
            <div className='wcyd-category-icon-wrapper'>
            <FaTshirt className="wcyd-category-icon" />
            </div>
            <h3 className="wcyd-category-title">Clothing</h3>
            <p className="wcyd-category-description">
              Donate your gently used clothes, shoes, and accessories to provide warmth and comfort to those in need.
            </p>
          </div>

          <div className="wcyd-category">
            <div className='wcyd-category-icon-wrapper'>
            <FaBook className="wcyd-category-icon" />
            </div>
            <h3 className="wcyd-category-title">Books</h3>
            <p className="wcyd-category-description">
              Share the gift of knowledge and imagination by donating your books and reading materials.
            </p>
          </div>

          <div className="wcyd-category">
            <div className='wcyd-category-icon-wrapper'>
            <FaCouch className="wcyd-category-icon" />
            </div>
            <h3 className="wcyd-category-title">Furniture</h3>
            <p className="wcyd-category-description">
              Donate your gently used furniture to create comfortable living spaces for families in need.
            </p>
          </div>

          <div className="wcyd-category">
            <div className='wcyd-category-icon-wrapper'>
            <FaLaptop className="wcyd-category-icon" />
            </div>
            <h3 className="wcyd-category-title">Electronics</h3>
            <p className="wcyd-category-description">
              Donate your working electronics and appliances to bridge the digital divide and promote equal access to technology.
            </p>
          </div>

          <div className="wcyd-category">
            <div className='wcyd-category-icon-wrapper'>
            <FaGamepad className="wcyd-category-icon" />
            </div>
            <h3 className="wcyd-category-title">Toys</h3>
            <p className="wcyd-category-description">
              Bring joy and smiles to children by donating your gently used toys and games.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatCanYouDo;