import React, { useState } from 'react';
import { addTrain } from '../api';

const TrainForm = () => {
  const [trainName, setTrainName] = useState('');
  const [sourceStation, setSourceStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTrain(
        { train_name: trainName, source_station: sourceStation, destination_station: destinationStation, total_seats: totalSeats },
        apiKey
      );
      setMessage('Train added successfully');
    } catch (err) {
      setMessage('Error adding train');
    }
  };

  return (
    <div>
      <h2>Add Train</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Train Name"
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Source Station"
          value={sourceStation}
          onChange={(e) => setSourceStation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination Station"
          value={destinationStation}
          onChange={(e) => setDestinationStation(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Admin API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
        <button type="submit">Add Train</button>
      </form>
    </div>
  );
};

export default TrainForm;