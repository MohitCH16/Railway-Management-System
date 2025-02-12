const pool = require('../config/db');

// Add a new train
const addTrain = async (train_name, source_station, destination_station, total_seats) => {

  const client = await pool.connect();

  try{
    await client.query('BEGIN');

    //insert the new trains into the table
    const result = await pool.query(
      'INSERT INTO Trains (train_name, source_station, destination_station, total_seats) VALUES ($1, $2, $3, $4) RETURNING *',
      [train_name, source_station, destination_station, total_seats]
    );
    const train = result.rows[0];

    // Initialize seat availability for the train
    await client.query(
      'INSERT INTO Seats (train_id, source_station, destination_station, available_seats) VALUES ($1, $2, $3, $4)',
      [train.train_id, source_station, destination_station, total_seats]
    );

    await client.query('COMMIT');
    return train;

  }catch (err) {
    await client.query('ROLLBACK');
    console.error('Error adding train:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

// Get all trains between two stations
const getTrainsBetweenStations = async (source, destination) => {
  const result = await pool.query(
    `SELECT t.train_id, t.train_name, s.available_seats 
     FROM Trains t 
     JOIN Seats s ON t.train_id = s.train_id 
     WHERE s.source_station = $1 AND s.destination_station = $2`,
    [source, destination]
  );
  return result.rows;
};

module.exports = { addTrain, getTrainsBetweenStations };