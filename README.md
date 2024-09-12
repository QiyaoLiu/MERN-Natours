# Natours Project

## Overview

This project is a full-stack application featuring a backend developed with Node.js, Express, and MongoDB, and a frontend built using React. The backend was developed based on the Udemy course "Node.js, Express, MongoDB & More: The Complete Bootcamp". The frontend was crafted independently while using static materials from this course.

## Features

- **Backend:**

  - RESTful API with CRUD operations
  - User authentication and authorization
  - Password management
  - Admin functionalities for managing tours, users, reviews, and bookings

- **Frontend:**

  - Responsive user interface
  - Account settings management
  - Password change functionality

- **Future Enhancements:**

  - **Tour Management:** Admin dashboard will include features for managing tours, including creating, updating, and deleting tour entries.

  - **User Functionalities:** User dashboard will include features for settings management, bookings management, reviews management and billings management

## Technologies Used

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)

- **Frontend:**
  - React
  - React Router
  - Axios
  - Tailwind CSS

## Setup and Installation

### Backend

1. **Clone the Repository:**
   git clone <repository-url>

2. Navigate to the Backend Directory:
   cd backend

3. Install Dependencies:
   npm install

4. Create a MongoDB Database:
   You need to create a MongoDB database. Follow these steps:

- Go to MongoDB Atlas or set up a local MongoDB instance.
- Create a new cluster and a new database.
- Note down the connection string and update it in the .env file.

5. Configure Environment Variables: Create a .env file in the root of the backend directory with the following content, replacing placeholder values with your actual configuration:
   env
   Copy code
   NODE_ENV=development
   PORT=8000
   DATABASE=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.mongodb.net/natours?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   EMAIL_USERNAME=your_email_username
   EMAIL_PASSWORD=your_email_password
   EMAIL_HOST=sandbox.smtp.mailtrap.io
   EMAIL_PORT=25

6. Run the Backend Server:
   npm start

## Frontend

1. Navigate to the Frontend Directory:
   cd client
2. Install Dependencies:
   npm install
3. Run the Frontend Application:
   npm start

## Usage

- Open your browser and navigate to http://localhost:8000 for the backend API.
- Open your browser and navigate to http://localhost:3000 for the React frontend.
