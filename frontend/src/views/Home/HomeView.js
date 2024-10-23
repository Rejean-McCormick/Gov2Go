import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'; // Assuming API calls are handled through a service
import './HomeView.css'; // CSS file for styling the HomeView component

// HomeView Component
const HomeView = () => {
  const [homeContent, setHomeContent] = useState(null);

  // Fetch dynamic content for the homepage
  const fetchHomeContent = async () => {
    try {
      const response = await api.get('/home'); // Example API endpoint
      setHomeContent(response.data);
    } catch (error) {
      console.error('Error fetching home content:', error);
    }
  };

  // Load home content when component mounts
  useEffect(() => {
    fetchHomeContent();
  }, []);

  return (
    <div className="home-view">
      <header className="home-header">
        <h1>Welcome to the Government2Go Platform</h1>
        <p>Your modular solution for knowledge management, real-time updates, and secure collaboration.</p>
      </header>

      {homeContent && (
        <section className="home-banners">
          <h2>Featured Content</h2>
          {homeContent.banners.map((banner, index) => (
            <div key={index} className="home-banner">
              <img src={banner.image} alt={banner.title} />
              <div className="banner-text">
                <h3>{banner.title}</h3>
                <p>{banner.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="navigation-links">
        <h2>Explore</h2>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/services">Our Services</Link></li>
        </ul>
      </section>
    </div>
  );
};

export default HomeView;
 
