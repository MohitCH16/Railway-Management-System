const { generateToken } = require('../utils/jwt');
const { createUser, findUserByUsername, comparePassword } = require('../models/userModel');

// Register a new user
const register = async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
  const { username, password, role } = req.body;

  try {

    // Validate inputs
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, password, and role are required' });
    }
  
    if (typeof password !== 'string' || password.trim() === '') {
        return res.status(400).json({ message: 'Password must be a non-empty string' });
    }

    // Check if the username already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = await createUser(username, password, role);

    // Generate a JWT token for the new user
    const token = generateToken({ userId: newUser.user_id, role: newUser.role });

    res.status(201).json({ message: 'User registered successfully', user: newUser, token });
  } catch (err) {
    console.error('Error in register function:', err.message); // Log the exact error
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = generateToken({ userId: user.user_id, role: user.role });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { register, login };





























// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db');

// const register = async (req, res) => {
//   const { username, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const result = await pool.query(
//       'INSERT INTO Users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
//       [username, hashedPassword, role]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ message: 'Error registering user' });
//   }
// };

// const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const result = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
//     const user = result.rows[0];

//     if (!user || !(await bcrypt.compare(password, user.password_hash))) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in' });
//   }
// };

// module.exports = { register, login };