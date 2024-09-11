// resetDatabase.js
const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel'); // Example model, replace with your models
const User = require('./models/userModel'); // Example model, replace with your models
const Review = require('./models/reviewModel'); // Example model, replace with your models

dotenv.config({ path: './.env.staging' });

// Read JSON files for the default data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8')
);

// Function to reset and seed the database
const resetDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URI);

    console.log('Connected to MongoDB for database reset');

    // Drop collections (or you can delete specific documents)
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    // Seed the database with default data
    await Tour.create(tours);
    await User.create(users);
    await Review.create(reviews);

    console.log('Database reset and seeded with initial data!');
  } catch (err) {
    console.error('Error resetting database:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Run the reset function
resetDatabase();
