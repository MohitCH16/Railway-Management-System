import React, { useState } from 'react';
import { bookSeat } from '../api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
  const { trainId } = useParams(); // Get train ID from URL
  const navigate = useNavigate();
  const location = useLocation(); // Get state passed from previous page

  const [passengerName, setPassengerName] = useState('');
  const [sourceStation, setSourceStation] = useState(location.state?.source_station || '');
  const [destinationStation, setDestinationStation] = useState(location.state?.destination_station || '');
  const [seatCount, setSeatCount] = useState(1); // Default 1 seat
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await bookSeat(
        {
          train_id: trainId,
          source_station: sourceStation,
          destination_station: destinationStation,
          seat_count: seatCount
        },
        token
      );
      
      setMessage('Booking Successful! Your Booking ID is: ' + response.booking_id);
      setTimeout(() => {
        navigate(`/bookings/${response.booking_id}`); // Redirect to booking details
      }, 2000);
      
    } catch (err) {
      setMessage('Error booking seat.');
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a Seat</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Passenger Name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
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
          placeholder="Seat Count"
          value={seatCount}
          onChange={(e) => setSeatCount(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;






// import React, { useState } from 'react';
// import { bookSeat } from '../api';
// import { useParams, useNavigate } from 'react-router-dom';
// import './BookingForm.css';

// const BookingForm = () => {
//   const { trainId } = useParams(); // Get train ID from URL
//   const navigate = useNavigate();
//   const [passengerName, setPassengerName] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       const response = await bookSeat({ train_id: trainId, passenger_name: passengerName }, token);
//       setMessage('Booking Successful! Your Booking ID is: ' + response.booking_id);
//       setTimeout(() => {
//         navigate(`/bookings/${response.booking_id}`); // Redirect to booking details
//       }, 2000);
//     } catch (err) {
//       setMessage('Error booking seat.');
//     }
//   };

//   return (
//     <div className="booking-form">
//       <h2>Book a Seat</h2>
//       {message && <p>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Passenger Name"
//           value={passengerName}
//           onChange={(e) => setPassengerName(e.target.value)}
//           required
//         />
//         <button type="submit">Confirm Booking</button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;



// import React, { useState } from 'react';
// import { bookSeat } from '../api';
// import './BookingForm.css';

// const BookingForm = () => {
//   const [trainId, setTrainId] = useState('');
//   const [sourceStation, setSourceStation] = useState('');
//   const [destinationStation, setDestinationStation] = useState('');
//   const [seatCount, setSeatCount] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await bookSeat(
//         { train_id: trainId, source_station: sourceStation, destination_station: destinationStation, seat_count: seatCount },
//         token
//       );
//       setMessage('Seat booked successfully');
//     } catch (err) {
//       setMessage('Error booking seat');
//     }
//   };

//   return (
//     <div className="booking-form">
//       <h2>Book Seat</h2>
//       {message && <p className="message">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Train ID"
//           value={trainId}
//           onChange={(e) => setTrainId(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Source Station"
//           value={sourceStation}
//           onChange={(e) => setSourceStation(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Destination Station"
//           value={destinationStation}
//           onChange={(e) => setDestinationStation(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Seat Count"
//           value={seatCount}
//           onChange={(e) => setSeatCount(e.target.value)}
//           required
//         />
//         <button type="submit">Book</button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;