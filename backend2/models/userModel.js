const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Create a new user
const createUser = async (username, password, role) => {

    try{
        // Validate password
        if (typeof password !== 'string' || password.trim() === '') {
            throw new Error('Password must be a non-empty string');
        }

        console.log('Password:', password); // Log the password
        console.log('Salt Rounds:', 10); // Log the salt rounds

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);   // ensure salt rounds is a number

        // insert the user into databases
        const result = await pool.query(
            'INSERT INTO Users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, role]
        );
        
        return result.rows[0];

    }catch(err){
        console.error('Error in createUser function:', err.message); // Log the error
        throw err; // Re-throw the error to be handled by the controller
    }
};

// Find a user by username
const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);
  return result.rows[0];
};

// Compare password with hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { createUser, findUserByUsername, comparePassword };