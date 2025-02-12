const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error('Error verifying token:', err.message);
    return null;
  }
};

module.exports = { generateToken, verifyToken };