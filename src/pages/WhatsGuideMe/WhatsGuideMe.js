import React, { useState } from 'react';
import { MapPin, MessageCircle, Compass, Zap, ChevronDown, ChevronUp } from 'lucide-react';

const FeatureCard = ({ icon, title, description, isExpanded, onToggle }) => (

  <article className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-[#a67f75] mr-4" aria-hidden="true">{icon}</div>
        <h3 className="text-xl font-bold text-[#6d4c41]">{title}</h3>
      </div>
      <button
        onClick={onToggle}
        className="lg:hidden text-[#a67f75] focus:outline-none focus:ring-2 focus:ring-[#6d4c41] rounded-full p-1"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Hide' : 'Show'} description for ${title}`}
      >
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
    </div>
    <p className={`text-[#8d6e63] mt-2 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
      {description}
    </p>
  </article>
);

const WhatsGuideMe = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const features = [
    {
      icon: <MapPin size={32} />,
      title: "Discover Places",
      description: "Find hidden gems and popular spots in any area with our powerful search feature."
    },
    {
      icon: <MessageCircle size={32} />,
      title: "AI Travel Companion",
      description: "Chat with our Gemini-powered AI for personalized travel advice and recommendations."
    },
    {
      icon: <Compass size={32} />,
      title: "Interactive Maps",
      description: "Visualize your journey with interactive maps and easy-to-follow routes."
    },
    {
      icon: <Zap size={32} />,
      title: "Smart Itineraries",
      description: "Let AI help you create the perfect itinerary based on your preferences and time constraints."
    }
  ];

  const toggleFeature = (index) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#ede3e0] py-8 px-4 sm:px-6 lg:px-8 mt-16 pt-16">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#6d4c41]">
            What's <span className="text-[#a67f75]">GuideMe</span>?
          </h1>
          
          <p className="text-lg sm:text-xl text-[#8d6e63] max-w-2xl mx-auto">
            Your AI-powered travel companion that transforms every journey into an adventure.
          </p>
        </header>

        <section 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" 
          aria-label="GuideMe Features"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              isExpanded={expandedFeature === index}
              onToggle={() => toggleFeature(index)}
            />
          ))}
        </section>

        <section className="text-center" aria-label="Call to Action">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6d4c41] mb-4">Ready to explore?</h2>
          <button 
            className="bg-[#a67f75] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#8d6e63] focus:outline-none focus:ring-2 focus:ring-[#6d4c41] focus:ring-opacity-50 transition-all duration-300"
            aria-label="Start Your Journey with GuideMe"
          >
            Start Your Journey
          </button>
        </section>
        
      </div>
    </main>
  );
};

export default WhatsGuideMe;