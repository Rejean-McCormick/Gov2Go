import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed for API calls
import { useHistory } from 'react-router-dom'; // For navigation
const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    // Add other user profile fields as necessary
  });
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchUserProfile(); // Fetch profile data on component mount
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile'); // Adjust API endpoint as needed
      setUserProfile(response.data); // Set fetched profile data to state
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to load user profile. Please try again.'); // Handle fetch error
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      await axios.put('/api/user/profile', userProfile); // Adjust API endpoint as needed
      history.push('/dashboard'); // Redirect after updating profile
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.'); // Handle update error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value, // Update specific field based on input name
    }));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={updateProfile}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
          />
        </div>
        {/* Add more fields as necessary */}
        <button type="submit">Save Changes</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}
      </form>
    </div>
  );
};

export default UserProfile;
 
