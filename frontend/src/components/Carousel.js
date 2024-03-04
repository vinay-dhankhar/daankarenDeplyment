import React from "react";
import imageSrc from './Images/people-donating-collecting-clothes-charity-600nw-2411437163.jpeg';
// import imageSrc from './Images/carousel3.jpeg'

import '../CSS/nav-styles.css'

function Carousel() {
    return(
        <>
        <img src={imageSrc} alt="background" className="carousel"/>
        </>
    )
}

export default Carousel;