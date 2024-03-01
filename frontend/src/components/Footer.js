import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-green-500 text-lg font-bold mb-4">About Us</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac feugiat justo.</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-green-500 text-lg font-bold mb-4">Contact</h2>
            <p>Email: contact@example.com</p>
            <p>Phone: +123456789</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-green-500 text-lg font-bold mb-4">Branches</h2>
            <p>Branch 1: Address 1</p>
            <p>Branch 2: Address 2</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
