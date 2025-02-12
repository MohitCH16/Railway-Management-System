const express = require('express');
const { addTrainController, getAvailability } = require('../controllers/trainController');
const validateAdmin = require('../middleware/admin');

const router = express.Router();

// Add a new train (Admin only)
router.post('/', validateAdmin, addTrainController);

// Get seat availability between two stations
router.get('/availability', getAvailability);

module.exports = router;