import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-transparent w-full">
      <div className="footer-container mx-auto flex flex-col items-center space-y-4">
        <ul className="nav justify-content-center space-x-6">
          <li>
            <Link to="/" className="nav-link px-2 hover:text-white navLinks">Home</Link>
          </li>
          <li>
            <Link to="/ItineraryPlanner" className="nav-link px-2 hover:text-white navLinks">Itinerary Planner</Link>
          </li>
          <li>
            <Link to="/WhatsGuideMe" className="nav-link px-2 hover:text-white navLinks">Whats Guide Me</Link>
          </li>
          <li>
            <Link to="/ContactUs" className="nav-link px-2 hover:text-white navLinks">Contact Us</Link>
          </li>
        </ul>
        <p className="text-center m-0 text-black text-sm">© 2023 Copyright: Guideme Designed with ❤️ by Kariem</p>
      </div>
    </footer>
  );
};

export default Footer;
