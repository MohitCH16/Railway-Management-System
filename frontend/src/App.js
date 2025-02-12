import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Availability from './components/Availability';
import BookingForm from './components/BookingForm';
import BookingDetails from './components/BookingDetails';
import AddTrain from './components/AddTrain';
import './App.css';

const App = () => {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/availability" element={isLoggedIn ? <Availability /> : <Navigate to="/login" />} />
          <Route path="/book/:trainId" element={isLoggedIn ? <BookingForm /> : <Navigate to="/login" />} />
          <Route path="/bookings/:bookingId" element={isLoggedIn ? <BookingDetails /> : <Navigate to="/login" />} />
          <Route path="/add-train" element={isLoggedIn ? <AddTrain /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;












// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import Availability from './components/Availability';
// import BookingForm from './components/BookingForm';
// import BookingDetails from './components/BookingDetails';
// import AddTrain from './components/AddTrain';
// import './App.css';

// const App = () => {
//   const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in

//   return (
//     <Router>
//       <Navbar />
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/availability"
//             element={isLoggedIn ? <Availability /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/book"
//             element={isLoggedIn ? <BookingForm /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/bookings/:bookingId"
//             element={isLoggedIn ? <BookingDetails /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/add-train"
//             element={isLoggedIn ? <AddTrain /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// };

// export default App;