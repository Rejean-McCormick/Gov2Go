import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import the associated CSS file for styling

const Button = ({ label, onClick, style }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(); // Execute the onClick function if provided
        }
    };

    return (
        <button className="common-button" style={style} onClick={handleClick}>
            {label}
        </button>
    );
};

// Prop types for type checking
Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    style: PropTypes.object,
};

// Default props
Button.defaultProps = {
    onClick: null,
    style: {},
};

export default Button;
 
