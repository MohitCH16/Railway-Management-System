const pool = require('../config/db');
const { addTrain, getTrainsBetweenStations } = require('../models/trainModel');


// Add a new train (Admin only)
const addTrainController = async (req, res) => {

  const { train_name, source_station, destination_station, total_seats } = req.body;

  try {
    const newTrain = await addTrain(train_name, source_station, destination_station, total_seats);
    res.status(201).json(newTrain);
  } catch (err) {
    console.error('Error adding train:', err.message);
    res.status(500).json({ message: 'Error adding train', error: err.message });
  }


  // const { train_name, source_station, destination_station, total_seats } = req.body;

  // try {
  //   // Insert the new train into the Trains table
  //   const trainResult = await pool.query(
  //     'INSERT INTO Trains (train_name, source_station, destination_station, total_seats) VALUES ($1, $2, $3, $4) RETURNING *',
  //     [train_name, source_station, destination_station, total_seats]
  //   );

  //   // Initialize seat availability for the train
  //   await pool.query(
  //     'INSERT INTO Seats (train_id, source_station, destination_station, available_seats) VALUES ($1, $2, $3, $4)',
  //     [trainResult.rows[0].train_id, source_station, destination_station, total_seats]
  //   );

  //   res.status(201).json(trainResult.rows[0]);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: 'Error adding train' });
  // }
};

// Get seat availability between two stations
const getAvailability = async (req, res) => {

  const { source, destination } = req.query;

  try {
    const trains = await getTrainsBetweenStations(source, destination);
    res.json({ trains });
  } catch (err) {
    console.error('Error fetching seat availability:', err.message);
    res.status(500).json({ message: 'Error fetching seat availability', error: err.message });
  }




  // const { source, destination } = req.query;

  // try {
  //   // Fetch all trains and their seat availability for the given route
  //   const result = await pool.query(
  //     `SELECT t.train_id, t.train_name, s.available_seats 
  //      FROM Trains t 
  //      JOIN Seats s ON t.train_id = s.train_id 
  //      WHERE s.source_station = $1 AND s.destination_station = $2`,
  //     [source, destination]
  //   );

  //   res.json({ trains: result.rows });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: 'Error fetching seat availability' });
  // }
};

module.exports = { addTrainController, getAvailability };