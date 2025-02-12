import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">Railway Management</div>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/availability">Seat Availability</Link>
            <Link to="/bookings/:bookingId">Booking Details</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;





// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="logo">Railway Management</div>
//       <div className="nav-links">
//         <Link to="/login">Login</Link>
//         <Link to="/register">Register</Link>
//         <Link to="/availability">Seat Availability</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;