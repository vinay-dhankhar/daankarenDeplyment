import React from "react";
import "../CSS/card.css";

export default function Card(props) {
  return (
    <div className="card-box">
      <div className="card-top">
        <img src={props.img} alt="image" className="card-img" />
        <h3 className="card-title">{props.title}</h3>
      </div>
      <div className="card-bottom">
        <button className="card-btn" id="share-btn">
          <span>Share</span>
        </button>
        <button className="card-btn" id="donate-btn">
          <span>Donate</span>
        </button>
      </div>
    </div>
  );
}
