import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed for API calls
import { useHistory } from 'react-router-dom'; // For navigation
import './Login.css'; // Optional: Import CSS for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      const response = await axios.post('/api/login', { username, password }); // Adjust API endpoint as needed
      if (response.data.success) {
        // Save user session (e.g., token) and redirect to the dashboard or home page
        history.push('/dashboard');
      } else {
        setError('Invalid credentials. Please try again.'); // Display error message
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.'); // Handle error gracefully
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
      </form>
    </div>
  );
};

export default Login;
 
