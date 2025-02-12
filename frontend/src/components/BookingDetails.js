import React, { useState, useEffect } from 'react';
import { getBookingDetails } from '../api';
import { useParams } from 'react-router-dom';
import './BookingDetails.css';

const BookingDetails = () => {
  const { bookingId } = useParams(); // Get booking ID from URL
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setError('Invalid booking ID.');
        return;
      }
  
      try {
        console.log('Fetching details for Booking ID:', bookingId); // Debugging
        const response = await getBookingDetails(bookingId, token);
        console.log('API Response:', response); // 🔍 Log API response
        setBooking(response);
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details. Please try again.');
      }
    };
  
    fetchBooking();
  }, [bookingId, token]);





  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      {error && <p className="error">{error}</p>}
      {booking ? (
        <div>
          <p><strong>Passenger Name:</strong> {booking.passenger_name}</p>
          <p><strong>Train Name:</strong> {booking.train_name}</p>
          <p><strong>Source:</strong> {booking.source_station}</p>
          <p><strong>Destination:</strong> {booking.destination_station}</p>
          <p><strong>Seat Number:</strong> {booking.seat_number}</p>
          <p><strong>Booking Time:</strong> {new Date(booking.booking_time).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
};

export default BookingDetails;







// import React, { useState, useEffect } from 'react';
// import { getBookingDetails } from '../api';
// import { useParams } from 'react-router-dom';
// import './BookingDetails.css';

// const BookingDetails = () => {
//   const { bookingId } = useParams(); // Get booking ID from URL
//   const [booking, setBooking] = useState(null);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const response = await getBookingDetails(bookingId, token);
//         setBooking(response);
//       } catch (err) {
//         console.error('Error fetching booking details:', err);
//       }
//     };
//     fetchBooking();
//   }, [bookingId, token]);

//   return (
//     <div className="booking-details">
//       <h2>Booking Details</h2>
//       {booking ? (
//         <div>
//           <p><strong>Passenger Name:</strong> {booking.passenger_name}</p>
//           <p><strong>Train Name:</strong> {booking.train_name}</p>
//           <p><strong>Seat Number:</strong> {booking.seat_number}</p>
//         </div>
//       ) : (
//         <p>Loading booking details...</p>
//       )}
//     </div>
//   );
// };

// export default BookingDetails;





// import React, { useState } from 'react';
// import { getBookingDetails } from '../api';
// import './BookingDetails.css';

// const BookingDetails = () => {
//   const [bookingId, setBookingId] = useState('');
//   const [booking, setBooking] = useState(null);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const bookingDetails = await getBookingDetails(bookingId, token);
//       setBooking(bookingDetails);
//       setError('');
//     } catch (err) {
//       setError('Booking not found');
//     }
//   };

//   return (
//     <div className="booking-details">
//       <h2>View Booking Details</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Booking ID"
//           value={bookingId}
//           onChange={(e) => setBookingId(e.target.value)}
//           required
//         />
//         <button type="submit">View</button>
//       </form>
//       {error && <p className="error">{error}</p>}
//       {booking && (
//         <div className="booking-info">
//           <p>Booking ID: {booking.booking_id}</p>
//           <p>Train ID: {booking.train_id}</p>
//           <p>Source Station: {booking.source_station}</p>
//           <p>Destination Station: {booking.destination_station}</p>
//           <p>Seat Count: {booking.seat_count}</p>
//           <p>Booking Time: {new Date(booking.booking_time).toLocaleString()}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingDetails;