// Import dependencies
const authService = require('./authService');
const bcrypt = require('bcryptjs');

module.exports = {
  // Method to handle user login
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // Validate user credentials
      const user = await authService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User not found' });
      }

      // Compare password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Unauthorized: Invalid password' });
      }

      // Generate JWT token
      const token = authService.generateJWT(user);
      return res.status(200).json({ token });
    } catch (error) {
      return this.sendErrorResponse(res, error);
    }
  },

  // Method to handle user registration
  async registerUser(req, res) {
    try {
      const { email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await authService.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Bad Request: Email is already registered' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Register the user
      const newUser = await authService.createUser(email, hashedPassword);
      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      return this.sendErrorResponse(res, error);
    }
  },

  // Method to handle token renewal
  async refreshToken(req, res) {
    try {
      const { token } = req.body;

      // Validate the existing token
      const decoded = authService.verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      // Generate a new JWT token
      const newToken = authService.generateJWT(decoded.user);
      return res.status(200).json({ token: newToken });
    } catch (error) {
      return this.sendErrorResponse(res, error);
    }
  },

  // Utility method to handle errors
  sendErrorResponse(res, error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
 
