const fs = require('fs');
const { connectDatabase, closeDatabase } = require('./../../utils/database');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

// Read JSON files
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const seedDatabase = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    const usersWithPasswordConfirm = users.map((user) => ({
      ...user,
      passwordConfirm: user.password,
    }));

    await Tour.create(tours);
    await User.create(usersWithPasswordConfirm);
    await Review.create(reviews);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Failed to seed database:', err);
  }
};

const startSeeding = async () => {
  try {
    await connectDatabase();
    await seedDatabase();
  } catch (err) {
    console.error('Failed to seed database:', err);
  } finally {
    await closeDatabase();
  }
};

startSeeding();
