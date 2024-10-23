import React from 'react';
import PropTypes from 'prop-types';
import './Input.css'; // Import the associated CSS file for styling

const Input = ({ type, placeholder, value, onChange }) => {
    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value); // Trigger the onChange function with the new value
        }
    };

    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            className="common-input" // Apply styles from the CSS
        />
    );
};

// Prop types for type checking
Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

// Default props
Input.defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
    onChange: null,
};

export default Input;
 
