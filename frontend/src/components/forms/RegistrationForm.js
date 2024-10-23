import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RegistrationForm.css'; // Optional: import CSS for styling

const RegistrationForm = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Call the register function passed as prop
        onRegister({ name, email, password }).catch(() => {
            setError('Registration failed. Please try again.'); // Set error message
        });
    };

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

// Prop types for type checking
RegistrationForm.propTypes = {
    onRegister: PropTypes.func.isRequired, // Function to call on registration
};

export default RegistrationForm;
 
