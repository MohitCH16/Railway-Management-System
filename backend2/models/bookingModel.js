const pool = require('../config/db');

// Create a new booking
const createBooking = async (user_id, train_id, source_station, destination_station, seat_count) => {
  const result = await pool.query(
    'INSERT INTO Bookings (user_id, train_id, source_station, destination_station, seat_count) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, train_id, source_station, destination_station, seat_count]
  );
  return result.rows[0];
};

// Get booking details by booking ID
const getBookingDetails = async (booking_id, user_id) => {
  const result = await pool.query(
    'SELECT * FROM Bookings WHERE booking_id = $1 AND user_id = $2',
    [booking_id, user_id]
  );
  return result.rows[0];
};

module.exports = { createBooking, getBookingDetails };