const pool = require('../config/db');

// Initialize seat availability for a new train
const initializeSeats = async (train_id, source_station, destination_station, total_seats) => {
  const result = await pool.query(
    'INSERT INTO Seats (train_id, source_station, destination_station, available_seats) VALUES ($1, $2, $3, $4) RETURNING *',
    [train_id, source_station, destination_station, total_seats]
  );
  return result.rows[0];
};

// Update seat availability
const updateSeatAvailability = async (seat_id, seat_count) => {
  const result = await pool.query(
    'UPDATE Seats SET available_seats = available_seats - $1 WHERE seat_id = $2 RETURNING *',
    [seat_count, seat_id]
  );
  return result.rows[0];
};

// Get seat availability for a specific train and route
const getSeatAvailability = async (train_id, source_station, destination_station) => {
  const result = await pool.query(
    'SELECT * FROM Seats WHERE train_id = $1 AND source_station = $2 AND destination_station = $3',
    [train_id, source_station, destination_station]
  );
  return result.rows[0];
};

module.exports = { initializeSeats, updateSeatAvailability, getSeatAvailability };