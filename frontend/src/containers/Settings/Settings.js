import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed for API calls
import { useHistory } from 'react-router-dom'; // For navigation

const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    theme: 'light', // Default value for theme
    notifications: true, // Default value for notifications
    // Add other settings as necessary
  });

  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchUserSettings(); // Fetch settings on component mount
  }, []);

  // Fetch user settings from the backend
  const fetchUserSettings = async () => {
    try {
      const response = await axios.get('/api/user/settings'); // Adjust API endpoint as needed
      setUserSettings(response.data); // Set fetched settings to state
    } catch (err) {
      console.error('Error fetching user settings:', err);
      setError('Failed to load settings. Please try again.'); // Handle fetch error
    }
  };

  // Update user settings to the backend
  const updateSettings = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      await axios.put('/api/user/settings', userSettings); // Adjust API endpoint as needed
      history.push('/dashboard'); // Redirect after saving settings
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('Failed to update settings. Please try again.'); // Handle update error
    }
  };

  // Handle input changes for user settings
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value, // Update specific setting based on input name
    }));
  };

  return (
    <div>
      <h1>User Settings</h1>
      <form onSubmit={updateSettings}>
        {/* Theme Selection */}
        <div>
          <label>Theme:</label>
          <select name="theme" value={userSettings.theme} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Notifications */}
        <div>
          <label>Notifications:</label>
          <input
            type="checkbox"
            name="notifications"
            checked={userSettings.notifications}
            onChange={(e) =>
              handleChange({ target: { name: 'notifications', value: e.target.checked } })
            }
          />
        </div>

        {/* Add more fields as necessary */}

        <button type="submit">Save Changes</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
      </form>
    </div>
  );
};

export default Settings;
 
