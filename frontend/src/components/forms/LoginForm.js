import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css'; // Optional: import CSS for styling

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Basic validation
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        // Call the login function passed as prop
        onLogin(username, password).catch(() => {
            setError('Login failed. Please try again.');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Login</button>
        </form>
    );
};

// Prop types for type checking
LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired, // Function to call on login
};

export default LoginForm;
