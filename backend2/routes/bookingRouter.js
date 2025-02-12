const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Book a seat (Protected route)
router.post('/', authenticate, bookSeat);

// Get specific booking details (Protected route)
router.get('/:booking_id', authenticate, getBookingDetails);

module.exports = router;