import React, { useState } from 'react';
import axios from 'axios';

const ContactView = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form validation function
  const validateForm = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('All fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      // API call to send form data
      const response = await axios.post('/api/contact', {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-view">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Message sent successfully!</p>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Email: contact@example.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    </div>
  );
};

export default ContactView;
 
