 
/**
 * File: /frontend/src/views/About/AboutView.js
 * Role: Component for rendering the "About" page of the application containing information about the app or company.
 *
 * Methods:
 * - fetchAboutInfo(): Optionally retrieves dynamic content from an external source or API for display on the page.
 * - render(): Displays the "About" page with static or dynamic content based on the app’s or company’s details.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutView = () => {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [error, setError] = useState(null);

  // Optionally fetches dynamic content for the About page
  const fetchAboutInfo = async () => {
    try {
      const response = await axios.get('/api/about');
      setAboutInfo(response.data);
    } catch (error) {
      setError('Failed to load about information.');
    }
  };

  useEffect(() => {
    // Fetch the about info when the component is mounted
    fetchAboutInfo();
  }, []);

  // Render the "About" page
  return (
    <div className="about-page">
      <h1>About Our Application</h1>
      {error && <p className="error-message">{error}</p>}
      {aboutInfo ? (
        <div>
          <h2>{aboutInfo.title}</h2>
          <p>{aboutInfo.description}</p>
        </div>
      ) : (
        <p>Loading about information...</p>
      )}
    </div>
  );
};

export default AboutView;
