import React from 'react';
import PropTypes from 'prop-types';
import './Header.css'; // Optional: import CSS for styling

const Header = ({ menuItems, user, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Call the logout function passed as a prop
    }
  };

  return (
    <header className="header">
      <div className="branding">
        <h1>Your App Name</h1>
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.text}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="user-info">
        {user && (
          <>
            <span>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

// Prop types for type checking
Header.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired, // Array of menu item objects
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string, // Optional
  }),
  onLogout: PropTypes.func.isRequired, // Logout function
};

export default Header;
 
