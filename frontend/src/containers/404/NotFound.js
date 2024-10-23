import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';  // Optional CSS file for styling

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="home-link">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
 
