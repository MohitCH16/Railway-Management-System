import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register a new user
export const registerUser = async (username, password, role) => {
  const response = await axios.post(`${API_URL}/register`, { username, password, role });
  return response.data;
};

// Login user
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

// Add a new train (Admin Only)
export const addTrain = async (trainData, apiKey) => {
  const response = await axios.post(`${API_URL}/trains`, trainData, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return response.data;
};

// Get seat availability
export const getAvailability = async (source, destination) => {
  const response = await axios.get(`${API_URL}/trains/availability`, {
    params: { source, destination },
  });
  return response.data;
};

// Book a seat
export const bookSeat = async (bookingData, token) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get booking details

export const getBookingDetails = async (bookingId, token) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Booking Details API Response:', response.data); // 🔍 Debug API Response
    return response.data;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    throw error;
  }
};



// export const getBookingDetails = async (bookingId, token) => {
//   const response = await axios.get(`${API_URL}/bookings/${bookingId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };