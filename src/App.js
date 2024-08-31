import React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import Home from './pages/Home/Home.js';
import ItineraryPlanner from './pages/ItineraryPlanner/ItineraryPlanner.js';
import ContactUs from './pages/ContactUs/ContactUs.js';
import Login from './pages/Login/Login.js';
import PlaceDetails from './pages/PlaceDetails/PlaceDetails.js';
import WhatsGuideMe from './pages/WhatsGuideMe/WhatsGuideMe.js';
import Footer from './components/Footer/Footer.js';
import './style/responsive.css';
import './index.css';
// import { Modal } from 'bootstrap';
import Modal from './components/Modal/Modal.js';

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/ItineraryPlanner" element={<ItineraryPlanner />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/PlaceDetails" element={<PlaceDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/whatsguideme" element={<WhatsGuideMe />} />
            <Route path='/k' element={<Modal />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
