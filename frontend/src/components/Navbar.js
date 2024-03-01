import React from 'react';
import {Link} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Navcomp = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <Nav className="me-auto">
      <ul className="flex space-x-4">
        <li className="cursor-pointer">
            <Nav.Link as={Link} to ="/">
            <h1>DaanKaren</h1>
            </Nav.Link>
            </li>
        <li>
        <Nav.Link as={Link} to ="/DonationPage">
            Donate now      
          </Nav.Link>
        </li>
        <li>
        <Nav.Link as={Link} to ="/CampaignsPage">
            Our Campaigns    
          </Nav.Link>
        </li>
        <li>
        <Nav.Link as={Link} to ="/ContactPage">       
            Contact us
          </Nav.Link>
        </li>
        <li>
        <Nav.Link as={Link} to ="/PartnerPage">           
           Our Partners
           </Nav.Link>
        </li>
      </ul>

      <ul className="flex space-x-4">
        <li>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <li>
        <Nav.Link as={Link} to ="/LoginPage">           
          Login
           </Nav.Link>
        </li>
            
          </button>
        </li>
        <li>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <li>
        <Nav.Link as={Link} to ="/SignupPage">           
          Signup
           </Nav.Link>
        </li>
          </button>
        </li>
      </ul>
      </Nav>
    </nav>
  );
};

export default Navcomp;
