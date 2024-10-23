import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css'; // Optional: import CSS for styling

const Sidebar = ({ links, userRole }) => {
  const renderLinks = () => {
    return links
      .filter(link => link.roles.includes(userRole)) // Filter links based on user role
      .map((link, index) => (
        <li key={index}>
          <a href={link.url}>{link.text}</a>
        </li>
      ));
  };

  return (
    <aside className="sidebar">
      <ul>
        {renderLinks()} {/* Render filtered links */}
      </ul>
    </aside>
  );
};

// Prop types for type checking
Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired, // Allowed roles for the link
    })
  ).isRequired, // Array of link objects
  userRole: PropTypes.string.isRequired, // User role
};

export default Sidebar;
 
