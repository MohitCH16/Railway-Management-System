Railway Management System

Overview

This is a full-stack Railway Management System that allows users to register, log in, check seat availability, book train tickets, and view booking details. The application consists of a frontend built with React.js and a backend using Node.js, Express, and PostgreSQL.

Features
User Authentication (Register/Login)
Train Management (Admins can add trains)
Seat Availability Check
Booking System (Users can book available seats)
Booking Details View

Tech Stack
Frontend:
React.js
React Router
Axios
CSS

Backend:
Node.js
Express.js
PostgreSQL
JWT for Authentication

Installation & Setup
Prerequisites
Node.js installed
PostgreSQL installed and running
Backend Setup
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Set up environment variables in a .env file:
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
Run database migrations (if applicable):
npx sequelize-cli db:migrate
Start the backend server:
npm start

Frontend Setup
Navigate to the frontend folder:
cd frontend
Install dependencies:
npm install
Start the frontend:
npm start

API Endpoints

Authentication
POST /api/register - Register a new user
POST /api/login - Login and receive a token
Trains
POST /api/trains - (Admin) Add a new train
GET /api/trains/availability?source=A&destination=B - Check seat availability
Booking
POST /api/book - Book a seat
GET /api/bookings/:bookingId - Get booking details

Usage Flow
Register/Login as a user.
Check Seat Availability by selecting source and destination.
Book a Seat in an available train.
View Booking Details after booking confirmation.


