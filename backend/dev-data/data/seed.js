const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');
require('dotenv').config({ path: './config.env' });

// Read JSON files
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Seed database function
const seedDatabase = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    const usersWithPasswordConfirm = users.map((user) => ({
      ...user,
      passwordConfirm: user.password, // Assuming passwordConfirm is the same as password for seeding
    }));

    await User.create(usersWithPasswordConfirm);
    await Review.create(reviews);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Failed to seed database:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Connect to MongoDB and start the seeding process
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

if (!DB) {
  console.error('DATABASE environment variable is not set.');
  process.exit(1);
}

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB');
    return seedDatabase();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
