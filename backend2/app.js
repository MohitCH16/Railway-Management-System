const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Add CORS middleware
const authRoutes = require('./routes/userRouter');
const trainRoutes = require('./routes/trainRouter');
const bookingRoutes = require('./routes/bookingRouter');
const pool = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

// Database connection check
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Routes
app.use('/api', authRoutes); // Authentication routes (register, login)
app.use('/api/trains', trainRoutes); // Train-related routes (add train, get availability)
app.use('/api/bookings', bookingRoutes); // Booking-related routes (book seat, get booking details)

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Railway Management System!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});