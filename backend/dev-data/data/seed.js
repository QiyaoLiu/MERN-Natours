const fs = require('fs');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

// Read JSON files
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Function to seed the database with initial data
const seedDatabase = async () => {
  try {
    // Clear the in-memory database
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    // Insert data into the database
    await Tour.insertMany(tours);
    await User.insertMany(users);
    await Review.insertMany(reviews);

    console.log('Database seeded with initial data');
  } catch (err) {
    console.error('Failed to seed database:', err);
  }
};

module.exports = seedDatabase;
