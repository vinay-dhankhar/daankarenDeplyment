import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";

// css written in homepage.css file
const DataSection = () => {
    return (
        <>
            <div className="data-section">
                <div className='data'>
                    <div className='data-cards-container'>
                        <div className='data-cards'>
                            <div className="icon-container">
                            <FaHeart style={{color: 'white', fontSize: '4rem'}}/>
                            </div>
                            <span>Lives Improved</span>
                        </div>
                        <div className='data-cards'>
                            <div className="icon-container">
                            <FaMoneyBill1Wave style={{color: 'white', fontSize: '4rem'}}/>
                            </div>
                            <span>Funds Collected for Campaigns</span>
                        </div>
                        <div className='data-cards'>
                            <div className="icon-container">
                            <FaHandHoldingHeart style={{color: 'white', fontSize: '4rem'}}/>
                            </div>
                            <span>Donations Accepted this Month</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DataSection;