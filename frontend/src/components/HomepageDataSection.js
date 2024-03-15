import React from "react";
import { FaHeart, FaMoneyBillWave, FaHandHoldingHeart } from "react-icons/fa";

const DataSection = () => {
    return (
        <div className="data-section">
            <div className="data-container">
                <div className="data-card">
                    <div className="icon-container">
                        <FaHeart style={{ color: "#00a94f", fontSize: "3rem" }} />
                        <span className="number">10,000+</span>
                    </div>
                    <h3>Lives Improved</h3>
                    <p>Over 10,000 lives have been positively impacted through our initiatives.</p>
                </div>
                <div className="data-card">
                    <div className="icon-container">
                        <FaMoneyBillWave style={{ color: "#00a94f", fontSize: "3rem" }} />
                        <span className="number">₹5,00,000+</span>
                    </div>
                    <h3>Funds Collected</h3>
                    <p>We have raised over ₹5,00,000 for funding various campaigns and projects.</p>
                </div>
                <div className="data-card">
                    <div className="icon-container">
                        <FaHandHoldingHeart style={{ color: "#00a94f", fontSize: "3rem" }} />
                        <span className="number">2,000+</span>
                    </div>
                    <h3>Donations Received</h3>
                    <p>This month, we received over 2,000 donations from generous supporters.</p>
                </div>
            </div>
        </div>
    );
};

export default DataSection;