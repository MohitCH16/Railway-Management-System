import React, { useState } from 'react';
import { getAvailability } from '../api';
import { useNavigate } from 'react-router-dom';
import './Availability.css';

const Availability = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate(); // For redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { trains } = await getAvailability(source, destination);
      setTrains(trains);
    } catch (err) {
      console.error('Error fetching availability:', err);
    }
  };

  const handleBook = (trainId) => {
    navigate(`/book/${trainId}`); // Redirect to booking page with trainId
  };

  return (
    <div className="availability">
      <h2>Check Seat Availability</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Source Station"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination Station"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button type="submit">Check</button>
      </form>
      <ul>
        {trains.map((train) => (
          <li key={train.train_id}>
            {train.train_name} - Available Seats: {train.available_seats}
            <button onClick={() => handleBook(train.train_id)}>Book Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Availability;




// import React, { useState } from 'react';
// import { getAvailability } from '../api';
// import './Availability.css';

// const Availability = () => {
//   const [source, setSource] = useState('');
//   const [destination, setDestination] = useState('');
//   const [trains, setTrains] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await getAvailability(source, destination);
//       console.log('API Response:', response);
//       setTrains(response.trains || []);
//       //setTrains(trains);
//     } catch (err) {
//       console.error('Error fetching availability:', err);
//     }
//   };

//   return (
//     <div className="availability">
//       <h2>Check Seat Availability</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Source Station"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Destination Station"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           required
//         />
//         <button type="submit">Check</button>
//       </form>
//       <ul>
//         {trains.map((train) => (
//           <li key={train.train_id}>
//             {train.train_name} - Available Seats: {train.available_seats}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Availability;