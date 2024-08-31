import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import IconAnimation from '../../components/Animations/IconAnimation/IconAnimation';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
    // For now, we'll just log it to the console
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8n mt-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">

          {/* Contact Form */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#a67f75] text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information and Map */}
          <div className="md:w-1/2 bg-[#a67f75] text-white p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="mb-4 flex items-start space-x-4">
                <IconAnimation icon={MapPin} delay={0.2} />
              <p>123 Travel Street, Adventure City, AC 12345</p>
            </div>
            <div className="mb-4 flex items-center space-x-4">
                <IconAnimation icon={Phone} delay={0.2} />
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="mb-8 flex items-center space-x-4">
                <IconAnimation icon={Mail} delay={0.2} />
              <p>contact@guideme.com</p>
            </div>
            
            {/* Map Placeholder */}
            <div className="h-64 bg-pink-400 rounded-lg flex items-center justify-center">
              <p className="text-center">Map Placeholder</p>
              {/* You would replace this div with an actual map component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;