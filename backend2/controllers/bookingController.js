const pool = require('../config/db');

// Book a seat
const bookSeat = async (req, res) => {
  const { train_id, source_station, destination_station, seat_count } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Lock the seat row for the given train and route
    const seatResult = await client.query(
      'SELECT * FROM Seats WHERE train_id = $1 AND source_station = $2 AND destination_station = $3 FOR UPDATE',
      [train_id, source_station, destination_station]
    );

    const seat = seatResult.rows[0];
    if (!seat || seat.available_seats < seat_count) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Update available seats
    await client.query(
      'UPDATE Seats SET available_seats = available_seats - $1 WHERE seat_id = $2',
      [seat_count, seat.seat_id]
    );

    // Create a new booking
    const bookingResult = await client.query(
      'INSERT INTO Bookings (user_id, train_id, source_station, destination_station, seat_count) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.userId, train_id, source_station, destination_station, seat_count]
    );

    await client.query('COMMIT');
    res.status(201).json(bookingResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ message: 'Error booking seat' });
  } finally {
    client.release();
  }
};

// Get specific booking details
const getBookingDetails = async (req, res) => {
  const { booking_id } = req.params;

  try {
    // Fetch booking details for the given booking ID
    const result = await pool.query(
      'SELECT * FROM Bookings WHERE booking_id = $1 AND user_id = $2',
      [booking_id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking details' });
  }
};

module.exports = { bookSeat, getBookingDetails };