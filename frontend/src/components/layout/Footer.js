 
import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css'; // Optional: import CSS for styling

const Footer = ({ links, style }) => {
    return (
        <footer className="footer" style={style}>
            <nav>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </footer>
    );
};

// Prop types for type checking
Footer.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired, // Array of link objects
    style: PropTypes.object, // Optional style object
};

export default Footer;
