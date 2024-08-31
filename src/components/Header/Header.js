import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import guidemeShape from 'src/assets/guideme shape.png';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="py-4 bg-transparent fixed w-full z-10 top-0 bg-rgba-orange text-gray-400 hover:text-white navLink">
            <div className="container mx-auto flex justify-between items-center bg-rgba-orange rounded">
                <Link to="/">
                    <div>
                        <img src={guidemeShape} alt="Guideme Shape" style={{ width: '146px', height: '40px' }} />
                    </div>
                </Link>
            <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-400 hover:text-white navLink">
                    Home
                </Link>
                        <Link to="/ItineraryPlanner" className="text-gray-400 hover:text-white navLink">
                            Planner
                        </Link>
                    <Link to="/WhatsGuideMe" className="text-gray-400 hover:text-white navLink">
                        About Us
                    </Link>
                <Link to="/ContactUs" className="text-gray-400 hover:text-white navLink">
                    Contact Us
                </Link>
            </div>
                <div className="hidden md:flex">
                <Link to="/Login" className="text-gray-400 hover:text-white navLink learnStartedbtn">
                    Login
                </Link>
                </div>
                <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-400 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                </div>
            </div>

        {isMenuOpen && (
            <div className="md:hidden bg-rgba-orangeHamburger rounded mt-2">
                <Link to="/" className="block px-4 py-4 text-gray-400 hover:text-white navLink">
                    Home
                </Link>
                    <Link to="/ItineraryPlanner" className="block px-4 py-4 text-gray-400 hover:text-white navLink">
                        Itinerary Planner
                    </Link>
                        <Link to="/WhatsGuideMe" className="block px-4 py-4 text-gray-400 hover:text-white navLink">
                            Whats guide me
                        </Link>
                    <Link to="/ContactUs" className="block px-4 py-4 text-gray-400 hover:text-white navLink">
                        Contact Us
                    </Link>
                <Link to="/Login" className="block px-4 py-4 text-gray-400 hover:text-white navLink ">
                    Login
                </Link>
            </div>
        )}
        
        </nav>
    );
}

export default Header;
